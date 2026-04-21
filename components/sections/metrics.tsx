"use client"

import { DollarSign, Eye, Globe, Target, TrendingUp, Users } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlassCard } from "../glass-card"
import { useI18n } from "@/lib/i18n"

export function MetricsSection() {
  const { t } = useI18n()
  const metrics = [
    {
      icon: Users,
      stat: "5.6x",
      title: t("metrics_m1_label"),
      desc: t("metrics_m1_body"),
    },
    {
      icon: TrendingUp,
      stat: "2x",
      title: t("metrics_m2_label"),
      desc: t("metrics_m2_body"),
    },
    {
      icon: Target,
      stat: "30-50%",
      title: t("metrics_m3_label"),
      desc: t("metrics_m3_body"),
    },
    {
      icon: Globe,
      stat: "8 weeks",
      title: t("metrics_m4_label"),
      desc: t("metrics_m4_body"),
    },
  ]
  const impactCards = [
    {
      icon: TrendingUp,
      value: "10x",
      title: "Higher Engagement",
      desc: "Employee posts drive significantly more engagement than brand accounts.",
    },
    {
      icon: Users,
      value: "561%",
      title: "Extended Reach",
      desc: "Messages shared by employees reach 561% further than brand channels.",
    },
    {
      icon: Eye,
      value: "8x",
      title: "More Visibility",
      desc: "Employee advocacy increases content visibility by 8x on average.",
    },
    {
      icon: DollarSign,
      value: "14%",
      title: "Revenue Impact",
      desc: "Companies with advocacy programs see 14% increase in revenue.",
    },
  ]

  return (
    <section id="roi-benchmark" className="landing-section">
      <div className="section-wrapper">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="section-eyebrow mb-4 text-center">
              {t("metrics_label")}
            </p>
            <h2 className="section-title text-center">
              {t("metrics_h2")}
            </h2>
            <p className="section-copy mx-auto mt-5 text-center">
              {t("metrics_sub")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="mb-14">
            <h3
              className="mb-8 text-center"
              style={{
                fontSize: "clamp(26px, 2.8vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ color: "#DE5015" }}>Measurable</span>
              <span style={{ color: "#FFFCF2" }}> Business Impact</span>
            </h3>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {impactCards.map((card) => (
                <div key={card.title} className="glass-card h-full p-7 text-center">
                  <card.icon size={28} className="mx-auto text-[#DE5015]" />
                  <p className="mt-5 text-[52px] font-black leading-none text-[#DE5015]">
                    {card.value}
                  </p>
                  <h4 className="mt-4 text-[16px] font-bold text-[#FFFCF2]">{card.title}</h4>
                  <p className="mt-2 text-[13px] leading-[1.65] text-[#8A8480]">{card.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[11px] text-[#5C5955]">
              Source: Employee Advocacy Benchmark Report 2026
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric.title} delay={i * 0.12}>
              <GlassCard className="glass-card-orange h-full text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(222,80,21,0.2)" }}
                >
                  <metric.icon size={22} className="text-[#DE5015]" />
                </div>
                <p
                  className="font-extrabold text-[#DE5015] mb-2"
                  style={{ fontSize: "52px", lineHeight: "1" }}
                >
                  {metric.stat}
                </p>
                <h3 className="card-title mb-2 text-center">{metric.title}</h3>
                <p className="card-copy text-center">{metric.desc}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-dark rounded-[28px] p-7">
            <p className="section-eyebrow mb-3">
              {t("metrics_how_title")}
            </p>
            <p className="section-copy">
              {t("metrics_how_body")}
            </p>
          </div>
          <div className="glass-dark rounded-[28px] p-7">
            <p className="section-eyebrow mb-3">
              {t("metrics_lead_title")}
            </p>
            <p className="section-copy">
              {t("metrics_lead_body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


