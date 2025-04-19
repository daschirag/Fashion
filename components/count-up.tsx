"use client"

import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"

type CountUpProps = {
  end: number
  start?: number
  duration?: number
  delay?: number
  className?: string
  threshold?: number
  once?: boolean
  prefix?: string
  suffix?: string
  decimals?: number
}

export default function CountUp({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  className,
  threshold = 0.2,
  once = true,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(start)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      // Delay the animation
      const delayTimer = setTimeout(() => {
        let startTime: number
        const animateCount = (timestamp: number) => {
          if (!startTime) startTime = timestamp
          const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
          const currentCount = progress * (end - start) + start

          setCount(currentCount)

          if (progress < 1) {
            requestAnimationFrame(animateCount)
          } else {
            setCount(end)
            setHasAnimated(true)
          }
        }

        requestAnimationFrame(animateCount)
      }, delay * 1000)

      return () => clearTimeout(delayTimer)
    }
  }, [isInView, hasAnimated, start, end, duration, delay])

  // Format the count with the specified number of decimal places
  const formattedCount = count.toFixed(decimals)

  return (
    <div ref={ref} className={cn(className)}>
      {prefix}
      {formattedCount}
      {suffix}
    </div>
  )
}
