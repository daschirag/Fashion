"use client"

import type { ReactNode } from "react"
import Header from "./header"
import Footer from "./footer"
import DarkBackground from "./dark-background"
import DistressedOverlay from "./distressed-overlay"
import StaticNoise from "./static-noise"
import PageTransition from "./page-transition"
import PerformanceToggle from "./performance-toggle"

type PageLayoutProps = {
  children: ReactNode
  showFooter?: boolean
}

export default function PageLayout({ children, showFooter = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background effects */}
      <DarkBackground className="fixed inset-0 z-0" intensity="medium" />
      <DistressedOverlay className="fixed inset-0 z-0" opacity={0.15} intensity="medium" />
      <StaticNoise className="fixed inset-0 z-0" opacity={0.05} speed={15} />

      {/* Scan lines */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        {showFooter && <Footer />}
      </div>

      <PerformanceToggle />
    </div>
  )
}
