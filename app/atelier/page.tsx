"use client"

import PageLayout from "@/components/page-layout"
import ScrollReveal from "@/components/scroll-reveal"
import StaggerReveal from "@/components/stagger-reveal"
import RevealImage from "@/components/reveal-image"
import VHSGlitch from "@/components/vhs-glitch"
import SimpleDistressedText from "@/components/simple-distressed-text"
import ParallaxSection from "@/components/parallax-section"
import CSS3DText from "@/components/css-3d-text"
import DistressedText from "@/components/distressed-text"
import CyberButton from "@/components/cyber-button"
import Link from "next/link"

// Mock atelier process data
const processes = [
  {
    id: "deconstruct",
    title: "DECONSTRUCT",
    description: "Breaking down conventional fashion norms to find raw, authentic expression.",
    longDescription:
      "Our design process begins with deconstruction—both literal and metaphorical. We dismantle traditional garment construction techniques, exposing the inner workings that are typically hidden. By revealing seams, linings, and structural elements, we challenge the polished facade of fashion and embrace the beauty of imperfection.",
    image: "/placeholder.svg?height=800&width=600&text=DECONSTRUCT",
    order: 1,
  },
  {
    id: "experiment",
    title: "EXPERIMENT",
    description: "Testing boundaries with unconventional materials and techniques.",
    longDescription:
      "Experimentation is at the core of our creative process. We combine traditional craftsmanship with cutting-edge technology, exploring unconventional materials and innovative techniques. From 3D printing directly onto fabric to embedding electronics into garments, we push the boundaries of what fashion can be and how it can function in our increasingly digital world.",
    image: "/placeholder.svg?height=800&width=600&text=EXPERIMENT",
    order: 2,
  },
  {
    id: "disrupt",
    title: "DISRUPT",
    description: "Creating designs that challenge the status quo and provoke thought.",
    longDescription:
      "Disruption is not just an outcome but a deliberate strategy. We create designs that challenge industry norms and provoke critical thinking about fashion's role in society. By subverting expectations and questioning established practices, we aim to create a new dialogue about sustainability, identity, and the future of fashion in a rapidly changing world.",
    image: "/placeholder.svg?height=800&width=600&text=DISRUPT",
    order: 3,
  },
  {
    id: "redefine",
    title: "REDEFINE",
    description: "Establishing new paradigms that push fashion forward into uncharted territory.",
    longDescription:
      "The culmination of our process is redefinition. We don't just create garments; we establish new paradigms for what fashion can be. By merging physical and digital realms, embracing technological innovation, and prioritizing both aesthetic impact and ethical production, we're redefining the very concept of fashion for the 21st century and beyond.",
    image: "/placeholder.svg?height=800&width=600&text=REDEFINE",
    order: 4,
  },
]

