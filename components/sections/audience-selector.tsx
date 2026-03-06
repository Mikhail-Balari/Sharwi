"use client"

import { useState } from "react"
import { Briefcase, Building2, ChevronRight, ArrowRight } from "lucide-react"
import { trackExploreAsProfessional, trackExploreForCompanies } from "@/lib/analytics"

const glassStyle = {
  background: "radial-gradient(ellipse at 15% 10%, rgba(100,30,0,0.18) 0%, rgba(3,1,0,0.92) 55%)",
  backdropFilter: "blur(20px) saturate(1.3)",
  WebkitBackdropFilter: "blur(20px) saturate(1.3)",
  boxShadow: `
    0 0 0 1.5px rgba(255,90,10,0.75),
    inset 0 1.5px 0 rgba(255,160,40,0.55),
    inset 1.5px 0 0 rgba(255,120,20,0.30),
    inset 0 -2px 16px rgba(0,0,0,0.7),
    0 0 12px rgba(255,80,0,0.10),
    0 6px 28px rgba(0,0,0,0.65)
  `,
}

const glassStyleActive = {
  ...glassStyle,
  background: "radial-gradient(ellipse at 15% 10%, rgba(180,55,0,0.30) 0%, rgba(8,3,0,0.95) 55%)",
  boxShadow: `
    0 0 0 1.5px rgba(255,106,0,1),
    inset 0 1.5px 0 rgba(255,180,60,0.70),
    inset 1.5px 0 0 rgba(255,140,30,0.45),
    inset 0 -2px 16px rgba(0,0,0,0.7),
    0 0 24px rgba(255,100,0,0.25),
    0 6px 28px rgba(0,0,0,0.65)
  `,
}

export function AudienceSelector() {
  const [active, setActive] = useState<"professional" | "company" | null>(null)

  return (
    <section className="py-20" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF6A00] text-center mb-3">
          TWO LAYERS. ONE PLATFORM.
        </p>
        <h2
          className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3"
          style={{ letterSpacing: "-0.03em" }}
        >
          How do you want to use <span style={{ color: "#FF6A00" }}>Sharwi</span>?
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-xl mx-auto mb-12">
          Sharwi works on two levels simultaneously — for the people doing the work,
          and for the organizations they power.
        </p>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-14">

          {/* Card: Professional */}
          <button
            onClick={() => {
              setActive(active === "professional" ? null : "professional")
              trackExploreAsProfessional()
            }}
            className="group relative overflow-hidden text-left rounded-2xl p-7 transition-all duration-300 hover:scale-[1.02]"
            style={active === "professional" ? glassStyleActive : glassStyle}
          >
            <div aria-hidden="true" style={{
              position: "absolute", top: 0, left: "6%", right: "6%", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,180,60,0.80), rgba(255,140,30,0.60), transparent)",
              pointerEvents: "none",
            }} />
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,106,0,0.15)" }}>
                <Briefcase size={22} className="text-[#FF6A00]" />
              </div>
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-[#FF6A00]">Personal Layer</span>
                <h3 className="font-display text-xl font-bold text-white">I'm a professional</h3>
              </div>
            </div>
            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4 relative z-10">
              Your work creates real value — but most of it stays invisible. Sharwi automatically
              turns your daily contributions into{" "}
              <span className="text-white font-medium">verified professional visibility</span>{" "}
              that follows you throughout your career.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[#FF6A00] text-sm font-semibold relative z-10
              transition-all duration-200 group-hover:gap-2.5">
              Explore as a Professional
              <ChevronRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </button>

          {/* Card: Company */}
          <button
            onClick={() => {
              setActive(active === "company" ? null : "company")
              trackExploreForCompanies()
            }}
            className="group relative overflow-hidden text-left rounded-2xl p-7 transition-all duration-300 hover:scale-[1.02]"
            style={active === "company" ? glassStyleActive : glassStyle}
          >
            <div aria-hidden="true" style={{
              position: "absolute", top: 0, left: "6%", right: "6%", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,180,60,0.80), rgba(255,140,30,0.60), transparent)",
              pointerEvents: "none",
            }} />
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,106,0,0.15)" }}>
                <Building2 size={22} className="text-[#FF6A00]" />
              </div>
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-[#FF6A00]">Enterprise Layer</span>
                <h3 className="font-display text-xl font-bold text-white">I represent a company</h3>
              </div>
            </div>
            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4 relative z-10">
              Your workforce is already creating value every day — it just doesn't reach the market.
              Sharwi turns your team's real work into{" "}
              <span className="text-white font-medium">verified revenue-driving content</span>{" "}
              that reduces CAC and builds trust at scale.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[#FF6A00] text-sm font-semibold relative z-10
              transition-all duration-200 group-hover:gap-2.5">
              Explore for Companies
              <ChevronRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </button>
        </div>

        {/* Dual layer explainer — always visible */}
        <div
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 15% 10%, rgba(100,30,0,0.18) 0%, rgba(3,1,0,0.92) 55%)",
            boxShadow: "0 0 0 1px rgba(255,90,10,0.35), inset 0 1px 0 rgba(255,160,40,0.20)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Layer 2: Personal */}
            <div className="p-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(255,106,0,0.15)", color: "#FF6A00", border: "1px solid rgba(255,106,0,0.4)" }}>2</span>
                <span className="text-xs font-bold tracking-widest uppercase text-[#FF6A00]">Personal Layer</span>
              </div>
              <h4 className="font-display text-lg font-bold text-white mb-3">
                The employee owns their reputation
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm text-[#9CA3AF]">
                {[
                  "Sharwi Profile and Badge — verifiable career history",
                  "AI adapts your voice by role: technical, commercial, executive",
                  "You review and approve everything before it publishes",
                  "Your reputation is portable — it travels with you when you leave",
                  "If your next company doesn't use Sharwi, you keep your history",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "rgba(255,106,0,0.5)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="px-7 py-4 border-t border-[rgba(255,106,0,0.10)]"
            style={{ background: "rgba(255,106,0,0.04)" }}>
            <p className="text-center text-sm text-[#9CA3AF]">
              <span className="text-white font-semibold">Aligned incentives:</span>{" "}
              The company gets measurable revenue impact. The professional builds portable reputation.{" "}
              <span className="text-[#FF6A00]">Both win.</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}            {/* Layer 1: Enterprise */}
            <div className="p-7 border-b md:border-b-0 md:border-r border-[rgba(255,106,0,0.12)]">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-black"
                  style={{ background: "#FF6A00" }}>1</span>
                <span className="text-xs font-bold tracking-widest uppercase text-[#FF6A00]">Enterprise Layer</span>
              </div>
              <h4 className="font-display text-lg font-bold text-white mb-3">
                The company buys the infrastructure
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm text-[#9CA3AF]">
                {[
                  "Connects to Jira, GitHub, CRM, and internal systems",
                  "Transforms real employee work into verified brand content",
                  "Measures impact in leads, conversions and CAC reduction",
                  "Compliance guardrails — legal and policy controls built in",
                  "Dashboard: VVR, proof-backed rate, pipeline attribution",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#FF6A00" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
