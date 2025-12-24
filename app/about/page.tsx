import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { StorySection } from "@/components/about/story-section"
import { ValuesSection } from "@/components/about/values-section"

export const metadata = {
  title: "About Us | Café-Bar Noir",
  description: "Discover the story behind Café-Bar Noir - a premium dining and social experience in Accra, Ghana.",
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <AboutHero />
        <StorySection />
        <ValuesSection />
      </main>
      <Footer />
    </>
  )
}
