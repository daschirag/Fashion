"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { detectBrowserCapabilities } from "@/utils/browser-capabilities"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

type PerformanceContextType = {
  useCanvasEffects: boolean
  useWebGLEffects: boolean
  useAdvancedAnimations: boolean
  useParallaxEffects: boolean
  useReducedMotion: boolean
  isLowPowerMode: boolean
  setLowPowerMode: (value: boolean) => void
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined)

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [capabilities, setCapabilities] = useState({
    supportsCanvas: true,
    supportsWebGL: true,
    supportsWebGL2: true,
    isLowPowerDevice: false,
    isOlderBrowser: false,
  })

  const [isLowPowerMode, setLowPowerMode] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Detect capabilities on mount
  useEffect(() => {
    const detected = detectBrowserCapabilities()
    setCapabilities(detected)

    // Auto-enable low power mode for low-end devices or older browsers
    if (detected.isLowPowerDevice || detected.isOlderBrowser) {
      setLowPowerMode(true)
    }
  }, [])

  // Derived values based on capabilities and user preferences
  const useCanvasEffects = capabilities.supportsCanvas && !isLowPowerMode
  const useWebGLEffects = capabilities.supportsWebGL && !isLowPowerMode
  const useAdvancedAnimations = !isLowPowerMode && !capabilities.isOlderBrowser && !prefersReducedMotion
  const useParallaxEffects = !isLowPowerMode && !capabilities.isLowPowerDevice && !prefersReducedMotion

  const value = {
    useCanvasEffects,
    useWebGLEffects,
    useAdvancedAnimations,
    useParallaxEffects,
    useReducedMotion: prefersReducedMotion,
    isLowPowerMode,
    setLowPowerMode,
  }

  return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>
}

export function usePerformance() {
  const context = useContext(PerformanceContext)
  if (context === undefined) {
    throw new Error("usePerformance must be used within a PerformanceProvider")
  }
  return context
}
