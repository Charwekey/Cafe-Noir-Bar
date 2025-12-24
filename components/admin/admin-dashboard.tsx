"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Calendar, Clock, Users, Mail, Phone, CheckCircle, XCircle, LogOut, Filter, RefreshCw } from "lucide-react"
import type { Reservation } from "@/lib/types/reservation"

const rejectionReasons = [
  "Fully booked at this time",
  "Private event scheduled",
  "Restaurant closed for maintenance",
  "Time slot unavailable",
  "Maximum capacity reached",
  "Other",
]

interface AdminDashboardProps {
  initialReservations: Reservation[]
  userEmail: string
}

export function AdminDashboard({ initialReservations, userEmail }: AdminDashboardProps) {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations)
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "rejected">("all")
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const filteredReservations = reservations.filter((r) => (filter === "all" ? true : r.status === filter))

  const statusCounts = {
    all: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    rejected: reservations.filter((r) => r.status === "rejected").length,
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/portal")
    router.refresh()
  }

  const refreshReservations = async () => {
    setIsRefreshing(true)
    const supabase = createClient()
    const { data } = await supabase.from("reservations").select("*").order("created_at", { ascending: false })

    if (data) {
      setReservations(data)
    }
    setIsRefreshing(false)
  }

  const handleStatusUpdate = async (status: "confirmed" | "rejected") => {
    if (!selectedReservation) return

    const reason = rejectionReason === "Other" ? customReason : rejectionReason

    if (status === "rejected" && !reason) {
      alert("Please select or enter a rejection reason")
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch("/api/reservations/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedReservation.id,
          status,
          rejection_reason: status === "rejected" ? reason : null,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update status")
      }

      // Update local state
      setReservations((prev) =>
        prev.map((r) =>
          r.id === selectedReservation.id
            ? {
              ...r,
              status,
              rejection_reason: status === "rejected" ? reason : null,
              confirmed_at: status === "confirmed" ? new Date().toISOString() : null,
              rejected_at: status === "rejected" ? new Date().toISOString() : null,
            }
            : r,
        ),
      )

      setSelectedReservation(null)
      setRejectionReason("")
      setCustomReason("")
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Failed to update reservation status")
    } finally {
      setIsProcessing(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (time: string) => {
    const [hours] = time.split(":")
    const hour = Number.parseInt(hours)
    return hour >= 12 ? `${hour === 12 ? 12 : hour - 12}:00 PM` : `${hour}:00 AM`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "confirmed":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-primary">Café-Bar Noir</h1>
            <p className="text-sm text-muted-foreground">Reservations Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(["all", "pending", "confirmed", "rejected"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`p-4 border transition-all ${filter === status ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
                }`}
            >
              <p className="text-2xl font-serif text-foreground">{statusCounts[status]}</p>
              <p className="text-sm text-muted-foreground capitalize">{status}</p>
            </button>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Showing {filteredReservations.length} {filter} reservation(s)
            </span>
          </div>
          <button
            onClick={refreshReservations}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-border hover:border-primary transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          {filteredReservations.length === 0 ? (
            <div className="text-center py-12 border border-border bg-card">
              <p className="text-muted-foreground">No {filter === "all" ? "" : filter} reservations found</p>
            </div>
          ) : (
            filteredReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="border border-border bg-card p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-lg text-foreground">{reservation.name}</h3>
                      <span
                        className={`px-2 py-0.5 text-xs uppercase tracking-wider border ${getStatusColor(
                          reservation.status,
                        )}`}
                      >
                        {reservation.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {formatDate(reservation.reservation_date)}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {formatTime(reservation.reservation_time)}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {reservation.guests} guest(s)
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {reservation.email}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {reservation.phone}
                    </div>

                    {reservation.occasion && (
                      <p className="text-sm text-muted-foreground">
                        <span className="text-foreground">Occasion:</span> {reservation.occasion}
                      </p>
                    )}

                    {reservation.notes && (
                      <p className="text-sm text-muted-foreground">
                        <span className="text-foreground">Notes:</span> {reservation.notes}
                      </p>
                    )}

                    {reservation.rejection_reason && (
                      <p className="text-sm text-red-400">
                        <span className="text-foreground">Rejection Reason:</span> {reservation.rejection_reason}
                      </p>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Submitted: {new Date(reservation.created_at).toLocaleString()}
                    </p>
                  </div>

                  {reservation.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedReservation(reservation)
                          handleStatusUpdate("confirmed")
                        }}
                        disabled={isProcessing}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Confirm
                      </button>
                      <button
                        onClick={() => setSelectedReservation(reservation)}
                        className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 text-sm hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Rejection Modal */}
      {selectedReservation && selectedReservation.status === "pending" && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
          <div className="bg-card border border-border p-8 max-w-md w-full">
            <h3 className="font-serif text-xl text-foreground mb-4">Reject Reservation</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Please select a reason for rejecting {selectedReservation.name}&apos;s reservation.
            </p>

            <div className="space-y-4 mb-6">
              <label className="block text-sm text-foreground mb-2">Rejection Reason</label>
              <select
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full px-4 py-3 bg-input border border-border text-foreground focus:border-primary focus:outline-none transition-colors"
              >
                <option value="">Select a reason</option>
                {rejectionReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>

              {rejectionReason === "Other" && (
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Enter custom reason..."
                  rows={3}
                  className="w-full px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                />
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedReservation(null)
                  setRejectionReason("")
                  setCustomReason("")
                }}
                className="flex-1 py-3 border border-border text-foreground hover:border-primary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusUpdate("rejected")}
                disabled={isProcessing || !rejectionReason || (rejectionReason === "Other" && !customReason)}
                className="flex-1 py-3 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? "Processing..." : "Reject Reservation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
