"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

type CSS3DCarouselProps = {
  className?: string
  items: React.ReactNode[]
  radius?: number
  autoRotate?: boolean
  rotationSpeed?: number
  itemWidth?: number
  itemHeight?: number
}

export default function CSS3DCarousel({
  className,
  items,
  radius = 300,
  autoRotate = true,
  rotationSpeed = 5000,
  itemWidth = 200,
  itemHeight = 300,
}: CSS3DCarouselProps) {
  const [rotation, setRotation] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const itemCount = items.length
  const theta = 360 / itemCount

  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate || isPaused) return

    const interval = setInterval(() => {
      setRotation((prev) => {
        const newRotation = prev - theta
        const newIndex = (activeIndex + 1) % itemCount
        setActiveIndex(newIndex)
        return newRotation
      })
    }, rotationSpeed)

    return () => clearInterval(interval)
  }, [autoRotate, isPaused, theta, activeIndex, itemCount, rotationSpeed])

  // Navigate to previous item
  const prevItem = () => {
    setRotation((prev) => {
      const newRotation = prev + theta
      const newIndex = (activeIndex - 1 + itemCount) % itemCount
      setActiveIndex(newIndex)
      return newRotation
    })
  }

  // Navigate to next item
  const nextItem = () => {
    setRotation((prev) => {
      const newRotation = prev - theta
      const newIndex = (activeIndex + 1) % itemCount
      setActiveIndex(newIndex)
      return newRotation
    })
  }

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative perspective mx-auto"
        style={{
          perspective: "1000px",
          width: itemWidth,
          height: itemHeight,
        }}
      >
        <div
          className="preserve-3d"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
            transition: "transform 1s ease-out",
          }}
        >
          {items.map((item, index) => {
            const itemRotation = theta * index
            const isActive = index === activeIndex

            return (
              <div
                key={index}
                className="absolute preserve-3d"
                style={{
                  width: itemWidth,
                  height: itemHeight,
                  transform: `rotateY(${itemRotation}deg) translateZ(${radius}px)`,
                  transition: "all 1s ease-out",
                  opacity: isActive ? 1 : 0.7,
                  filter: isActive ? "none" : "brightness(0.7)",
                }}
              >
                {item}
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-4 mt-8">
        <button
          onClick={prevItem}
          className="bg-black border border-[#00ff41] text-[#00ff41] p-2 hover:bg-[#00ff41]/10 transition-colors"
          aria-label="Previous item"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextItem}
          className="bg-black border border-[#00ff41] text-[#00ff41] p-2 hover:bg-[#00ff41]/10 transition-colors"
          aria-label="Next item"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* CSS for 3D transforms */}
      <style jsx global>{`
        .perspective {
          perspective-origin: center;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  )
}
