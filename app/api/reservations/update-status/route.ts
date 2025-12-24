import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { id, status, rejection_reason } = body

    // Validate input
    if (!id || !status || !["confirmed", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 })
    }

    if (status === "rejected" && !rejection_reason) {
      return NextResponse.json({ error: "Rejection reason is required" }, { status: 400 })
    }

    // Get the reservation first
    const { data: reservation, error: fetchError } = await supabase
      .from("reservations")
      .select("*")
      .eq("id", id)
      .single()

    if (fetchError || !reservation) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
    }

    // Update reservation status
    const updateData: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    }

    if (status === "confirmed") {
      updateData.confirmed_at = new Date().toISOString()
    } else if (status === "rejected") {
      updateData.rejected_at = new Date().toISOString()
      updateData.rejection_reason = rejection_reason
    }

    const { error: updateError } = await supabase.from("reservations").update(updateData).eq("id", id)

    if (updateError) throw updateError

    // Format time for email
    const formatTime = (time: string) => {
      const [hours] = time.split(":")
      const hour = Number.parseInt(hours)
      return hour >= 12 ? `${hour === 12 ? 12 : hour - 12}:00 PM` : `${hour}:00 AM`
    }

    // Send notification email to customer
    await fetch(new URL("/api/reservations/notify", request.url).toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: status,
        reservation: {
          name: reservation.name,
          email: reservation.email,
          date: new Date(reservation.reservation_date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: formatTime(reservation.reservation_time),
          guests: reservation.guests.toString(),
        },
        reason: rejection_reason,
      }),
    })

    return NextResponse.json({
      success: true,
      message: `Reservation ${status} successfully`,
    })
  } catch (error) {
    console.error("Update status error:", error)
    return NextResponse.json({ error: "Failed to update reservation status" }, { status: 500 })
  }
}
