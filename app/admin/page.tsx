import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const metadata = {
  title: "Admin Dashboard | Café-Bar Noir",
  description: "Manage reservations for Café-Bar Noir",
}

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData?.user) {
    redirect("/admin/portal")
  }

  const { data: reservations, error: reservationsError } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false })

  if (reservationsError) {
    console.error("Failed to fetch reservations:", reservationsError)
  }

  return <AdminDashboard initialReservations={reservations || []} userEmail={userData.user.email || ""} />
}
