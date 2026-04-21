"use client"

import { EyeOff, LineChart, ShieldAlert, Users } from "lucide-react"
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
    <section id="problem" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[#FF8C00] mb-4">
            {t("problem_label")}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.04em]">
            {t("problem_h2")}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            {t("problem_sub")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {problems.map((problem) => (
            <GlassCard key={problem.title} className="h-full">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "rgba(255,106,0,0.14)" }}
              >
                <problem.icon size={22} className="text-[#FF6A00]" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">{problem.title}</h3>
              <p className="text-sm leading-7 text-slate-400">{problem.text}</p>
            </GlassCard>
          ))}
        </div>

        <div
          className="max-w-5xl mx-auto mt-8 rounded-[28px] px-8 py-7 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255,106,0,0.12), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,106,0,0.18)",
          }}
        >
          <p className="text-lg leading-8 text-slate-200">
            {t("problem_callout")}
          </p>
        </div>
      </div>
    </section>
  )
}
