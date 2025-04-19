"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useCanvasSupport } from "@/hooks/use-canvas-support"

type DarkBackgroundProps = {
  className?: string
  children?: React.ReactNode
  intensity?: "light" | "medium" | "heavy"
  animated?: boolean
}

export default function DarkBackground({
  className,
  children,
  intensity = "medium",
  animated = true,
}: DarkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasError, setCanvasError] = useState(false)
  const isCanvasSupported = useCanvasSupport()

  // Set intensity values
  const getIntensityValues = () => {
    switch (intensity) {
      case "light":
        return { particleCount: 50, particleSize: 1, speed: 0.2 }
      case "heavy":
        return { particleCount: 200, particleSize: 2, speed: 0.5 }
      default:
        return { particleCount: 100, particleSize: 1.5, speed: 0.3 }
    }
  }

  const { particleCount, particleSize, speed } = getIntensityValues()

  useEffect(() => {
    if (!isCanvasSupported) {
      setCanvasError(true)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      setCanvasError(true)
      return
    }

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      try {
        const dpr = window.devicePixelRatio || 1
        canvas.width = canvas.offsetWidth * dpr
        canvas.height = canvas.offsetHeight * dpr
        ctx.scale(dpr, dpr)
      } catch (e) {
        setCanvasError(true)
      }
    }

    try {
      setCanvasDimensions()
      window.addEventListener("resize", setCanvasDimensions)
    } catch (e) {
      setCanvasError(true)
      return
    }

    // Create particles
    const particles: { x: number; y: number; size: number; vx: number; vy: number; color: string }[] = []

    try {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          size: Math.random() * particleSize + 0.5,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          color: `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(
            Math.random() * 100,
          )}, ${Math.random() * 0.3 + 0.1})`,
        })
      }
    } catch (e) {
      setCanvasError(true)
      return
    }

    // Animation loop
    let animationFrameId: number

    const render = () => {
      if (canvasError) return

      try {
        // Clear canvas with semi-transparent black
        ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

        // Draw and update particles
        particles.forEach((particle) => {
          if (animated) {
            // Update position
            particle.x += particle.vx
            particle.y += particle.vy

            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1
            if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1
          }

          // Draw particle
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        })

        animationFrameId = requestAnimationFrame(render)
      } catch (e) {
        setCanvasError(true)
      }
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [animated, particleCount, particleSize, speed, isCanvasSupported, canvasError])

  // Get CSS intensity class
  const getCSSIntensityClass = () => {
    switch (intensity) {
      case "light":
        return "bg-particles-light"
      case "heavy":
        return "bg-particles-heavy"
      default:
        return "bg-particles-medium"
    }
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!canvasError && isCanvasSupported ? (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bg-black" />
      ) : (
        <div
          className={cn("absolute inset-0 w-full h-full bg-black", getCSSIntensityClass(), {
            "animate-particles": animated,
          })}
        />
      )}
      <div className="relative z-10">{children}</div>

      {/* CSS for fallback */}
      <style jsx global>{`
        @keyframes particles-animation {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }
        
        .bg-particles-light {
          background-image: radial-gradient(circle, rgba(50, 50, 50, 0.1) 1px, transparent 1px),
                            radial-gradient(circle, rgba(50, 50, 50, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          background-position: 0 0, 25px 25px;
        }
        
        .bg-particles-medium {
          background-image: radial-gradient(circle, rgba(50, 50, 50, 0.15) 1px, transparent 1px),
                            radial-gradient(circle, rgba(50, 50, 50, 0.1) 1px, transparent 1px),
                            radial-gradient(circle, rgba(50, 50, 50, 0.05) 1px, transparent 1px);
          background-size: 60px 60px, 40px 40px, 20px 20px;
          background-position: 0 0, 30px 30px, 10px 10px;
        }
        
        .bg-particles-heavy {
          background-image: radial-gradient(circle, rgba(50, 50, 50, 0.2) 1px, transparent 1px),
                            radial-gradient(circle, rgba(50, 50, 50, 0.15) 1px, transparent 1px),
                            radial-gradient(circle, rgba(50, 50, 50, 0.1) 1px, transparent 1px),
                            radial-gradient(circle, rgba(50, 50, 50, 0.05) 1px, transparent 1px);
          background-size: 70px 70px, 50px 50px, 30px 30px, 15px 15px;
          background-position: 0 0, 35px 35px, 15px 15px, 5px 5px;
        }
        
        .animate-particles {
          animation: particles-animation 60s infinite linear;
        }
      `}</style>
    </div>
  )
}
