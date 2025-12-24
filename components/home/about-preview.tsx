"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function AboutPreview() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/elegant-cafe-bar-interior-with-ambient-lighting-an.jpg"
                alt="Café-Bar Noir ambience"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-primary/30 hidden lg:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm">Our Story</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight text-balance">
              A Premium Dining & Social Experience
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Nestled in the heart of Accra, Café-Bar Noir is more than just a café-bar—it is a destination where
                elegance meets energy, and every visit becomes a cherished memory.
              </p>
              <p>
                Our carefully curated menu celebrates both Ghanaian flavors and international cuisine, paired with
                expertly crafted cocktails and an impressive wine selection.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary uppercase tracking-wider text-sm group"
            >
              Discover Our Story
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
