import Link from "next/link"
import { Instagram, Facebook, Twitter, MapPin, Phone, Clock } from "lucide-react"

const footerLinks = {
  explore: [
    { href: "/menu", label: "Our Menu" },
    { href: "/experience", label: "Experience" },
    { href: "/gallery", label: "Gallery" },
    { href: "/reservations", label: "Reservations" },
  ],
  info: [
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Contact Us" },
    { href: "#", label: "Private Events" },
    { href: "#", label: "Careers" },
  ],
}

const socialLinks = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Twitter, label: "Twitter" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl tracking-wider text-foreground">
              Café-Bar <span className="text-primary">Noir</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Where taste meets vibe. Experience the finest cocktails, wine, and cuisine in the heart of Accra.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-serif text-lg mb-6 text-foreground">Explore</h3>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-serif text-lg mb-6 text-foreground">Information</h3>
            <ul className="space-y-4">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg mb-6 text-foreground">Visit Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary mt-1 shrink-0" />
                <span>
                  123 Oxford Street, Osu
                  <br />
                  Accra, Ghana
                </span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+233 20 123 4567</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Clock size={18} className="text-primary mt-1 shrink-0" />
                <span>
                  Open Daily
                  <br />
                  10:00 AM - 12:00 AM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Café-Bar Noir. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
