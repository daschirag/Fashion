"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useCanvasSupport } from "@/hooks/use-canvas-support"

type CanvasErrorBoundaryProps = {
  children: React.ReactNode
  fallback: React.ReactNode
}

export default function CanvasErrorBoundary({ children, fallback }: CanvasErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const isCanvasSupported = useCanvasSupport()

  useEffect(() => {
    if (!isCanvasSupported) {
      setHasError(true)
    }

    // Add global error handler for canvas-related errors
    const handleError = (event: ErrorEvent) => {
      if (
        event.message.includes("canvas") ||
        event.message.includes("getContext") ||
        event.message.includes("drawImage") ||
        event.message.includes("putImageData")
      ) {
        setHasError(true)
      }
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [isCanvasSupported])

  if (hasError) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
