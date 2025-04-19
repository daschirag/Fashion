"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type CSS3DSceneProps = {
  className?: string
  children: React.ReactNode
  depth?: number
  interactive?: boolean
  autoRotate?: boolean
  rotationSpeed?: number
}

export default function CSS3DScene({
  className,
  children,
  depth = 1000,
  interactive = true,
  autoRotate = false,
  rotationSpeed = 0.1,
}: CSS3DSceneProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })

  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate || isHovered || isDragging) return

    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x,
        y: prev.y + rotationSpeed,
      }))
    }, 16)

    return () => clearInterval(interval)
  }, [autoRotate, isHovered, isDragging, rotationSpeed])

  // Mouse move handler for rotation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !isDragging) return

    const deltaX = e.clientX - lastMousePos.x
    const deltaY = e.clientY - lastMousePos.y

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y - deltaX * 0.5,
    }))

    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <div
      className={cn("relative perspective", className)}
      style={{ perspective: `${depth}px` }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => {
        if (interactive) {
          setIsHovered(false)
          setIsDragging(false)
        }
      }}
      onMouseDown={(e) => {
        if (interactive) {
          setIsDragging(true)
          setLastMousePos({ x: e.clientX, y: e.clientY })
        }
      }}
      onMouseUp={() => interactive && setIsDragging(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="preserve-3d w-full h-full"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
      >
        {children}
      </div>

      {/* Instructions */}
      {interactive && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-0 right-0 text-center text-[#00ff41] font-mono text-xs"
        >
          {isDragging ? "ROTATING" : "CLICK AND DRAG TO ROTATE"}
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
