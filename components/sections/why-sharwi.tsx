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

export function WhySharwi() {
  return (
    <section id="why" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left column */}
          <div className="lg:w-[45%]">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-8">
              Why <span className="text-[#FF6A00]">Sharwi</span> exists
            </h2>

            {/* Logo accent */}
            <div className="mb-8">
              <img
                src="/logo.svg"
                alt="Sharwi logo"
                width={70}
                height={70}
                style={{
                  filter: "drop-shadow(0 0 18px rgba(255,106,0,0.4))",
                }}
              />
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
