"use client"

import { type ReactNode, useRef, Children, isValidElement } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/contexts/performance-context"

type StaggerRevealProps = {
  children: ReactNode
  className?: string
  childClassName?: string
  staggerDelay?: number
  duration?: number
  threshold?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  once?: boolean
}

export default function StaggerReveal({
  children,
  className,
  childClassName,
  staggerDelay = 0.1,
  duration = 0.5,
  threshold = 0.1,
  direction = "up",
  once = true,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })
  const { useReducedMotion } = usePerformance()

  // Get direction values
  const getDirectionValues = () => {
    if (useReducedMotion) {
      return { y: 0, x: 0 }
    }

    switch (direction) {
      case "up":
        return { y: 30, x: 0 }
      case "down":
        return { y: -30, x: 0 }
      case "left":
        return { y: 0, x: 30 }
      case "right":
        return { y: 0, x: -30 }
      case "none":
        return { y: 0, x: 0 }
    }
  }

  const { y, x } = getDirectionValues()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: useReducedMotion ? 0 : staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y, x },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: useReducedMotion ? 0.3 : duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Clone children to add motion properties
  const childrenArray = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      return (
        <motion.div key={index} variants={itemVariants} className={childClassName}>
          {child}
        </motion.div>
      )
    }
    return child
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn(className)}
    >
      {childrenArray}
    </motion.div>
  )
}
