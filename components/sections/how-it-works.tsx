"use client"

import { BarChart3, Link2, ShieldCheck, Sparkles, Workflow } from "lucide-react"

const steps = [
  {
    num: "01",
    title: "Capture work",
    desc: "Pull signal from the systems where work already happens: commits, docs, CRM notes, tickets, launches, and outcomes.",
    icon: Workflow,
  },
  {
    num: "02",
    title: "Attach evidence",
    desc: "Keep the proof, source links, approvals, and supporting context tied to every story candidate.",
    icon: Link2,
  },
  {
    num: "03",
    title: "AI draft",
    desc: "Sharwi turns raw work into a credible narrative draft tailored to the professional and the use case.",
    icon: Sparkles,
  },
  {
    num: "04",
    title: "Human control",
    desc: "The user, manager, or reviewer still approves, edits, or rejects before anything goes public.",
    icon: ShieldCheck,
  },
  {
    num: "05",
    title: "Measure impact",
    desc: "Track trusted visibility, proof-backed publishing, meetings influenced, and business signals.",
    icon: BarChart3,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[#FF8C00] mb-4">
            How Sharwi Works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.04em]">
            One product loop for credibility, control, and ROI.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Sharwi does not invent stories. It operationalizes the proof already sitting inside
            real work and makes it useful for both professionals and enterprise teams.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group relative overflow-hidden rounded-[28px] p-6"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
              }}
            >
              <span className="absolute right-5 top-4 text-[56px] font-bold tracking-[-0.05em] text-white/6">
                {step.num}
              </span>
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(255,106,0,0.12)" }}
                >
                  <step.icon size={20} className="text-[#FF6A00]" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm leading-7 text-slate-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div
            className="rounded-[28px] p-7 max-w-[760px]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#FF8C00] mb-3">
              Why this matters
            </p>
            <p className="text-lg leading-8 text-slate-200">
              Evidence stays attached throughout the workflow, which means better trust,
              better governance, and a clearer way to measure business outcomes later.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
