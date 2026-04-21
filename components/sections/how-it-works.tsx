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
    <section id="how-it-works" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1240px] mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[#FF8C00] mb-4">
              {t("how_label")}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.04em]">
              {t("how_h2")}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
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
                    style={{ background: "rgba(255,106,0,0.12)" }}
                  >
                    <step.icon size={20} className="text-[#FF6A00]" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm leading-7 text-slate-400">{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8">
          <ScrollReveal delay={0.2}>
            <div className="glass-dark rounded-[28px] p-7 max-w-[760px]">
              <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#FF8C00] mb-3">
                {t("how_why_title")}
              </p>
              <p className="text-lg leading-8 text-slate-200">
                {t("how_why_body")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
