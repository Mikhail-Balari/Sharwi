"use client"

import { ArrowRight, BarChart3, ShieldCheck, Sparkles } from "lucide-react"
import { SharwiLogoIcon } from "../sharwi-logo"
import { trackHeroRequestDemo, trackHeroSeeHowItWorks } from "@/lib/analytics"

const heroSignals = [
  {
    label: "Product model",
    value: "Personal Layer + Enterprise Layer",
    icon: Sparkles,
  },
  {
    label: "Workflow",
    value: "Capture to evidence to draft to control to impact",
    icon: ShieldCheck,
  },
  {
    label: "Pilot posture",
    value: "Built to validate in weeks, not quarters",
    icon: BarChart3,
  },
]

export function HeroSection({ onRequestDemo }: { onRequestDemo: () => void }) {
  const handleRequestDemo = () => {
    trackHeroRequestDemo()
    onRequestDemo()
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-24 pt-32 sm:pt-36 lg:pb-28"
      style={{ position: "relative", zIndex: 3 }}
    >
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.22),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#ff6a00]" />
            Main validation asset for investors and pilot customers
          </div>

          <h1 className="mt-7 font-display text-5xl font-bold leading-[0.94] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            Turn real work into
            <span className="block text-[#ff8d3a]">
              visible reputation and measurable business impact.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Sharwi is infrastructure, not another content tool. It captures real work,
            keeps evidence attached, drafts with AI, leaves humans in control, and gives
            companies a clearer way to measure trusted visibility.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <button
              onClick={handleRequestDemo}
              data-cta="request-demo"
              data-cta-source="hero_primary"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6a00] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,106,0,0.35)]"
            >
              Request Demo
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <a
              href="#how-it-works"
              onClick={trackHeroSeeHowItWorks}
              data-cta="see-how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#ff6a00]/40 hover:bg-white/[0.08]"
            >
              See the Product Loop
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {heroSignals.map((item) => (
              <div
                key={item.label}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff6a00]/12 text-[#ff8d3a]">
                  <item.icon size={18} />
                </div>
                <p className="mt-4 text-sm text-slate-400">{item.label}</p>
                <p className="mt-2 text-base font-semibold leading-6 text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.18),transparent_55%)] blur-3xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0d1118]/92 p-6 shadow-[0_28px_120px_rgba(0,0,0,0.42)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl border border-[#ff6a00]/25 bg-[#ff6a00]/10 p-3">
                  <SharwiLogoIcon size={26} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Sharwi infrastructure loop</p>
                  <p className="text-sm text-slate-400">Proof-backed reputation for people and companies</p>
                </div>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Pilot-ready
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {[
                {
                  step: "01",
                  title: "Capture work",
                  body: "Pull signal from commits, documents, tickets, CRM notes, launches, and wins.",
                },
                {
                  step: "02",
                  title: "Attach evidence",
                  body: "Keep source material, approvals, and proof tied to each story candidate.",
                },
                {
                  step: "03",
                  title: "Draft with AI, publish with humans",
                  body: "Sharwi drafts the narrative, but the professional or reviewer still controls what goes out.",
                },
              ].map((item) => (
                <div key={item.step} className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{item.body}</p>
                    </div>
                    <span className="text-3xl font-bold tracking-[-0.05em] text-white/10">{item.step}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Personal outcome
                </p>
                <p className="mt-3 text-lg font-semibold leading-7 text-white">
                  Visible reputation built from real contribution, not performance.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Enterprise outcome
                </p>
                <p className="mt-3 text-lg font-semibold leading-7 text-white">
                  Trusted employee visibility tied to governance and measurable impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
