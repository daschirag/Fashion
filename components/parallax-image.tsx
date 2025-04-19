"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/contexts/performance-context"

type ParallaxImageProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  speed?: number
  priority?: boolean
  width?: number
  height?: number
}

export default function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  speed = 0.3,
  priority = false,
  width = 500,
  height = 300,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { useReducedMotion, useParallaxEffects } = usePerformance()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Determine parallax effect based on reduced motion preference
  const enableParallax = !useReducedMotion && useParallaxEffects

  // Create parallax effect
  const y = useTransform(scrollYProgress, [0, 1], enableParallax ? [0, height * speed * -1] : [0, 0])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="relative w-full h-full" style={{ y }}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={cn("object-cover w-full h-full", imgClassName)}
        />
      </motion.div>
    </div>
  )
}
