"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useSplash } from "./splash-context"
import AnimatedSignature from "./animated-signature"
import ParallaxSection from "./parallax-section"
import ParallaxText from "./parallax-text"
import ScrollReveal from "./scroll-reveal"
import StaggerReveal from "./stagger-reveal"
import RevealImage from "./reveal-image"
import CountUp from "./count-up"
import DarkBackground from "./dark-background"
import DistressedText from "./distressed-text"
import DistressedOverlay from "./distressed-overlay"
import VHSGlitch from "./vhs-glitch"
import CyberButton from "./cyber-button"
import StaticNoise from "./static-noise"
import SimpleDistressedText from "./simple-distressed-text"
import Header from "./header"
import Footer from "./footer"
import Link from "next/link"

export default function MainContent() {
  const { isComplete } = useSplash()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <motion.div
      ref={containerRef}
      className="w-full min-h-screen relative bg-black"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isComplete ? 1 : 0,
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.3,
        },
      }}
    >
      {/* Dark, gritty background */}
      <DarkBackground className="fixed inset-0 z-0" intensity="medium" />

      {/* Distressed overlay */}
      <DistressedOverlay className="fixed inset-0 z-0" opacity={0.15} intensity="medium" />

      {/* Static noise */}
      <StaticNoise className="fixed inset-0 z-0" opacity={0.05} speed={15} />

      {/* Scan lines */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      <div className="relative z-10 w-full">
        {/* Header with scroll reveal */}
        <ScrollReveal variant="fadeInDown" className="w-full">
          <Header />
        </ScrollReveal>

        {/* Hero section with scroll reveal */}
        <section className="min-h-[90vh] flex items-center justify-center flex-col px-4 py-20">
          <ParallaxText speed={0.3} className="mb-8 text-center">
            <VHSGlitch>
              <SimpleDistressedText
                text="RAW DESIGN"
                tag="h1"
                className="text-[#00ff41] text-4xl md:text-7xl font-mono font-bold tracking-tight mb-2"
                delay={0.5}
              />
            </VHSGlitch>
            <SimpleDistressedText
              text="BREAKING BOUNDARIES"
              tag="h1"
              className="text-white text-3xl md:text-5xl font-mono font-bold tracking-tight"
              delay={1}
              color="white"
            />
          </ParallaxText>

          <ParallaxSection speed={0.2} direction="up">
            <AnimatedSignature />
          </ParallaxSection>

          <ScrollReveal variant="fadeInUp" className="mt-12">
            <div className="flex flex-col md:flex-row gap-6">
              <Link href="/shop">
                <CyberButton>SHOP_NOW</CyberButton>
              </Link>
              <Link href="/collections">
                <CyberButton variant="secondary">EXPLORE_COLLECTIONS</CyberButton>
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Stats section with count up animations */}
        <section className="py-16 px-4 md:px-10">
          <ScrollReveal variant="fadeInUp" className="max-w-6xl mx-auto">
            <div className="bg-black/80 backdrop-blur-sm border border-[#00ff41]/30 p-8 md:p-12">
              <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                  <CountUp
                    end={15}
                    suffix="+"
                    className="text-[#00ff41] text-4xl md:text-6xl font-mono"
                    duration={1.5}
                  />
                  <p className="text-white/70 font-mono text-xs tracking-wider">YEARS EXPERIENCE</p>
                </div>
                <div className="space-y-2">
                  <CountUp
                    end={120}
                    suffix="+"
                    className="text-[#00ff41] text-4xl md:text-6xl font-mono"
                    duration={2}
                    delay={0.2}
                  />
                  <p className="text-white/70 font-mono text-xs tracking-wider">FASHION SHOWS</p>
                </div>
                <div className="space-y-2">
                  <CountUp
                    end={350}
                    suffix="+"
                    className="text-[#00ff41] text-4xl md:text-6xl font-mono"
                    duration={2.5}
                    delay={0.4}
                  />
                  <p className="text-white/70 font-mono text-xs tracking-wider">UNIQUE DESIGNS</p>
                </div>
                <div className="space-y-2">
                  <CountUp
                    end={42}
                    className="text-[#00ff41] text-4xl md:text-6xl font-mono"
                    duration={1.5}
                    delay={0.6}
                  />
                  <p className="text-white/70 font-mono text-xs tracking-wider">AWARDS WON</p>
                </div>
              </StaggerReveal>
            </div>
          </ScrollReveal>
        </section>

        {/* Portfolio section with scroll reveal */}
        <section className="py-20 px-4 md:px-10">
          <ScrollReveal variant="fadeInUp" className="mb-16 text-center">
            <VHSGlitch>
              <SimpleDistressedText
                text="LATEST COLLECTIONS"
                tag="h2"
                className="text-[#00ff41] text-3xl md:text-5xl font-mono font-bold tracking-tight mb-4"
              />
            </VHSGlitch>
            <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm tracking-wider">
              RAW. UNFILTERED. AUTHENTIC. FASHION THAT SPEAKS TRUTH.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12" staggerDelay={0.15}>
            {[
              { id: 1, name: "DECONSTRUCTED", path: "/collections/deconstructed" },
              { id: 2, name: "NEON DYSTOPIA", path: "/collections/neon-dystopia" },
              { id: 3, name: "DIGITAL COUTURE", path: "/collections/digital-couture" },
            ].map((collection) => (
              <Link href={collection.path} key={collection.id}>
                <VHSGlitch intensity="light" interval={10000}>
                  <div className="bg-black/50 border border-[#00ff41]/20 overflow-hidden h-full flex flex-col group">
                    <RevealImage
                      src={`/placeholder.svg?height=600&width=400&text=COLLECTION+${collection.id}`}
                      alt={`Fashion collection ${collection.name}`}
                      className="h-[350px]"
                      effect="clip"
                    />
                    <ScrollReveal variant="fadeInUp" delay={0.2} className="p-6 flex-1">
                      <h3 className="text-[#00ff41] text-xl font-mono tracking-tight mb-2">{collection.name}</h3>
                      <p className="text-white/70 font-mono text-xs tracking-wider">
                        DECONSTRUCTED DESIGNS THAT CHALLENGE CONVENTIONAL FASHION NORMS.
                      </p>
                      <CyberButton className="mt-4" size="sm">
                        VIEW_COLLECTION
                      </CyberButton>
                    </ScrollReveal>
                  </div>
                </VHSGlitch>
              </Link>
            ))}
          </StaggerReveal>

          <div className="flex justify-center mt-12">
            <Link href="/collections">
              <CyberButton variant="secondary">VIEW_ALL_COLLECTIONS</CyberButton>
            </Link>
          </div>
        </section>

        {/* Process section with scroll reveal */}
        <section className="py-20 px-4 md:px-10 bg-black/50 border-y border-[#00ff41]/20">
          <ScrollReveal variant="fadeInUp" className="mb-16 text-center">
            <VHSGlitch>
              <DistressedText
                text="DESIGN PROCESS"
                tag="h2"
                className="text-[#00ff41] text-3xl md:text-5xl font-mono font-bold tracking-tight mb-4"
                intensity="medium"
              />
            </VHSGlitch>
            <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm tracking-wider">
              BREAKING DOWN THE SYSTEM. REBUILDING WITH PURPOSE.
            </p>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <StaggerReveal className="space-y-16" staggerDelay={0.2}>
              {[
                {
                  number: "01",
                  title: "DECONSTRUCT",
                  description: "Tearing down conventional fashion norms to find raw, authentic expression.",
                  symbol: "⚠",
                  link: "/atelier#deconstruct",
                },
                {
                  number: "02",
                  title: "EXPERIMENT",
                  description: "Testing boundaries with unconventional materials and techniques.",
                  symbol: "⚡",
                  link: "/atelier#experiment",
                },
                {
                  number: "03",
                  title: "DISRUPT",
                  description: "Creating designs that challenge the status quo and provoke thought.",
                  symbol: "⚔",
                  link: "/atelier#disrupt",
                },
                {
                  number: "04",
                  title: "REDEFINE",
                  description: "Establishing new paradigms that push fashion forward into uncharted territory.",
                  symbol: "☢",
                  link: "/atelier#redefine",
                },
              ].map((step) => (
                <Link href={step.link} key={step.number} className="block group">
                  <div className="flex items-start gap-6">
                    <ScrollReveal variant="fadeIn" className="text-4xl md:text-7xl font-mono text-[#00ff41]/20">
                      {step.number}
                    </ScrollReveal>
                    <div className="flex-1">
                      <ScrollReveal variant="fadeInUp" delay={0.1}>
                        <h3 className="text-[#00ff41] text-xl md:text-2xl font-mono tracking-tight mb-2 flex items-center group-hover:text-[#00ff41]/80 transition-colors">
                          {step.title} <span className="ml-2 text-xl">{step.symbol}</span>
                        </h3>
                        <p className="text-white/70 font-mono text-sm tracking-wider">{step.description}</p>
                      </ScrollReveal>
                    </div>
                  </div>
                </Link>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Quote section with scroll reveal */}
        <ParallaxSection speed={0.1} className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal variant="fadeIn" className="mb-6">
              <div className="text-6xl text-[#00ff41]/20 font-mono">"</div>
            </ScrollReveal>
            <VHSGlitch intensity="light" interval={12000}>
              <ScrollReveal variant="fadeInUp" delay={0.2}>
                <blockquote className="text-white text-2xl md:text-3xl font-mono tracking-tight mb-6">
                  FASHION IS NOT ABOUT FITTING IN. IT'S ABOUT STANDING OUT AND MAKING A STATEMENT THAT CANNOT BE
                  IGNORED.
                </blockquote>
                <cite className="text-[#00ff41]/70 font-mono text-sm tracking-wider not-italic">— FD</cite>
              </ScrollReveal>
            </VHSGlitch>
          </div>
        </ParallaxSection>

        {/* Contact section with scroll reveal */}
        <ParallaxSection speed={0.15} className="py-20 px-4 md:px-10">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal variant="fadeInUp" className="mb-12 text-center">
              <VHSGlitch>
                <DistressedText
                  text="CONNECT"
                  tag="h2"
                  className="text-[#00ff41] text-3xl md:text-5xl font-mono font-bold tracking-tight mb-4"
                  intensity="medium"
                />
              </VHSGlitch>
              <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm tracking-wider">
                JOIN THE REVOLUTION. BREAK THE MOLD. CREATE THE FUTURE.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeInUp" delay={0.2}>
              <div className="bg-black/50 border border-[#00ff41]/30 p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-[#00ff41] mb-2 font-mono text-sm tracking-wider">
                        NAME_
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[#00ff41] mb-2 font-mono text-sm tracking-wider">
                        EMAIL_
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[#00ff41] mb-2 font-mono text-sm tracking-wider">
                      MESSAGE_
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full bg-black/50 border border-[#00ff41]/30 p-3 text-white font-mono focus:outline-none focus:border-[#00ff41]"
                    ></textarea>
                  </div>
                  <CyberButton type="submit">TRANSMIT_MESSAGE</CyberButton>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </ParallaxSection>

        {/* Footer */}
        <Footer />
      </div>
    </motion.div>
  )
}
