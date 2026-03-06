"use client"

import { GlassCard } from "../glass-card"
import { Eye, Award, Send, Briefcase, Globe, ShieldCheck } from "lucide-react"
import { trackForProfessionalsRequestDemo } from "@/lib/analytics"

const cards = [
  {
    icon: Eye,
    title: "Your work, finally visible",
    desc: "Sharwi captures your real contributions — PRs, resolved issues, decisions, results — and turns them into shareable proof of your value. No more invisible effort.",
  },
  {
    icon: Award,
    title: "Reputation built on substance",
    desc: "No vanity metrics. No performance theater. A verified track record based on what you actually did, not on how well you promote yourself.",
  },
  {
    icon: Send,
    title: "You stay in control",
    desc: "Sharwi proposes the content. You review and approve before anything goes out. Always. Your voice, your decision.",
  },
  {
    icon: Globe,
    title: "Portable across companies",
    desc: "Your Sharwi Profile and Badge follow you throughout your career. When you move to a new role, your verified history moves with you — even if they don't use Sharwi.",
  },
  {
    icon: ShieldCheck,
    title: "AI that adapts to your role",
    desc: "Technical profile? Commercial? Executive? Sharwi adapts tone and focus automatically, so your content sounds like you — on your best day, every time.",
  },
  {
    icon: Briefcase,
    title: "86% report career impact",
    desc: "Professionals using Sharwi report better opportunities, stronger networks, and recognition that matches the real value they create.",
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

        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-black"
            style={{ background: "#FF6A00" }}>1</span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#FF6A00]">Personal Layer</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance"
          style={{ letterSpacing: "-0.03em" }}>
          For Professionals Who Create <span style={{ color: "#FF6A00" }}>Real Value</span>
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-2xl mx-auto mb-4 leading-relaxed">
          If your work speaks louder than your self-promotion, Sharwi captures the signal behind the silence —
          and builds a reputation that belongs to <em>you</em>, not to your employer.
        </p>

        {/* Key insight */}
        <div className="max-w-2xl mx-auto mb-12 rounded-xl px-6 py-4 text-center"
          style={{
            background: "rgba(255,106,0,0.06)",
            border: "1px solid rgba(255,106,0,0.18)",
          }}>
          <p className="text-sm text-[#D1D5DB]">
            <span className="text-[#FF6A00] font-semibold">Only 2% of employees</span> create content regularly —
            not because they lack expertise, but because they lack time, confidence, and a clear starting point.
            Sharwi removes every barrier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cards.map((c) => (
            <GlassCard key={c.title} className="text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(255,106,0,0.15)" }}>
                <c.icon size={22} className="text-[#FF6A00]" />
              </div>
              <h3 className="font-display text-base font-bold text-white mb-2">{c.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{c.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* How it works for professionals */}
        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden mb-10"
          style={{
            background: "radial-gradient(ellipse at 15% 10%, rgba(100,30,0,0.18) 0%, rgba(3,1,0,0.92) 55%)",
            boxShadow: "0 0 0 1px rgba(255,90,10,0.35), inset 0 1px 0 rgba(255,160,40,0.20)",
          }}>
          <div className="px-7 pt-6 pb-2">
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF6A00] mb-4">HOW IT WORKS FOR YOU</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(255,106,0,0.10)]">
            {[
              { step: "01", title: "Log your work", desc: "Takes 15 seconds. Or connect GitHub, Jira, Docs automatically." },
              { step: "02", title: "Sharwi drafts it", desc: "AI turns your contribution into a post that sounds like you — with evidence attached." },
              { step: "03", title: "You approve & publish", desc: "Review, edit, or reject. Nothing goes out without your explicit approval." },
            ].map((s) => (
              <div key={s.step} className="px-7 py-5">
                <span className="text-4xl font-extrabold text-[rgba(255,106,0,0.20)] block mb-2">{s.step}</span>
                <h4 className="font-bold text-white text-sm mb-1">{s.title}</h4>
                <p className="text-[#9CA3AF] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
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
