"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

type TiltCardProps = {
  children: ReactNode
  className?: string
  contentClassName?: string
  perspective?: number
  scale?: number
  speed?: number
  max?: number
  glareOpacity?: number
  border?: boolean
  borderColor?: string
  borderWidth?: number
  borderGradient?: boolean
  disabled?: boolean
}

export default function TiltCard({
  children,
  className,
  contentClassName,
  perspective = 1000,
  scale = 1.05,
  speed = 500,
  max = 15,
  glareOpacity = 0.2,
  border = false,
  borderColor = "rgba(255, 255, 255, 0.2)",
  borderWidth = 1,
  borderGradient = false,
  disabled = false,
}: TiltCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion values for tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-max, max], [max, -max])
  const rotateY = useTransform(x, [-max, max], [-max, max])

  // Add spring physics
  const springConfig = { damping: 20, stiffness: 100 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)
  const scaleSpring = useSpring(1, springConfig)

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation based on mouse position
    const rotateXValue = (mouseY / (rect.height / 2)) * max
    const rotateYValue = (mouseX / (rect.width / 2)) * max

    x.set(rotateYValue)
    y.set(rotateXValue)
  }

  // Handle mouse enter
  const handleMouseEnter = () => {
    if (disabled) return
    setIsHovered(true)
    scaleSpring.set(scale)
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (disabled) return
    setIsHovered(false)
    x.set(0)
    y.set(0)
    scaleSpring.set(1)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      style={{
        perspective: perspective,
        transformStyle: "preserve-3d",
        scale: scaleSpring,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={cn("relative z-10 w-full h-full", contentClassName)}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        transition={{ duration: speed / 1000 }}
      >
        {/* Border */}
        {border && (
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{
              border: borderGradient ? "none" : `${borderWidth}px solid ${borderColor}`,
              background: borderGradient
                ? "linear-gradient(45deg, #FF3366, #FF00FF, #9900FF, #00FFFF, #00FF99)"
                : "none",
              opacity: isHovered ? 1 : 0.5,
              backgroundSize: "400% 400%",
              animation: borderGradient ? "gradient-animation 3s ease infinite" : "none",
            }}
          />
        )}

        {/* Glare effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              background: "linear-gradient(125deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)",
              opacity: glareOpacity,
              transform: "translateZ(1px)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 h-full">{children}</div>
      </motion.div>

      <style jsx global>{`
        @keyframes gradient-animation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.div>
  )
}
