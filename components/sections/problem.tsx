"use client"

import { EyeOff, LineChart, ShieldAlert, Users } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlassCard } from "../glass-card"
import { useI18n } from "@/lib/i18n"

export function ProblemSection() {
  const { t } = useI18n()
  const problems = [
    {
      icon: EyeOff,
      title: t("problem_card1_title"),
      text: t("problem_card1_body"),
    },
    {
      icon: Users,
      title: t("problem_card2_title"),
      text: t("problem_card2_body"),
    },
    {
      icon: ShieldAlert,
      title: t("problem_card3_title"),
      text: t("problem_card3_body"),
    },
    {
      icon: LineChart,
      title: t("problem_card4_title"),
      text: t("problem_card4_body"),
    },
  ]

  return (
    <section id="problem" className="landing-section">
      <div className="section-wrapper">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="section-eyebrow mb-4 text-center">
              {t("problem_label")}
            </p>
            <h2 className="section-title text-center">
              {t("problem_h2")}
            </h2>
            <p className="section-copy mx-auto mt-5 text-center">
              {t("problem_sub")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {problems.map((problem, i) => (
            <ScrollReveal key={problem.title} delay={i * 0.08}>
              <GlassCard className="glass-card h-full">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(222,80,21,0.14)" }}
                >
                  <problem.icon size={22} className="text-[#DE5015]" />
                </div>
                <h3 className="card-title mb-3">{problem.title}</h3>
                <p className="card-copy">{problem.text}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="glass-card-orange max-w-5xl mx-auto mt-8 rounded-[28px] px-8 py-7 text-center">
            <p className="text-lg leading-8 text-slate-200">
              {t("problem_callout")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}


