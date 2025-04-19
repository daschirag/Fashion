"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/contexts/performance-context"

type RevealImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  imgClassName?: string
  threshold?: number
  once?: boolean
  delay?: number
  effect?: "fade" | "slide" | "zoom" | "clip" | "blur"
}

export default function RevealImage({
  src,
  alt,
  width = 500,
  height = 300,
  className,
  imgClassName,
  threshold = 0.2,
  once = true,
  delay = 0,
  effect = "clip",
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })
  const { useReducedMotion } = usePerformance()

  // Animation variants based on effect
  const getVariants = () => {
    if (useReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.3, ease: "easeOut", delay },
        },
      }
    }

    switch (effect) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
          },
        }
      case "slide":
        return {
          hidden: { y: 50, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
          },
        }
      case "zoom":
        return {
          hidden: { scale: 1.2, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
          },
        }
      case "clip":
        return {
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          visible: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
          },
        }
      case "blur":
        return {
          hidden: { filter: "blur(10px)", opacity: 0 },
          visible: {
            filter: "blur(0px)",
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
          },
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
          },
        }
    }
  }

  return (
    <div ref={ref} className={cn(useReducedMotion ? "" : "overflow-hidden", className)}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={getVariants()}
        className="w-full h-full"
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={cn("object-cover w-full h-full", imgClassName)}
        />
      </motion.div>
    </div>
  )
}
