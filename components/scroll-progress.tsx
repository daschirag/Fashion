"use client"

import { useScroll, motion } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#00ff41] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#ff00ff] z-50 origin-left mix-blend-overlay"
        style={{
          scaleX: scrollYProgress,
          opacity: 0.5,
          filter: "blur(2px)",
          transform: "translateY(2px) scaleX(var(--motion-scaleX))",
        }}
      />
    </>
  )
}
