"use client"

import { useState } from "react"
import PageLayout from "@/components/page-layout"
import ScrollReveal from "@/components/scroll-reveal"
import StaggerReveal from "@/components/stagger-reveal"
import RevealImage from "@/components/reveal-image"
import VHSGlitch from "@/components/vhs-glitch"
import SimpleDistressedText from "@/components/simple-distressed-text"
import CyberButton from "@/components/cyber-button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { usePerformance } from "@/contexts/performance-context"

// Mock runway shows data
const runwayShows = [
  {
    id: 1,
    title: "DECONSTRUCTED SS23",
    date: "SEPTEMBER 2022",
    location: "PARIS FASHION WEEK",
    description:
      "The groundbreaking debut of our DECONSTRUCTED collection, challenging conventional fashion norms with raw, unfiltered designs.",
    thumbnail: "/placeholder.svg?height=720&width=1280&text=DECONSTRUCTED+RUNWAY",
    videoUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "NEON DYSTOPIA FW23",
    date: "FEBRUARY 2023",
    location: "MILAN FASHION WEEK",
    description:
      "A futuristic showcase illuminating the runway with cyberpunk-inspired designs that blur the line between fashion and technology.",
    thumbnail: "/placeholder.svg?height=720&width=1280&text=NEON+DYSTOPIA+RUNWAY",
    videoUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "DIGITAL COUTURE SS22",
    date: "SEPTEMBER 2021",
    location: "NEW YORK FASHION WEEK",
    description:
      "The revolutionary presentation that merged physical and digital fashion, setting new standards for haute couture in the digital age.",
    thumbnail: "/placeholder.svg?height=720&width=1280&text=DIGITAL+COUTURE+RUNWAY",
    videoUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "URBAN WARFARE FW22",
    date: "FEBRUARY 2022",
    location: "LONDON FASHION WEEK",
    description:
      "A tactical approach to high fashion, presenting utilitarian designs reimagined for the modern urban landscape.",
    thumbnail: "/placeholder.svg?height=720&width=1280&text=URBAN+WARFARE+RUNWAY",
    videoUrl: "#",
    featured: false,
  },
]

export default function RunwayPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const { useReducedMotion } = usePerformance()

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <PageLayout>
      <div className="py-20 px-4 md:px-10">
        <ScrollReveal variant="fadeInUp" className="mb-16 text-center">
          <VHSGlitch>
            <SimpleDistressedText
              text="RUNWAY"
              tag="h1"
              className="text-[#00ff41] text-4xl md:text-6xl font-mono font-bold tracking-tight mb-4"
            />
          </VHSGlitch>
          <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm tracking-wider">
            EXPERIENCE OUR REVOLUTIONARY FASHION SHOWS THAT CHALLENGE INDUSTRY NORMS.
          </p>
        </ScrollReveal>

        {/* Featured Runway Show */}
        <section className="mb-24">
          <ScrollReveal variant="fadeInUp" className="mb-10">
            <h2 className="text-[#00ff41] text-2xl font-mono tracking-tight inline-block border-b border-[#00ff41]/30 pb-2">
              LATEST_SHOW
            </h2>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-video bg-black/50 border border-[#00ff41]/30 overflow-hidden mb-6">
              <RevealImage
                src={runwayShows[0].thumbnail}
                alt={runwayShows[0].title}
                className="w-full h-full"
                effect="fade"
              />

              {/* Video controls */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="bg-[#00ff41]/20 hover:bg-[#00ff41]/30 border border-[#00ff41] rounded-full p-4 transition-colors"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white" />}
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 flex justify-between items-center">
                <div>
                  <div className="text-[#00ff41] font-mono text-sm">{runwayShows[0].title}</div>
                  <div className="text-white/80 font-mono text-xs">
                    {runwayShows[0].location} | {runwayShows[0].date}
                  </div>
                </div>
                <button
                  onClick={toggleMute}
                  className="text-white/80 hover:text-white"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                <div className="h-full bg-[#00ff41]" style={{ width: isPlaying ? "35%" : "0%" }}></div>
              </div>
            </div>

            <div className="bg-black/50 border border-[#00ff41]/20 p-6">
              <p className="text-white/80 font-mono text-sm mb-6">{runwayShows[0].description}</p>
              <div className="flex flex-wrap gap-4">
                <CyberButton size="sm">FULL_SHOW</CyberButton>
                <CyberButton variant="secondary" size="sm">
                  BEHIND_THE_SCENES
                </CyberButton>
                <CyberButton variant="secondary" size="sm">
                  COLLECTION_DETAILS
                </CyberButton>
              </div>
            </div>
          </div>
        </section>

        {/* Past Runway Shows */}
        <section>
          <ScrollReveal variant="fadeInUp" className="mb-10">
            <h2 className="text-[#00ff41] text-2xl font-mono tracking-tight inline-block border-b border-[#00ff41]/30 pb-2">
              PAST_SHOWS
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.15}>
            {runwayShows.slice(1).map((show) => (
              <div
                key={show.id}
                className="bg-black/50 border border-[#00ff41]/20 overflow-hidden group hover:border-[#00ff41]/50 transition-colors"
              >
                <div className="relative aspect-video">
                  <RevealImage src={show.thumbnail} alt={show.title} className="w-full h-full" effect="fade" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button
                      className="bg-[#00ff41]/20 hover:bg-[#00ff41]/30 border border-[#00ff41] rounded-full p-3 transition-colors"
                      aria-label="Play video"
                    >
                      <Play size={20} className="text-white" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[#00ff41] font-mono text-lg tracking-tight mb-1">{show.title}</h3>
                  <div className="text-white/60 font-mono text-xs mb-3">
                    {show.location} | {show.date}
                  </div>
                  <p className="text-white/80 font-mono text-sm mb-4">{show.description}</p>
                  <CyberButton size="sm">VIEW_SHOW</CyberButton>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </section>
      </div>
    </PageLayout>
  )
}
