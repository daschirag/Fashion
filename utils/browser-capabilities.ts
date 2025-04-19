"use client"

export function detectBrowserCapabilities() {
  if (typeof window === "undefined") {
    return {
      supportsCanvas: true,
      supportsWebGL: true,
      supportsWebGL2: true,
      supportsWebP: true,
      isLowPowerDevice: false,
      isOlderBrowser: false,
    }
  }

  // Check canvas support
  const supportsCanvas = (() => {
    const canvas = document.createElement("canvas")
    return !!(canvas.getContext && canvas.getContext("2d"))
  })()

  // Check WebGL support
  const supportsWebGL = (() => {
    if (!supportsCanvas) return false

    try {
      const canvas = document.createElement("canvas")
      return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")))
    } catch (e) {
      return false
    }
  })()

  // Check WebGL2 support
  const supportsWebGL2 = (() => {
    if (!supportsCanvas) return false

    try {
      const canvas = document.createElement("canvas")
      return !!(window.WebGL2RenderingContext && canvas.getContext("webgl2"))
    } catch (e) {
      return false
    }
  })()

  // Check WebP support
  const supportsWebP = (() => {
    const elem = document.createElement("canvas")
    if (elem.getContext && elem.getContext("2d")) {
      // was able or not to get WebP representation
      return elem.toDataURL("image/webp").indexOf("data:image/webp") === 0
    }
    return false
  })()

  // Check if it's likely a low-power device
  const isLowPowerDevice = (() => {
    // Check for mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Check for low memory (if available)
    const hasLowMemory = !!(
      // @ts-ignore - deviceMemory is not in the standard TypeScript navigator type
      (navigator.deviceMemory && navigator.deviceMemory < 4)
    )

    // Check for low CPU cores (if available)
    const hasLowCPU = !!(
      // @ts-ignore - hardwareConcurrency is not in the standard TypeScript navigator type
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)
    )

    return isMobile || hasLowMemory || hasLowCPU
  })()

  // Check if it's an older browser
  const isOlderBrowser = (() => {
    const userAgent = navigator.userAgent

    // Check for IE
    const isIE = /MSIE|Trident/.test(userAgent)

    // Check for older Edge (EdgeHTML)
    const isOldEdge = userAgent.indexOf("Edge/") !== -1

    // Check for older Chrome
    const chromeMatch = userAgent.match(/Chrome\/(\d+)/)
    const isOldChrome = chromeMatch && Number.parseInt(chromeMatch[1], 10) < 60

    // Check for older Firefox
    const firefoxMatch = userAgent.match(/Firefox\/(\d+)/)
    const isOldFirefox = firefoxMatch && Number.parseInt(firefoxMatch[1], 10) < 55

    // Check for older Safari
    const safariMatch = userAgent.match(/Version\/(\d+).*Safari/)
    const isOldSafari = safariMatch && Number.parseInt(safariMatch[1], 10) < 10

    return isIE || isOldEdge || isOldChrome || isOldFirefox || isOldSafari
  })()

  return {
    supportsCanvas,
    supportsWebGL,
    supportsWebGL2,
    supportsWebP,
    isLowPowerDevice,
    isOlderBrowser,
  }
}
