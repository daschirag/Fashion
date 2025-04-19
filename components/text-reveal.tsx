"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/contexts/performance-context"
import type { JSX } from "react"

type TextRevealProps = {
  text: string
  className?: string
  threshold?: number
  once?: boolean
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  lineHeight?: number
  delay?: number
}

export default function TextReveal({
  text,
  className,
  threshold = 0.2,
  once = true,
  element = "p",
  lineHeight = 1.5,
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })
  const { useReducedMotion } = usePerformance()

  // Split text into lines
  const lines = text.split("\n")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: useReducedMotion ? 0 : 0.15,
        delayChildren: delay,
      },
    },
  }

  const lineVariants = {
    hidden: { y: useReducedMotion ? 0 : "100%" },
    visible: {
      y: 0,
      transition: {
        duration: useReducedMotion ? 0.3 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const Element = element as keyof JSX.IntrinsicElements

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn(className)}
      aria-label={text}
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className={useReducedMotion ? "" : "overflow-hidden"}>
          <motion.div variants={lineVariants}>
            <Element className="block">{line}</Element>
          </motion.div>
        </div>
      ))}
    </motion.div>
  )
}
