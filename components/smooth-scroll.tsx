"use client"

import type { ReactNode } from "react"
import { useSmoothScroll } from "@/utils/smooth-scroll"

export default function SmoothScroll({ children }: { children: ReactNode }) {
  // Initialize smooth scrolling
  useSmoothScroll()

  return <>{children}</>
}
