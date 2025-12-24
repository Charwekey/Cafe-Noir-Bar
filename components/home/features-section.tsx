"use client"

import { motion } from "framer-motion"
import { Truck, CreditCard, Accessibility, Users, Baby, PartyPopper } from "lucide-react"

const features = [
  { icon: Truck, label: "Dine-in, Takeaway & Delivery" },
  { icon: CreditCard, label: "Cards & NFC Payments" },
  { icon: Accessibility, label: "Fully Accessible" },
  { icon: Users, label: "Perfect for Groups" },
  { icon: Baby, label: "Kid Friendly" },
  { icon: PartyPopper, label: "Birthday Celebrations" },
]

export function FeaturesSection() {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-border bg-background">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{feature.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
