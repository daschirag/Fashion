"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useCanvasSupport } from "@/hooks/use-canvas-support"

type StaticNoiseProps = {
  className?: string
  opacity?: number
  speed?: number
  color?: string
}

export default function StaticNoise({ className, opacity = 0.05, speed = 10, color = "#ffffff" }: StaticNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasError, setCanvasError] = useState(false)
  const isCanvasSupported = useCanvasSupport()

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

    // Create static noise
    const createNoise = () => {
      try {
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        const data = imageData.data
        const pixelSize = 2 // Size of static pixels

        // Parse the color to RGB
        const r = Number.parseInt(color.slice(1, 3), 16)
        const g = Number.parseInt(color.slice(3, 5), 16)
        const b = Number.parseInt(color.slice(5, 7), 16)

        for (let y = 0; y < canvas.height; y += pixelSize) {
          for (let x = 0; x < canvas.width; x += pixelSize) {
            const i = (y * canvas.width + x) * 4
            const value = Math.random() > 0.5 ? 255 : 0

            // Fill the pixel block
            for (let py = 0; py < pixelSize && y + py < canvas.height; py++) {
              for (let px = 0; px < pixelSize && x + px < canvas.width; px++) {
                const pixelIndex = ((y + py) * canvas.width + (x + px)) * 4

                data[pixelIndex] = r * (value / 255)
                data[pixelIndex + 1] = g * (value / 255)
                data[pixelIndex + 2] = b * (value / 255)
                data[pixelIndex + 3] = value
              }
            }
          }
        }

        return imageData
      } catch (e) {
        setCanvasError(true)
        return null
      }
    }

    // Animation loop
    let animationFrameId: number

    const render = () => {
      if (canvasError) return

      try {
        const noiseData = createNoise()
        if (noiseData) {
          ctx.putImageData(noiseData, 0, 0)
        }

        animationFrameId = setTimeout(() => {
          requestAnimationFrame(render)
        }, 1000 / speed)
      } catch (e) {
        setCanvasError(true)
      }
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      clearTimeout(animationFrameId)
    }
  }, [color, speed, isCanvasSupported, canvasError])

  // Convert hex color to RGB for CSS
  const hexToRgb = (hex: string) => {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
    return `${r}, ${g}, ${b}`
  }

  return (
    <>
      {!canvasError && isCanvasSupported ? (
        <canvas
          ref={canvasRef}
          className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
          style={{ opacity, mixBlendMode: "screen" }}
        />
      ) : (
        <div
          className={cn("absolute inset-0 w-full h-full pointer-events-none tv-static", className)}
          style={
            {
              opacity,
              mixBlendMode: "screen",
              "--static-color": hexToRgb(color),
              "--static-speed": `${20 / speed}s`,
            } as React.CSSProperties
          }
        />
      )}

      {/* CSS for fallback */}
      <style jsx global>{`
        @keyframes tv-static {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100% 100%;
          }
        }
        
        .tv-static {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
          background-size: 150px 150px;
          animation: tv-static var(--static-speed, 2s) infinite linear;
        }
      `}</style>
    </>
  )
}
