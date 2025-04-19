"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import PageLayout from "@/components/page-layout"
import ScrollReveal from "@/components/scroll-reveal"
import StaggerReveal from "@/components/stagger-reveal"
import RevealImage from "@/components/reveal-image"
import VHSGlitch from "@/components/vhs-glitch"
import SimpleDistressedText from "@/components/simple-distressed-text"
import CyberButton from "@/components/cyber-button"
import ParallaxSection from "@/components/parallax-section"
import CSS3DCard from "@/components/css-3d-card"
import { ArrowLeft, ArrowRight } from "lucide-react"

// Mock collection data
const collections = {
  deconstructed: {
    id: 1,
    name: "DECONSTRUCTED",
    description: "Breaking down traditional silhouettes to create raw, unfiltered fashion statements.",
    longDescription:
      "The DECONSTRUCTED collection challenges conventional fashion by dismantling traditional garment construction. Each piece reveals the inner workings of fashion, exposing seams, linings, and structural elements that are typically hidden. This collection represents a rebellion against the polished facade of the fashion industry, embracing imperfection and authenticity.",
    year: "2023",
    designer: "FD Collective",
    items: [
      { id: 1, name: "EXPOSED SEAM JACKET", image: "/placeholder.svg?height=800&width=600&text=EXPOSED+SEAM+JACKET" },
      { id: 2, name: "REVERSE STITCH PANTS", image: "/placeholder.svg?height=800&width=600&text=REVERSE+STITCH+PANTS" },
      { id: 3, name: "INSIDE-OUT BLOUSE", image: "/placeholder.svg?height=800&width=600&text=INSIDE-OUT+BLOUSE" },
      { id: 4, name: "UNFINISHED HEM DRESS", image: "/placeholder.svg?height=800&width=600&text=UNFINISHED+HEM+DRESS" },
      { id: 5, name: "RAW EDGE COAT", image: "/placeholder.svg?height=800&width=600&text=RAW+EDGE+COAT" },
      { id: 6, name: "DECONSTRUCTED BOOTS", image: "/placeholder.svg?height=800&width=600&text=DECONSTRUCTED+BOOTS" },
    ],
    materials: ["Repurposed Denim", "Organic Cotton", "Recycled Leather", "Industrial Hardware"],
    featured: true,
    mainImage: "/placeholder.svg?height=1200&width=800&text=DECONSTRUCTED+COLLECTION",
    video: false,
  },
  "neon-dystopia": {
    id: 2,
    name: "NEON DYSTOPIA",
    description: "Futuristic designs inspired by cyberpunk aesthetics and digital rebellion.",
    longDescription:
      "NEON DYSTOPIA envisions fashion in a high-tech, low-life future where the boundaries between human and machine blur. Drawing inspiration from cyberpunk aesthetics, this collection features bold neon accents against dark, utilitarian silhouettes. Each piece incorporates elements of technology and urban survival, creating a visual commentary on our increasingly digital existence.",
    year: "2023",
    designer: "FD Collective",
    items: [
      { id: 1, name: "CIRCUIT BOARD JACKET", image: "/placeholder.svg?height=800&width=600&text=CIRCUIT+BOARD+JACKET" },
      { id: 2, name: "NEON PIPED PANTS", image: "/placeholder.svg?height=800&width=600&text=NEON+PIPED+PANTS" },
      { id: 3, name: "HOLOGRAPHIC BODYSUIT", image: "/placeholder.svg?height=800&width=600&text=HOLOGRAPHIC+BODYSUIT" },
      { id: 4, name: "LED EMBEDDED DRESS", image: "/placeholder.svg?height=800&width=600&text=LED+EMBEDDED+DRESS" },
      { id: 5, name: "REFLECTIVE TRENCH", image: "/placeholder.svg?height=800&width=600&text=REFLECTIVE+TRENCH" },
      { id: 6, name: "TECH-WEAR BOOTS", image: "/placeholder.svg?height=800&width=600&text=TECH-WEAR+BOOTS" },
    ],
    materials: ["Technical Fabrics", "Reflective Materials", "Recycled Plastics", "LED Components"],
    featured: true,
    mainImage: "/placeholder.svg?height=1200&width=800&text=NEON+DYSTOPIA+COLLECTION",
    video: true,
  },
  "digital-couture": {
    id: 3,
    name: "DIGITAL COUTURE",
    description: "Where high fashion meets digital art, blurring the lines between reality and virtuality.",
    longDescription:
      "DIGITAL COUTURE explores the intersection of traditional haute couture techniques and digital design processes. This groundbreaking collection features garments that were first conceptualized in virtual space before being meticulously crafted in physical form. The result is a seamless blend of artisanal craftsmanship and cutting-edge technology that challenges our perception of what fashion can be in the digital age.",
    year: "2022",
    designer: "FD Collective",
    items: [
      { id: 1, name: "PIXEL PATTERN GOWN", image: "/placeholder.svg?height=800&width=600&text=PIXEL+PATTERN+GOWN" },
      { id: 2, name: "3D PRINTED CORSET", image: "/placeholder.svg?height=800&width=600&text=3D+PRINTED+CORSET" },
      { id: 3, name: "GLITCH TEXTURE SUIT", image: "/placeholder.svg?height=800&width=600&text=GLITCH+TEXTURE+SUIT" },
      { id: 4, name: "AUGMENTED REALITY CAPE", image: "/placeholder.svg?height=800&width=600&text=AR+CAPE" },
      {
        id: 5,
        name: "DIGITAL EMBROIDERY JACKET",
        image: "/placeholder.svg?height=800&width=600&text=DIGITAL+EMBROIDERY",
      },
      { id: 6, name: "NFT ACCESSORY SET", image: "/placeholder.svg?height=800&width=600&text=NFT+ACCESSORY+SET" },
    ],
    materials: ["Digital Prints on Silk", "3D Printed Components", "Smart Textiles", "Embedded Electronics"],
    featured: true,
    mainImage: "/placeholder.svg?height=1200&width=800&text=DIGITAL+COUTURE+COLLECTION",
    video: true,
  },
}

