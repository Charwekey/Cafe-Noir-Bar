import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { GalleryHero } from "@/components/gallery/gallery-hero"
import { GalleryGrid } from "@/components/gallery/gallery-grid"

export const metadata = {
  title: "Gallery | Café-Bar Noir",
  description: "Browse our gallery showcasing the ambience, cuisine, and memorable moments at Café-Bar Noir.",
}

export default function GalleryPage() {
  return (
    <>
      <Navigation />
      <main>
        <GalleryHero />
        <GalleryGrid />
      </main>
      <Footer />
    </>
  )
}
