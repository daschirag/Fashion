"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function AnimatedSignature() {
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

    // Signature path data (SVG-like path)
    const pathData = [
      { type: "M", x: 10, y: 50 },
      { type: "C", x1: 30, y1: 30, x2: 50, y2: 70, x: 70, y: 50 },
      { type: "S", x2: 90, y2: 30, x: 110, y: 50 },
      { type: "M", x: 130, y: 30 },
      { type: "L", x: 130, y: 70 },
      { type: "M", x: 150, y: 30 },
      { type: "L", x: 170, y: 70 },
      { type: "M", x: 150, y: 50 },
      { type: "L", x: 170, y: 50 },
    ]

    // Animation variables
    let progress = 0
    let animationFrameId: number
    let lastTimestamp = 0

    // Draw function
    const draw = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const elapsed = timestamp - lastTimestamp

      // Increase progress based on elapsed time
      progress += elapsed * 0.0005
      progress = Math.min(progress, 1)

      // Clear canvas
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Set line style
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)"
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Start drawing
      ctx.beginPath()

      // Calculate how much of the path to draw based on progress
      const currentPath = 0
      let currentProgress = 0

      for (let i = 0; i < pathData.length; i++) {
        const point = pathData[i]

        // Calculate segment length (simplified)
        let segmentLength = 0
        if (i < pathData.length - 1) {
          const nextPoint = pathData[i + 1]
          if (nextPoint.type !== "M") {
            segmentLength = Math.sqrt(
              Math.pow((nextPoint.x || 0) - point.x, 2) + Math.pow((nextPoint.y || 0) - point.y, 2),
            )
          }
        }

        // Normalize segment length
        const totalLength = 300 // Approximate total path length
        const normalizedLength = segmentLength / totalLength

        // Check if we should draw this segment
        if (currentProgress + normalizedLength > progress) {
          // Partially draw this segment
          const segmentProgress = (progress - currentProgress) / normalizedLength

          if (point.type === "M") {
            ctx.moveTo(point.x, point.y)
          } else if (point.type === "L") {
            const prevPoint = pathData[i - 1]
            const x = prevPoint.x + (point.x - prevPoint.x) * segmentProgress
            const y = prevPoint.y + (point.y - prevPoint.y) * segmentProgress
            ctx.lineTo(x, y)
          } else if (
            point.type === "C" &&
            point.x1 !== undefined &&
            point.y1 !== undefined &&
            point.x2 !== undefined &&
            point.y2 !== undefined
          ) {
            // For simplicity, we'll just draw the full curve if we're in this segment
            ctx.bezierCurveTo(point.x1, point.y1, point.x2, point.y2, point.x, point.y)
          } else if (point.type === "S" && point.x2 !== undefined && point.y2 !== undefined) {
            // For simplicity, we'll just draw the full curve if we're in this segment
            const prevPoint = pathData[i - 1]
            const cp1x = 2 * prevPoint.x - (prevPoint.x2 || prevPoint.x1 || prevPoint.x)
            const cp1y = 2 * prevPoint.y - (prevPoint.y2 || prevPoint.y1 || prevPoint.y)
            ctx.bezierCurveTo(cp1x, cp1y, point.x2, point.y2, point.x, point.y)
          }

          break
        } else {
          // Fully draw this segment
          if (point.type === "M") {
            ctx.moveTo(point.x, point.y)
          } else if (point.type === "L") {
            ctx.lineTo(point.x, point.y)
          } else if (
            point.type === "C" &&
            point.x1 !== undefined &&
            point.y1 !== undefined &&
            point.x2 !== undefined &&
            point.y2 !== undefined
          ) {
            ctx.bezierCurveTo(point.x1, point.y1, point.x2, point.y2, point.x, point.y)
          } else if (point.type === "S" && point.x2 !== undefined && point.y2 !== undefined) {
            const prevPoint = pathData[i - 1]
            const cp1x = 2 * prevPoint.x - (prevPoint.x2 || prevPoint.x1 || prevPoint.x)
            const cp1y = 2 * prevPoint.y - (prevPoint.y2 || prevPoint.y1 || prevPoint.y)
            ctx.bezierCurveTo(cp1x, cp1y, point.x2, point.y2, point.x, point.y)
          }

          currentProgress += normalizedLength
        }
      }

      ctx.stroke()

      // Continue animation if not complete
      lastTimestamp = timestamp
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(draw)
      }
    }

    // Start animation
    animationFrameId = requestAnimationFrame(draw)

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5, delay: 1.5 },
      }}
      className="w-40 h-20 md:w-60 md:h-24"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ touchAction: "none" }}
        aria-label="Designer's signature"
      />
    </motion.div>
  )
}
