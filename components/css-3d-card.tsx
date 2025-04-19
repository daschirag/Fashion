"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type CSS3DCardProps = {
  className?: string
  children: React.ReactNode
  width?: number
  height?: number
  depth?: number
  borderColor?: string
  glowColor?: string
  glowIntensity?: number
  rotationFactor?: number
}

export default function CSS3DCard({
  className,
  children,
  width = 300,
  height = 400,
  depth = 30,
  borderColor = "#00ff41",
  glowColor = "#00ff41",
  glowIntensity = 5,
  rotationFactor = 10,
}: CSS3DCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Mouse move handler for rotation
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateY = ((x - centerX) / centerX) * rotationFactor
    const rotateX = ((y - centerY) / centerY) * -rotationFactor

    setRotation({ x: rotateX, y: rotateY })
  }

  return (
    <div
      className={cn("relative perspective", className)}
      style={{ perspective: "1000px", width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setRotation({ x: 0, y: 0 })
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="preserve-3d relative w-full h-full"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.1s ease-out",
          boxShadow: isHovered ? `0 0 ${glowIntensity}px ${glowColor}` : "none",
          border: `1px solid ${borderColor}`,
        }}
      >
        {/* Front face */}
        <div className="absolute inset-0 bg-black">{children}</div>

        {/* Side faces to create depth */}
        <div
          className="absolute bg-black"
          style={{
            width: "100%",
            height: depth,
            transform: `rotateX(90deg) translateZ(${height / 2}px)`,
            top: -depth / 2,
            borderLeft: `1px solid ${borderColor}`,
            borderRight: `1px solid ${borderColor}`,
          }}
        />
        <div
          className="absolute bg-black"
          style={{
            width: "100%",
            height: depth,
            transform: `rotateX(90deg) translateZ(${-height / 2}px)`,
            bottom: -depth / 2,
            borderLeft: `1px solid ${borderColor}`,
            borderRight: `1px solid ${borderColor}`,
          }}
        />
        <div
          className="absolute bg-black"
          style={{
            width: depth,
            height: "100%",
            transform: `rotateY(90deg) translateZ(${width / 2}px)`,
            right: -depth / 2,
            borderTop: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
          }}
        />
        <div
          className="absolute bg-black"
          style={{
            width: depth,
            height: "100%",
            transform: `rotateY(90deg) translateZ(${-width / 2}px)`,
            left: -depth / 2,
            borderTop: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
          }}
        />
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
