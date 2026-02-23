"use client"

import { GlassCard } from "../glass-card"
import { BarChart3, Eye, Radio, Award } from "lucide-react"

const cards = [
  {
    icon: BarChart3,
    title: "No vanity metrics",
    desc: "Focus on real impact, not empty numbers that don't translate to business value.",
  },
  {
    icon: Eye,
    title: "Visibility without noise",
    desc: "Your work speaks for itself, without the need for constant self-promotion.",
  },
  {
    icon: Radio,
    title: "Signal, not performance",
    desc: "Authentic content that reflects genuine achievements, not manufactured personas.",
  },
  {
    icon: Award,
    title: "Objective proof",
    desc: "Documented results that build credibility over time.",
  },
]

function SharwiLogoSVG() {
  return (
    <svg
      viewBox="0 0 152 221"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={60}
      aria-label="Sharwi"
      style={{ filter: "drop-shadow(0 0 18px rgba(255,106,0,0.5))" }}
    >
      <path d="M48 138.326C55.6368 149.317 105.149 126.317 117.5 136.826" stroke="#FF6A00" strokeWidth="6" strokeLinecap="round"/>
      <path d="M48 154.326C55.6368 165.317 105.149 142.317 117.5 152.826" stroke="#FF6A00" strokeWidth="6" strokeLinecap="round"/>
      <path d="M48 170.326C55.6368 181.317 105.149 158.317 117.5 168.826" stroke="#FF6A00" strokeWidth="6" strokeLinecap="round"/>
      <path d="M93.4443 11.2529C98.7389 9.31033 102.495 9.82307 105.624 11.4473C109.153 13.2793 112.993 17.1281 116.814 23.7764C124.517 37.1754 130.109 58.312 133.942 82.8447C141.514 131.304 141.567 188.296 141.222 210.864H11.3232C14.1123 190.246 21.2996 144.673 34.9766 101.647C41.8658 79.9747 50.272 59.3694 60.3398 43.0322C70.5159 26.5196 81.6412 15.5837 93.4443 11.2529Z" stroke="#FF6A00" strokeWidth="18"/>
    </svg>
  )
}

export function WhySharwi() {
  return (
    <section id="why" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left column */}
          <div className="lg:w-[45%]">
            {/* Title + logo inline */}
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Why <span className="text-[#FF6A00]">Sharwi</span> exists
              </h2>
              <SharwiLogoSVG />
            </div>

            <div className="flex flex-col gap-5 text-[#9CA3AF] leading-relaxed">
              <p>
                The professional world is broken. Great work often goes
                unnoticed, while those who master self-promotion rise to the top.
                This creates a disconnect between actual value creation and
                perceived contribution.
              </p>
              <p>
                Sharwi changes this equation. We believe that real work should
                create real visibility, automatically, authentically, and without
                the burden of constant content creation.
              </p>
              <p>
                {"This isn't a social network or another content platform. It's a system that translates genuine professional achievements into compelling narratives that build reputation over time."}
              </p>
            </div>
          </div>

          {/* Right column - 2x2 grid */}
          <div className="lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cards.map((c) => (
              <GlassCard key={c.title} className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(255,106,0,0.2)" }}
                >
                  <c.icon size={22} className="text-[#FF6A00]" />
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2">
                  {c.title}
                </h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">
                  {c.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

