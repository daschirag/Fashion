"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/contexts/performance-context"
import { Maximize2, ZoomIn } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

interface ZoomableImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: string
  zoomFactor?: number
  enableLightbox?: boolean
}

export default function ZoomableImage({
  src,
  alt,
  className,
  aspectRatio = "aspect-[3/4]",
  zoomFactor = 2.5,
  enableLightbox = true,
}: ZoomableImageProps) {
  const [isZooming, setIsZooming] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { useReducedMotion } = usePerformance()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Disable zoom effect if reduced motion is preferred
  const enableZoom = !useReducedMotion && !isMobile

  // Handle mouse movement for zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !enableZoom) return

    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setPosition({ x, y })
  }

  // Handle mouse enter/leave for zoom effect
  const handleMouseEnter = () => {
    if (enableZoom) {
      setIsZooming(true)
    }
  }

  const handleMouseLeave = () => {
    setIsZooming(false)
  }

  // Handle click for lightbox
  const handleImageClick = () => {
    if (enableLightbox) {
      setIsLightboxOpen(true)
    }
  }

  // Close lightbox when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isLightboxOpen])

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden bg-black/50 border border-[#00ff41]/20 group cursor-zoom-in",
          aspectRatio,
          className,
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleImageClick}
      >
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-transform duration-200",
            isZooming && enableZoom ? "scale-[2.5]" : "scale-100",
          )}
          style={
            isZooming && enableZoom
              ? {
                  transformOrigin: `${position.x}% ${position.y}%`,
                }
              : {}
          }
        />

        {/* Zoom indicator for mobile */}
        {isMobile && (
          <div className="absolute bottom-3 right-3 bg-black/70 p-2 rounded-full text-[#00ff41]">
            <ZoomIn size={18} />
          </div>
        )}

        {/* Fullscreen indicator */}
        {enableLightbox && (
          <div className="absolute top-3 right-3 bg-black/70 p-2 rounded-full text-[#00ff41] opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 size={18} />
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <img
              src={src || "/placeholder.svg"}
              alt={alt}
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 bg-black/70 text-[#00ff41] p-2 border border-[#00ff41]/30 hover:border-[#00ff41] font-mono text-xs"
              onClick={() => setIsLightboxOpen(false)}
            >
              CLOSE [ESC]
            </button>
          </div>

          {/* Cyberpunk scanline effect */}
          <div className="scanline absolute inset-0 pointer-events-none"></div>

          {/* Static noise overlay */}
          <div className="vhs-static absolute inset-0 pointer-events-none opacity-10"></div>
        </div>
      )}
    </>
  )
}
