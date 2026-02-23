"use client"

import { GlassCard } from "../glass-card"
import { Award, Zap, Users, TrendingUp } from "lucide-react"

const cards = [
  {
    icon: Award,
    title: "Performance Recognition",
    desc: "Document achievements as they happen, creating a permanent record of value creation.",
  },
  {
    icon: Zap,
    title: "Talent Development",
    desc: "Help employees build professional presence that opens doors to new opportunities.",
  },
  {
    icon: Users,
    title: "Culture Amplification",
    desc: "Turn internal wins into external credibility that attracts aligned talent.",
  },
  {
    icon: TrendingUp,
    title: "Career Advancement",
    desc: "Create verifiable track records that support promotions and career transitions.",
  },
]

export function ReputationSection() {
  return (
    <section className="py-20" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance">
          Beyond Advocacy: Building{" "}
          <span className="text-[#FF6A00]">Professional Reputation</span>
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Sharwi goes beyond traditional advocacy to create lasting professional
          value.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => (
            <GlassCard
              key={c.title}
              className="text-center"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(255,106,0,0.2)" }}
              >
                <c.icon size={22} className="text-[#FF6A00]" />
              </div>
              <h3 className="font-bold text-white mb-2">{c.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                {c.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
