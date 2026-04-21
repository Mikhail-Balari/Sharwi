"use client"

import { useEffect, useState } from "react"
import {
  Briefcase,
  CheckCircle,
  Cpu,
  Megaphone,
  Rocket,
  Target,
  Users2,
  X,
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { trackCtaClick, trackSeeExample } from "@/lib/analytics"

const useCases = [
  {
    icon: Megaphone,
    title: "Marketing Teams",
    desc: "Amplify campaigns through authentic employee voices that resonate with audiences.",
    modalDesc: "Transform your marketing reach by enabling employees to share content grounded in real work.",
    post:
      "Just shipped our Q3 campaign. Built on 6 weeks of customer interviews and 3 A/B test cycles. CTR is up 34% vs last quarter. Evidence-backed content outperforms templates every time.",
    chips: ["Q3 Campaign", "A/B Test Results", "CRM Data"],
    benefits: [
      "Increase organic reach by up to 5.6× vs brand-only content",
      "Build trust through employee voices audiences actually follow",
      "Content grounded in real campaigns — not generic copy",
      "Track which posts influenced pipeline and CAC",
    ],
  },
  {
    icon: Users2,
    title: "HR & Talent",
    desc: "Showcase real company culture and attract top talent through genuine employee work stories.",
    modalDesc: "Turn real employee work into credible employer-brand proof candidates can trust.",
    post:
      "6 months in. I've shipped 3 features, led 2 cross-team initiatives, and mentored a junior engineer from onboarding to their first production deploy. This team builds fast — and with intention.",
    chips: ["Jira Tickets", "Performance Review", "Team Output"],
    benefits: [
      "Show culture through documented work — not careers page copy",
      "Activate silent experts who never self-promote",
      "Build employer brand credibility that survives job board noise",
      "Attract candidates who research teams before applying",
    ],
  },
  {
    icon: Target,
    title: "Sales Teams",
    desc: "Build credibility with prospects through expert content backed by real delivery evidence.",
    modalDesc: "Build trust before outreach by turning field expertise and proof into visible credibility.",
    post:
      "Closed a 6-month enterprise deal last week. The sequence that worked: 3 LinkedIn posts about the customer's industry problem → 2 inbound messages → 1 demo → close. Trust built before the first call.",
    chips: ["CRM Deal", "LinkedIn Engagement", "Pipeline Data"],
    benefits: [
      "Build pipeline before the first cold outreach",
      "Content that references real delivery builds faster trust",
      "Sales reps with visible expertise close 2× faster",
      "Attribution tracking from post to meeting to deal",
    ],
  },
  {
    icon: Cpu,
    title: "Product Teams",
    desc: "Share product milestones and build market credibility through verified development evidence.",
    modalDesc: "Turn product shipping into credible market signal, grounded in research, metrics, and delivery.",
    post:
      "We shipped the redesigned onboarding flow today. 4-week build. 12 user interviews. 3 prototype iterations. First-session completion rate went from 61% to 84%. Evidence makes the story real.",
    chips: ["GitHub PR", "User Research", "Analytics"],
    benefits: [
      "Turn shipping into visible credibility for the company",
      "Evidence-backed product stories attract technical buyers",
      "Developers and PMs build personal brand without extra effort",
      "Content rooted in real metrics survives scrutiny",
    ],
  },
  {
    icon: Briefcase,
    title: "Leadership",
    desc: "Demonstrate organizational values through executive visibility grounded in real decisions and outcomes.",
    modalDesc: "Create executive visibility that is specific, defensible, and tied to real company decisions.",
    post:
      "We made a hard call this quarter: delay the launch by 3 weeks to fix the onboarding data. Revenue impact: −$140k short-term. NPS impact: +18 points. Leadership is knowing which number matters more.",
    chips: ["Board Update", "NPS Data", "Revenue Report"],
    benefits: [
      "Executive thought leadership backed by real company data",
      "Builds trust with prospects, talent, and existing customers",
      "Governance controls ensure board-appropriate messaging",
      "Influence pipeline at the top of the funnel passively",
    ],
  },
  {
    icon: Rocket,
    title: "Startups & Scaleups",
    desc: "Build brand awareness and credibility without a dedicated marketing team or budget.",
    modalDesc: "Make every team member a credible voice while keeping content grounded, consistent, and measurable.",
    post:
      "We're 14 people and growing 40% MoM. No marketing team. Our engineers, sales reps, and founders post what they build and what they learn. That's our content strategy. Sharwi makes it consistent.",
    chips: ["Growth Metrics", "Product Launches", "Team Output"],
    benefits: [
      "Content engine without a content team",
      "Every employee becomes a credible voice from day one",
      "Early-stage credibility that scales with the company",
      "Prove culture and execution to investors through visible work",
    ],
  },
]

export function UseCasesSection({ onRequestDemo }: { onRequestDemo: () => void }) {
  const [active, setActive] = useState<number | null>(null)
  const activeUseCase = active === null ? null : useCases[active]

  useEffect(() => {
    document.body.style.overflow = activeUseCase ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeUseCase])

  return (
    <section id="use-cases" className="landing-section">
      <div className="section-wrapper">
        <ScrollReveal>
          <div className="mx-auto mb-14 max-w-[700px] text-center">
            <p className="section-eyebrow mb-4 text-center">Use Cases</p>
            <h2 className="section-title text-center">
              Built for every team that owns <span style={{ color: "#DE5015" }}>visibility.</span>
            </h2>
            <p className="mx-auto mt-5 text-center text-[16px] text-[#8A8480]">
              Sharwi adapts to your industry, team, and goals.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <ScrollReveal key={useCase.title} delay={index * 0.06}>
              <button
                type="button"
                onClick={() => {
                  trackSeeExample(useCase.title)
                  setActive(index)
                }}
                className="glass-card flex h-full w-full cursor-pointer flex-col p-6 text-left transition-all duration-300 hover:-translate-y-[3px] hover:border-[#DE5015]/30"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DE5015]/10">
                  <useCase.icon size={22} color="#DE5015" />
                </div>
                <h3 className="text-[18px] font-bold text-[#FFFCF2]">{useCase.title}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-[#8A8480]">{useCase.desc}</p>
                <span className="mt-6 text-[13px] font-bold text-[#DE5015]">See example →</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {activeUseCase ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActive(null)
          }}
        >
          <div
            className="relative max-h-[90vh] w-[90vw] max-w-[540px] overflow-y-auto"
            style={{
              backgroundColor: "#0D0D0D",
              border: "1px solid rgba(255,252,242,0.10)",
              borderRadius: "24px",
              padding: "36px",
            }}
          >
            <button
              aria-label="Close use case"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 text-[#8A8480] transition-colors hover:text-[#FFFCF2]"
            >
              <X size={18} />
            </button>

            <h3 className="text-[22px] font-extrabold text-[#FFFCF2]">{activeUseCase.title}</h3>
            <p className="mt-2 text-[14px] leading-[1.7] text-[#8A8480]">{activeUseCase.modalDesc}</p>

            <div
              className="mt-5 rounded-2xl p-5"
              style={{
                backgroundColor: "rgba(255,252,242,0.04)",
                border: "1px solid rgba(255,252,242,0.08)",
              }}
            >
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#DE5015]">
                Example Post
              </p>
              <p className="text-[14px] italic leading-[1.7] text-[#CCC6BA]">
                “{activeUseCase.post}”
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeUseCase.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full px-[10px] py-[3px] text-[11px] text-[#DE5015]"
                    style={{
                      backgroundColor: "rgba(222,80,21,0.08)",
                      border: "1px solid rgba(222,80,21,0.20)",
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#DE5015]">
                Key Benefits
              </p>
              <div className="grid gap-3">
                {activeUseCase.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="mt-1 shrink-0 text-[#DE5015]" />
                    <p className="text-[13px] leading-[1.6] text-[#CCC6BA]">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                trackCtaClick("use_case_modal_request_demo")
                setActive(null)
                onRequestDemo()
              }}
              className="mt-6 h-12 w-full rounded-[14px] text-[14px] font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "#DE5015" }}
            >
              Request Demo
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
