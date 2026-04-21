"use client"

import { BarChart2, Link2, ShieldCheck, Target, TrendingDown, TrendingUp, Users, Zap } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { trackForCompaniesRequestDemo } from "@/lib/analytics"

const kpis = [
  {
    icon: TrendingUp,
    value: "5.6×",
    title: "More reach than brand-only content",
    desc: "When employees share verified expertise in their own voice",
    color: "#DE5015",
  },
  {
    icon: Target,
    value: "2×",
    title: "Higher conversion rate",
    desc: "When pipeline contacts see verified employee content first",
    color: "#DE5015",
  },
  {
    icon: TrendingDown,
    value: "−23%",
    title: "Average CAC reduction",
    desc: "Across companies with proof-backed employee advocacy",
    color: "#2ECC71",
  },
  {
    icon: BarChart2,
    value: "−50%",
    title: "Lower cost per lead",
    desc: "When employee visibility is part of the acquisition mix",
    color: "#2ECC71",
  },
]

const features = [
  {
    icon: Link2,
    title: "Connects to existing systems",
    desc: "Sharwi sits on top of the tools where teams already work, which keeps activation friction low.",
  },
  {
    icon: Users,
    title: "Activates more than the loudest few",
    desc: "The system helps silent experts participate by starting from the work they already do.",
  },
  {
    icon: ShieldCheck,
    title: "Governance is part of the product",
    desc: "Approval paths, evidence trails, and review visibility make the rollout easier to manage.",
  },
  {
    icon: BarChart2,
    title: "Measurement goes beyond vanity",
    desc: "Sharwi is framed around proof-backed publishing, trusted visibility, meetings influenced, and pipeline signal.",
  },
  {
    icon: TrendingDown,
    title: "Built for CAC conversations",
    desc: "The enterprise layer gives leadership a cleaner path to discuss trusted reach, conversion quality, and benchmark efficiency.",
  },
  {
    icon: Zap,
    title: "Fast to deploy",
    desc: "Sharwi connects to your existing systems in days, not months. Your team starts generating verified visibility without changing how they work.",
  },
]

export function ForCompanies({ onRequestDemo }: { onRequestDemo: () => void }) {
  const handleRequestDemo = () => {
    trackForCompaniesRequestDemo()
    onRequestDemo()
  }

  return (
    <section id="enterprise-layer" className="landing-section">
      <div className="section-wrapper">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-[820px] text-center">
            <p className="section-eyebrow mb-4 text-center">2&nbsp;&nbsp;Enterprise Layer</p>
            <h2 className="section-title text-center">
              The infrastructure that turns your team&apos;s work into{" "}
              <span style={{ color: "#DE5015" }}>measurable pipeline.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[720px] text-center text-[16px] leading-[1.75] text-[#8A8480]">
              Stop asking employees to post more. Give them infrastructure that makes it automatic, verified, and tied to business results.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, index) => (
            <ScrollReveal key={kpi.title} delay={index * 0.06}>
              <div
                className="h-full rounded-[20px] p-7"
                style={{
                  background: "rgba(222,80,21,0.06)",
                  border: "1px solid rgba(222,80,21,0.18)",
                }}
              >
                <kpi.icon size={24} color={kpi.color} />
                <p className="mt-5 text-[48px] font-black leading-none" style={{ color: kpi.color }}>
                  {kpi.value}
                </p>
                <h3 className="mt-4 text-[16px] font-bold leading-snug text-[#FFFCF2]">{kpi.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.65] text-[#8A8480]">{kpi.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-[#5C5955]">
          Source: Employee Advocacy Benchmark Report 2026
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.06}>
              <div className="glass-card h-full p-6">
                <feature.icon size={22} color="#DE5015" />
                <h3 className="mt-4 text-[16px] font-bold text-[#FFFCF2]">{feature.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.65] text-[#8A8480]">{feature.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleRequestDemo}
            data-cta="request-demo"
            data-cta-source="enterprise_layer"
            className="inline-flex h-[52px] items-center justify-center rounded-full px-8 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "#DE5015", boxShadow: "0 8px 28px rgba(222,80,21,0.35)" }}
          >
            Request a Demo →
          </button>
        </div>
      </div>
    </section>
  )
}
