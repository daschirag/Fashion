"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type SimpleDistressedTextProps = {
  text: string
  className?: string
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  delay?: number
  color?: string
  animated?: boolean
}

export default function SimpleDistressedText({
  text,
  className,
  tag: Tag = "div",
  delay = 0,
  color = "#00ff41",
  animated = true,
}: SimpleDistressedTextProps) {
  // Split text into characters for animation
  const characters = text.split("")

  return (
    <Tag className={cn("relative", className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        className="inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block relative"
            style={{ color }}
            animate={
              animated
                ? {
                    x: [0, (Math.random() - 0.5) * 3, 0],
                    y: [0, (Math.random() - 0.5) * 3, 0],
                    filter: Math.random() > 0.8 ? ["blur(0px)", "blur(1px)", "blur(0px)"] : "none",
                  }
                : {}
            }
            transition={{
              duration: 0.2,
              repeat: animated ? Number.POSITIVE_INFINITY : 0,
              repeatType: "loop",
              repeatDelay: Math.random() * 5 + 2,
            }}
          >
            {char === " " ? "\u00A0" : char}
            {Math.random() > 0.9 && animated && (
              <motion.span
                className="absolute inset-0"
                style={{ color: "#ff00ff", opacity: 0.7, transform: "translateX(-2px)" }}
                animate={{ opacity: [0.7, 0] }}
                transition={{ duration: 0.2 }}
              >
                {char}
              </motion.span>
            )}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}
