"use client"

import { ArrowRight, Award, Eye, Globe, Send, ShieldCheck, Sparkles } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { trackForProfessionalsRequestDemo } from "@/lib/analytics"

const secondaryBenefits = [
  {
    icon: Eye,
    title: "Visibility from real work",
    desc: "Turn work signals into public proof without manufacturing content from scratch.",
  },
  {
    icon: Award,
    title: "Credibility that compounds",
    desc: "Every verified achievement strengthens the next opportunity, introduction, or role change.",
  },
  {
    icon: Send,
    title: "Publish with control",
    desc: "AI drafts from evidence, but you approve, edit, or reject before anything goes live.",
  },
  {
    icon: Globe,
    title: "Useful beyond one company",
    desc: "Sharwi works whether your employer uses it, whether you freelance, or whether you are between roles.",
  },
]

const mainCards = [
  {
    icon: ShieldCheck,
    title: "Sharwi Verified Badge",
    copy:
      "How many people know you work well? Those recognitions stay locked inside internal platforms — and disappear when you leave. The Sharwi Badge changes that.",
    featured: false,
    footer: (
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {["Proof-backed", "Evidence-first", "Tamper-proof"].map((pill) => (
          <span
            key={pill}
            className="rounded-full px-3 py-1 text-[11px] font-semibold text-[#DE5015]"
            style={{
              backgroundColor: "rgba(222,80,21,0.08)",
              border: "1px solid rgba(222,80,21,0.20)",
            }}
          >
            {pill}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Globe,
    title: "Portable Reputation",
    copy:
      "Every time you change jobs, you start from zero. Your work gets buried in systems nobody outside your company can see. Sharwi makes your professional track record yours — permanently.",
    featured: true,
    footer: (
      <p className="mt-auto pt-5 text-[12px] font-semibold text-[#DE5015]">
        Works in 3 scenarios →
      </p>
    ),
  },
  {
    icon: Sparkles,
    title: "Your Brand, Automated",
    copy:
      "Most professionals know they should build a presence online. Almost none do — because the blank page is terrifying. Sharwi turns what you already do into content that sounds like you, backed by evidence.",
    featured: false,
    footer: (
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
        {["Work", "Evidence", "Your voice"].map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-[11px] font-semibold text-[#DE5015]"
              style={{
                backgroundColor: "rgba(222,80,21,0.08)",
                border: "1px solid rgba(222,80,21,0.20)",
              }}
            >
              {step}
            </span>
            {index < 2 ? <ArrowRight size={12} color="#5C5955" /> : null}
          </div>
        ))}
      </div>
    ),
  },
]

const portabilityScenarios = [
  {
    label: "You + Sharwi company",
    copy:
      "Both you and your company use Sharwi — full sync, automatic evidence capture, and full measurement.",
    background: "rgba(46,204,113,0.05)",
    border: "1px solid rgba(46,204,113,0.20)",
    pillBackground: "rgba(46,204,113,0.12)",
    pillBorder: "1px solid rgba(46,204,113,0.30)",
    color: "#2ECC71",
  },
  {
    label: "You + Non-Sharwi company",
    copy:
      "Your company doesn't use Sharwi yet — you log work manually and keep your reputation growing independently.",
    background: "rgba(222,80,21,0.05)",
    border: "1px solid rgba(222,80,21,0.20)",
    pillBackground: "rgba(222,80,21,0.12)",
    pillBorder: "1px solid rgba(222,80,21,0.30)",
    color: "#DE5015",
  },
  {
    label: "Freelancer / Between jobs",
    copy:
      "No employer needed — Sharwi works as your independent professional identity layer. Your reputation keeps building no matter your status.",
    background: "rgba(255,252,242,0.03)",
    border: "1px solid rgba(255,252,242,0.08)",
    pillBackground: "rgba(255,252,242,0.06)",
    pillBorder: "1px solid rgba(255,252,242,0.12)",
    color: "#8A8480",
  },
]

function HighlightSharwi({ text }: { text: string }) {
  const parts = text.split("Sharwi")

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 ? (
            <span style={{ color: "#DE5015" }}>Sharwi</span>
          ) : null}
        </span>
      ))}
    </>
  )
}

export function ForProfessionals({ onRequestDemo }: { onRequestDemo: () => void }) {
  const handleRequestDemo = () => {
    trackForProfessionalsRequestDemo()
    onRequestDemo()
  }

  return (
    <section id="personal-layer" className="landing-section">
      <div className="section-wrapper">
        <ScrollReveal>
          <div className="mx-auto mb-14 max-w-[780px] text-center">
            <p className="section-eyebrow mb-4 text-center">1&nbsp;&nbsp;Personal Layer</p>
            <h2 className="section-title text-center">
              Build a reputation that <span style={{ color: "#DE5015" }}>belongs to you.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[680px] text-center text-[16px] leading-[1.75] text-[#8A8480]">
              Your work is already happening. <span style={{ color: "#DE5015" }}>Sharwi</span>{" "}
              captures it, verifies it, and turns it into a professional identity that stays with
              you — regardless of where you work.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid items-stretch gap-5 lg:grid-cols-3">
          {mainCards.map((card, index) => {
            const Icon = card.icon

            return (
              <ScrollReveal key={card.title} delay={index * 0.08} className="h-full">
                <div
                  className="flex h-full flex-col rounded-[20px] p-7"
                  style={{
                    background: card.featured ? "rgba(222,80,21,0.05)" : "rgba(255,252,242,0.04)",
                    border: card.featured
                      ? "1px solid rgba(222,80,21,0.20)"
                      : "1px solid rgba(255,252,242,0.08)",
                  }}
                >
                  <Icon size={28} color="#DE5015" />
                  <h3
                    className="mt-4 font-extrabold tracking-[-0.02em] text-[#FFFCF2]"
                    style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}
                  >
                    <HighlightSharwi text={card.title} />
                  </h3>
                  <p className="mt-2 flex-1 text-[14px] leading-[1.65] text-[#8A8480]">
                    <HighlightSharwi text={card.copy} />
                  </p>
                  {card.footer}
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <div className="mt-10">
          <p className="mb-5 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-[#DE5015]">
            The 3 portability scenarios
          </p>
          <div className="grid gap-4 lg:grid-cols-3">
            {portabilityScenarios.map((scenario, index) => (
              <ScrollReveal key={scenario.label} delay={index * 0.06}>
                <div
                  className="h-full rounded-2xl p-5"
                  style={{
                    background: scenario.background,
                    border: scenario.border,
                  }}
                >
                  <span
                    className="mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-bold"
                    style={{
                      backgroundColor: scenario.pillBackground,
                      border: scenario.pillBorder,
                      color: scenario.color,
                    }}
                  >
                    {scenario.label}
                  </span>
                  <p className="text-[13px] leading-[1.65] text-[#8A8480]">
                    <HighlightSharwi text={scenario.copy} />
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {secondaryBenefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.06}>
              <div className="glass-card h-full p-6">
                <benefit.icon size={22} color="#DE5015" />
                <h3 className="mt-4 text-[16px] font-bold text-[#FFFCF2]">{benefit.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.65] text-[#8A8480]">
                  <HighlightSharwi text={benefit.desc} />
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleRequestDemo}
            data-cta="request-demo"
            data-cta-source="personal_layer"
            className="inline-flex h-[52px] items-center justify-center rounded-full px-7 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "#DE5015", boxShadow: "0 8px 28px rgba(222,80,21,0.35)" }}
          >
            Request Demo →
          </button>
        </div>
      </div>
    </section>
  )
}
