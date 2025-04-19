"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
  as?: "button" | "a" | "div"
  href?: string
  onClick?: () => void
  disabled?: boolean
}

export default function MagneticButton({
  children,
  className,
  strength = 30,
  radius = 300,
  as = "button",
  href,
  onClick,
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>(null)
  const [isMagnetic, setIsMagnetic] = useState(true)

  // Motion values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics
  const springConfig = { damping: 15, stiffness: 150 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !buttonRef.current || !isMagnetic) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Calculate distance from center
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    // Check if cursor is within magnetic radius
    if (distance < radius) {
      // Calculate magnetic pull (stronger when closer)
      const pull = (radius - distance) / radius

      x.set(distanceX * pull * (strength / 10))
      y.set(distanceY * pull * (strength / 10))
    } else {
      x.set(0)
      y.set(0)
    }
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Handle window resize
  useState(() => {
    const checkDevice = () => {
      setIsMagnetic(window.innerWidth > 768)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => {
      window.removeEventListener("resize", checkDevice)
    }
  })

  const Component = motion[as] as any

  return (
    <Component
      ref={buttonRef}
      className={cn("relative inline-block", className)}
      style={{
        x: xSpring,
        y: ySpring,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      href={as === "a" ? href : undefined}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Component>
  )
}
