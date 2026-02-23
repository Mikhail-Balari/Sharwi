"use client"

import { ArrowRight } from "lucide-react"
import { trackHeroRequestDemo, trackHeroSeeHowItWorks } from "@/lib/analytics"

function WireframeMesh() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={`d1-${i}`}
          x1={`${i * 10}%`}
          y1="0"
          x2={`${i * 10 + 30}%`}
          y2="100%"
          stroke="rgba(255,100,0,0.08)"
          strokeWidth="0.8"
        />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={`d2-${i}`}
          x1={`${100 - i * 10}%`}
          y1="0"
          x2={`${70 - i * 10}%`}
          y2="100%"
          stroke="rgba(255,100,0,0.06)"
          strokeWidth="0.8"
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="0"
          y1={`${20 + i * 15}%`}
          x2="100%"
          y2={`${20 + i * 15}%`}
          stroke="rgba(255,100,0,0.04)"
          strokeWidth="0.5"
        />
      ))}
      {[
        [15, 25], [35, 40], [55, 20], [75, 55], [25, 70], [65, 75],
        [45, 50], [85, 30], [10, 50], [90, 65],
      ].map(([cx, cy], i) => (
        <circle
          key={`node-${i}`}
          cx={`${cx}%`}
          cy={`${cy}%`}
          r="1.5"
          fill="rgba(255,100,0,0.2)"
        />
      ))}
    </svg>
  )
}

function HeroLogo() {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="absolute"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255,100,0,0.35) 0%, transparent 65%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <svg
        className="absolute"
        width="420"
        height="420"
        viewBox="0 0 420 420"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        aria-hidden="true"
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180
          const x1 = 210 + Math.cos(angle) * 90
          const y1 = 210 + Math.sin(angle) * 90
          const x2 = 210 + Math.cos(angle) * 200
          const y2 = 210 + Math.sin(angle) * 200
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,100,0,0.2)"
              strokeWidth="0.8"
            />
          )
        })}
        <circle cx="210" cy="210" r="130" fill="none" stroke="rgba(255,100,0,0.1)" strokeWidth="0.8" />
        <circle cx="210" cy="210" r="180" fill="none" stroke="rgba(255,100,0,0.06)" strokeWidth="0.5" />
      </svg>
      <svg
        viewBox="0 0 152 221"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative logo-glow"
        style={{ width: "auto", height: "clamp(200px, 30vw, 380px)" }}
        aria-label="Sharwi logo"
      >
        <path d="M48 138.326C55.6368 149.317 105.149 126.317 117.5 136.826" stroke="#FF6A00" strokeWidth="6" strokeLinecap="round"/>
        <path d="M48 154.326C55.6368 165.317 105.149 142.317 117.5 152.826" stroke="#FF6A00" strokeWidth="6" strokeLinecap="round"/>
        <path d="M48 170.326C55.6368 181.317 105.149 158.317 117.5 168.826" stroke="#FF6A00" strokeWidth="6" strokeLinecap="round"/>
        <path d="M93.4443 11.2529C98.7389 9.31033 102.495 9.82307 105.624 11.4473C109.153 13.2793 112.993 17.1281 116.814 23.7764C124.517 37.1754 130.109 58.312 133.942 82.8447C141.514 131.304 141.567 188.296 141.222 210.864H11.3232C14.1123 190.246 21.2996 144.673 34.9766 101.647C41.8658 79.9747 50.272 59.3694 60.3398 43.0322C70.5159 26.5196 81.6412 15.5837 93.4443 11.2529Z" stroke="#FF6A00" strokeWidth="18"/>
      </svg>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8.5" stroke="rgba(255,106,0,0.5)" strokeWidth="1" />
      <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function HeroSection({ onRequestDemo }: { onRequestDemo: () => void }) {
  const handleRequestDemo = () => {
    trackHeroRequestDemo()
    onRequestDemo()
  }

  return (
    <section id="top" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden" style={{ position: "relative", zIndex: 3 }}>
      <WireframeMesh />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* LEFT — Logo */}
          <div className="lg:w-[45%] flex items-center justify-center">
            <HeroLogo />
          </div>
          {/* RIGHT — Text */}
          <div className="lg:w-[55%]">
            <div
              className="inline-flex items-center px-5 py-2 rounded-full text-sm text-[#D1D5DB] mb-6"
              style={{
                background: "rgba(20,14,8,0.65)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,106,0,0.15)",
              }}
            >
              {"Backed by RLM AI \u2022 Trusted by Enterprise"}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 text-white text-balance" style={{ letterSpacing: "-0.03em" }}>
              Real work deserves
              <br />
              <span className="text-[#FF6A00]">real visibility.</span>
            </h1>
            <div
              className="mb-6"
              style={{
                width: "300px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, #FF6A00, transparent)",
              }}
            />
            <p className="text-lg text-[#9CA3AF] max-w-lg mb-8 leading-relaxed font-light">
              Sharwi transforms everyday work into{" "}
              <span className="text-[#FF6A00]">visible impact</span>, for professionals
              and the <span className="text-[#FF6A00]">organizations</span> they power.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
              <button
                onClick={handleRequestDemo}
                className="group flex items-center gap-2 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(255,106,0,0.4)]"
                style={{ background: "#FF6A00", borderRadius: "10px" }}
              >
                Request Demo
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <a
                href="#how-it-works"
                onClick={trackHeroSeeHowItWorks}
                className="px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,106,0,0.25)",
                  borderRadius: "10px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,106,0,0.6)"
                  e.currentTarget.style.boxShadow = "0 0 16px rgba(255,106,0,0.15)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,106,0,0.25)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                See How it Works
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#9CA3AF]">
              {["No credit card required", "Setup in minutes", "Enterprise-ready"].map((item, i) => (
                <span key={item} className="flex items-center gap-2">
                  {i > 0 && <span className="text-[rgba(255,106,0,0.3)] mr-2">|</span>}
                  <CheckIcon />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
