export interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  reservation_date: string
  reservation_time: string
  guests: number
  occasion: string | null
  notes: string | null
  status: "pending" | "confirmed" | "rejected"
  rejection_reason: string | null
  created_at: string
  updated_at: string
  confirmed_at: string | null
  rejected_at: string | null
}

export interface ReservationFormData {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  occasion: string
  notes: string
}
