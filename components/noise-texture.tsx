"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type NoiseTextureProps = {
  className?: string
  opacity?: number
  blendMode?: string
  animated?: boolean
  speed?: number
}

export default function NoiseTexture({
  className,
  opacity = 0.05,
  blendMode = "multiply",
  animated = true,
  speed = 5,
}: NoiseTextureProps) {
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

    // Create noise
    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = 255
      }

      return imageData
    }

    let noiseImageData = createNoise()
    let animationFrameId: number

    // Animation loop
    const render = () => {
      if (animated) {
        noiseImageData = createNoise()
      }

      ctx.putImageData(noiseImageData, 0, 0)

      if (animated) {
        animationFrameId = setTimeout(() => {
          requestAnimationFrame(render)
        }, 1000 / speed)
      }
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      clearTimeout(animationFrameId)
    }
  }, [animated, speed])

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      style={{ opacity, mixBlendMode: blendMode as any }}
    />
  )
}
