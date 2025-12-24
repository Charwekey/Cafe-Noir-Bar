"use client"

import { motion } from "framer-motion"
import { Music, Tv, Leaf, Users } from "lucide-react"

const experiences = [
  {
    icon: Music,
    title: "Live Music Nights",
    description:
      "Every Friday and Saturday, immerse yourself in the soulful sounds of live performances. From jazz to Afrobeat, our stage welcomes the finest local and international artists.",
    image: "/intimate-jazz-band-performance-in-elegant-bar-sett.jpg",
    features: ["Live Bands", "DJ Sets", "Open Mic Nights", "Special Guest Artists"],
  },
  {
    icon: Tv,
    title: "Sports Viewing",
    description:
      "Catch all the action on our premium screens. From Premier League to NFL, enjoy the game with great food, drinks, and fellow fans in our comfortable viewing lounges.",
    image: "/placeholder.svg?height=600&width=800",
    features: ["Multiple Screens", "Comfortable Seating", "Game Day Specials", "Live Commentary"],
  },
  {
    icon: Leaf,
    title: "Vegan & Vegetarian",
    description:
      "Our menu celebrates plant-based excellence. Discover creative vegan and vegetarian dishes that are as delicious as they are beautiful, crafted with locally-sourced ingredients.",
    image: "/placeholder.svg?height=600&width=800",
    features: ["Full Vegan Menu", "Locally Sourced", "Gluten-Free Options", "Seasonal Specials"],
  },
  {
    icon: Users,
    title: "Private Dining & Events",
    description:
      "Host your special occasions in our exclusive private dining spaces. From intimate dinners to corporate events, our team will craft an unforgettable experience.",
    image: "/placeholder.svg?height=600&width=800",
    features: ["Private Rooms", "Custom Menus", "Event Planning", "Corporate Packages"],
  },
]

export function ExperienceGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="space-y-24">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={exp.image || "/placeholder.svg"}
                    alt={exp.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="w-14 h-14 flex items-center justify-center border border-primary/50">
                  <exp.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground">{exp.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {exp.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
