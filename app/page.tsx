import SplashScreen from "@/components/splash-screen"
import MainContent from "@/components/main-content"
import { SplashProvider } from "@/components/splash-context"
import ScrollProgress from "@/components/scroll-progress"
import PerformanceToggle from "@/components/performance-toggle"
import ScrollReveal from "@/components/scroll-reveal"
import VHSGlitch from "@/components/vhs-glitch"
import SimpleDistressedText from "@/components/simple-distressed-text"
import StaggerReveal from "@/components/stagger-reveal"
import RevealImage from "@/components/reveal-image"
import Link from "next/link"
import CyberButton from "@/components/cyber-button"

export default function Home() {
  return (
    <SplashProvider>
      <ScrollProgress />
      <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
        <SplashScreen />
        <MainContent />
        {/* Featured Products */}
        <section className="py-20 px-4 md:px-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/80 z-0"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 z-0"></div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <ScrollReveal variant="fadeInUp" className="mb-16 text-center">
              <VHSGlitch>
                <SimpleDistressedText
                  text="FEATURED PRODUCTS"
                  tag="h2"
                  className="text-[#00ff41] text-3xl md:text-5xl font-mono font-bold tracking-tight mb-4"
                />
              </VHSGlitch>
              <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm tracking-wider">
                EXPLORE OUR LATEST DESIGNS THAT PUSH THE BOUNDARIES OF FASHION
              </p>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.1}>
              <Link href="/shop/pink-fury-jacket">
                <div className="bg-black/50 border border-[#00ff41]/20 overflow-hidden group hover:border-[#00ff41]/50 transition-colors h-full flex flex-col">
                  <RevealImage
                    src="/images/pink-jacket.png"
                    alt="Pink Fury Jacket"
                    className="aspect-[3/4]"
                    effect="fade"
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[#00ff41] font-mono text-sm">PINK FURY JACKET</h3>
                      <span className="text-white/80 font-mono text-sm">$1,200</span>
                    </div>
                    <p className="text-white/60 font-mono text-xs mb-2">NEON DYSTOPIA</p>
                    <p className="text-white/70 font-mono text-xs mb-4 flex-1">
                      Vibrant pink leather jacket with luxurious fur cuffs
                    </p>
                    <span className="text-[#00ff41]/70 font-mono text-xs group-hover:text-[#00ff41] transition-colors">
                      SHOP NOW →
                    </span>
                  </div>
                </div>
              </Link>

              <Link href="/shop/maniac-leather-jacket">
                <div className="bg-black/50 border border-[#00ff41]/20 overflow-hidden group hover:border-[#00ff41]/50 transition-colors h-full flex flex-col">
                  <RevealImage
                    src="/images/maniac-jacket.png"
                    alt="Maniac Leather Jacket"
                    className="aspect-[3/4]"
                    effect="fade"
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[#00ff41] font-mono text-sm">MANIAC LEATHER JACKET</h3>
                      <span className="text-white/80 font-mono text-sm">$1,450</span>
                    </div>
                    <p className="text-white/60 font-mono text-xs mb-2">URBAN WARFARE</p>
                    <p className="text-white/70 font-mono text-xs mb-4 flex-1">
                      Black leather jacket with bold red MANIAC graphic
                    </p>
                    <span className="text-[#00ff41]/70 font-mono text-xs group-hover:text-[#00ff41] transition-colors">
                      SHOP NOW →
                    </span>
                  </div>
                </div>
              </Link>

              <Link href="/shop/mihaela-tote-bag">
                <div className="bg-black/50 border border-[#00ff41]/20 overflow-hidden group hover:border-[#00ff41]/50 transition-colors h-full flex flex-col">
                  <RevealImage
                    src="/images/orange-bag.png"
                    alt="Mihaela Tote Bag"
                    className="aspect-[3/4]"
                    effect="fade"
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[#00ff41] font-mono text-sm">MIHAELA TOTE BAG</h3>
                      <span className="text-white/80 font-mono text-sm">$850</span>
                    </div>
                    <p className="text-white/60 font-mono text-xs mb-2">DIGITAL COUTURE</p>
                    <p className="text-white/70 font-mono text-xs mb-4 flex-1">
                      Vibrant orange designer tote with signature branding
                    </p>
                    <span className="text-[#00ff41]/70 font-mono text-xs group-hover:text-[#00ff41] transition-colors">
                      SHOP NOW →
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerReveal>

            <div className="mt-12 text-center">
              <Link href="/shop">
                <CyberButton>VIEW ALL PRODUCTS</CyberButton>
              </Link>
            </div>
          </div>
        </section>
        <PerformanceToggle />
      </main>
    </SplashProvider>
  )
}
