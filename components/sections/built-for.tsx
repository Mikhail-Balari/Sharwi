"use client"

import { GlassCard } from "../glass-card"
import { Building2, Users, TrendingUp, Briefcase } from "lucide-react"

const cards = [
  {
    icon: Building2,
    title: "Founders & CEOs",
    desc: "Lead by example. Build your company's narrative through authentic founder content.",
  },
  {
    icon: Users,
    title: "Team Leaders",
    desc: "Empower your team's voice while maintaining alignment with organizational goals.",
  },
  {
    icon: TrendingUp,
    title: "Growth Professionals",
    desc: "Accelerate career growth through documented achievements and visible impact.",
  },
  {
    icon: Briefcase,
    title: "Individual Contributors",
    desc: "Let your work speak louder. Build reputation based on substance, not noise.",
  },
]

export function BuiltFor() {
  return (
    <section className="py-20" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance">
          Built for professionals who{" "}
          <span className="text-[#FF6A00]">value substance</span>
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          {"Whether you're building a company, leading a team, or growing your career, Sharwi helps your work speak for itself."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
    </section>
  )
}
