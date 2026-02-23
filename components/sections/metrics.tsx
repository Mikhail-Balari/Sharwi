"use client"

import { GlassCard } from "../glass-card"
import { TrendingUp, Users, Eye, Globe } from "lucide-react"

const metrics = [
  {
    icon: TrendingUp,
    stat: "10x",
    title: "Higher Engagement",
    desc: "Employee posts drive significantly more engagement than brand accounts.",
  },
  {
    icon: Users,
    stat: "561%",
    title: "Extended Reach",
    desc: "Messages shared by employees reach 561% further than brand channels.",
  },
  {
    icon: Eye,
    stat: "8x",
    title: "More Visibility",
    desc: "Employee advocacy increases content visibility by 8x on average.",
  },
  {
    icon: Globe,
    stat: "14%",
    title: "Revenue Impact",
    desc: "Companies with advocacy programs see 14% increase in revenue.",
  },
]

export function MetricsSection() {
  return (
    <section id="metrics" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance">
          Measurable <span className="text-[#FF6A00]">Business Impact</span>
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          The numbers speak for themselves. Employee advocacy delivers real,
          measurable results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <GlassCard key={m.title} className="text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(255,106,0,0.2)" }}
              >
                <m.icon size={22} className="text-[#FF6A00]" />
              </div>
              <p
                className="font-extrabold text-[#FF6A00] mb-2"
                style={{ fontSize: "52px", lineHeight: "1" }}
              >
                {m.stat}
              </p>
              <h3 className="font-bold text-white mb-2">{m.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                {m.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
