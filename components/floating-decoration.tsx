"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

type FloatingDecorationProps = {
  size?: number
  x?: number
  y?: number
  opacity?: number
  color?: string
  speed?: number
  delay?: number
}

export default function FloatingDecoration({
  size = 10,
  x = 0,
  y = 0,
  opacity = 0.3,
  color = "white",
  speed = 0.5,
  delay = 0,
}: FloatingDecorationProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Create floating effect
  const yFloat = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45])

  return (
    <motion.div
      ref={ref}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        y: yFloat,
        scale,
        rotate,
        transition: { delay },
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
    />
  )
}
