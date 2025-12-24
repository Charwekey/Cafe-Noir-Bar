import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactContent } from "@/components/contact/contact-content"

export const metadata = {
  title: "Contact | Café-Bar Noir",
  description: "Get in touch with Café-Bar Noir. Find our location, hours, and contact information.",
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main>
        <ContactHero />
        <ContactContent />
      </main>
      <Footer />
    </>
  )
}
