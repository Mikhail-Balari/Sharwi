"use client"

import { GlassCard } from "../glass-card"
import { HandHeart, ShieldCheck, Eye, Lock, Fingerprint } from "lucide-react"

const principles = [
  {
    icon: HandHeart,
    title: "Voluntary participation",
    desc: "Employees choose what to share. Always.",
  },
  {
    icon: ShieldCheck,
    title: "No manipulation",
    desc: "AI adapts content, never fabricates it.",
  },
  {
    icon: Eye,
    title: "Full transparency",
    desc: "Employees see and approve everything before it's published.",
  },
  {
    icon: Lock,
    title: "Privacy first",
    desc: "Personal data stays personal. Company sees aggregate metrics only.",
  },
  {
    icon: Fingerprint,
    title: "Authentic voice",
    desc: "Content matches each person's professional style.",
  },
]

export function PrinciplesSection() {
  return (
    <section id="principles" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance">
          Built on <span className="text-[#FF6A00]">trust</span> and{" "}
          <span className="text-[#FF6A00]">transparency</span>
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-xl mx-auto mb-14">
          Our core principles guide everything we build
        </p>

        {/* 3 + 2 layout */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {principles.slice(0, 3).map((p) => (
              <GlassCard key={p.title} className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(255,106,0,0.15)" }}
                >
                  <p.icon size={22} className="text-[#FF6A00]" />
                </div>
                <h3 className="font-display font-bold text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">
                  {p.desc}
                </p>
              </GlassCard>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
            {principles.slice(3).map((p) => (
              <GlassCard key={p.title} className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(255,106,0,0.15)" }}
                >
                  <p.icon size={22} className="text-[#FF6A00]" />
                </div>
                <h3 className="font-display font-bold text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">
                  {p.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
