"use client"

import { Award, Briefcase, Eye, Globe, Send, ShieldCheck } from "lucide-react"
import { GlassCard } from "../glass-card"
import { trackForProfessionalsRequestDemo } from "@/lib/analytics"

const cards = [
  {
    icon: Eye,
    title: "Your work, finally visible",
    desc: "Sharwi captures meaningful contributions and turns them into proof-backed reputation instead of leaving them buried in internal systems.",
  },
  {
    icon: Award,
    title: "Reputation built on substance",
    desc: "No vanity metrics and no performance theater. The story starts from what you actually shipped, solved, or influenced.",
  },
  {
    icon: Send,
    title: "You keep the final say",
    desc: "Sharwi proposes the draft, but the professional still reviews, edits, approves, or rejects before anything is published.",
  },
  {
    icon: Globe,
    title: "Portable across roles and companies",
    desc: "The reputation layer is meant to compound with your career instead of being trapped inside a single employer’s content program.",
  },
  {
    icon: ShieldCheck,
    title: "AI aligned to your context",
    desc: "Technical, commercial, or operational work can all be translated into a narrative that sounds credible for the role behind it.",
  },
  {
    icon: Briefcase,
    title: "Designed for real professionals",
    desc: "Sharwi is built for people whose work matters more than their willingness to self-promote online every week.",
  },
]

export function ForProfessionals({ onRequestDemo }: { onRequestDemo: () => void }) {
  const handleRequestDemo = () => {
    trackForProfessionalsRequestDemo()
    onRequestDemo()
  }

  return (
    <section id="personal-layer" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span
            className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-black"
            style={{ background: "#FF6A00" }}
          >
            1
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#FF6A00]">
            Personal Layer
          </span>
        </div>

        <h2
          className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance"
          style={{ letterSpacing: "-0.03em" }}
        >
          Give professionals a system that makes <span style={{ color: "#FF6A00" }}>real contribution visible</span>
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-2xl mx-auto mb-4 leading-relaxed">
          The Personal Layer helps experts capture meaningful work, keep evidence attached,
          approve what gets shared, and build a reputation that belongs to them.
        </p>

        <div
          className="max-w-2xl mx-auto mb-12 rounded-xl px-6 py-4 text-center"
          style={{
            background: "rgba(255,106,0,0.06)",
            border: "1px solid rgba(255,106,0,0.18)",
          }}
        >
          <p className="text-sm text-[#D1D5DB]">
            <span className="text-[#FF6A00] font-semibold">Most experts do not need more prompts.</span>
            They need a faster path from real work to proof-backed visibility without turning into full-time creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cards.map((card) => (
            <GlassCard key={card.title} className="text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(255,106,0,0.15)" }}
              >
                <card.icon size={22} className="text-[#FF6A00]" />
              </div>
              <h3 className="font-display text-base font-bold text-white mb-2">{card.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{card.desc}</p>
            </GlassCard>
          ))}
        </div>

        <div
          className="max-w-3xl mx-auto rounded-2xl overflow-hidden mb-10"
          style={{
            background: "radial-gradient(ellipse at 15% 10%, rgba(100,30,0,0.18) 0%, rgba(3,1,0,0.92) 55%)",
            boxShadow: "0 0 0 1px rgba(255,90,10,0.35), inset 0 1px 0 rgba(255,160,40,0.20)",
          }}
        >
          <div className="px-7 pt-6 pb-2">
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF6A00] mb-4">
              What the professional experiences
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(255,106,0,0.10)]">
            {[
              {
                step: "01",
                title: "Capture the work",
                desc: "Log it quickly or connect the systems where the work already happened.",
              },
              {
                step: "02",
                title: "Review the draft",
                desc: "Sharwi drafts a story with evidence still attached and ready for review.",
              },
              {
                step: "03",
                title: "Approve what matters",
                desc: "Only the stories worth sharing move forward. Nothing publishes automatically.",
              },
            ].map((item) => (
              <div key={item.step} className="px-7 py-5">
                <span className="text-4xl font-extrabold text-[rgba(255,106,0,0.20)] block mb-2">
                  {item.step}
                </span>
                <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                <p className="text-[#9CA3AF] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleRequestDemo}
            data-cta="request-demo"
            data-cta-source="personal_layer"
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
