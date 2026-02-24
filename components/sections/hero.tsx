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
  const shape = "M93.4443 11.2529C98.7389 9.31033 102.495 9.82307 105.624 11.4473C109.153 13.2793 112.993 17.1281 116.814 23.7764C124.517 37.1754 130.109 58.312 133.942 82.8447C141.514 131.304 141.567 188.296 141.222 210.864H11.3232C14.1123 190.246 21.2996 144.673 34.9766 101.647C41.8658 79.9747 50.272 59.3694 60.3398 43.0322C70.5159 26.5196 81.6412 15.5837 93.4443 11.2529Z"

  return (
    <div className="relative flex items-center justify-center" style={{ width: "clamp(260px, 36vw, 420px)", height: "clamp(300px, 44vw, 500px)" }}>

      {/* Big ambient glow behind */}
      <div className="absolute pointer-events-none" style={{
        width: "130%", height: "130%",
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        background: "radial-gradient(ellipse at 50% 55%, rgba(255,80,0,0.45) 0%, rgba(200,30,0,0.20) 45%, transparent 70%)",
        filter: "blur(40px)",
      }} />

      <svg
        viewBox="0 0 152 221"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible", position: "relative" }}
        aria-label="Sharwi logo"
      >
        <defs>
          {/* Dark red-orange interior fill */}
          <radialGradient id="bodyFill" cx="45%" cy="30%" r="80%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#aa2200" stopOpacity="0.85" />
            <stop offset="40%"  stopColor="#661000" stopOpacity="0.80" />
            <stop offset="80%"  stopColor="#1a0400" stopOpacity="0.90" />
            <stop offset="100%" stopColor="#080100" stopOpacity="0.95" />
          </radialGradient>

          {/* Rim glow gradient: yellow at top, orange on sides, red-orange at bottom */}
          <linearGradient id="rimGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%"   stopColor="#FFD060" />
            <stop offset="20%"  stopColor="#FF7700" />
            <stop offset="60%"  stopColor="#FF3300" />
            <stop offset="100%" stopColor="#FF5500" />
          </linearGradient>

          {/* Lines gradient: yellow center, orange edges */}
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#FF6600" />
            <stop offset="40%"  stopColor="#FFD060" />
            <stop offset="70%"  stopColor="#FF8800" />
            <stop offset="100%" stopColor="#FF5500" />
          </linearGradient>

          {/* Outer big glow filter */}
          <filter id="bigGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="b1"/>
            <feGaussianBlur stdDeviation="20" result="b2"/>
            <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* Medium glow filter */}
          <filter id="medGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="b1"/>
            <feGaussianBlur stdDeviation="8" result="b2"/>
            <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* Line neon glow */}
          <filter id="lineGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b1"/>
            <feGaussianBlur stdDeviation="6" result="b2"/>
            <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <clipPath id="shapeClip">
            <path d={shape}/>
          </clipPath>
        </defs>

        {/* === 1: Dark body fill === */}
        <path d={shape} fill="url(#bodyFill)" />

        {/* === 2: Outer rim — thick glowing stroke (big glow) === */}
        <path d={shape} stroke="url(#rimGrad)" strokeWidth="22" fill="none"
          filter="url(#bigGlow)" opacity="0.9" />

        {/* === 3: Outer rim — medium stroke for definition === */}
        <path d={shape} stroke="url(#rimGrad)" strokeWidth="10" fill="none"
          filter="url(#medGlow)" opacity="0.95" />

        {/* === 4: Inner concentric ring — offset inward === */}
        <path d={shape} stroke="#FF9920" strokeWidth="3" fill="none"
          strokeDasharray="0"
          style={{ transform: "scale(0.87) translate(10px, 14px)", transformOrigin: "76px 110px" }}
          filter="url(#medGlow)" opacity="0.75" />

        {/* === 5: Brightest inner ring — thin yellow line === */}
        <path d={shape} stroke="#FFE060" strokeWidth="1.5" fill="none"
          style={{ transform: "scale(0.87) translate(10px, 14px)", transformOrigin: "76px 110px" }}
          opacity="0.65" />

        {/* === 6: Top specular arc — white-yellow highlight at apex === */}
        <path d="M58 28 Q76 10 102 20" stroke="#FFE8A0" strokeWidth="3.5"
          fill="none" strokeLinecap="round"
          filter="url(#medGlow)" opacity="0.85" />
        <path d="M62 30 Q76 14 99 22" stroke="white" strokeWidth="1"
          fill="none" strokeLinecap="round" opacity="0.7" />

        {/* === 7: Wave lines — thick neon with glow, clipped inside shape === */}
        <g clipPath="url(#shapeClip)">
          {/* Glow layer */}
          <g filter="url(#lineGlow)" opacity="0.9">
            <path d="M44 136C52 148 106 124 120 135" stroke="url(#lineGrad)" strokeWidth="10" strokeLinecap="round"/>
            <path d="M44 153C52 165 106 141 120 152" stroke="url(#lineGrad)" strokeWidth="10" strokeLinecap="round"/>
            <path d="M44 170C52 182 106 158 120 169" stroke="url(#lineGrad)" strokeWidth="10" strokeLinecap="round"/>
          </g>
          {/* Bright core */}
          <path d="M44 136C52 148 106 124 120 135" stroke="#FFD060" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
          <path d="M44 153C52 165 106 141 120 152" stroke="#FFD060" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
          <path d="M44 170C52 182 106 158 120 169" stroke="#FFD060" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
        </g>
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
