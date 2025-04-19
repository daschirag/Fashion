"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

type EmojiRainProps = {
  emojis?: string[]
  count?: number
  duration?: number
  size?: number
  trigger?: "hover" | "click" | "auto"
  targetSelector?: string
}

type Emoji = {
  id: number
  emoji: string
  x: number
  y: number
  rotate: number
  scale: number
  duration: number
}

export default function EmojiRain({
  emojis = ["✨", "🔥", "💯", "🤩", "💖", "🚀", "💅", "👑"],
  count = 20,
  duration = 2,
  size = 24,
  trigger = "hover",
  targetSelector,
}: EmojiRainProps) {
  const [emojiList, setEmojiList] = useState<Emoji[]>([])
  const [isActive, setIsActive] = useState(trigger === "auto")
  const containerRef = useRef<HTMLDivElement>(null)
  const emojiIdRef = useRef(0)

  // Create emoji rain
  const createEmojiRain = () => {
    const newEmojis: Emoji[] = []
    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth

    for (let i = 0; i < count; i++) {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
      const randomX = Math.random() * containerWidth
      const randomDuration = duration + Math.random() * 2

      newEmojis.push({
        id: emojiIdRef.current++,
        emoji: randomEmoji,
        x: randomX,
        y: -50,
        rotate: Math.random() * 360,
        scale: 0.5 + Math.random() * 1,
        duration: randomDuration,
      })
    }

    setEmojiList((prev) => [...prev, ...newEmojis])

    // Remove emojis after they've fallen
    setTimeout(
      () => {
        setEmojiList((prev) => prev.slice(count))
      },
      duration * 1000 + 500,
    )
  }

  // Handle trigger events
  useEffect(() => {
    if (trigger === "auto") {
      const interval = setInterval(() => {
        createEmojiRain()
      }, 3000)
      return () => clearInterval(interval)
    }

    if (targetSelector) {
      const targets = document.querySelectorAll(targetSelector)

      const handleEvent = () => {
        createEmojiRain()
      }

      targets.forEach((target) => {
        if (trigger === "hover") {
          target.addEventListener("mouseenter", handleEvent)
        } else if (trigger === "click") {
          target.addEventListener("click", handleEvent)
        }
      })

      return () => {
        targets.forEach((target) => {
          if (trigger === "hover") {
            target.removeEventListener("mouseenter", handleEvent)
          } else if (trigger === "click") {
            target.removeEventListener("click", handleEvent)
          }
        })
      }
    }
  }, [trigger, targetSelector, count, duration])

  // Handle container events
  const handleEvent = () => {
    if (trigger !== "auto" && !targetSelector) {
      createEmojiRain()
    }
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      onMouseEnter={trigger === "hover" ? handleEvent : undefined}
      onClick={trigger === "click" ? handleEvent : undefined}
    >
      <AnimatePresence>
        {emojiList.map((emoji) => (
          <motion.div
            key={emoji.id}
            className="absolute"
            initial={{
              x: emoji.x,
              y: emoji.y,
              rotate: emoji.rotate,
              scale: emoji.scale,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 100,
              rotate: emoji.rotate + Math.random() * 360,
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: emoji.duration,
              ease: "easeIn",
            }}
            style={{ fontSize: size }}
          >
            {emoji.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
