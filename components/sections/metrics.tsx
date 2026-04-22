"use client"

import { DollarSign, Eye, Globe, Target, TrendingUp, Users } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlassCard } from "../glass-card"
import { useI18n } from "@/lib/i18n"
import { trackCtaClick } from "@/lib/analytics"

export function MetricsSection({ onRequestDemo }: { onRequestDemo: () => void }) {
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
      stat: "30–50%",
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
                  style={{
                    fontSize: metric.stat === "30–50%" ? "clamp(36px, 4.5vw, 52px)" : "clamp(40px, 5vw, 56px)",
                    lineHeight: metric.stat === "30–50%" ? 1.1 : 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {metric.stat}
                </p>
                <h3 className="card-title mb-2 text-center">{metric.title}</h3>
                <p className="card-copy text-center">{metric.desc}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.08}>
          <div className="mt-14">
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

        <ScrollReveal delay={0.16}>
          <div className="mt-14 rounded-[20px] border border-[#DE5015]/20 bg-[#DE5015]/[0.06] p-10 text-center">
            <h3 className="text-[28px] font-extrabold tracking-[-0.8px] text-[#FFFCF2]">
              Ready to see your numbers here?
            </h3>
            <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-relaxed text-[#8A8480]">
              Book a 30-minute session. We&apos;ll map your team size, current stack, and advocacy
              baseline to show you what <span style={{ color: "#DE5015" }}>Sharwi</span> would
              surface.
            </p>
            <button
              onClick={() => {
                trackCtaClick("metrics_ready_cta")
                onRequestDemo()
              }}
              className="mt-6 h-[52px] rounded-full px-8 text-[15px] font-bold text-white transition-transform hover:scale-[1.03]"
              style={{
                backgroundColor: "#DE5015",
                boxShadow: "0 8px 32px rgba(222,80,21,0.35)",
              }}
            >
              Request a Demo →
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}


