"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/contexts/performance-context"

type AnimatedTextProps = {
  text: string
  className?: string
  once?: boolean
  delayOffset?: number
  staggerChildren?: number
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  animation?: "fadeIn" | "slideUp" | "slideRight" | "typewriter"
  childClassName?: string
}

export default function AnimatedText({
  text,
  className = "",
  once = true,
  delayOffset = 0,
  staggerChildren = 0.03,
  tag = "div",
  animation = "fadeIn",
  childClassName = "",
}: AnimatedTextProps) {
  const { useReducedMotion } = usePerformance()

  // Split text into words and then characters
  const words = text.split(" ")

  // Animation variants
  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: (i: number) => ({
        opacity: 1,
        transition: {
          duration: useReducedMotion ? 0 : 0.4,
          delay: useReducedMotion ? 0 : delayOffset + i * staggerChildren,
          ease: [0.22, 1, 0.36, 1],
        },
      }),
    },
    slideUp: {
      hidden: { opacity: 0, y: useReducedMotion ? 0 : 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: useReducedMotion ? 0 : 0.5,
          delay: useReducedMotion ? 0 : delayOffset + i * staggerChildren,
          ease: [0.22, 1, 0.36, 1],
        },
      }),
    },
    slideRight: {
      hidden: { opacity: 0, x: useReducedMotion ? 0 : -20 },
      visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
          duration: useReducedMotion ? 0 : 0.5,
          delay: useReducedMotion ? 0 : delayOffset + i * staggerChildren,
          ease: [0.22, 1, 0.36, 1],
        },
      }),
    },
    typewriter: {
      hidden: { opacity: 0, width: useReducedMotion ? "auto" : 0 },
      visible: (i: number) => ({
        opacity: 1,
        width: "auto",
        transition: {
          duration: useReducedMotion ? 0 : 0.3,
          delay: useReducedMotion ? 0 : delayOffset + i * staggerChildren,
          ease: "easeInOut",
        },
      }),
    },
  }

  const selectedAnimation = animations[animation]

  // Create the component based on the tag prop
  const Component = motion[tag] as any

  return (
    <Component
      className={cn("flex flex-wrap", className)}
      aria-label={text}
      initial={useReducedMotion ? "visible" : "hidden"}
      animate="visible"
      viewport={{ once }}
    >
      {words.map((word, wordIndex) => (
        <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap mr-1.5 mb-1.5">
          {Array.from(word).map((char, charIndex) => (
            <motion.span
              key={`char-${charIndex}`}
              className={cn("inline-block", childClassName)}
              custom={wordIndex * 0.2 + charIndex * staggerChildren}
              variants={selectedAnimation}
              aria-hidden="true"
              style={{
                display: "inline-block",
                ...(animation === "typewriter" ? { overflow: "hidden" } : {}),
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </Component>
  )
}
