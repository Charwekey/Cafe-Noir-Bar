import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Café-Bar Noir | Where Taste Meets Vibe",
  description:
    "Experience the finest cocktails, wine, coffee, and cuisine at Café-Bar Noir in Accra, Ghana. Live music, cosy atmosphere, and unforgettable moments.",
  keywords: ["cafe", "bar", "restaurant", "Accra", "Ghana", "cocktails", "wine", "live music", "fine dining"],
  openGraph: {
    title: "Café-Bar Noir | Where Taste Meets Vibe",
    description: "Experience the finest cocktails, wine, coffee, and cuisine at Café-Bar Noir in Accra, Ghana.",
    type: "website",
  },
  generator: 'v0.app'
}

export const viewport = {
  themeColor: "#0f0f0f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