export default function AtelierPage() {
  return (
    <PageLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <RevealImage
            src="/placeholder.svg?height=1200&width=1600&text=ATELIER"
            alt="Fashion designer atelier"
            className="w-full h-full"
            imgClassName="object-cover object-center"
            effect="fade"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <ScrollReveal variant="fadeInUp" className="text-center">
              <CSS3DText
                text="ATELIER"
                className="mb-6"
                fontSize={72}
                depth={15}
                color="#00ff41"
                glowColor="#00ff41"
                glowIntensity={10}
              />
              <p className="text-white/90 max-w-2xl mx-auto font-mono text-md tracking-wider px-4">
                WHERE REVOLUTIONARY FASHION CONCEPTS ARE BORN AND CRAFTED
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 px-4 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <ScrollReveal variant="fadeInLeft">
                <VHSGlitch>
                  <DistressedText
                    text="THE PROCESS"
                    tag="h2"
                    className="text-[#00ff41] text-3xl md:text-5xl font-mono font-bold tracking-tight mb-6"
                    intensity="medium"
                  />
                </VHSGlitch>
                <p className="text-white/70 font-mono text-sm tracking-wider mb-8 leading-relaxed">
                  Our atelier is more than a workspace—it's a laboratory where conventional fashion is dismantled and
                  reimagined. Here, we blend traditional craftsmanship with cutting-edge technology to create designs
                  that challenge the status quo and redefine what fashion can be.
                </p>
                <p className="text-white/70 font-mono text-sm tracking-wider mb-8 leading-relaxed">
                  Each collection begins with a concept that questions established norms and explores new possibilities.
                  Through a rigorous process of deconstruction, experimentation, disruption, and redefinition, we
                  transform these concepts into revolutionary garments that push the boundaries of fashion.
                </p>
                <Link href="#deconstruct">
                  <CyberButton>EXPLORE_PROCESS</CyberButton>
                </Link>
              </ScrollReveal>

              <ScrollReveal variant="fadeInRight" delay={0.2}>
                <RevealImage
                  src="/placeholder.svg?height=800&width=600&text=ATELIER+WORKSPACE"
                  alt="Fashion designer atelier workspace"
                  className="border border-[#00ff41]/30"
                  effect="clip"
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Process Sections */}
        {processes.map((process, index) => (
          <ParallaxSection
            key={process.id}
            id={process.id}
            speed={0.1}
            className={`py-20 px-4 md:px-10 ${index % 2 === 0 ? "bg-black/30" : ""}`}
          >
            <div className="max-w-6xl mx-auto">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}
              >
                <ScrollReveal variant={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"}>
                  <div className="relative">
                    <RevealImage
                      src={process.image}
                      alt={process.title}
                      className="border border-[#00ff41]/30"
                      effect="clip"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-black/80 border border-[#00ff41]/50 p-3 font-mono text-xs text-[#00ff41]">
                      {process.order.toString().padStart(2, "0")}_{process.title}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal variant={index % 2 === 0 ? "fadeInRight" : "fadeInLeft"} delay={0.2}>
                  <VHSGlitch>
                    <SimpleDistressedText
                      text={process.title}
                      tag="h2"
                      className="text-[#00ff41] text-3xl font-mono font-bold tracking-tight mb-4"
                    />
                  </VHSGlitch>
                  <p className="text-white/70 font-mono text-sm tracking-wider mb-6 leading-relaxed">
                    {process.longDescription}
                  </p>
                  <div className="flex space-x-4">
                    {index < processes.length - 1 ? (
                      <Link href={`#${processes[index + 1].id}`}>
                        <CyberButton variant="secondary" size="sm">
                          NEXT_STEP: {processes[index + 1].title}
                        </CyberButton>
                      </Link>
                    ) : (
                      <Link href="/collections">
                        <CyberButton variant="secondary" size="sm">
                          VIEW_COLLECTIONS
                        </CyberButton>
                      </Link>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ParallaxSection>
        ))}

        {/* Call to Action */}
        <section className="py-20 px-4 md:px-10 bg-black/50 border-t border-[#00ff41]/20">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal variant="fadeInUp" className="mb-8">
              <VHSGlitch>
                <SimpleDistressedText
                  text="JOIN THE REVOLUTION"
                  tag="h2"
                  className="text-[#00ff41] text-3xl md:text-5xl font-mono font-bold tracking-tight mb-4"
                />
              </VHSGlitch>
              <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm tracking-wider">
                EXPERIENCE OUR DESIGNS FIRSTHAND AND BECOME PART OF THE MOVEMENT REDEFINING FASHION.
              </p>
            </ScrollReveal>

            <StaggerReveal className="flex flex-col md:flex-row justify-center gap-6" staggerDelay={0.1}>
              <Link href="/collections">
                <CyberButton>EXPLORE_COLLECTIONS</CyberButton>
              </Link>
              <Link href="/lookbook">
                <CyberButton variant="secondary">VIEW_LOOKBOOK</CyberButton>
              </Link>
              <Link href="/contact">
                <CyberButton variant="secondary">CONTACT_US</CyberButton>
              </Link>
            </StaggerReveal>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
