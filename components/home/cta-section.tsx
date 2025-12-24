"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src="/elegant-dining-table-setup-with-candles-and-wine-g.jpg" alt="Dining ambience" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Reserve Your Table</p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 text-balance">
            Make Your Evening Unforgettable
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Whether it is a romantic dinner, a celebration with friends, or a corporate event, we are here to make it
            special. Reserve your table today.
          </p>
          <Link
            href="/reservations"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-wider hover:bg-primary/90 transition-all duration-300"
          >
            Book Now
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
