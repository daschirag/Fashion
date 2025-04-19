"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/contexts/performance-context"

type ParallaxSectionProps = {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  offset?: number
  zIndex?: number
}

export default function ParallaxSection({
  children,
  className,
  speed = 0.2,
  direction = "up",
  offset = 0,
  zIndex = 0,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { useReducedMotion, useParallaxEffects } = usePerformance()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate transform based on direction
  const multiplier = direction === "down" || direction === "right" ? 1 : -1
  const value = 100 * speed * multiplier

  const disabledTransform = useTransform(scrollYProgress, [0, 1], [0, 0])

  const yTransformEnabled = useTransform(
    scrollYProgress,
    [0, 1],
    [offset, offset + (direction === "up" || direction === "down" ? value : 0)],
  )

  const xTransformEnabled = useTransform(
    scrollYProgress,
    [0, 1],
    [offset, offset + (direction === "left" || direction === "right" ? value : 0)],
  )

  // If reduced motion is preferred or parallax is disabled, don't apply transformations
  const yTransform = useReducedMotion || !useParallaxEffects ? disabledTransform : yTransformEnabled

  const xTransform = useReducedMotion || !useParallaxEffects ? disabledTransform : xTransformEnabled

  const y = direction === "up" || direction === "down" ? yTransform : 0
  const x = direction === "left" || direction === "right" ? xTransform : 0

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{
          y,
          x,
          zIndex,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
