import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { HighlightsSection } from "@/components/home/highlights-section"
import { AboutPreview } from "@/components/home/about-preview"
import { FeaturesSection } from "@/components/home/features-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <HighlightsSection />
        <AboutPreview />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
