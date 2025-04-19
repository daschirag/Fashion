"use client"

import { useEffect } from "react"

export function useSmoothScroll() {
  useEffect(() => {
    // Skip in SSR
    if (typeof window === "undefined") return

    let currentScroll = 0
    let targetScroll = 0
    const ease = 0.075 // Adjust for faster/slower smooth scrolling
    let rafId: number | null = null
    let isEnabled = true

    const wrapper = document.documentElement

    // Store original styles to restore later
    const originalStyles = {
      height: wrapper.style.height,
      overflow: wrapper.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }

    // Set up smooth scrolling
    function setupSmoothScroll() {
      // Set the wrapper height
      const height = document.body.getBoundingClientRect().height
      wrapper.style.height = `${height}px`
      wrapper.style.overflow = "hidden"

      // Set body to fixed position
      document.body.style.position = "fixed"
      document.body.style.top = "0"
      document.body.style.left = "0"
      document.body.style.width = "100%"

      // Start animation
      targetScroll = window.scrollY
      currentScroll = targetScroll
      window.scrollTo(0, targetScroll)

      // Start RAF
      rafId = requestAnimationFrame(smoothScroll)
    }

    // Smooth scroll animation
    function smoothScroll() {
      // Calculate smooth scrolling
      currentScroll += (targetScroll - currentScroll) * ease

      // Apply transform to body
      document.body.style.transform = `translateY(${-currentScroll}px)`

      // Continue animation
      rafId = requestAnimationFrame(smoothScroll)
    }

    // Update target scroll on window scroll
    function updateScroll() {
      if (!isEnabled) return
      targetScroll = window.scrollY
    }

    // Handle resize
    function handleResize() {
      if (!isEnabled) return

      // Update wrapper height
      const height = document.body.getBoundingClientRect().height
      wrapper.style.height = `${height}px`
    }

    // Check if device should use smooth scroll
    function shouldEnableSmoothScroll() {
      // Disable on mobile/tablet devices
      return window.innerWidth > 1024 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }

    // Initialize
    isEnabled = shouldEnableSmoothScroll()

    if (isEnabled) {
      setupSmoothScroll()
      window.addEventListener("scroll", updateScroll)
      window.addEventListener("resize", handleResize)
    }

    // Cleanup
    return () => {
      if (rafId) cancelAnimationFrame(rafId)

      // Restore original styles
      wrapper.style.height = originalStyles.height
      wrapper.style.overflow = originalStyles.overflow
      document.body.style.position = originalStyles.position
      document.body.style.top = originalStyles.top
      document.body.style.width = originalStyles.width
      document.body.style.transform = ""

      window.removeEventListener("scroll", updateScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])
}
