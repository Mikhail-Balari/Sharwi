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
    <div className="relative flex items-center justify-center" style={{ width: "clamp(260px, 38vw, 440px)", height: "clamp(300px, 44vw, 500px)" }}>

      {/* Outer ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 60%, rgba(255,80,0,0.28) 0%, rgba(200,40,0,0.12) 40%, transparent 70%)",
        filter: "blur(30px)",
      }} />

      <svg
        viewBox="0 0 152 221"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
        aria-label="Sharwi logo"
      >
        <defs>
          {/* Crystal body fill — red-dark interior like the image */}
          <radialGradient id="crystalBody" cx="38%" cy="22%" r="75%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#ff4400" stopOpacity="0.55" />
            <stop offset="30%" stopColor="#cc2200" stopOpacity="0.40" />
            <stop offset="65%" stopColor="#220400" stopOpacity="0.70" />
            <stop offset="100%" stopColor="#080100" stopOpacity="0.85" />
          </radialGradient>

          {/* Outer edge bright glow — the hot orange-yellow rim */}
          <filter id="outerGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="14" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Inner line neon glow */}
          <filter id="neonLines" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b1" />
            <feGaussianBlur stdDeviation="7" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Specular highlight — bright reflection top-left */}
          <linearGradient id="specular" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,200,80,0.55)" />
            <stop offset="35%" stopColor="rgba(255,120,30,0.20)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>

          {/* Edge rim gradient — bright orange-yellow on edges */}
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB020" />
            <stop offset="30%" stopColor="#FF5500" />
            <stop offset="70%" stopColor="#CC2200" />
            <stop offset="100%" stopColor="#FF4400" />
          </linearGradient>

          <linearGradient id="linesGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6600" />
            <stop offset="50%" stopColor="#FFAA20" />
            <stop offset="100%" stopColor="#FF5500" />
          </linearGradient>

          <clipPath id="logoClip">
            <path d="M93.4443 11.2529C98.7389 9.31033 102.495 9.82307 105.624 11.4473C109.153 13.2793 112.993 17.1281 116.814 23.7764C124.517 37.1754 130.109 58.312 133.942 82.8447C141.514 131.304 141.567 188.296 141.222 210.864H11.3232C14.1123 190.246 21.2996 144.673 34.9766 101.647C41.8658 79.9747 50.272 59.3694 60.3398 43.0322C70.5159 26.5196 81.6412 15.5837 93.4443 11.2529Z"/>
          </clipPath>
        </defs>

        {/* === LAYER 1: Crystal body fill === */}
        <path
          d="M93.4443 11.2529C98.7389 9.31033 102.495 9.82307 105.624 11.4473C109.153 13.2793 112.993 17.1281 116.814 23.7764C124.517 37.1754 130.109 58.312 133.942 82.8447C141.514 131.304 141.567 188.296 141.222 210.864H11.3232C14.1123 190.246 21.2996 144.673 34.9766 101.647C41.8658 79.9747 50.272 59.3694 60.3398 43.0322C70.5159 26.5196 81.6412 15.5837 93.4443 11.2529Z"
          fill="url(#crystalBody)"
        />

        {/* === LAYER 2: Specular highlight — top-left bright area === */}
        <path
          d="M93.4443 11.2529C98.7389 9.31033 102.495 9.82307 105.624 11.4473C109.153 13.2793 112.993 17.1281 116.814 23.7764C124.517 37.1754 130.109 58.312 133.942 82.8447C141.514 131.304 141.567 188.296 141.222 210.864H11.3232C14.1123 190.246 21.2996 144.673 34.9766 101.647C41.8658 79.9747 50.272 59.3694 60.3398 43.0322C70.5159 26.5196 81.6412 15.5837 93.4443 11.2529Z"
          fill="url(#specular)"
          opacity="0.8"
        />

        {/* === LAYER 3: Outer rim — hot glowing edge === */}
        <path
          d="M93.4443 11.2529C98.7389 9.31033 102.495 9.82307 105.624 11.4473C109.153 13.2793 112.993 17.1281 116.814 23.7764C124.517 37.1754 130.109 58.312 133.942 82.8447C141.514 131.304 141.567 188.296 141.222 210.864H11.3232C14.1123 190.246 21.2996 144.673 34.9766 101.647C41.8658 79.9747 50.272 59.3694 60.3398 43.0322C70.5159 26.5196 81.6412 15.5837 93.4443 11.2529Z"
          stroke="url(#rimGrad)"
          strokeWidth="14"
          fill="none"
          filter="url(#outerGlow)"
          opacity="0.95"
        />

        {/* === LAYER 4: Inner rim — tighter bright line === */}
        <path
          d="M93.4443 11.2529C98.7389 9.31033 102.495 9.82307 105.624 11.4473C109.153 13.2793 112.993 17.1281 116.814 23.7764C124.517 37.1754 130.109 58.312 133.942 82.8447C141.514 131.304 141.567 188.296 141.222 210.864H11.3232C14.1123 190.246 21.2996 144.673 34.9766 101.647C41.8658 79.9747 50.272 59.3694 60.3398 43.0322C70.5159 26.5196 81.6412 15.5837 93.4443 11.2529Z"
          stroke="#FFB030"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />

        {/* === LAYER 5: Neon wave lines === */}
        <g filter="url(#neonLines)" clipPath="url(#logoClip)">
          <path d="M48 138.326C55.6368 149.317 105.149 126.317 117.5 136.826" stroke="url(#linesGrad)" strokeWidth="7" strokeLinecap="round" opacity="0.95"/>
          <path d="M48 154.326C55.6368 165.317 105.149 142.317 117.5 152.826" stroke="url(#linesGrad)" strokeWidth="7" strokeLinecap="round" opacity="0.95"/>
          <path d="M48 170.326C55.6368 181.317 105.149 158.317 117.5 168.826" stroke="url(#linesGrad)" strokeWidth="7" strokeLinecap="round" opacity="0.95"/>
        </g>

        {/* === LAYER 6: Top highlight arc — the bright white-orange reflection at top === */}
        <path
          d="M60 30 Q76 12 100 18"
          stroke="rgba(255,220,120,0.65)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          filter="url(#neonLines)"
        />
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
