"use client"

import { useState } from "react"
import PageLayout from "@/components/page-layout"
import ScrollReveal from "@/components/scroll-reveal"
import StaggerReveal from "@/components/stagger-reveal"
import RevealImage from "@/components/reveal-image"
import VHSGlitch from "@/components/vhs-glitch"
import SimpleDistressedText from "@/components/simple-distressed-text"
import CSS3DCarousel from "@/components/css-3d-carousel"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePerformance } from "@/contexts/performance-context"

// Mock lookbook data
const lookbookImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=1200&width=800&text=LOOKBOOK+1",
    alt: "Model wearing deconstructed jacket",
    collection: "DECONSTRUCTED",
    description: "EXPOSED SEAM JACKET with RAW EDGE PANTS",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=1200&width=800&text=LOOKBOOK+2",
    alt: "Model in neon outfit",
    collection: "NEON DYSTOPIA",
    description: "CIRCUIT BOARD JACKET with NEON PIPED PANTS",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=1200&width=800&text=LOOKBOOK+3",
    alt: "Model in digital couture",
    collection: "DIGITAL COUTURE",
    description: "PIXEL PATTERN GOWN with 3D PRINTED ACCESSORIES",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=1200&width=800&text=LOOKBOOK+4",
    alt: "Model in urban warfare outfit",
    collection: "URBAN WARFARE",
    description: "TACTICAL VEST with CARGO PANTS",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=1200&width=800&text=LOOKBOOK+5",
    alt: "Model in synthetic evolution outfit",
    collection: "SYNTHETIC EVOLUTION",
    description: "BIOMIMETIC DRESS with EXOSKELETON DETAILS",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=1200&width=800&text=LOOKBOOK+6",
    alt: "Model in glitch couture",
    collection: "GLITCH COUTURE",
    description: "DISTORTED PATTERN SUIT with FRAGMENTED ACCESSORIES",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=1200&width=800&text=LOOKBOOK+7",
    alt: "Model in deconstructed outfit",
    collection: "DECONSTRUCTED",
    description: "INSIDE-OUT BLOUSE with UNFINISHED HEM SKIRT",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=1200&width=800&text=LOOKBOOK+8",
    alt: "Model in neon dystopia outfit",
    collection: "NEON DYSTOPIA",
    description: "HOLOGRAPHIC BODYSUIT with REFLECTIVE TRENCH",
  },
  {
    id: 9,
    src: "/placeholder.svg?height=1200&width=800&text=LOOKBOOK+9",
    alt: "Model in digital couture outfit",
    collection: "DIGITAL COUTURE",
    description: "AUGMENTED REALITY CAPE with GLITCH TEXTURE PANTS",
  },
]

export default function LookbookPage() {
  const [selectedImage, setSelectedImage] = useState<(typeof lookbookImages)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { useReducedMotion } = usePerformance()

  const openLightbox = (image: (typeof lookbookImages)[0], index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + lookbookImages.length) % lookbookImages.length
    setSelectedImage(lookbookImages[newIndex])
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % lookbookImages.length
    setSelectedImage(lookbookImages[newIndex])
    setCurrentIndex(newIndex)
  }

  // Create carousel items
  const carouselItems = lookbookImages.slice(0, 5).map((image) => (
    <div key={image.id} className="w-full h-full bg-black border border-[#00ff41]/30 overflow-hidden">
      <div className="relative h-full">
        <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
          <div className="text-[#00ff41] font-mono text-xs">{image.collection}</div>
          <div className="text-white/80 font-mono text-xs">{image.description}</div>
        </div>
      </div>
    </div>
  ))

  return (
    <PageLayout>
      <div className="py-20 px-4 md:px-10">
        <ScrollReveal variant="fadeInUp" className="mb-16 text-center">
          <VHSGlitch>
            <SimpleDistressedText
              text="LOOKBOOK"
              tag="h1"
              className="text-[#00ff41] text-4xl md:text-6xl font-mono font-bold tracking-tight mb-4"
            />
          </VHSGlitch>
          <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm tracking-wider">
            VISUAL EXPLORATION OF OUR COLLECTIONS. CLICK ON ANY IMAGE TO VIEW DETAILS.
          </p>
        </ScrollReveal>

        {/* Featured Carousel */}
        <section className="mb-24">
          <ScrollReveal variant="fadeInUp" className="mb-10">
            <h2 className="text-[#00ff41] text-2xl font-mono tracking-tight inline-block border-b border-[#00ff41]/30 pb-2">
              FEATURED_LOOKS
            </h2>
          </ScrollReveal>

          <div className="h-[500px] md:h-[600px]">
            <CSS3DCarousel
              items={carouselItems}
              radius={useReducedMotion ? 200 : 300}
              autoRotate={!useReducedMotion}
              rotationSpeed={8000}
              itemWidth={300}
              itemHeight={450}
            />
          </div>
        </section>

        {/* Lookbook Grid */}
        <section>
          <ScrollReveal variant="fadeInUp" className="mb-10">
            <h2 className="text-[#00ff41] text-2xl font-mono tracking-tight inline-block border-b border-[#00ff41]/30 pb-2">
              FULL_LOOKBOOK
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {lookbookImages.map((image, index) => (
              <div key={image.id} className="cursor-pointer group" onClick={() => openLightbox(image, index)}>
                <div className="bg-black/50 border border-[#00ff41]/20 overflow-hidden group-hover:border-[#00ff41]/50 transition-colors">
                  <RevealImage src={image.src} alt={image.alt} className="aspect-[2/3]" effect="fade" />
                  <div className="p-4">
                    <div className="text-[#00ff41] font-mono text-xs">{image.collection}</div>
                    <div className="text-white/80 font-mono text-xs truncate">{image.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <button
                className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  closeLightbox()
                }}
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 bg-black/50 p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 bg-black/50 p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              <motion.div
                className="relative max-w-4xl max-h-[80vh] w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: useReducedMotion ? 0.1 : 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                  <div className="text-[#00ff41] font-mono text-sm">{selectedImage.collection}</div>
                  <div className="text-white/80 font-mono text-sm">{selectedImage.description}</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  )
}
