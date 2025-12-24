import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ExperienceHero } from "@/components/experience/experience-hero"
import { ExperienceGrid } from "@/components/experience/experience-grid"

export const metadata = {
  title: "Experience | Café-Bar Noir",
  description:
    "Discover the unique experiences at Café-Bar Noir - live music, sports viewing, private dining, and more.",
}

export default function ExperiencePage() {
  return (
    <>
      <Navigation />
      <main>
        <ExperienceHero />
        <ExperienceGrid />
      </main>
      <Footer />
    </>
  )
}
