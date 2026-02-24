"use client"

import { GlassCard } from "../glass-card"
import { Users, BookOpen, BarChart3 } from "lucide-react"
import { trackForCompaniesRequestDemo } from "@/lib/analytics"

const cards = [
  {
    icon: Users,
    title: "Activate employee expertise",
    desc: "Turn your team's real work into authentic brand content. No forcing, no scripting.",
  },
  {
    icon: BookOpen,
    title: "Capture internal knowledge",
    desc: "Contributions, decisions, coordination efforts — all documented and structured.",
  },
  {
    icon: BarChart3,
    title: "Measure real impact transparently",
    desc: "Understand who truly drives value. Data beyond surface metrics.",
  },
]

export function ForCompanies({ onRequestDemo }: { onRequestDemo: () => void }) {
  const handleRequestDemo = () => {
    trackForCompaniesRequestDemo()
    onRequestDemo()
  }

  return (
    <section id="for-companies" className="py-20" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance" style={{ letterSpacing: "-0.03em" }}>
          For Companies That Want <span style={{ color: "#FF6A00" }}>Authentic Advocacy</span>
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          Sharwi provides structured visibility into contribution patterns, collaboration depth, and performance signals beyond surface KPIs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {cards.map((c) => (
            <GlassCard key={c.title} className="text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(255,106,0,0.15)" }}
              >
                <c.icon size={22} className="text-[#FF6A00]" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{c.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{c.desc}</p>
            </GlassCard>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={handleRequestDemo}
            className="px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(255,106,0,0.4)]"
            style={{ background: "#FF6A00" }}
          >
            Request Demo
          </button>
        </div>
      </div>
    </section>
  )
}
