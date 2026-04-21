"use client"

import { Award, Briefcase, Eye, Globe, Send, ShieldCheck } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlassCard } from "../glass-card"
import { trackForProfessionalsRequestDemo } from "@/lib/analytics"
import { useI18n } from "@/lib/i18n"

export function ForProfessionals({ onRequestDemo }: { onRequestDemo: () => void }) {
  const { t } = useI18n()

  const cards = [
    { icon: Eye, title: t("prof_card1_title"), desc: t("prof_card1_body") },
    { icon: Award, title: t("prof_card2_title"), desc: t("prof_card2_body") },
    { icon: Send, title: t("prof_card3_title"), desc: t("prof_card3_body") },
    { icon: Globe, title: t("prof_card4_title"), desc: t("prof_card4_body") },
    { icon: ShieldCheck, title: t("prof_card5_title"), desc: t("prof_card5_body") },
    { icon: Briefcase, title: t("prof_card6_title"), desc: t("prof_card6_body") },
  ]

  const experienceSteps = [
    { step: "01", title: t("prof_step1_title"), desc: t("prof_step1_body") },
    { step: "02", title: t("prof_step2_title"), desc: t("prof_step2_body") },
    { step: "03", title: t("prof_step3_title"), desc: t("prof_step3_body") },
  ]

  const handleRequestDemo = () => {
    trackForProfessionalsRequestDemo()
    onRequestDemo()
  }

  return (
    <section id="personal-layer" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal direction="left">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span
              className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-black"
              style={{ background: "#FF6A00" }}
            >
              1
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-[#FF6A00]">
              {t("prof_label")}
            </span>
          </div>

          <h2
            className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("prof_h2_line1")}{" "}
            <span style={{ color: "#FF6A00" }}>{t("prof_h2_highlight")}</span>
          </h2>
          <p className="text-[#9CA3AF] text-center max-w-2xl mx-auto mb-4 leading-relaxed">
            {t("prof_sub")}
          </p>

          <div
            className="glass-card-orange max-w-2xl mx-auto mb-12 rounded-xl px-6 py-4 text-center"
          >
            <p className="text-sm text-[#D1D5DB]">
              <span className="text-[#FF6A00] font-semibold">{t("prof_highlight_lead")}</span>
              {" "}
              {t("prof_highlight_body")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={0.2 + i * 0.08} direction="right">
              <GlassCard className="glass-card h-full text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(255,106,0,0.15)" }}
                >
                  <card.icon size={22} className="text-[#FF6A00]" />
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2">{card.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{card.desc}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="glass-dark max-w-3xl mx-auto rounded-2xl overflow-hidden mb-10">
          <div className="px-7 pt-6 pb-2">
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF6A00] mb-4">
              {t("prof_experience_title")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(255,106,0,0.10)]">
            {experienceSteps.map((item) => (
              <div key={item.step} className="px-7 py-5">
                <span className="text-4xl font-extrabold text-[rgba(255,106,0,0.20)] block mb-2">
                  {item.step}
                </span>
                <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                <p className="text-[#9CA3AF] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleRequestDemo}
            data-cta="request-demo"
            data-cta-source="personal_layer"
            className="px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(255,106,0,0.4)]"
            style={{ background: "#FF6A00" }}
          >
            {t("prof_cta")}
          </button>
        </div>
      </div>
    </section>
  )
}
