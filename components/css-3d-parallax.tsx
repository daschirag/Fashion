"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Layer = {
  content: React.ReactNode
  depth: number
  x?: number
  y?: number
  scale?: number
}

type CSS3DParallaxProps = {
  className?: string
  layers: Layer[]
  sensitivity?: number
  perspective?: number
  interactive?: boolean
}

export default function CSS3DParallax({
  className,
  layers,
  sensitivity = 0.05,
  perspective = 1000,
  interactive = true,
}: CSS3DParallaxProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    setPosition({
      x: (mouseX - centerX) * sensitivity,
      y: (mouseY - centerY) * sensitivity,
    })
  }

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    if (interactive) {
      setPosition({ x: 0, y: 0 })
    }
  }

  // Handle device orientation for mobile
  useEffect(() => {
    if (!interactive) return

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return

      const beta = e.beta // -180 to 180 (front/back tilt)
      const gamma = e.gamma // -90 to 90 (left/right tilt)

      setPosition({
        x: (gamma || 0) * sensitivity * 2,
        y: (beta || 0) * sensitivity * 2,
      })
    }

    window.addEventListener("deviceorientation", handleDeviceOrientation)

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation)
    }
  }, [interactive, sensitivity])

  return (
    <div
      ref={containerRef}
      className={cn("relative perspective overflow-hidden", className)}
      style={{ perspective: `${perspective}px` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {layers.map((layer, index) => {
        const { content, depth, x = 0, y = 0, scale = 1 } = layer
        const zIndex = layers.length - index

        return (
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              zIndex,
              transform: `translate(${x + position.x * depth}px, ${y + position.y * depth}px) scale(${scale})`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {content}
          </motion.div>
        )
      })}

      {/* CSS for 3D transforms */}
      <style jsx global>{`
        .perspective {
          perspective-origin: center;
        }
      `}</style>
    </div>
  )
}
