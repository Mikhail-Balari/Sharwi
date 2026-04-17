"use client"

import { EyeOff, LineChart, ShieldAlert, Users } from "lucide-react"
import { GlassCard } from "../glass-card"

const problems = [
  {
    icon: EyeOff,
    title: "Important work stays invisible",
    text: "Most of the value people create lives inside systems of work, not in public narratives.",
  },
  {
    icon: Users,
    title: "Advocacy depends on the loudest few",
    text: "Programs break when visibility relies on confidence, spare time, or generic prompts.",
  },
  {
    icon: ShieldAlert,
    title: "AI without evidence lowers trust",
    text: "Buyers, leaders, and compliance teams need proof, not polished claims detached from reality.",
  },
  {
    icon: LineChart,
    title: "Internal sponsors still struggle to prove ROI",
    text: "Impressions are easy to count. Business impact is much harder to defend without the right measurement layer.",
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[#FF8C00] mb-4">
            Problem
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.04em]">
            Expertise, advocacy, and measurement are still treated as separate problems.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            That fragmentation is why strong professionals stay invisible, employee advocacy stalls,
            and corporate sponsors struggle to justify the spend. Sharwi connects the full system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {problems.map((problem) => (
            <GlassCard key={problem.title} className="h-full">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "rgba(255,106,0,0.14)" }}
              >
                <problem.icon size={22} className="text-[#FF6A00]" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">{problem.title}</h3>
              <p className="text-sm leading-7 text-slate-400">{problem.text}</p>
            </GlassCard>
          ))}
        </div>

        <div
          className="max-w-5xl mx-auto mt-8 rounded-[28px] px-8 py-7 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255,106,0,0.12), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,106,0,0.18)",
          }}
        >
          <p className="text-lg leading-8 text-slate-200">
            Sharwi solves this as infrastructure: capture the work, attach the proof, draft the story,
            keep human control, and measure the result across the Personal Layer and Enterprise Layer.
          </p>
        </div>
      </div>
    </section>
  )
}
