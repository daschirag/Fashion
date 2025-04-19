"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/contexts/performance-context"

type GlitchTextProps = {
  text: string
  className?: string
  glitchClassName?: string
  threshold?: number
  once?: boolean
  intensity?: "light" | "medium" | "heavy"
  color1?: string
  color2?: string
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  delay?: number
}

export default function GlitchText({
  text,
  className,
  glitchClassName,
  threshold = 0.2,
  once = true,
  intensity = "medium",
  color1 = "rgba(255,105,180,0.7)",
  color2 = "rgba(0,255,255,0.7)",
  tag: Tag = "div",
  delay = 0,
}: GlitchTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })
  const [isGlitching, setIsGlitching] = useState(false)
  const { useReducedMotion } = usePerformance()

  // Set glitch intensity values
  const getIntensityValues = () => {
    switch (intensity) {
      case "light":
        return { offset: 2, interval: 2500, duration: 150 }
      case "heavy":
        return { offset: 5, interval: 1500, duration: 350 }
      default:
        return { offset: 3, interval: 2000, duration: 200 }
    }
  }

  const { offset, interval, duration } = getIntensityValues()

  useEffect(() => {
    if (!isInView || useReducedMotion) return

    // Delay the start of the glitch effect
    const startDelay = setTimeout(() => {
      // Start the glitch effect
      const glitchInterval = setInterval(() => {
        setIsGlitching(true)

        // Stop the glitch effect after a short duration
        setTimeout(() => {
          setIsGlitching(false)
        }, duration)
      }, interval)

      return () => clearInterval(glitchInterval)
    }, delay * 1000)

    return () => clearTimeout(startDelay)
  }, [isInView, duration, interval, delay, useReducedMotion])

  return (
    <motion.div
      ref={ref}
      className={cn("relative inline-block", className)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Main text */}
      <Tag className="relative z-10">{text}</Tag>

      {/* Glitch layers - only shown if not using reduced motion */}
      {isGlitching && !useReducedMotion && (
        <>
          <Tag
            className={cn("absolute top-0 left-0 z-[1] text-transparent", glitchClassName)}
            style={{
              textShadow: `${-offset}px 0 ${color1}`,
              clipPath: "rect(24px, 550px, 90px, 0)",
              animation: "glitch-anim 2s infinite linear alternate-reverse",
            }}
            aria-hidden="true"
          >
            {text}
          </Tag>

          <Tag
            className={cn("absolute top-0 left-0 z-[2] text-transparent", glitchClassName)}
            style={{
              textShadow: `${offset}px 0 ${color2}`,
              clipPath: "rect(43px, 550px, 43px, 0)",
              animation: "glitch-anim-2 5s infinite linear alternate-reverse",
            }}
            aria-hidden="true"
          >
            {text}
          </Tag>
        </>
      )}

      {/* Only include the styles if not using reduced motion */}
      {!useReducedMotion && (
        <style jsx global>{`
          @keyframes glitch-anim {
            0% {
              clip-path: rect(24px, 550px, 90px, 0);
              transform: translate(-${offset}px, -${offset}px);
            }
            20% {
              clip-path: rect(62px, 550px, 15px, 0);
              transform: translate(${offset}px, ${offset}px);
            }
            40% {
              clip-path: rect(32px, 550px, 53px, 0);
              transform: translate(${offset}px, -${offset}px);
            }
            60% {
              clip-path: rect(15px, 550px, 80px, 0);
              transform: translate(-${offset}px, ${offset * 2}px);
            }
            80% {
              clip-path: rect(75px, 550px, 46px, 0);
              transform: translate(-${offset * 2}px, -${offset}px);
            }
            100% {
              clip-path: rect(40px, 550px, 29px, 0);
              transform: translate(${offset * 2}px, ${offset}px);
            }
          }

          @keyframes glitch-anim-2 {
            0% {
              clip-path: rect(65px, 550px, 119px, 0);
              transform: translate(${offset}px, ${offset}px);
            }
            20% {
              clip-path: rect(93px, 550px, 48px, 0);
              transform: translate(-${offset}px, -${offset}px);
            }
            40% {
              clip-path: rect(21px, 550px, 73px, 0);
              transform: translate(-${offset}px, ${offset}px);
            }
            60% {
              clip-path: rect(34px, 550px, 14px, 0);
              transform: translate(${offset}px, -${offset * 2}px);
            }
            80% {
              clip-path: rect(99px, 550px, 71px, 0);
              transform: translate(${offset * 2}px, ${offset}px);
            }
            100% {
              clip-path: rect(82px, 550px, 33px, 0);
              transform: translate(-${offset * 2}px, -${offset}px);
            }
          }
        `}</style>
      )}
    </motion.div>
  )
}
