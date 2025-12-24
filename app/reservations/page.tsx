import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ReservationHero } from "@/components/reservations/reservation-hero"
import { ReservationForm } from "@/components/reservations/reservation-form"

export const metadata = {
  title: "Reservations | Café-Bar Noir",
  description: "Reserve your table at Café-Bar Noir. Book online for brunch, lunch, or dinner.",
}

export default function ReservationsPage() {
  return (
    <>
      <Navigation />
      <main>
        <ReservationHero />
        <ReservationForm />
      </main>
      <Footer />
    </>
  )
}
