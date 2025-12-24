"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Users, MessageSquare, Clock, Mail } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = createClient()

      const { error: insertError } = await supabase.from("reservations").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        reservation_date: formData.date,
        reservation_time: formData.time,
        guests: Number.parseInt(formData.guests),
        occasion: formData.occasion || null,
        notes: formData.notes || null,
        status: "pending",
      })

      if (insertError) {
        console.error("Supabase insert error:", JSON.stringify(insertError, null, 2))
        throw new Error(insertError.message || "Database insertion failed")
      }

      // Send notification email to restaurant
      const response = await fetch("/api/reservations/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "new_reservation",
          reservation: formData,
        }),
      })

      if (!response.ok) {
        let errorMessage = "Failed to send email notification"
        try {
          const data = await response.json()
          errorMessage = data.error || errorMessage
        } catch (e) {
          console.error("Failed to parse error response as JSON:", e)
          // Fallback to text if JSON parsing fails (e.g. for 500 HTML pages)
          const text = await response.text().catch(() => null)
          errorMessage = `Server Error (${response.status}): ${text ? "Check console for details" : response.statusText}`
        }
        throw new Error(errorMessage)
      }

      setIsSubmitted(true)
    } catch (err) {
      console.error("Reservation error details:", err)
      if (err instanceof Error) {
        console.error("Error message:", err.message)
      }
      setError("Failed to submit reservation. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-primary">
              <Clock className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-serif text-3xl text-foreground mb-4">Reservation Request Sent</h2>
            <p className="text-muted-foreground mb-4">
              Your reservation request has been sent and is pending confirmation.
            </p>
            <div className="bg-card border border-border p-6 mb-8 text-left">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">What happens next?</span>
              </div>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Our team will review your reservation request</li>
                <li>• You will receive an email confirmation or update shortly</li>
                <li>• For urgent requests, please call us directly</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  date: "",
                  time: "",
                  guests: "2",
                  occasion: "",
                  notes: "",
                })
              }}
              className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Make Another Reservation
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Reserve Your Table</h2>
              <p className="text-muted-foreground leading-relaxed">
                For the best experience, we recommend reservations for brunch, lunch, and dinner. Walk-ins are welcome
                but subject to availability.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-border shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-1">Booking Policy</h3>
                  <p className="text-muted-foreground text-sm">
                    Reservations can be made up to 30 days in advance. Please arrive within 15 minutes of your booking
                    time.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-border shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-1">Large Groups</h3>
                  <p className="text-muted-foreground text-sm">
                    For parties of 8 or more, please contact us directly for special arrangements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-border shrink-0">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-1">Special Requests</h3>
                  <p className="text-muted-foreground text-sm">
                    Let us know about dietary requirements, celebrations, or special occasions.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-card border border-border p-8 space-y-6">
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder="+233 20 123 4567"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm text-foreground mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm text-foreground mb-2">
                    Time *
                  </label>
                  <select
                    id="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border text-foreground focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="">Select</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm text-foreground mb-2">
                    Guests *
                  </label>
                  <select
                    id="guests"
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border text-foreground focus:border-primary focus:outline-none transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="occasion" className="block text-sm text-foreground mb-2">
                  Occasion (Optional)
                </label>
                <select
                  id="occasion"
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border text-foreground focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select an occasion</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="date">Date Night</option>
                  <option value="business">Business Dinner</option>
                  <option value="celebration">Celebration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm text-foreground mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Dietary requirements, seating preferences, etc."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-primary-foreground text-sm uppercase tracking-wider hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmitting ? "Submitting Request..." : "Request Reservation"}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Your reservation is not confirmed until you receive a confirmation email from us.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
