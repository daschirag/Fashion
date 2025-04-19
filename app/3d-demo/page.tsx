"use client"

import { useState } from "react"
import CSS3DCube from "@/components/css-3d-cube"
import CSS3DText from "@/components/css-3d-text"
import CSS3DCard from "@/components/css-3d-card"
import CSS3DCarousel from "@/components/css-3d-carousel"
import CSS3DScene from "@/components/css-3d-scene"
import CSS3DParallax from "@/components/css-3d-parallax"
import CSS3DHologram from "@/components/css-3d-hologram"
import { usePerformance } from "@/contexts/performance-context"
import CyberButton from "@/components/cyber-button"
import SimpleDistressedText from "@/components/simple-distressed-text"
import StaticNoise from "@/components/static-noise"
import DistressedOverlay from "@/components/distressed-overlay"

export default function ThreeDDemoPage() {
  const { useWebGLEffects } = usePerformance()
  const [showWebGL, setShowWebGL] = useState(false)

  // Sample carousel items
  const carouselItems = [
    <div key="1" className="w-full h-full bg-black border border-[#00ff41] flex items-center justify-center">
      <span className="text-[#00ff41] font-mono text-xl">ITEM 1</span>
    </div>,
    <div key="2" className="w-full h-full bg-black border border-[#00ff41] flex items-center justify-center">
      <span className="text-[#00ff41] font-mono text-xl">ITEM 2</span>
    </div>,
    <div key="3" className="w-full h-full bg-black border border-[#00ff41] flex items-center justify-center">
      <span className="text-[#00ff41] font-mono text-xl">ITEM 3</span>
    </div>,
    <div key="4" className="w-full h-full bg-black border border-[#00ff41] flex items-center justify-center">
      <span className="text-[#00ff41] font-mono text-xl">ITEM 4</span>
    </div>,
  ]

  // Sample parallax layers
  const parallaxLayers = [
    {
      content: <div className="text-[#00ff41] font-mono text-5xl font-bold">CYBER</div>,
      depth: 0.2,
    },
    {
      content: <div className="text-[#ff00ff] font-mono text-5xl font-bold opacity-70">PUNK</div>,
      depth: 0.5,
    },
    {
      content: <div className="border border-[#00ffff] w-40 h-40 rounded-full opacity-20"></div>,
      depth: 0.8,
      scale: 1.5,
    },
    {
      content: <div className="border border-[#00ff41] w-60 h-60 rounded-full opacity-10"></div>,
      depth: 1,
      scale: 2,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Background effects */}
      <StaticNoise opacity={0.05} />
      <DistressedOverlay opacity={0.1} />

      {/* Header */}
      <header className="mb-12 text-center">
        <SimpleDistressedText
          text="CSS 3D EFFECTS"
          tag="h1"
          className="text-[#00ff41] text-4xl md:text-6xl font-mono font-bold tracking-tight mb-4"
        />
        <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm tracking-wider">
          PURE CSS ALTERNATIVES TO WEBGL 3D EFFECTS
        </p>
      </header>

      {/* Grid layout for components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
        {/* 3D Cube */}
        <div className="flex flex-col items-center">
          <h2 className="text-[#00ff41] font-mono text-xl mb-6">3D CUBE</h2>
          <CSS3DCube className="mb-4" />
          <p className="text-white/70 font-mono text-xs text-center mt-4">INTERACTIVE CUBE WITH DRAG ROTATION</p>
        </div>

        {/* 3D Text */}
        <div className="flex flex-col items-center">
          <h2 className="text-[#00ff41] font-mono text-xl mb-6">3D TEXT</h2>
          <CSS3DText text="CYBER" className="mb-4" />
          <p className="text-white/70 font-mono text-xs text-center mt-4">DEPTH-LAYERED TEXT WITH GLOW EFFECT</p>
        </div>

        {/* 3D Card */}
        <div className="flex flex-col items-center">
          <h2 className="text-[#00ff41] font-mono text-xl mb-6">3D CARD</h2>
          <CSS3DCard className="mb-4">
            <div className="flex flex-col items-center justify-center h-full p-6">
              <div className="text-[#00ff41] font-mono text-xl mb-4">TILT CARD</div>
              <p className="text-white/70 font-mono text-xs text-center">HOVER AND MOVE CURSOR TO SEE 3D EFFECT</p>
            </div>
          </CSS3DCard>
          <p className="text-white/70 font-mono text-xs text-center mt-4">PERSPECTIVE CARD WITH MOUSE TRACKING</p>
        </div>

        {/* 3D Carousel */}
        <div className="flex flex-col items-center">
          <h2 className="text-[#00ff41] font-mono text-xl mb-6">3D CAROUSEL</h2>
          <CSS3DCarousel items={carouselItems} className="h-[400px] mb-4" />
          <p className="text-white/70 font-mono text-xs text-center mt-4">ROTATING CAROUSEL WITH ITEMS IN 3D SPACE</p>
        </div>

        {/* 3D Scene */}
        <div className="flex flex-col items-center">
          <h2 className="text-[#00ff41] font-mono text-xl mb-6">3D SCENE</h2>
          <CSS3DScene className="w-full h-[300px] border border-[#00ff41]/30 mb-4">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="preserve-3d" style={{ transform: "translateZ(100px)" }}>
                <div className="text-[#00ff41] font-mono text-xl mb-4">FRONT LAYER</div>
              </div>
              <div className="preserve-3d" style={{ transform: "translateZ(0px)" }}>
                <div className="text-white/70 font-mono text-sm">MIDDLE LAYER</div>
              </div>
              <div className="preserve-3d" style={{ transform: "translateZ(-100px)" }}>
                <div className="text-white/30 font-mono text-xs">BACK LAYER</div>
              </div>
            </div>
          </CSS3DScene>
          <p className="text-white/70 font-mono text-xs text-center mt-4">INTERACTIVE 3D SCENE WITH DRAG ROTATION</p>
        </div>

        {/* 3D Parallax */}
        <div className="flex flex-col items-center">
          <h2 className="text-[#00ff41] font-mono text-xl mb-6">3D PARALLAX</h2>
          <CSS3DParallax layers={parallaxLayers} className="w-full h-[300px] border border-[#00ff41]/30 mb-4" />
          <p className="text-white/70 font-mono text-xs text-center mt-4">MOUSE-REACTIVE PARALLAX LAYERS</p>
        </div>

        {/* 3D Hologram */}
        <div className="flex flex-col items-center">
          <h2 className="text-[#00ff41] font-mono text-xl mb-6">3D HOLOGRAM</h2>
          <CSS3DHologram className="mb-4">
            <div className="text-[#00ffff] font-mono text-2xl">FD</div>
          </CSS3DHologram>
          <p className="text-white/70 font-mono text-xs text-center mt-4">ROTATING HOLOGRAM WITH SCANLINES</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-20 pb-10">
        <p className="text-white/50 font-mono text-xs mb-6">ALL EFFECTS CREATED WITH PURE CSS - NO WEBGL REQUIRED</p>
        <CyberButton onClick={() => window.history.back()}>RETURN_TO_MAIN</CyberButton>
      </footer>
    </div>
  )
}
