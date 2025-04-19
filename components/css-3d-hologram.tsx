"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type CSS3DHologramProps = {
  className?: string
  children: React.ReactNode
  size?: number
  glowColor?: string
  glowIntensity?: number
  animated?: boolean
  scanlineSpeed?: number
}

export default function CSS3DHologram({
  className,
  children,
  size = 300,
  glowColor = "#00ffff",
  glowIntensity = 10,
  animated = true,
  scanlineSpeed = 2,
}: CSS3DHologramProps) {
  const [rotation, setRotation] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Animation effect
  useEffect(() => {
    if (!animated) return

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [animated])

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base platform with glow */}
      <div
        className="absolute bottom-0 left-0 right-0 mx-auto rounded-full"
        style={{
          width: size * 0.8,
          height: size * 0.05,
          background: `radial-gradient(ellipse at center, ${glowColor} 0%, rgba(0,0,0,0) 70%)`,
          opacity: 0.7,
          filter: `blur(${glowIntensity / 2}px)`,
          transform: "translateX(-50%)",
          left: "50%",
        }}
      />

      {/* Hologram container */}
      <div className="absolute inset-0 flex items-center justify-center perspective" style={{ perspective: "1000px" }}>
        {/* Rotating hologram content */}
        <motion.div
          className="preserve-3d relative"
          style={{
            width: size * 0.7,
            height: size * 0.7,
            transform: `rotateY(${rotation}deg)`,
            filter: `drop-shadow(0 0 ${glowIntensity}px ${glowColor})`,
          }}
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>

        {/* Vertical light beam */}
        <div
          className="absolute inset-x-0 mx-auto"
          style={{
            width: size * 0.05,
            height: size,
            background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${glowColor} 50%, rgba(0,0,0,0) 100%)`,
            opacity: 0.2,
            filter: `blur(${glowIntensity / 2}px)`,
          }}
        />

        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none hologram-scanlines"
          style={{
            background: `repeating-linear-gradient(
              to bottom,
              transparent,
              transparent 2px,
              ${glowColor} 3px,
              transparent 4px
            )`,
            opacity: 0.1,
            backgroundSize: `100% ${scanlineSpeed * 10}px`,
            animation: `scanline-scroll ${scanlineSpeed}s linear infinite`,
          }}
        />

        {/* Flickering effect */}
        <div
          className="absolute inset-0 pointer-events-none hologram-flicker"
          style={{
            background: glowColor,
            opacity: 0,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* CSS for 3D transforms and animations */}
      <style jsx global>{`
        .perspective {
          perspective-origin: center;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        @keyframes scanline-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        
        .hologram-flicker {
          animation: hologram-flicker 6s infinite;
        }
        
        @keyframes hologram-flicker {
          0% { opacity: 0; }
          5% { opacity: 0.1; }
          6% { opacity: 0; }
          10% { opacity: 0; }
          11% { opacity: 0.1; }
          12% { opacity: 0; }
          20% { opacity: 0; }
          21% { opacity: 0.1; }
          22% { opacity: 0; }
          30% { opacity: 0; }
          31% { opacity: 0.1; }
          32% { opacity: 0; }
          70% { opacity: 0; }
          71% { opacity: 0.1; }
          72% { opacity: 0; }
          90% { opacity: 0; }
          91% { opacity: 0.1; }
          92% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