export default function CollectionDetailPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] || "deconstructed"

  // Get collection data based on slug
  const collection = collections[slug as keyof typeof collections] || collections.deconstructed

  return (
    <PageLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <RevealImage
            src={collection.mainImage}
            alt={collection.name}
            className="w-full h-full"
            imgClassName="object-cover object-center"
            effect="fade"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-10">
            <ScrollReveal variant="fadeInUp">
              <VHSGlitch>
                <SimpleDistressedText
                  text={collection.name}
                  tag="h1"
                  className="text-[#00ff41] text-4xl md:text-6xl font-mono font-bold tracking-tight mb-2"
                />
              </VHSGlitch>
              <div className="flex flex-wrap gap-4 items-center text-white/70 font-mono text-sm tracking-wider mb-4">
                <span>{collection.year}</span>
                <span className="w-1 h-1 bg-[#00ff41] rounded-full"></span>
                <span>{collection.designer}</span>
              </div>
              <p className="text-white/90 max-w-2xl font-mono text-md tracking-wider">{collection.description}</p>
            </ScrollReveal>
          </div>
        </section>

        {/* Collection Details */}
        <section className="py-20 px-4 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <ScrollReveal variant="fadeInLeft">
                <h2 className="text-[#00ff41] text-2xl font-mono tracking-tight mb-6">ABOUT_THE_COLLECTION</h2>
                <p className="text-white/70 font-mono text-sm tracking-wider mb-8 leading-relaxed">
                  {collection.longDescription}
                </p>
                <div className="mb-8">
                  <h3 className="text-[#00ff41]/80 text-lg font-mono tracking-tight mb-4">MATERIALS</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {collection.materials.map((material, index) => (
                      <li key={index} className="text-white/70 font-mono text-xs tracking-wider flex items-center">
                        <span className="w-1 h-1 bg-[#00ff41] rounded-full mr-2"></span>
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/lookbook">
                  <CyberButton>VIEW_LOOKBOOK</CyberButton>
                </Link>
              </ScrollReveal>

              <ScrollReveal variant="fadeInRight" delay={0.2}>
                <div className="relative">
                  {collection.video ? (
                    <div className="aspect-video bg-black/50 border border-[#00ff41]/30 flex items-center justify-center">
                      <div className="text-[#00ff41] font-mono text-sm">COLLECTION_VIDEO.mp4</div>
                    </div>
                  ) : (
                    <RevealImage
                      src={collection.items[0].image}
                      alt={collection.items[0].name}
                      className="aspect-[3/4] border border-[#00ff41]/30"
                      effect="clip"
                    />
                  )}
                  <div className="absolute -bottom-4 -right-4 bg-black/80 border border-[#00ff41]/50 p-3 font-mono text-xs text-[#00ff41]">
                    {collection.name}_SIGNATURE_PIECE
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Collection Items */}
        <ParallaxSection speed={0.1} className="py-20 px-4 md:px-10 bg-black/30">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fadeInUp" className="mb-12 text-center">
              <VHSGlitch>
                <SimpleDistressedText
                  text="THE_PIECES"
                  tag="h2"
                  className="text-[#00ff41] text-3xl md:text-5xl font-mono font-bold tracking-tight mb-4"
                />
              </VHSGlitch>
              <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm tracking-wider">
                EXPLORE THE INDIVIDUAL PIECES THAT MAKE UP THIS REVOLUTIONARY COLLECTION.
              </p>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" staggerDelay={0.15}>
              {collection.items.map((item) => (
                <div key={item.id} className="group">
                  <CSS3DCard
                    className="w-full aspect-[3/4]"
                    width={undefined}
                    height={undefined}
                    depth={20}
                    borderColor="#00ff41"
                    glowColor="#00ff41"
                    glowIntensity={3}
                  >
                    <div className="p-4 h-full flex flex-col">
                      <RevealImage src={item.image} alt={item.name} className="w-full h-[80%] mb-4" effect="fade" />
                      <div className="mt-auto">
                        <h3 className="text-[#00ff41] font-mono text-sm tracking-tight">{item.name}</h3>
                      </div>
                    </div>
                  </CSS3DCard>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </ParallaxSection>

        {/* Navigation to other collections */}
        <section className="py-16 px-4 md:px-10 border-t border-[#00ff41]/20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <Link href="/collections" className="mb-6 md:mb-0">
                <div className="flex items-center text-[#00ff41]/70 hover:text-[#00ff41] transition-colors font-mono text-sm tracking-wider">
                  <ArrowLeft size={16} className="mr-2" />
                  BACK_TO_COLLECTIONS
                </div>
              </Link>

              <div className="flex items-center space-x-6">
                <Link
                  href="/runway"
                  className="text-[#00ff41]/70 hover:text-[#00ff41] transition-colors font-mono text-sm tracking-wider"
                >
                  VIEW_RUNWAY_SHOW
                </Link>
                <Link
                  href="/lookbook"
                  className="text-[#00ff41]/70 hover:text-[#00ff41] transition-colors font-mono text-sm tracking-wider"
                >
                  EXPLORE_LOOKBOOK
                </Link>
                <Link
                  href="/atelier"
                  className="text-[#00ff41]/70 hover:text-[#00ff41] transition-colors font-mono text-sm tracking-wider flex items-center"
                >
                  ATELIER_PROCESS
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
