"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/contexts/performance-context"

type CSS3DCubeProps = {
  className?: string
  size?: number
  autoRotate?: boolean
  faces?: React.ReactNode[]
  glowColor?: string
  glowIntensity?: number
}

export default function CSS3DCube({
  className,
  size = 200,
  autoRotate = true,
  faces,
  glowColor = "#00ff41",
  glowIntensity = 5,
}: CSS3DCubeProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const { useReducedMotion } = usePerformance()

  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate || isHovered || isDragging || useReducedMotion) return

    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x + 0.2,
        y: prev.y + 0.3,
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [autoRotate, isHovered, isDragging, useReducedMotion])

  // Mouse move handler for rotation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || useReducedMotion) return

    const deltaX = e.clientX - lastMousePos.x
    const deltaY = e.clientY - lastMousePos.y

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y - deltaX * 0.5,
    }))

    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  // Default faces if none provided
  const defaultFaces = [
    <div key="front" className="bg-black border border-[#00ff41] flex items-center justify-center">
      <span className="text-[#00ff41] font-mono text-xl">FRONT</span>
    </div>,
    <div key="back" className="bg-black border border-[#00ff41] flex items-center justify-center">
      <span className="text-[#00ff41] font-mono text-xl">BACK</span>
    </div>,
    <div key="right" className="bg-black border border-[#00ff41] flex items-center justify-center">
      <span className="text-[#00ff41] font-mono text-xl">RIGHT</span>
    </div>,
    <div key="left" className="bg-black border border-[#00ff41] flex items-center justify-center">
      <span className="text-[#00ff41] font-mono text-xl">LEFT</span>
    </div>,
    <div key="top" className="bg-black border border-[#00ff41] flex items-center justify-center">
      <span className="text-[#00ff41] font-mono text-xl">TOP</span>
    </div>,
    <div key="bottom" className="bg-black border border-[#00ff41] flex items-center justify-center">
      <span className="text-[#00ff41] font-mono text-xl">BOTTOM</span>
    </div>,
  ]

  const cubeFaces = faces || defaultFaces

  // If reduced motion is preferred, show only the front face
  if (useReducedMotion) {
    return (
      <div className={cn("relative", className)} style={{ width: size, height: size }}>
        <div className="w-full h-full border border-[#00ff41] bg-black flex items-center justify-center">
          <span className="text-[#00ff41] font-mono text-xl">3D CUBE</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("relative perspective", className)}
      style={{ perspective: `${size * 3}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsDragging(false)
      }}
      onMouseDown={(e) => {
        setIsDragging(true)
        setLastMousePos({ x: e.clientX, y: e.clientY })
      }}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="relative preserve-3d"
        style={{
          width: size,
          height: size,
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? "none" : "transform 0.2s ease-out",
        }}
      >
        {/* Front face */}
        <div
          className="absolute preserve-3d"
          style={{
            width: size,
            height: size,
            transform: `translateZ(${size / 2}px)`,
            filter: `drop-shadow(0 0 ${glowIntensity}px ${glowColor})`,
          }}
        >
          {cubeFaces[0]}
        </div>

        {/* Back face */}
        <div
          className="absolute preserve-3d"
          style={{
            width: size,
            height: size,
            transform: `rotateY(180deg) translateZ(${size / 2}px)`,
            filter: `drop-shadow(0 0 ${glowIntensity}px ${glowColor})`,
          }}
        >
          {cubeFaces[1]}
        </div>

        {/* Right face */}
        <div
          className="absolute preserve-3d"
          style={{
            width: size,
            height: size,
            transform: `rotateY(90deg) translateZ(${size / 2}px)`,
            filter: `drop-shadow(0 0 ${glowIntensity}px ${glowColor})`,
          }}
        >
          {cubeFaces[2]}
        </div>

        {/* Left face */}
        <div
          className="absolute preserve-3d"
          style={{
            width: size,
            height: size,
            transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
            filter: `drop-shadow(0 0 ${glowIntensity}px ${glowColor})`,
          }}
        >
          {cubeFaces[3]}
        </div>

        {/* Top face */}
        <div
          className="absolute preserve-3d"
          style={{
            width: size,
            height: size,
            transform: `rotateX(90deg) translateZ(${size / 2}px)`,
            filter: `drop-shadow(0 0 ${glowIntensity}px ${glowColor})`,
          }}
        >
          {cubeFaces[4]}
        </div>

        {/* Bottom face */}
        <div
          className="absolute preserve-3d"
          style={{
            width: size,
            height: size,
            transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
            filter: `drop-shadow(0 0 ${glowIntensity}px ${glowColor})`,
          }}
        >
          {cubeFaces[5]}
        </div>
      </div>

      {/* Instructions */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-0 left-0 right-0 text-center text-[#00ff41] font-mono text-xs"
        >
          DRAG TO ROTATE
        </motion.div>
      )}

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
