"use client"

import { BarChart3, Link2, ShieldCheck, Sparkles, Workflow } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useI18n } from "@/lib/i18n"

export function HowItWorks() {
  const { t } = useI18n()
  const steps = [
    {
      num: "01",
      title: t("how_step1_title"),
      desc: t("how_step1_body"),
      icon: Workflow,
    },
    {
      num: "02",
      title: t("how_step2_title"),
      desc: t("how_step2_body"),
      icon: Link2,
    },
    {
      num: "03",
      title: t("how_step3_title"),
      desc: t("how_step3_body"),
      icon: Sparkles,
    },
    {
      num: "04",
      title: t("how_step4_title"),
      desc: t("how_step4_body"),
      icon: ShieldCheck,
    },
    {
      num: "05",
      title: t("how_step5_title"),
      desc: t("how_step5_body"),
      icon: BarChart3,
    },
  ]

  return (
    <section id="how-it-works" className="landing-section">
      <div className="section-wrapper">
        <ScrollReveal>
          <div className="max-w-3xl mb-14">
            <p className="section-eyebrow mb-4">
              {t("how_label")}
            </p>
            <h2 className="section-title">
              {t("how_h2")}
            </h2>
            <p className="section-copy mt-5">
              {t("how_sub")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.1} direction="up">
              <div className="glass-card group relative h-full overflow-hidden rounded-[28px] p-6">
                <span className="absolute right-5 top-4 text-[56px] font-bold tracking-[-0.05em] text-white/6">
                  {step.num}
                </span>
                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: "rgba(222,80,21,0.12)" }}
                  >
                    <step.icon size={20} className="text-[#DE5015]" />
                  </div>
                  <h3 className="card-title mb-3">{step.title}</h3>
                  <p className="card-copy">{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8">
          <ScrollReveal delay={0.2}>
            <div
              style={{
                maxWidth: "720px",
                margin: "0 auto",
                padding: "32px 40px",
                background: "rgba(222,80,21,0.05)",
                border: "1px solid rgba(222,80,21,0.15)",
                borderRadius: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  fontWeight: 600,
                  color: "#DE5015",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                {t("how_why_title")}
              </p>
              <p
                style={{
                  fontSize: "clamp(16px, 1.5vw, 18px)",
                  fontWeight: 500,
                  lineHeight: 1.75,
                  color: "#CCC6BA",
                  textAlign: "center",
                }}
              >
                {t("how_why_body")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}


