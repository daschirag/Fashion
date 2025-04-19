"use client"

import type React from "react"

import { motion } from "framer-motion"
import { usePerformance } from "@/contexts/performance-context"

type PageTransitionProps = {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const { useReducedMotion } = usePerformance()

  // If reduced motion is preferred, render without animation
  if (useReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
