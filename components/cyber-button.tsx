"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type CyberButtonProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  glitchOnHover?: boolean
  variant?: "primary" | "secondary" | "danger" | "warning"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export default function CyberButton({
  children,
  className,
  onClick,
  glitchOnHover = true,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
}: CyberButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-900 border-gray-600 text-gray-100 hover:bg-gray-800"
      case "danger":
        return "bg-red-900 border-red-600 text-red-100 hover:bg-red-800"
      case "warning":
        return "bg-yellow-900 border-yellow-600 text-yellow-100 hover:bg-yellow-800"
      default:
        return "bg-[#0f0f0f] border-[#00ff41] text-[#00ff41] hover:bg-[#1a1a1a]"
    }
  }

  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "text-xs py-1 px-3"
      case "lg":
        return "text-lg py-3 px-6"
      default:
        return "text-sm py-2 px-4"
    }
  }

  // Handle hover
  const handleMouseEnter = () => {
    setIsHovered(true)
    if (glitchOnHover) {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 300)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <motion.button
      type={type}
      className={cn(
        "relative overflow-hidden border-2 font-mono uppercase tracking-wider transition-colors",
        "before:absolute before:inset-0 before:z-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 before:transition-opacity",
        "hover:before:opacity-100",
        getVariantStyles(),
        getSizeStyles(),
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {/* Corner accents */}
      <span className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-[#00ff41]" />
      <span className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-[#00ff41]" />
      <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-[#00ff41]" />
      <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[#00ff41]" />

      {/* Glitch effect */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-[#ff00ff] flex items-center justify-center"
            initial={{ x: -3, opacity: 0.7 }}
            animate={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-[#00ffff] flex items-center justify-center"
            initial={{ x: 3, opacity: 0.7 }}
            animate={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
        </>
      )}

      {/* Main content */}
      <span className="relative z-10">{children}</span>

      {/* Scan line */}
      {isHovered && !disabled && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff41]/20 to-transparent"
          initial={{ y: -100 }}
          animate={{ y: 100 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
        />
      )}
    </motion.button>
  )
}
