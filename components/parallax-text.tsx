"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/contexts/performance-context"

type ParallaxTextProps = {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
  delay?: number
}

export default function ParallaxText({
  children,
  className,
  speed = 0.2,
  direction = "up",
  delay = 0,
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { useReducedMotion, useParallaxEffects } = usePerformance()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate transform based on direction (disabled if reduced motion is preferred)
  const parallaxEnabled = !useReducedMotion && useParallaxEffects
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    parallaxEnabled ? [0, direction === "up" ? -100 * speed : 100 * speed] : [0, 0],
  )

  // Calculate opacity based on scroll position (always enabled for better readability)
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4])

  return (
    <div ref={ref} className={cn("relative overflow-visible", className)}>
      <motion.div
        style={{
          y,
          opacity,
          transition: { delay: useReducedMotion ? 0 : delay },
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
