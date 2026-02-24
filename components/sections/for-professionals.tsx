"use client"

import { GlassCard } from "../glass-card"
import { Eye, Award, Send } from "lucide-react"
import { trackForProfessionalsRequestDemo } from "@/lib/analytics"

const cards = [
  {
    icon: Eye,
    title: "Make your work visible",
    desc: "Document real contribution. Structure your impact. Build visible proof of your value.",
  },
  {
    icon: Award,
    title: "Build reputation with substance",
    desc: "No vanity metrics. No performance theater. Only structured impact that speaks for itself.",
  },
  {
    icon: Send,
    title: "Share without pressure",
    desc: "Sharwi handles the translation from work to content. You decide what goes out and when.",
  },
]

export function ForProfessionals({ onRequestDemo }: { onRequestDemo: () => void }) {
  const handleRequestDemo = () => {
    trackForProfessionalsRequestDemo()
    onRequestDemo()
  }

  return (
    <section id="for-professionals" className="py-20" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance" style={{ letterSpacing: "-0.03em" }}>
          For Professionals Who Create <span style={{ color: "#FF6A00" }}>Real Value</span>
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          If your work speaks louder than your self-promotion, Sharwi captures the signal behind the silence.
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
