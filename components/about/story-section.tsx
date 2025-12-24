"use client"

import { motion } from "framer-motion"

export function StorySection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
              A Vision of Elegance & Energy
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Café-Bar Noir was born from a simple yet ambitious vision: to create a space in Accra where
                sophistication meets warmth, where every guest feels like a cherished friend, and where memorable
                moments are crafted with every visit.
              </p>
              <p>
                Our founders, passionate about hospitality and the vibrant culture of Ghana, set out to build more than
                just a café-bar. They envisioned a sanctuary where the energy of nightlife blends seamlessly with the
                comfort of a neighborhood café.
              </p>
              <p>
                Today, Café-Bar Noir stands as a testament to that vision—a place where tourists discover the best of
                Accra, where groups gather to celebrate life, and where university students find their perfect
                study-and-unwind haven.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/bartender-making-cocktail-in-elegant-bar.jpg"
                  alt="Bartender crafting cocktails"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <img src="/elegant-coffee-and-dessert-on-cafe-table.jpg" alt="Coffee service" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="pt-8 space-y-4">
              <div className="aspect-square overflow-hidden">
                <img src="/live-music-performance-in-intimate-venue.jpg" alt="Live music night" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] overflow-hidden">
                <img src="/cozy-lounge-seating-in-upscale-bar.jpg" alt="Lounge seating" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
