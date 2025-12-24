"use client"

import { motion } from "framer-motion"
import { Wine, Music, Utensils, Sparkles } from "lucide-react"

const highlights = [
  {
    icon: Wine,
    title: "Signature Cocktails",
    description: "Expertly crafted cocktails and an extensive wine selection to elevate your evening.",
    image: "/elegant-cocktail-bar-with-colorful-artisan-cocktai.jpg",
  },
  {
    icon: Music,
    title: "Live Music",
    description: "Enjoy live performances every weekend, featuring local and international artists.",
    image: "/intimate-live-jazz-music-performance-in-upscale-ba.jpg",
  },
  {
    icon: Utensils,
    title: "Exquisite Cuisine",
    description: "From local favorites like Kelewele to international delights, savor every bite.",
    image: "/elegant-plated-gourmet-food-in-upscale-restaurant.jpg",
  },
  {
    icon: Sparkles,
    title: "Cosy Atmosphere",
    description: "A perfect blend of sophistication and comfort for any occasion.",
    image: "/cozy-upscale-lounge-with-warm-lighting-and-leather.jpg",
  },
]

export function HighlightsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Why Choose Us</p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">The Noir Experience</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-all duration-500" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-14 h-14 flex items-center justify-center border border-primary/50 mb-4 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground max-w-xs">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
