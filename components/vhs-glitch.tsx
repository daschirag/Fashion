"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useCanvasSupport } from "@/hooks/use-canvas-support"

type VHSGlitchProps = {
  className?: string
  children: React.ReactNode
  intensity?: "light" | "medium" | "heavy"
  active?: boolean
  interval?: number
}

export default function VHSGlitch({
  className,
  children,
  intensity = "medium",
  active = true,
  interval = 5000,
}: VHSGlitchProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasError, setCanvasError] = useState(false)
  const isCanvasSupported = useCanvasSupport()

  // Set intensity values
  const getIntensityValues = () => {
    switch (intensity) {
      case "light":
        return { duration: 300, probability: 0.3, maxOffset: 5 }
      case "heavy":
        return { duration: 800, probability: 0.7, maxOffset: 15 }
      default:
        return { duration: 500, probability: 0.5, maxOffset: 10 }
    }
  }

  const { duration, probability, maxOffset } = getIntensityValues()

  useEffect(() => {
    if (!active) return

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() < probability) {
        setIsGlitching(true)

        setTimeout(() => {
          setIsGlitching(false)
        }, duration)
      }
    }, interval)

    return () => clearInterval(glitchInterval)
  }, [active, duration, interval, probability])

  // Get CSS intensity class
  const getCSSIntensityClass = () => {
    switch (intensity) {
      case "light":
        return "css-glitch-light"
      case "heavy":
        return "css-glitch-heavy"
      default:
        return "css-glitch-medium"
    }
  }

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {/* Main content */}
      <div className={cn("relative z-10", isGlitching ? "opacity-90" : "opacity-100")}>{children}</div>

      {/* Glitch effects */}
      {isGlitching && !canvasError && isCanvasSupported && (
        <>
          {/* RGB split effect */}
          <motion.div
            className="absolute inset-0 z-20 opacity-70"
            style={{
              left: `-${Math.random() * maxOffset}px`,
              top: `${Math.random() * maxOffset - maxOffset / 2}px`,
              backgroundColor: "transparent",
              mixBlendMode: "screen",
              filter: "blur(1px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>

          <motion.div
            className="absolute inset-0 z-20 opacity-70"
            style={{
              left: `${Math.random() * maxOffset}px`,
              top: `${Math.random() * maxOffset - maxOffset / 2}px`,
              backgroundColor: "transparent",
              mixBlendMode: "screen",
              filter: "blur(1px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>

          {/* Scan lines */}
          <div
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)",
              backgroundSize: "100% 4px",
              mixBlendMode: "overlay",
            }}
          />

          {/* Random noise blocks */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute z-30 bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100}px`,
                height: `${Math.random() * 10}px`,
                opacity: Math.random() * 0.3,
                mixBlendMode: "overlay",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.random() * 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: Math.random() * 0.2 }}
            />
          ))}
        </>
      )}

      {/* CSS fallback for glitch effect */}
      {isGlitching && (canvasError || !isCanvasSupported) && (
        <div className={cn("absolute inset-0 z-20 pointer-events-none", getCSSIntensityClass())}>
          {/* CSS-based glitch effects */}
          <div className="absolute inset-0 css-glitch-rgb-split-1" style={{ opacity: 0.5 }}>
            {children}
          </div>
          <div className="absolute inset-0 css-glitch-rgb-split-2" style={{ opacity: 0.5 }}>
            {children}
          </div>

          {/* Scan lines */}
          <div className="absolute inset-0 css-scan-lines"></div>

          {/* Noise blocks */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white css-noise-block"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100}px`,
                height: `${Math.random() * 10}px`,
                opacity: Math.random() * 0.3,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* CSS for fallback */}
      <style jsx global>{`
        .css-glitch-rgb-split-1 {
          transform: translateX(-3px);
          filter: blur(1px);
          mix-blend-mode: screen;
          color: #ff00ff;
        }
        
        .css-glitch-rgb-split-2 {
          transform: translateX(3px);
          filter: blur(1px);
          mix-blend-mode: screen;
          color: #00ffff;
        }
        
        .css-scan-lines {
          background-image: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%);
          background-size: 100% 4px;
          mix-blend-mode: overlay;
        }
        
        .css-noise-block {
          mix-blend-mode: overlay;
          animation: noise-block-fade 0.2s forwards;
        }
        
        @keyframes noise-block-fade {
          0% { opacity: 0; }
          50% { opacity: 0.3; }
          100% { opacity: 0; }
        }
        
        .css-glitch-light .css-glitch-rgb-split-1,
        .css-glitch-light .css-glitch-rgb-split-2 {
          transform: translateX(-2px);
        }
        
        .css-glitch-heavy .css-glitch-rgb-split-1,
        .css-glitch-heavy .css-glitch-rgb-split-2 {
          transform: translateX(-5px);
        }
      `}</style>
    </div>
  )
}
