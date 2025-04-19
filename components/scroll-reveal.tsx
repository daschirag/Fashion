"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/contexts/performance-context"

type AnimationVariant =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "zoomIn"
  | "rotateIn"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "clipPath"

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  variant?: AnimationVariant
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export default function ScrollReveal({
  children,
  className,
  variant = "fadeIn",
  delay = 0,
  duration = 0.5,
  threshold = 0.2,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })
  const { useReducedMotion } = usePerformance()

  // Animation variants
  const getVariants = () => {
    // If reduced motion is preferred, only use opacity for transitions
    if (useReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.3,
            delay,
          },
        },
      }
    }

    // Otherwise, use the full animation variants
    return {
      hidden: {
        opacity: 0,
        y:
          variant === "fadeInUp" || variant === "slideUp"
            ? 50
            : variant === "fadeInDown" || variant === "slideDown"
              ? -50
              : 0,
        x:
          variant === "fadeInLeft" || variant === "slideLeft"
            ? 50
            : variant === "fadeInRight" || variant === "slideRight"
              ? -50
              : 0,
        scale: variant === "zoomIn" ? 0.9 : 1,
        rotate: variant === "rotateIn" ? -5 : 0,
        clipPath: variant === "clipPath" ? "inset(0% 100% 0% 0%)" : undefined,
      },
      visible: {
        opacity: variant.includes("fade") || variant === "zoomIn" || variant === "rotateIn" ? 1 : undefined,
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        clipPath: variant === "clipPath" ? "inset(0% 0% 0% 0%)" : undefined,
        transition: {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }
  }

  const variants = getVariants()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
