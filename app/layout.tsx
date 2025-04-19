import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { PerformanceProvider } from "@/contexts/performance-context"
import { CartProvider } from "@/contexts/cart-context"
import "./globals.css"

// Load Playfair Display font
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
})

// Load Montserrat as a complementary sans-serif font
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Fashion Designer Portfolio",
  description: "Luxury fashion designer portfolio showcasing haute couture designs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${montserrat.variable} font-sans`}>
        <CartProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <PerformanceProvider>{children}</PerformanceProvider>
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  )
}
