import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MenuHero } from "@/components/menu/menu-hero"
import { MenuCategories } from "@/components/menu/menu-categories"

export const metadata = {
  title: "Menu | Café-Bar Noir",
  description:
    "Explore our exquisite menu featuring cocktails, wine, coffee, breakfast, brunch, lunch, dinner, and desserts.",
}

export default function MenuPage() {
  return (
    <>
      <Navigation />
      <main>
        <MenuHero />
        <MenuCategories />
      </main>
      <Footer />
    </>
  )
}
