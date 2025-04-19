"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { useSplash } from "./splash-context"
import { useMobile } from "@/hooks/use-mobile"
import Logo from "./logo"
import DistressedOverlay from "./distressed-overlay"
import StaticNoise from "./static-noise"
import VHSGlitch from "./vhs-glitch"
import SimpleDistressedText from "./simple-distressed-text"

export default function SplashScreen() {
  const { isComplete, hasInteracted } = useSplash()
  const isMobile = useMobile()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      setMousePosition({
        x: ((clientX - centerX) / centerX) * 100,
        y: ((clientY - centerY) / centerY) * 100,
      })
    }

    if (!isMobile && !isComplete) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMobile, isComplete])

  // Skip animation if user has interacted
  useEffect(() => {
    if (hasInteracted) {
      controls.start("exit")
    }
  }, [hasInteracted, controls])

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: { opacity: 1 },
            animate: { opacity: 1 },
            exit: {
              opacity: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          {/* Background with VHS effect */}
          <div className="absolute inset-0 bg-black">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

            {/* Distressed overlay */}
            <DistressedOverlay opacity={0.2} intensity="heavy" />

            {/* Static noise */}
            <StaticNoise opacity={0.1} speed={20} />

            {/* Scan lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                backgroundImage: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)",
                backgroundSize: "100% 4px",
              }}
            />
          </div>

          {/* Central content */}
          <VHSGlitch className="relative z-10 flex flex-col items-center justify-center px-4" intensity="medium">
            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3,
                },
              }}
              className="mb-12 w-40 h-40 md:w-56 md:h-56"
            >
              <Logo />
            </motion.div>

            {/* Floating signature text */}
            <motion.div
              className="text-center"
              style={{
                x: mousePosition.x * 0.1,
                y: mousePosition.y * 0.1,
              }}
            >
              <SimpleDistressedText
                text="RAW DESIGN"
                tag="h1"
                className="font-mono text-3xl md:text-5xl font-bold text-[#00ff41] tracking-tight mb-6"
                delay={0.8}
              />

              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    delay: 1.2,
                  },
                }}
              >
                <SimpleDistressedText
                  text="BREAKING BOUNDARIES"
                  tag="p"
                  className="text-white/80 text-lg md:text-xl font-mono tracking-wider"
                  delay={1.4}
                  color="white"
                />
              </motion.div>
            </motion.div>

            {/* Skip button */}
            <motion.div
              className="absolute bottom-8"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 2,
                },
              }}
            >
              <button
                onClick={() => controls.start("exit")}
                aria-label="Skip intro animation"
                className="text-[#00ff41]/70 hover:text-[#00ff41] transition-colors relative group font-mono text-sm tracking-wider"
              >
                <span className="sr-only">Skip intro</span>
                SKIP_INTRO
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-px bg-[#00ff41]/70 group-hover:bg-[#00ff41]"
                  initial={{ width: 0 }}
                  animate={{
                    width: "100%",
                    transition: {
                      duration: 0.8,
                      delay: 2.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                />
              </button>
            </motion.div>
          </VHSGlitch>

          {/* Glitch effects */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 bg-[#00ff41]/5"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.2, 0],
                x: [0, (Math.random() - 0.5) * 10, 0],
                y: [0, (Math.random() - 0.5) * 10, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: Math.random() * 5 + 2,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
