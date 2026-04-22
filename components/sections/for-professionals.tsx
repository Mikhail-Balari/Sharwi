"use client"

import { ArrowRight, Award, Eye, Globe, Infinity, Send, ShieldCheck, Sparkles } from "lucide-react"
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
              Your work is already happening. Sharwi captures it, verifies it, and turns it into a professional identity that stays with you — regardless of where you work.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          <ScrollReveal className="h-full">
            <div
              className="relative h-full overflow-hidden rounded-[24px] p-9"
              style={{
                background: "rgba(222,80,21,0.06)",
                border: "1px solid rgba(222,80,21,0.25)",
              }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 120 120"
                className="absolute -right-5 -top-5 h-[120px] w-[120px]"
                style={{ opacity: 0.15 }}
              >
                <path
                  d="M60 6 98 22 114 60 98 98 60 114 22 98 6 60 22 22Z"
                  fill="none"
                  stroke="#DE5015"
                  strokeWidth="7"
                />
                <text x="60" y="65" textAnchor="middle" fill="#DE5015" fontSize="13" fontWeight="800">
                  VERIFIED
                </text>
              </svg>
              <ShieldCheck size={32} color="#DE5015" />
              <h3
                className="mt-4 overflow-hidden text-ellipsis whitespace-normal font-extrabold tracking-[-0.02em] text-[#FFFCF2] md:whitespace-nowrap"
                style={{ fontSize: "clamp(18px, 1.8vw, 22px)" }}
              >
                Sharwi Verified Badge
              </h3>
              <p
                className="mt-3 text-[#8A8480]"
                style={{
                  fontSize: "14px",
                  lineHeight: 1.65,
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                How many people know you work well? How many actually value what you deliver? Those recognitions stay locked inside internal platforms — and disappear when you leave. The Sharwi Badge changes that. Every verified achievement becomes a permanent, portable proof of your capabilities.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Proof-backed", "Evidence-first", "Tamper-proof"].map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full px-[14px] py-[5px] text-[12px] font-semibold text-[#DE5015]"
                    style={{
                      backgroundColor: "rgba(222,80,21,0.08)",
                      border: "1px solid rgba(222,80,21,0.20)",
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="h-full">
            <div className="glass-card h-full rounded-[24px] p-9">
              <Infinity size={32} color="#DE5015" />
              <h3
                className="mt-4 overflow-hidden text-ellipsis whitespace-normal font-extrabold tracking-[-0.02em] text-[#FFFCF2] md:whitespace-nowrap"
                style={{ fontSize: "clamp(18px, 1.8vw, 22px)" }}
              >
                Portable Reputation
              </h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-[#8A8480]">
                Every time you change jobs, you start from zero — again. Your contributions get buried in closed systems nobody outside your company can see. Sharwi makes your professional track record portable. Your reputation belongs to you — not to your employer.
              </p>
              <div className="mt-6 grid gap-2">
                {[
                  ["You + Sharwi company", "Both you and your company use Sharwi → full sync, automatic evidence, full measurement.", "#2ECC71"],
                  ["You + Non-Sharwi company", "Your company doesn't use Sharwi yet → you log work manually, keep your reputation growing.", "#DE5015"],
                  ["Freelancer / Between jobs", "No employer needed → Sharwi works as your independent professional identity layer.", "#8A8480"],
                ].map(([label, copy, color]) => (
                  <div
                    key={label}
                    className="flex items-start rounded-xl"
                    style={{
                      backgroundColor: "rgba(255,252,242,0.03)",
                      border: "1px solid rgba(255,252,242,0.06)",
                      gap: "8px",
                      padding: "10px 14px",
                    }}
                  >
                    <span
                      className="shrink-0 whitespace-nowrap rounded-full px-[10px] py-[3px] text-[10px] font-bold"
                      style={{
                        backgroundColor:
                          color === "#2ECC71"
                            ? "rgba(46,204,113,0.10)"
                            : color === "#DE5015"
                              ? "rgba(222,80,21,0.10)"
                              : "rgba(255,252,242,0.06)",
                        color,
                      }}
                    >
                      {label}
                    </span>
                    <p className="flex-1 text-[13px] leading-[1.6] text-[#8A8480]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.16} className="h-full">
            <div className="glass-card h-full rounded-[24px] p-9">
              <Sparkles size={32} color="#DE5015" />
              <h3
                className="mt-4 overflow-hidden text-ellipsis whitespace-normal font-extrabold tracking-[-0.02em] text-[#FFFCF2] md:whitespace-nowrap"
                style={{ fontSize: "clamp(18px, 1.8vw, 22px)" }}
              >
                Your Brand, Automated
              </h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-[#8A8480]">
                Most professionals know they should build a presence online. Almost none do — because creating content takes time they don&apos;t have, and the blank page is terrifying. Sharwi turns what you already do into content that sounds like you, backed by evidence, ready to publish.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {["Work", "Evidence", "Your voice"].map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <span
                      className="rounded-full px-4 py-1.5 text-[12px] font-semibold text-[#DE5015]"
                      style={{
                        backgroundColor: "rgba(222,80,21,0.08)",
                        border: "1px solid rgba(222,80,21,0.20)",
                      }}
                    >
                      {step}
                    </span>
                    {index < 2 ? <ArrowRight size={14} color="#5C5955" /> : null}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {secondaryBenefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.06}>
              <div className="glass-card h-full p-6">
                <benefit.icon size={22} color="#DE5015" />
                <h3 className="mt-4 text-[16px] font-bold text-[#FFFCF2]">{benefit.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.65] text-[#8A8480]">{benefit.desc}</p>
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
