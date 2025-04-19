"use client"

import PageLayout from "@/components/page-layout"
import ScrollReveal from "@/components/scroll-reveal"
import StaggerReveal from "@/components/stagger-reveal"
import RevealImage from "@/components/reveal-image"
import VHSGlitch from "@/components/vhs-glitch"
import SimpleDistressedText from "@/components/simple-distressed-text"
import CyberButton from "@/components/cyber-button"
import Link from "next/link"

const collections = [
  {
    id: 1,
    name: "DECONSTRUCTED",
    description: "Breaking down traditional silhouettes to create raw, unfiltered fashion statements.",
    image: "/placeholder.svg?height=600&width=400&text=DECONSTRUCTED",
    path: "/collections/deconstructed",
    year: "2023",
    featured: true,
  },
  {
    id: 2,
    name: "NEON DYSTOPIA",
    description: "Futuristic designs inspired by cyberpunk aesthetics and digital rebellion.",
    image: "/placeholder.svg?height=600&width=400&text=NEON+DYSTOPIA",
    path: "/collections/neon-dystopia",
    year: "2023",
    featured: true,
  },
  {
    id: 3,
    name: "DIGITAL COUTURE",
    description: "Where high fashion meets digital art, blurring the lines between reality and virtuality.",
    image: "/placeholder.svg?height=600&width=400&text=DIGITAL+COUTURE",
    path: "/collections/digital-couture",
    year: "2022",
    featured: true,
  },
  {
    id: 4,
    name: "URBAN WARFARE",
    description: "Tactical-inspired designs for the modern urban landscape.",
    image: "/placeholder.svg?height=600&width=400&text=URBAN+WARFARE",
    path: "/collections/urban-warfare",
    year: "2022",
    featured: false,
  },
  {
    id: 5,
    name: "SYNTHETIC EVOLUTION",
    description: "Exploring the relationship between humanity and technology through innovative materials.",
    image: "/placeholder.svg?height=600&width=400&text=SYNTHETIC+EVOLUTION",
    path: "/collections/synthetic-evolution",
    year: "2021",
    featured: false,
  },
  {
    id: 6,
    name: "GLITCH COUTURE",
    description: "Embracing imperfection through deliberate disruptions in pattern and form.",
    image: "/placeholder.svg?height=600&width=400&text=GLITCH+COUTURE",
    path: "/collections/glitch-couture",
    year: "2021",
    featured: false,
  },
]

export default function CollectionsPage() {
  return (
    <PageLayout>
      <div className="py-20 px-4 md:px-10">
        <ScrollReveal variant="fadeInUp" className="mb-16 text-center">
          <VHSGlitch>
            <SimpleDistressedText
              text="COLLECTIONS"
              tag="h1"
              className="text-[#00ff41] text-4xl md:text-6xl font-mono font-bold tracking-tight mb-4"
            />
          </VHSGlitch>
          <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm tracking-wider">
            EXPLORE OUR ARCHIVE OF REVOLUTIONARY DESIGNS THAT CHALLENGE THE STATUS QUO.
          </p>
        </ScrollReveal>

        {/* Featured Collections */}
        <section className="mb-20">
          <ScrollReveal variant="fadeInUp" className="mb-10">
            <h2 className="text-[#00ff41] text-2xl font-mono tracking-tight inline-block border-b border-[#00ff41]/30 pb-2">
              FEATURED_COLLECTIONS
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" staggerDelay={0.15}>
            {collections
              .filter((collection) => collection.featured)
              .map((collection) => (
                <Link href={collection.path} key={collection.id}>
                  <VHSGlitch intensity="light" interval={10000}>
                    <div className="bg-black/50 border border-[#00ff41]/20 overflow-hidden h-full flex flex-col group hover:border-[#00ff41]/50 transition-colors">
                      <RevealImage src={collection.image} alt={collection.name} className="h-[350px]" effect="clip" />
                      <ScrollReveal variant="fadeInUp" delay={0.2} className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-[#00ff41] text-xl font-mono tracking-tight">{collection.name}</h3>
                          <span className="text-white/50 font-mono text-xs">{collection.year}</span>
                        </div>
                        <p className="text-white/70 font-mono text-xs tracking-wider mb-4">{collection.description}</p>
                        <CyberButton size="sm">EXPLORE_COLLECTION</CyberButton>
                      </ScrollReveal>
                    </div>
                  </VHSGlitch>
                </Link>
              ))}
          </StaggerReveal>
        </section>

        {/* Archive Collections */}
        <section>
          <ScrollReveal variant="fadeInUp" className="mb-10">
            <h2 className="text-[#00ff41] text-2xl font-mono tracking-tight inline-block border-b border-[#00ff41]/30 pb-2">
              ARCHIVE_COLLECTIONS
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" staggerDelay={0.15}>
            {collections
              .filter((collection) => !collection.featured)
              .map((collection) => (
                <Link href={collection.path} key={collection.id}>
                  <div className="bg-black/50 border border-[#00ff41]/20 overflow-hidden h-full flex flex-col group hover:border-[#00ff41]/50 transition-colors">
                    <RevealImage src={collection.image} alt={collection.name} className="h-[250px]" effect="fade" />
                    <ScrollReveal variant="fadeInUp" delay={0.2} className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-[#00ff41] text-lg font-mono tracking-tight">{collection.name}</h3>
                        <span className="text-white/50 font-mono text-xs">{collection.year}</span>
                      </div>
                      <p className="text-white/70 font-mono text-xs tracking-wider mb-4">{collection.description}</p>
                      <span className="text-[#00ff41]/70 font-mono text-xs group-hover:text-[#00ff41] transition-colors">
                        VIEW COLLECTION →
                      </span>
                    </ScrollReveal>
                  </div>
                </Link>
              ))}
          </StaggerReveal>
        </section>
      </div>
    </PageLayout>
  )
}
