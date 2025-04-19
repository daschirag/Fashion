"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useCanvasSupport } from "@/hooks/use-canvas-support"

type DistressedOverlayProps = {
  className?: string
  opacity?: number
  intensity?: "light" | "medium" | "heavy"
  animated?: boolean
}

export default function DistressedOverlay({
  className,
  opacity = 0.15,
  intensity = "medium",
  animated = true,
}: DistressedOverlayProps) {
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

    // Set intensity values
    const getIntensityValues = () => {
      switch (intensity) {
        case "light":
          return { grainSize: 1, contrast: 0.2 }
        case "heavy":
          return { grainSize: 3, contrast: 0.5 }
        default:
          return { grainSize: 2, contrast: 0.35 }
      }
    }

    const { grainSize, contrast } = getIntensityValues()

    // Create distressed texture
    const createDistressedTexture = () => {
      try {
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          // Create random noise
          const noise = Math.random() * 255

          // Apply contrast
          const value = noise < 128 ? noise * (1 - contrast) : noise * (1 + contrast)

          // Create scratches and distress marks
          const isDistressMark = Math.random() > 0.995
          const distressValue = isDistressMark ? 255 : value

          data[i] = distressValue
          data[i + 1] = distressValue
          data[i + 2] = distressValue
          data[i + 3] = 255
        }

        return imageData
      } catch (e) {
        setCanvasError(true)
        return null
      }
    }

    let textureImageData = createDistressedTexture()
    let animationFrameId: number

    // Animation loop
    const render = () => {
      if (canvasError) return

      try {
        if (animated) {
          textureImageData = createDistressedTexture()
        }

        if (textureImageData) {
          ctx.putImageData(textureImageData, 0, 0)
        }

        if (animated) {
          animationFrameId = setTimeout(() => {
            requestAnimationFrame(render)
          }, 1000 / 15)
        }
      } catch (e) {
        setCanvasError(true)
      }
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      clearTimeout(animationFrameId)
    }
  }, [intensity, animated, isCanvasSupported, canvasError])

  // Get CSS fallback intensity
  const getCSSIntensity = () => {
    switch (intensity) {
      case "light":
        return "var(--distressed-light)"
      case "heavy":
        return "var(--distressed-heavy)"
      default:
        return "var(--distressed-medium)"
    }
  }

  return (
    <>
      {!canvasError && isCanvasSupported ? (
        <canvas
          ref={canvasRef}
          className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
          style={{ opacity, mixBlendMode: "overlay" }}
        />
      ) : (
        <div
          className={cn("absolute inset-0 w-full h-full pointer-events-none bg-noise", className)}
          style={{
            opacity,
            mixBlendMode: "overlay",
            backgroundImage: getCSSIntensity(),
            backgroundSize: "200px 200px",
          }}
        />
      )}

      {/* CSS for fallback */}
      <style jsx global>{`
        @keyframes noise-animation {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        
        .bg-noise {
          animation: noise-animation 1s infinite alternate;
        }
        
        :root {
          --distressed-light: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
          --distressed-medium: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.7'/%3E%3C/svg%3E");
          --distressed-heavy: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.9'/%3E%3C/svg%3E");
        }
      `}</style>
    </>
  )
}
