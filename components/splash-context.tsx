"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type SplashContextType = {
  isComplete: boolean
  setIsComplete: (value: boolean) => void
  hasInteracted: boolean
  setHasInteracted: (value: boolean) => void
}

const SplashContext = createContext<SplashContextType | undefined>(undefined)

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [isComplete, setIsComplete] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Auto-skip splash screen after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  // Listen for scroll or keyboard events to skip splash
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true)
      setTimeout(() => setIsComplete(true), 500)
    }

    window.addEventListener("wheel", handleInteraction, { once: true })
    window.addEventListener("keydown", handleInteraction, { once: true })
    window.addEventListener("click", handleInteraction, { once: true })
    window.addEventListener("touchstart", handleInteraction, { once: true })

    return () => {
      window.removeEventListener("wheel", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)
    }
  }, [])

  return (
    <SplashContext.Provider value={{ isComplete, setIsComplete, hasInteracted, setHasInteracted }}>
      {children}
    </SplashContext.Provider>
  )
}

export function useSplash() {
  const context = useContext(SplashContext)
  if (context === undefined) {
    throw new Error("useSplash must be used within a SplashProvider")
  }
  return context
}
