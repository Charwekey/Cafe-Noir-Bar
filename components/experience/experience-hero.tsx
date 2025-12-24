"use client"

import { motion } from "framer-motion"

export function ExperienceHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center pt-20">
      <div className="absolute inset-0">
        <img
          src="/live-music-performance-in-upscale-bar-with-ambient.jpg"
          alt="Experience at Café-Bar Noir"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/75" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">More Than Just Dining</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground">
            The <span className="italic text-primary">Experience</span>
          </h1>
        </motion.div>
      </div>
    </section>
  )
}
