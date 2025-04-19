"use client"

import type React from "react"
import { usePerformance } from "@/contexts/performance-context"
import { cn } from "@/lib/utils"

type ReducedMotionAlternativeProps = {
  children: React.ReactNode
  alternative: React.ReactNode
  className?: string
  alternativeClassName?: string
}

export default function ReducedMotionAlternative({
  children,
  alternative,
  className,
  alternativeClassName,
}: ReducedMotionAlternativeProps) {
  const { useReducedMotion } = usePerformance()

  return (
    <div className={cn(className)}>
      {useReducedMotion ? (
        <div className={cn("reduced-motion-alternative", alternativeClassName)}>{alternative}</div>
      ) : (
        children
      )}
    </div>
  )
}
