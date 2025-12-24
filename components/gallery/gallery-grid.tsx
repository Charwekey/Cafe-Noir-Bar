"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const galleryImages = [
  { src: "/placeholder.svg?height=600&width=800", alt: "Bar Interior", category: "Ambience" },
  { src: "/placeholder.svg?height=800&width=600", alt: "Signature Dish", category: "Food" },
  { src: "/placeholder.svg?height=600&width=600", alt: "Cocktails", category: "Drinks" },
  { src: "/placeholder.svg?height=800&width=600", alt: "Live Music", category: "Events" },
  { src: "/placeholder.svg?height=600&width=800", alt: "Lounge Area", category: "Ambience" },
  { src: "/placeholder.svg?height=600&width=600", alt: "Dessert", category: "Food" },
  { src: "/placeholder.svg?height=800&width=600", alt: "Wine Selection", category: "Drinks" },
  { src: "/placeholder.svg?height=600&width=800", alt: "Private Dining", category: "Events" },
  { src: "/placeholder.svg?height=600&width=600", alt: "Outdoor Seating", category: "Ambience" },
  { src: "/placeholder.svg?height=800&width=600", alt: "Kelewele", category: "Food" },
  { src: "/placeholder.svg?height=600&width=800", alt: "Espresso Martini", category: "Drinks" },
  { src: "/placeholder.svg?height=600&width=600", alt: "Celebration", category: "Events" },
]

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [filter, setFilter] = useState("All")

  const categories = ["All", "Ambience", "Food", "Drinks", "Events"]
  const filteredImages = filter === "All" ? galleryImages : galleryImages.filter((img) => img.category === filter)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                filter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="break-inside-avoid group cursor-pointer overflow-hidden"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-foreground opacity-0 group-hover:opacity-100 font-serif text-xl transition-opacity duration-300">
                      {image.alt}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-6"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
              >
                <X size={32} />
              </button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                src={selectedImage}
                alt="Gallery image"
                className="max-w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
