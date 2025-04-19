"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import VHSGlitch from "./vhs-glitch"
import CyberButton from "./cyber-button"
import Navigation from "./navigation"
import ShoppingCart from "./shopping-cart"
import { usePerformance } from "@/contexts/performance-context"

export default function Header() {
  const { useReducedMotion } = usePerformance()

  return (
    <motion.header
      className="flex justify-between items-center p-6 md:p-10 border-b border-[#00ff41]/20 sticky top-0 z-30 bg-black/80 backdrop-blur-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: useReducedMotion ? 0.1 : 0.5 }}
    >
      <Link href="/">
        <VHSGlitch intensity="medium" interval={8000}>
          <div className="text-2xl font-mono text-[#00ff41] font-bold tracking-tighter">FD</div>
        </VHSGlitch>
      </Link>

      <Navigation />

      <div className="flex items-center gap-4">
        <ShoppingCart />
        <Link href="/contact">
          <CyberButton variant="primary" size="md">
            CONNECT <span className="ml-1">_</span>
          </CyberButton>
        </Link>
      </div>
    </motion.header>
  )
}
