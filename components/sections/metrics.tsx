"use client"

import { Globe, Target, TrendingUp, Users } from "lucide-react"
import { GlassCard } from "../glass-card"

const metrics = [
  {
    icon: Users,
    stat: "5.6x",
    title: "Reach multiplier",
    desc: "A benchmark framing often used when employee-shared expertise outperforms brand-only distribution.",
  },
  {
    icon: TrendingUp,
    stat: "2x",
    title: "Conversion lift",
    desc: "A common advocacy benchmark used to size how trusted expert content can improve funnel quality.",
  },
  {
    icon: Target,
    stat: "30-50%",
    title: "Potential CPL efficiency",
    desc: "The kind of directional range internal sponsors may model when credibility improves conversion.",
  },
  {
    icon: Globe,
    stat: "8 weeks",
    title: "Pilot window",
    desc: "A practical timeframe to validate activation, governance, visibility, and business signal without overcommitting.",
  },
]

export function MetricsSection() {
  return (
    <section id="roi-benchmark" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[#FF8C00] mb-4">
            ROI / Benchmark
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.04em]">
            Benchmarks that help sponsors size the opportunity before a pilot.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            These are framing benchmarks, not guaranteed Sharwi outcomes. They help investors and
            internal teams understand why proof-backed employee visibility can become commercially meaningful.
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
              Sharwi pilot model
            </p>
            <p className="text-lg leading-8 text-slate-200">
              The point of the pilot is to connect work capture, proof-backed publishing,
              trusted reach, and directional business impact into a story a sponsor can actually defend.
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
              Internal sponsor takeaway
            </p>
            <p className="text-lg leading-8 text-slate-200">
              Sharwi gives leadership a cleaner narrative than “we should post more.”
              It offers infrastructure for trusted visibility with a measurement model attached.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
