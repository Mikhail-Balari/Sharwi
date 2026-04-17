"use client"

import { BarChart3, Link2, ShieldCheck, TrendingDown, Users, Zap } from "lucide-react"
import { GlassCard } from "../glass-card"
import { trackForCompaniesRequestDemo } from "@/lib/analytics"

const cards = [
  {
    icon: Link2,
    title: "Connects to existing systems",
    desc: "Sharwi is designed to sit on top of the tools where teams already work, which keeps activation friction low.",
  },
  {
    icon: Users,
    title: "Activates more than the loudest few",
    desc: "The system helps silent experts participate by starting from the work they already do instead of asking them to become creators first.",
  },
  {
    icon: ShieldCheck,
    title: "Governance is part of the product",
    desc: "Approval paths, evidence trails, and review visibility make the rollout easier to sponsor internally.",
  },
  {
    icon: BarChart3,
    title: "Measurement goes beyond vanity",
    desc: "Sharwi is framed around proof-backed publishing, trusted visibility, meetings influenced, and directional pipeline signal.",
  },
  {
    icon: TrendingDown,
    title: "Built for CAC conversations",
    desc: "The enterprise layer gives sponsors a cleaner path to discuss trusted reach, conversion quality, and benchmark efficiency.",
  },
  {
    icon: Zap,
    title: "Pilot-ready motion",
    desc: "Sharwi is presented as an MVP that can validate workflow, governance, and business signal in an 8-week pilot.",
  },
]

const companyWins = [
  "Verified visibility infrastructure instead of another content library",
  "Attribution logic from story to meeting and directional pipeline touch",
  "Approval flows and auditability for sensitive claims",
  "A pilot dashboard with proof-backed and activation metrics",
  "A stronger internal narrative than “let’s ask employees to post more”",
]

const employeeWins = [
  "The professional keeps the final publish decision",
  "Their reputation compounds instead of disappearing inside one employer",
  "The system starts from real work, not performance theater",
  "Evidence remains attached throughout the workflow",
  "AI assists the story without replacing authorship",
]

export function ForCompanies({ onRequestDemo }: { onRequestDemo: () => void }) {
  const handleRequestDemo = () => {
    trackForCompaniesRequestDemo()
    onRequestDemo()
  }

  return (
    <section id="enterprise-layer" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span
            className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-black"
            style={{ background: "#FF6A00" }}
          >
            2
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#FF6A00]">
            Enterprise Layer
          </span>
        </div>

        <h2
          className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance"
          style={{ letterSpacing: "-0.03em" }}
        >
          Give companies a system for <span style={{ color: "#FF6A00" }}>credible employee visibility</span>
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-2xl mx-auto mb-4 leading-relaxed">
          The Enterprise Layer is not a publishing toy. It is the operational layer that activates experts,
          preserves governance, and helps sponsors defend a pilot with clearer business logic.
        </p>

        <div
          className="max-w-2xl mx-auto mb-12 rounded-xl px-6 py-4 text-center"
          style={{
            background: "rgba(255,106,0,0.06)",
            border: "1px solid rgba(255,106,0,0.18)",
          }}
        >
          <p className="text-sm text-[#D1D5DB]">
            <span className="text-[#FF6A00] font-semibold">Sharwi is positioned for pilot buyers, investors, and internal sponsors.</span>
            The point is to show how trusted visibility can be operationalized and measured without overbuilding the final product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map((card) => (
            <GlassCard key={card.title} className="text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(255,106,0,0.15)" }}
              >
                <card.icon size={22} className="text-[#FF6A00]" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{card.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{card.desc}</p>
            </GlassCard>
          ))}
        </div>

        <div
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden mb-10"
          style={{
            background: "radial-gradient(ellipse at 15% 10%, rgba(100,30,0,0.18) 0%, rgba(3,1,0,0.92) 55%)",
            boxShadow: "0 0 0 1px rgba(255,90,10,0.35), inset 0 1px 0 rgba(255,160,40,0.20)",
          }}
        >
          <div className="px-7 pt-6 pb-2">
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF6A00] mb-1">
              Pilot posture
            </p>
            <p className="text-xs text-[#6B7280]">
              Designed to support an 8-week proof-of-value cycle
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[rgba(255,106,0,0.10)] py-4">
            {[
              { stat: "100-250", label: "Suggested pilot cohort" },
              { stat: "1", label: "Initial source system to connect" },
              { stat: "8 weeks", label: "Time to validate workflow and signal" },
            ].map((metric) => (
              <div key={metric.label} className="text-center px-6 py-4">
                <p className="font-extrabold text-[#FF6A00] mb-1" style={{ fontSize: "40px", lineHeight: "1" }}>
                  {metric.stat}
                </p>
                <p className="text-[#9CA3AF] text-xs leading-relaxed">{metric.label}</p>
              </div>
            ))}
          </div>
          <div
            className="px-7 py-4 border-t border-[rgba(255,106,0,0.10)]"
            style={{ background: "rgba(255,106,0,0.04)" }}
          >
            <p className="text-center text-xs text-[#6B7280]">
              The goal is to validate activation, governance, and business signal fast enough to support a real internal decision.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div
            className="rounded-2xl p-6"
            style={{
              background: "radial-gradient(ellipse at 15% 10%, rgba(100,30,0,0.18) 0%, rgba(3,1,0,0.92) 55%)",
              boxShadow: "0 0 0 1px rgba(255,90,10,0.35)",
            }}
          >
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF6A00] mb-4">
              What the company gets
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-[#9CA3AF]">
              {companyWins.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#FF6A00" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-2xl p-6"
            style={{
              background: "radial-gradient(ellipse at 15% 10%, rgba(100,30,0,0.18) 0%, rgba(3,1,0,0.92) 55%)",
              boxShadow: "0 0 0 1px rgba(255,90,10,0.35)",
            }}
          >
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF6A00] mb-4">
              What the employee keeps
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-[#9CA3AF]">
              {employeeWins.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "rgba(255,106,0,0.5)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleRequestDemo}
            data-cta="request-demo"
            data-cta-source="enterprise_layer"
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
