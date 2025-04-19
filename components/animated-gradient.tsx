"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

type AnimatedGradientProps = {
  className?: string
  colors?: string[]
  speed?: number
  blur?: number
  opacity?: number
  children?: React.ReactNode
}

export default function AnimatedGradient({
  className,
  colors = ["#FF3366", "#FF00FF", "#9900FF", "#00FFFF", "#00FF99"],
  speed = 10,
  blur = 100,
  opacity = 0.5,
  children,
}: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient blobs
    const blobs = colors.map((color, index) => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      radius: 100 + Math.random() * 200,
      color,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      id: index,
    }))

    // Animation loop
    let animationFrameId: number
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw blobs
      blobs.forEach((blob) => {
        // Move blob
        blob.x += blob.vx
        blob.y += blob.vy

        // Bounce off edges
        if (blob.x < 0 || blob.x > canvas.offsetWidth) blob.vx *= -1
        if (blob.y < 0 || blob.y > canvas.offsetHeight) blob.vy *= -1

        // Draw gradient
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius)
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, "transparent")

        ctx.globalAlpha = opacity
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [colors, speed, opacity])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ filter: `blur(${blur}px)` }} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
