"use client"

import { Globe, Target, TrendingUp, Users } from "lucide-react"
import { GlassCard } from "../glass-card"

const metrics = [
  {
    icon: Users,
    stat: "5.6x",
    title: "Reach multiplier",
    desc: "More reach than brand-only distribution when employees share verified expertise in their own voice.",
  },
  {
    icon: TrendingUp,
    stat: "2x",
    title: "Conversion lift",
    desc: "Higher conversion rate when pipeline contacts have been exposed to verified employee content before outreach.",
  },
  {
    icon: Target,
    stat: "30-50%",
    title: "CPL reduction",
    desc: "Lower cost per lead when employee visibility is part of the acquisition mix because trust reduces friction in the funnel.",
  },
  {
    icon: Globe,
    stat: "8 weeks",
    title: "Time to results",
    desc: "Most teams see meaningful activation, governance coverage, and first business signals within 8 weeks of deployment.",
  },
]

export function MetricsSection() {
  return (
    <section id="roi-benchmark" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[#FF8C00] mb-4">
            Results
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.04em]">
            The numbers that move when employee visibility works.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Companies using proof-backed employee advocacy consistently see these results.
            Sharwi is built to make them reproducible and measurable, not left to chance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <GlassCard key={metric.title} className="text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(255,106,0,0.2)" }}
              >
                <metric.icon size={22} className="text-[#FF6A00]" />
              </div>
              <p
                className="font-extrabold text-[#FF6A00] mb-2"
                style={{ fontSize: "52px", lineHeight: "1" }}
              >
                {metric.stat}
              </p>
              <h3 className="font-bold text-white mb-2">{metric.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{metric.desc}</p>
            </GlassCard>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div
            className="rounded-[28px] p-7"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#FF8C00] mb-3">
              How Sharwi works
            </p>
            <p className="text-lg leading-8 text-slate-200">
              Sharwi connects work capture, proof-backed publishing, and trusted reach into a single loop.
              Every post generates a signal. Every signal improves the next cycle. The business impact compounds.
            </p>
          </div>
          <div
            className="rounded-[28px] p-7"
            style={{
              background: "linear-gradient(135deg, rgba(255,106,0,0.10), rgba(255,255,255,0.03))",
              border: "1px solid rgba(255,106,0,0.18)",
            }}
          >
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#FF8C00] mb-3">
              For leadership
            </p>
            <p className="text-lg leading-8 text-slate-200">
              Sharwi gives leadership a cleaner narrative than &quot;we should post more.&quot;
              It gives them infrastructure, governance, and a measurement model so employee visibility becomes a channel, not a campaign.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
