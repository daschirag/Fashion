"use client"

import Link from "next/link"
import ScrollReveal from "./scroll-reveal"
import StaggerReveal from "./stagger-reveal"
import VHSGlitch from "./vhs-glitch"
import { Instagram, Twitter, Youtube, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <ScrollReveal variant="fadeInUp" className="py-10 px-4 md:px-10 border-t border-[#00ff41]/20">
      <footer className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <VHSGlitch intensity="light">
              <Link href="/" className="text-xl font-mono text-[#00ff41] font-bold tracking-tighter mb-4 inline-block">
                FD_
              </Link>
            </VHSGlitch>
            <p className="text-white/50 font-mono text-xs tracking-wider mt-4">
              FASHION THAT DEFIES CONVENTION AND EMBRACES THE FUTURE.
            </p>
          </div>

          <div>
            <h3 className="text-[#00ff41] font-mono text-sm tracking-wider mb-4">EXPLORE</h3>
            <StaggerReveal direction="up" className="space-y-2" staggerDelay={0.05}>
              {[
                { name: "COLLECTIONS", path: "/collections" },
                { name: "LOOKBOOK", path: "/lookbook" },
                { name: "RUNWAY", path: "/runway" },
                { name: "ATELIER", path: "/atelier" },
              ].map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.path}
                    className="text-white/70 hover:text-[#00ff41] transition-colors font-mono text-xs tracking-wider"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </StaggerReveal>
          </div>

          <div>
            <h3 className="text-[#00ff41] font-mono text-sm tracking-wider mb-4">COMPANY</h3>
            <StaggerReveal direction="up" className="space-y-2" staggerDelay={0.05}>
              {[
                { name: "ABOUT", path: "/about" },
                { name: "CONTACT", path: "/contact" },
                { name: "PRESS", path: "/press" },
                { name: "CAREERS", path: "/careers" },
              ].map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.path}
                    className="text-white/70 hover:text-[#00ff41] transition-colors font-mono text-xs tracking-wider"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </StaggerReveal>
          </div>

          <div>
            <h3 className="text-[#00ff41] font-mono text-sm tracking-wider mb-4">CONNECT</h3>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#00ff41] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#00ff41] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#00ff41] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#00ff41] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </Link>
            </div>
            <p className="text-white/50 font-mono text-xs tracking-wider mt-4">
              SUBSCRIBE TO OUR NEWSLETTER FOR EXCLUSIVE UPDATES.
            </p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="EMAIL_ADDRESS"
                className="bg-black/50 border border-[#00ff41]/30 p-2 text-white font-mono text-xs focus:outline-none focus:border-[#00ff41] w-full"
              />
              <button className="bg-[#00ff41] text-black font-mono text-xs px-3 hover:bg-[#00ff41]/80 transition-colors">
                SEND
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#00ff41]/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 font-mono text-xs tracking-wider mb-4 md:mb-0">
            © {new Date().getFullYear()} FD_COLLECTIVE // ALL_RIGHTS_RESERVED
          </div>
          <div className="flex space-x-6">
            {["PRIVACY", "TERMS", "COOKIES"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-white/50 hover:text-[#00ff41] transition-colors font-mono text-xs tracking-wider"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </ScrollReveal>
  )
}
