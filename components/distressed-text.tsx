"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

type DistressedTextProps = {
  text: string
  className?: string
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  threshold?: number
  once?: boolean
  delay?: number
  intensity?: "light" | "medium" | "heavy"
  color?: string
  strokeColor?: string
  strokeWidth?: number
  animated?: boolean
}

export default function DistressedText({
  text,
  className,
  tag: Tag = "div",
  threshold = 0.2,
  once = true,
  delay = 0,
  intensity = "medium",
  color = "#ffffff",
  strokeColor = "#000000",
  strokeWidth = 1,
  animated = true,
}: DistressedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })

  // Set intensity values
  const getIntensityValues = () => {
    switch (intensity) {
      case "light":
        return { distortion: 0.5, noise: 0.2, shake: 1 }
      case "heavy":
        return { distortion: 2, noise: 0.6, shake: 3 }
      default:
        return { distortion: 1, noise: 0.4, shake: 2 }
    }
  }

  const { distortion, noise, shake } = getIntensityValues()

  useEffect(() => {
    if (!isInView) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!ref.current) return

      const dpr = window.devicePixelRatio || 1
      const rect = ref.current.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)

      // Set a default font size and family for the context
      ctx.font = `bold ${Tag === "h1" ? "32px" : Tag === "h2" ? "24px" : "16px"} monospace`
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Draw distressed text
    const drawText = () => {
      if (!ctx || !canvas || !ref.current) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get computed styles from the element
      const styles = window.getComputedStyle(ref.current)

      // Set text style
      ctx.font = styles.font || `bold ${styles.fontSize} monospace`
      ctx.textBaseline = "top"

      // Get text metrics
      const metrics = ctx.measureText(text)
      const textHeight = Number.parseInt(styles.fontSize || "16px")

      // Calculate position to center text
      const x = (canvas.width / (window.devicePixelRatio || 1) - metrics.width) / 2
      const y = (canvas.height / (window.devicePixelRatio || 1) - textHeight) / 2

      // Apply distortion
      const letters = text.split("")
      let currentX = x

      letters.forEach((letter) => {
        // Random offset for each letter
        const offsetX = animated ? (Math.random() - 0.5) * distortion : 0
        const offsetY = animated ? (Math.random() - 0.5) * distortion : 0

        // Draw stroke
        if (strokeWidth > 0) {
          ctx.strokeStyle = strokeColor
          ctx.lineWidth = strokeWidth
          ctx.strokeText(letter, currentX + offsetX, y + offsetY)
        }

        // Draw fill
        ctx.fillStyle = color
        ctx.fillText(letter, currentX + offsetX, y + offsetY)

        // Add noise to some letters
        if (Math.random() < noise) {
          const noiseX = currentX + Math.random() * metrics.width * 0.1
          const noiseY = y + Math.random() * textHeight
          ctx.fillStyle = "rgba(255,255,255,0.5)"
          ctx.fillRect(noiseX, noiseY, Math.random() * 3, Math.random() * 3)
        }

        // Move to next letter position
        currentX += ctx.measureText(letter).width
      })
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      drawText()

      if (animated) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    // Start animation after delay
    const animationDelay = setTimeout(() => {
      animate()
    }, delay * 1000)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      clearTimeout(animationDelay)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isInView, text, color, strokeColor, strokeWidth, distortion, noise, animated, delay, Tag])

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Tag className={cn("opacity-0", animated ? "sr-only" : "")}>{text}</Tag>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          transform: animated
            ? `translate(${(Math.random() - 0.5) * shake}px, ${(Math.random() - 0.5) * shake}px)`
            : "none",
        }}
      />
      {/* Fallback text that will show if canvas fails */}
      <Tag
        className={cn(
          "absolute inset-0 flex items-center justify-center text-center",
          "canvas-fallback opacity-0 transition-opacity duration-300",
          color ? "" : "text-[#00ff41]",
        )}
        style={{ color: color || undefined }}
      >
        {text}
      </Tag>

      {/* Add script to handle fallback */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
      document.addEventListener('DOMContentLoaded', function() {
        const canvas = document.querySelector('.${className} canvas');
        const fallback = document.querySelector('.${className} .canvas-fallback');
        if (canvas && fallback) {
          canvas.addEventListener('error', function() {
            fallback.style.opacity = '1';
          });
          // Also show fallback if canvas is empty after a short delay
          setTimeout(function() {
            if (canvas.width === 0 || canvas.height === 0) {
              fallback.style.opacity = '1';
            }
          }, 500);
        }
      });
    `,
        }}
      />
    </motion.div>
  )
}
