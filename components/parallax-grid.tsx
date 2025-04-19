"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ParallaxGrid() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Create parallax effect for grid
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.4, 0.2])

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 bg-[url('/grid.svg')] pointer-events-none"
      style={{
        y,
        opacity,
        backgroundSize: "50px 50px",
      }}
    />
  )
}
