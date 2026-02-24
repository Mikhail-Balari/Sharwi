"use client"

import { GlassCard } from "../glass-card"
import { EyeOff, Volume2, Theater } from "lucide-react"

const problems = [
  { icon: EyeOff,   text: "Most professional value remains invisible." },
  { icon: Volume2,  text: "Visibility depends on who speaks, not who delivers." },
  { icon: Theater,  text: "Employee advocacy often feels forced and artificial." },
]

export function ProblemSection() {
  return (
    <section id="problem" className="py-20" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-12">
          The <span style={{ color: "#FF8C00" }}>Problem</span>
        </h2>
        <div className="flex flex-col gap-4">
          {problems.map((p) => (
            <GlassCard key={p.text} className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,106,0,0.2)" }}
              >
                <p.icon size={20} className="text-[#FF6A00]" />
              </div>
              <p className="text-white font-medium">{p.text}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
