"use client"

import { GlassCard } from "../glass-card"
import { Building2, PenLine, TrendingDown } from "lucide-react"

const stats = [
  {
    icon: Building2,
    stat: "47.9%",
    title: "of companies have no Employee Advocacy program",
    desc: "Traditional programs fail due to complexity, time, and lack of engagement",
  },
  {
    icon: PenLine,
    stat: "98%",
    title: "of LinkedIn users don't create content regularly",
    desc: "Employees don't have time or don't know what to post",
  },
  {
    icon: TrendingDown,
    stat: "10x",
    title: "lower engagement on company posts vs. employee posts",
    desc: "Yet most companies can't activate their workforce",
  },
]

export function AdvocacyBroken() {
  return (
    <section className="py-20" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance">
          <span className="text-[#FF6A00]">Employee Advocacy</span>{" "}
          is broken
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-xl mx-auto mb-12">
          {"The data tells a clear story: traditional approaches don't work"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <GlassCard key={s.stat} className="text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(255,106,0,0.15)" }}
              >
                <s.icon size={22} className="text-[#FF6A00]" />
              </div>
              <p className="text-4xl sm:text-5xl font-extrabold text-[#FF6A00] mb-3">
                {s.stat}
              </p>
              <h3 className="font-display text-base font-bold text-white mb-2">
                {s.title}
              </h3>
              <p className="text-[#9CA3AF] text-sm italic">{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
