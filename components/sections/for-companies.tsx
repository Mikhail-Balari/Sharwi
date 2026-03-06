"use client"

import { GlassCard } from "../glass-card"
import { BarChart3, Link2, ShieldCheck, TrendingDown, Users, Zap } from "lucide-react"
import { trackForCompaniesRequestDemo } from "@/lib/analytics"

const cards = [
  {
    icon: Link2,
    title: "Connects to your existing tools",
    desc: "Plug into GitHub, Jira, Salesforce, ServiceNow and more. Sharwi works where your team already works — zero friction for employees.",
  },
  {
    icon: Users,
    title: "Turns silent experts into visible ones",
    desc: "Your workforce is full of credible people who never post. Sharwi activates them with verified content grounded in real work, not invented stories.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance and governance built in",
    desc: "Legal guardrails, manager approval flows, and full audit trails per post. Enterprise-ready from day one.",
  },
  {
    icon: BarChart3,
    title: "Measures what actually matters",
    desc: "Not likes. Clicks → leads → pipeline. UTM attribution, Verified Visibility Rate (VVR), and proof-backed rate. Data that connects to your CAC.",
  },
  {
    icon: TrendingDown,
    title: "CAC reduction, measurably",
    desc: "Employee-led content converts at 2× the rate of brand content. More trust in the funnel means fewer leads needed to close the same revenue.",
  },
  {
    icon: Zap,
    title: "Activates in weeks, not months",
    desc: "Pilot program: 100–250 employees, 8 weeks, ROI report. Connect one system, activate the team, measure real pipeline impact.",
  },
]

const metrics = [
  { stat: "4×", label: "More leads vs. traditional methods" },
  { stat: "2×", label: "Higher conversion rate" },
  { stat: "−50%", label: "Cost per lead" },
  { stat: "+561%", label: "Reach vs. brand channels" },
]

export function ForCompanies({ onRequestDemo }: { onRequestDemo: () => void }) {
  const handleRequestDemo = () => {
    trackForCompaniesRequestDemo()
    onRequestDemo()
  }

  return (
    <section id="for-companies" className="py-20" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">

        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-black"
            style={{ background: "#FF6A00" }}>1</span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#FF6A00]">Enterprise Layer</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance"
          style={{ letterSpacing: "-0.03em" }}>
          For Companies That Want <span style={{ color: "#FF6A00" }}>Authentic Advocacy</span>
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-2xl mx-auto mb-4 leading-relaxed">
          Stop trying to make employees create content. Give them infrastructure that turns
          their real work into verified, compliance-ready brand content automatically.
        </p>

        {/* Key insight */}
        <div className="max-w-2xl mx-auto mb-12 rounded-xl px-6 py-4 text-center"
          style={{
            background: "rgba(255,106,0,0.06)",
            border: "1px solid rgba(255,106,0,0.18)",
          }}>
          <p className="text-sm text-[#D1D5DB]">
            <span className="text-[#FF6A00] font-semibold">49% of advocacy programs fail</span> due to
            lack of consistency and coordination — not lack of willingness.
            Sharwi removes the dependency on individual motivation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map((c) => (
            <GlassCard key={c.title} className="text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(255,106,0,0.15)" }}>
                <c.icon size={22} className="text-[#FF6A00]" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{c.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{c.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* Metrics strip */}
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden mb-10"
          style={{
            background: "radial-gradient(ellipse at 15% 10%, rgba(100,30,0,0.18) 0%, rgba(3,1,0,0.92) 55%)",
            boxShadow: "0 0 0 1px rgba(255,90,10,0.35), inset 0 1px 0 rgba(255,160,40,0.20)",
          }}>
          <div className="px-7 pt-6 pb-2">
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF6A00] mb-1">WHAT THE BENCHMARKS SAY</p>
            <p className="text-xs text-[#6B7280]">Source: Employee Advocacy Benchmark Report 2026</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x divide-[rgba(255,106,0,0.10)] py-4">
            {metrics.map((m) => (
              <div key={m.stat} className="text-center px-6 py-4">
                <p className="font-extrabold text-[#FF6A00] mb-1" style={{ fontSize: "40px", lineHeight: "1" }}>{m.stat}</p>
                <p className="text-[#9CA3AF] text-xs leading-relaxed">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="px-7 py-4 border-t border-[rgba(255,106,0,0.10)]"
            style={{ background: "rgba(255,106,0,0.04)" }}>
            <p className="text-center text-xs text-[#6B7280]">
              When leads from employees convert at 2× the rate and CPL drops 50%, you need fewer leads to hit the same revenue.
              That's the CAC reduction mechanics Sharwi is built around.
            </p>
          </div>
        </div>

        {/* What company gets vs what employee keeps */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="rounded-2xl p-6"
            style={{
              background: "radial-gradient(ellipse at 15% 10%, rgba(100,30,0,0.18) 0%, rgba(3,1,0,0.92) 55%)",
              boxShadow: "0 0 0 1px rgba(255,90,10,0.35)",
            }}>
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF6A00] mb-4">WHAT THE COMPANY GETS</p>
            <ul className="flex flex-col gap-2.5 text-sm text-[#9CA3AF]">
              {[
                "Verified content infrastructure — not a content library",
                "Attribution from post to pipeline (UTMs + CRM)",
                "Governance: guardrails, approval flows, audit trail",
                "Dashboard: VVR, proof-backed rate, CAC metrics",
                "Predictable advocacy — not dependent on motivation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#FF6A00" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-6"
            style={{
              background: "radial-gradient(ellipse at 15% 10%, rgba(100,30,0,0.18) 0%, rgba(3,1,0,0.92) 55%)",
              boxShadow: "0 0 0 1px rgba(255,90,10,0.35)",
            }}>
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF6A00] mb-4">WHAT THE EMPLOYEE KEEPS</p>
            <ul className="flex flex-col gap-2.5 text-sm text-[#9CA3AF]">
              {[
                "Their own Sharwi Profile and verified Badge",
                "Full control — approves or rejects every post",
                "Portable reputation that survives company changes",
                "Career history that doesn't disappear when they leave",
                "AI content that matches their voice, not a brand template",
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
