"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const categories = ["Breakfast", "Brunch", "Lunch", "Dinner", "Cocktails", "Wine", "Coffee", "Desserts"]

const menuItems: Record<string, Array<{ name: string; description: string; price: string; popular?: boolean }>> = {
  Breakfast: [
    {
      name: "Classic Continental",
      description: "Croissants, pastries, fresh fruits, yogurt, and artisan bread",
      price: "GH₵ 85",
    },
    { name: "Full English", description: "Eggs, bacon, sausages, beans, mushrooms, and toast", price: "GH₵ 95" },
    {
      name: "Avocado Toast",
      description: "Sourdough, smashed avocado, poached eggs, chili flakes",
      price: "GH₵ 75",
      popular: true,
    },
    {
      name: "Pancake Stack",
      description: "Fluffy pancakes with maple syrup, berries, and whipped cream",
      price: "GH₵ 65",
    },
  ],
  Brunch: [
    {
      name: "Eggs Benedict",
      description: "Poached eggs, hollandaise, smoked salmon or ham, English muffin",
      price: "GH₵ 95",
      popular: true,
    },
    { name: "Shakshuka", description: "Baked eggs in spiced tomato sauce with crusty bread", price: "GH₵ 80" },
    {
      name: "Noir Omelette",
      description: "Three-egg omelette with choice of fillings, served with salad",
      price: "GH₵ 70",
    },
    { name: "French Toast", description: "Brioche, caramelized bananas, vanilla cream, honey", price: "GH₵ 75" },
  ],
  Lunch: [
    {
      name: "Jollof Rice Supreme",
      description: "Ghana-style jollof with grilled chicken and plantain",
      price: "GH₵ 110",
      popular: true,
    },
    { name: "Grilled Sea Bass", description: "Fresh catch with herb butter, roasted vegetables", price: "GH₵ 145" },
    {
      name: "Noir Burger",
      description: "Wagyu beef, aged cheddar, caramelized onions, truffle aioli",
      price: "GH₵ 125",
    },
    {
      name: "Mediterranean Salad",
      description: "Mixed greens, feta, olives, tomatoes, cucumber, balsamic",
      price: "GH₵ 85",
    },
  ],
  Dinner: [
    {
      name: "Chicken Espetada",
      description: "Skewered chicken, garlic butter, roasted potatoes",
      price: "GH₵ 145",
      popular: true,
    },
    { name: "Grilled Ribeye", description: "300g ribeye, pepper sauce, seasonal vegetables", price: "GH₵ 195" },
    { name: "Lobster Thermidor", description: "Half lobster, creamy cognac sauce, gratin", price: "GH₵ 285" },
    {
      name: "Vegetable Risotto",
      description: "Arborio rice, seasonal vegetables, parmesan, truffle oil",
      price: "GH₵ 115",
    },
  ],
  Cocktails: [
    {
      name: "Noir Signature",
      description: "Dark rum, coffee liqueur, espresso, vanilla",
      price: "GH₵ 75",
      popular: true,
    },
    { name: "Gold Coast Sunset", description: "Gin, passion fruit, lime, elderflower, prosecco", price: "GH₵ 70" },
    { name: "Accra Old Fashioned", description: "Bourbon, palm sugar, orange bitters", price: "GH₵ 80" },
    { name: "Tropical Mojito", description: "White rum, mint, lime, mango, soda", price: "GH₵ 65" },
  ],
  Wine: [
    { name: "House Red", description: "Cabernet Sauvignon, South Africa", price: "GH₵ 55 / GH₵ 220" },
    { name: "House White", description: "Sauvignon Blanc, Chile", price: "GH₵ 50 / GH₵ 200" },
    { name: "Champagne Brut", description: "Moët & Chandon, France", price: "GH₵ 650", popular: true },
    { name: "Rosé Selection", description: "Provence Rosé, France", price: "GH₵ 65 / GH₵ 260" },
  ],
  Coffee: [
    { name: "Espresso", description: "Single or double shot of premium arabica", price: "GH₵ 25 / GH₵ 35" },
    { name: "Cappuccino", description: "Espresso with steamed milk and foam", price: "GH₵ 40", popular: true },
    { name: "Café Latte", description: "Espresso with silky steamed milk", price: "GH₵ 45" },
    { name: "Noir Special", description: "Espresso, dark chocolate, vanilla, cream", price: "GH₵ 55" },
  ],
  Desserts: [
    {
      name: "Kelewele Brûlée",
      description: "Spiced plantain crème brûlée with caramelized top",
      price: "GH₵ 55",
      popular: true,
    },
    {
      name: "Chocolate Fondant",
      description: "Warm chocolate cake with molten center, vanilla ice cream",
      price: "GH₵ 65",
    },
    { name: "Tiramisu", description: "Classic Italian dessert with espresso and mascarpone", price: "GH₵ 60" },
    { name: "Tropical Fruit Platter", description: "Fresh seasonal fruits with honey yogurt", price: "GH₵ 50" },
  ],
}

export function MenuCategories() {
  const [activeCategory, setActiveCategory] = useState("Breakfast")

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-3 text-sm uppercase tracking-wider transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-12">{activeCategory}</h2>

            <div className="space-y-8">
              {menuItems[activeCategory]?.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-8 border-b border-border last:border-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-serif text-xl text-foreground">{item.name}</h3>
                      {item.popular && (
                        <span className="px-2 py-0.5 text-xs uppercase tracking-wider bg-primary/10 text-primary border border-primary/30">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="font-serif text-xl text-primary whitespace-nowrap">{item.price}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
