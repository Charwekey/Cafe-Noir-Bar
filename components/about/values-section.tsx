"use client"

import { motion } from "framer-motion"
import { Heart, Star, Users, Leaf } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Every cocktail crafted, every dish prepared, and every guest welcomed with genuine passion and care.",
  },
  {
    icon: Star,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from sourcing the finest ingredients to perfecting our service.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building connections and creating a space where everyone feels at home, from locals to tourists.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Committed to sustainable practices and supporting local suppliers whenever possible.",
  },
]

export function ValuesSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">What We Stand For</p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">Our Values</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8 bg-background border border-border hover:border-primary/50 transition-colors duration-300"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center border border-primary/50 mb-6">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
