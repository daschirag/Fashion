"use client"

import { useState, useEffect } from "react"

export function useCanvasSupport() {
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    // Check if canvas is supported
    const canvas = document.createElement("canvas")
    const isCanvasSupported = !!(canvas.getContext && canvas.getContext("2d"))

    // Check if canvas can actually be used (some browsers report support but fail in practice)
    let isCanvasUsable = isCanvasSupported

    if (isCanvasSupported) {
      try {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          // Try to perform a basic operation
          ctx.fillStyle = "#000"
          ctx.fillRect(0, 0, 1, 1)
          const data = ctx.getImageData(0, 0, 1, 1)
          // If we got here without errors, canvas is usable
        } else {
          isCanvasUsable = false
        }
      } catch (e) {
        isCanvasUsable = false
      }
    }

    setIsSupported(isCanvasUsable)
  }, [])

  return isSupported
}
