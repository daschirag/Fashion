"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useCanvasSupport } from "@/hooks/use-canvas-support"

export default function Logo() {
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

    // Draw logo
    const drawLogo = () => {
      try {
        const centerX = canvas.width / 2 / (window.devicePixelRatio || 1)
        const centerY = canvas.height / 2 / (window.devicePixelRatio || 1)
        const radius = Math.min(centerX, centerY) * 0.8

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw glitchy circle
        ctx.beginPath()
        for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
          const randomOffset = Math.random() * 5
          const x = centerX + Math.cos(angle) * (radius + randomOffset)
          const y = centerY + Math.sin(angle) * (radius + randomOffset)

          if (angle === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()

        // Create gradient
        const gradient = ctx.createLinearGradient(
          centerX - radius,
          centerY - radius,
          centerX + radius,
          centerY + radius,
        )
        gradient.addColorStop(0, "#000000")
        gradient.addColorStop(0.5, "#111111")
        gradient.addColorStop(1, "#000000")

        ctx.fillStyle = gradient
        ctx.fill()

        // Draw border
        ctx.strokeStyle = "#00ff41"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw text
        ctx.font = "bold 48px monospace"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = "#00ff41"

        // Add glitchy effect to text
        const glitchOffset = Math.random() > 0.7 ? Math.random() * 4 - 2 : 0
        ctx.fillText("FD", centerX + glitchOffset, centerY)

        // Draw glitch lines
        if (Math.random() > 0.7) {
          ctx.strokeStyle = "#00ff41"
          ctx.lineWidth = 1

          for (let i = 0; i < 3; i++) {
            const y = centerY - radius + Math.random() * radius * 2
            ctx.beginPath()
            ctx.moveTo(centerX - radius, y)
            ctx.lineTo(centerX + radius, y)
            ctx.stroke()
          }
        }

        // Draw digital noise
        ctx.fillStyle = "#00ff41"
        for (let i = 0; i < 100; i++) {
          const x = (Math.random() * canvas.width) / (window.devicePixelRatio || 1)
          const y = (Math.random() * canvas.height) / (window.devicePixelRatio || 1)
          const size = Math.random() * 2

          if (Math.random() > 0.5) {
            ctx.fillRect(x, y, size, size)
          }
        }
      } catch (e) {
        setCanvasError(true)
      }
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      if (canvasError) return

      drawLogo()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isCanvasSupported, canvasError])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!canvasError && isCanvasSupported ? (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-4/5 h-4/5 rounded-full border-2 border-[#00ff41] bg-black css-glitch-container">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[#00ff41] font-mono font-bold text-4xl css-glitch-text">FD</div>
            </div>

            {/* Glitch effects */}
            <div className="absolute inset-0 rounded-full border-2 border-[#00ff41] css-glitch-border"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[#ff00ff] font-mono font-bold text-4xl css-glitch-shadow-1">FD</div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[#00ffff] font-mono font-bold text-4xl css-glitch-shadow-2">FD</div>
            </div>

            {/* Noise overlay */}
            <div className="absolute inset-0 rounded-full css-noise opacity-10"></div>

            {/* Scan lines */}
            <div className="absolute inset-0 rounded-full css-scanlines opacity-20"></div>
          </div>
        </div>
      )}

      {/* CSS for fallback */}
      <style jsx global>{`
        @keyframes glitch-text {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        @keyframes glitch-border {
          0% {
            clip-path: inset(0 0 98% 0);
          }
          10% {
            clip-path: inset(0 0 0 0);
          }
          20% {
            clip-path: inset(0 98% 0 0);
          }
          30% {
            clip-path: inset(0 0 0 0);
          }
          40% {
            clip-path: inset(98% 0 0 0);
          }
          50% {
            clip-path: inset(0 0 0 0);
          }
          60% {
            clip-path: inset(0 0 0 98%);
          }
          70% {
            clip-path: inset(0 0 0 0);
          }
          80% {
            clip-path: inset(40% 30% 20% 10%);
          }
          90%, 100% {
            clip-path: inset(0 0 0 0);
          }
        }
        
        @keyframes noise-animation {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        
        .css-glitch-text {
          animation: glitch-text 0.3s infinite steps(2);
          animation-play-state: paused;
        }
        
        .css-glitch-container:hover .css-glitch-text {
          animation-play-state: running;
        }
        
        .css-glitch-shadow-1 {
          opacity: 0;
          transform: translate(-2px, 0);
        }
        
        .css-glitch-shadow-2 {
          opacity: 0;
          transform: translate(2px, 0);
        }
        
        .css-glitch-container:hover .css-glitch-shadow-1,
        .css-glitch-container:hover .css-glitch-shadow-2 {
          opacity: 0.3;
        }
        
        .css-glitch-border {
          animation: glitch-border 3s infinite;
          animation-play-state: paused;
        }
        
        .css-glitch-container:hover .css-glitch-border {
          animation-play-state: running;
        }
        
        .css-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
          background-size: 150px 150px;
          animation: noise-animation 1s infinite linear;
        }
        
        .css-scanlines {
          background-image: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%);
          background-size: 100% 4px;
          animation: scanlines 10s linear infinite;
        }
      `}</style>
    </div>
  )
}
