"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type CSS3DTextProps = {
  text: string
  className?: string
  depth?: number
  color?: string
  glowColor?: string
  glowIntensity?: number
  animated?: boolean
  interactive?: boolean
  fontSize?: number
}

export default function CSS3DText({
  text,
  className,
  depth = 10,
  color = "#00ff41",
  glowColor = "#00ff41",
  glowIntensity = 5,
  animated = true,
  interactive = true,
  fontSize = 48,
}: CSS3DTextProps) {
  const [rotation, setRotation] = useState({ x: 10, y: -20, z: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Animation effect
  useEffect(() => {
    if (!animated || isHovered) return

    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: Math.sin(Date.now() / 2000) * 10,
        y: Math.cos(Date.now() / 3000) * 20,
        z: 0,
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [animated, isHovered])

  // Mouse move handler for interactive rotation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setMousePosition({ x, y })
    setRotation({
      x: ((y - centerY) / centerY) * 20,
      y: ((x - centerX) / centerX) * 20,
      z: 0,
    })
  }

  // Create text layers for 3D effect
  const createTextLayers = () => {
    const layers = []
    const layerCount = depth

    for (let i = 0; i < layerCount; i++) {
      const zIndex = i
      const zPosition = -i
      const opacity = 1 - i / layerCount
      const layerColor =
        i === 0
          ? color
          : `${color}${Math.round(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`

      layers.push(
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateZ(${zPosition}px)`,
            zIndex,
            color: layerColor,
          }}
        >
          {text}
        </div>,
      )
    }

    return layers
  }

  return (
    <div
      className={cn("relative perspective", className)}
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="preserve-3d relative inline-block"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
          transition: isHovered ? "none" : "transform 0.5s ease-out",
          fontSize: `${fontSize}px`,
          fontFamily: "monospace",
          fontWeight: "bold",
          textShadow: `0 0 ${glowIntensity}px ${glowColor}`,
        }}
      >
        {createTextLayers()}
      </motion.div>

      {/* CSS for 3D transforms */}
      <style jsx global>{`
        .perspective {
          perspective-origin: center;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  )
}
