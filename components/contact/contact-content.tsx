"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactContent() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Visit Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                We would love to welcome you to Café-Bar Noir. Come experience our warm hospitality and exquisite
                offerings in the heart of Accra.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-border shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    123 Oxford Street, Osu
                    <br />
                    Accra, Ghana
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-border shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-1">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+233201234567" className="hover:text-primary transition-colors">
                      +233 20 123 4567
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-border shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:hello@cafebarnoir.com" className="hover:text-primary transition-colors">
                      hello@cafebarnoir.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-border shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-1">Opening Hours</h3>
                  <p className="text-muted-foreground">
                    Open Daily
                    <br />
                    10:00 AM - 12:00 AM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[400px] lg:h-full min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9685867082257!2d-0.18069368523413!3d5.5600140959459015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0x8d7e0f8f5a0e9a0!2sOxford%20St%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1623456789012!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Café-Bar Noir Location"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
