"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/contexts/performance-context"
import SimpleDistressedText from "./simple-distressed-text"
import VHSGlitch from "./vhs-glitch"

const routes = [
  { name: "HOME", path: "/" },
  { name: "SHOP", path: "/shop" },
  { name: "COLLECTIONS", path: "/collections" },
  { name: "LOOKBOOK", path: "/lookbook" },
  { name: "RUNWAY", path: "/runway" },
  { name: "ATELIER", path: "/atelier" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
  { name: "3D_DEMO", path: "/3d-demo" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { useReducedMotion } = usePerformance()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={cn(
              "text-[#00ff41]/80 hover:text-[#00ff41] transition-colors font-mono text-sm tracking-widest relative group",
              pathname === route.path && "text-[#00ff41]",
            )}
          >
            {route.name}
            {pathname === route.path && (
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-px bg-[#00ff41]"
                layoutId="navbar-indicator"
                transition={{ type: "spring", bounce: 0.25, duration: useReducedMotion ? 0 : 0.5 }}
              />
            )}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00ff41]/50 transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-[#00ff41] hover:text-[#00ff41]/80 transition-colors z-50"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: useReducedMotion ? 0.1 : 0.3 }}
          >
            <VHSGlitch className="mb-8">
              <SimpleDistressedText
                text="NAVIGATION"
                tag="h2"
                className="text-[#00ff41] text-2xl font-mono font-bold tracking-tight"
              />
            </VHSGlitch>

            <motion.nav
              className="flex flex-col items-center space-y-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: useReducedMotion ? 0 : 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {routes.map((route) => (
                <motion.div
                  key={route.path}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: useReducedMotion ? 0.1 : 0.5 }}
                >
                  <Link
                    href={route.path}
                    className={cn(
                      "text-[#00ff41]/80 hover:text-[#00ff41] transition-colors font-mono text-xl tracking-widest",
                      pathname === route.path && "text-[#00ff41]",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
