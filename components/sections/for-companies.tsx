"use client"

import { BarChart3, Link2, ShieldCheck, TrendingDown, Users, Zap } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlassCard } from "../glass-card"
import { trackForCompaniesRequestDemo } from "@/lib/analytics"
import { useI18n } from "@/lib/i18n"

export function ForCompanies({ onRequestDemo }: { onRequestDemo: () => void }) {
  const { t } = useI18n()

  const cards = [
    { icon: Link2, title: t("comp_card1_title"), desc: t("comp_card1_body") },
    { icon: Users, title: t("comp_card2_title"), desc: t("comp_card2_body") },
    { icon: ShieldCheck, title: t("comp_card3_title"), desc: t("comp_card3_body") },
    { icon: BarChart3, title: t("comp_card4_title"), desc: t("comp_card4_body") },
    { icon: TrendingDown, title: t("comp_card5_title"), desc: t("comp_card5_body") },
    { icon: Zap, title: t("comp_card6_title"), desc: t("comp_card6_body") },
  ]

  const companyWins = [
    t("comp_company_gets_1"),
    t("comp_company_gets_2"),
    t("comp_company_gets_3"),
    t("comp_company_gets_4"),
    t("comp_company_gets_5"),
  ]

  const employeeWins = [
    t("comp_employee_keeps_1"),
    t("comp_employee_keeps_2"),
    t("comp_employee_keeps_3"),
    t("comp_employee_keeps_4"),
    t("comp_employee_keeps_5"),
  ]

  const handleRequestDemo = () => {
    trackForCompaniesRequestDemo()
    onRequestDemo()
  }

  return (
    <section id="enterprise-layer" className="landing-section">
      <div className="section-wrapper">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span
              className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-black"
              style={{ background: "#DE5015" }}
            >
              2
            </span>
            <span className="section-eyebrow">
              {t("comp_label")}
            </span>
          </div>

          <h2
            className="section-title text-center text-balance"
          >
            {t("comp_h2_line1")}{" "}
            <span style={{ color: "#DE5015" }}>{t("comp_h2_highlight")}</span>
          </h2>
          <p className="section-copy mx-auto mb-12 max-w-2xl text-center">
            {t("comp_sub")}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.08}>
              <GlassCard className="glass-card h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(222,80,21,0.15)" }}
                >
                  <card.icon size={22} className="text-[#DE5015]" />
                </div>
                <h3 className="card-title mb-2">{card.title}</h3>
                <p className="card-copy">{card.desc}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="glass-card-orange max-w-4xl mx-auto rounded-2xl overflow-hidden mb-10">
          <div className="px-7 pt-6 pb-2">
            <p className="text-xs font-bold tracking-widest uppercase text-[#DE5015] mb-1">
              {t("comp_start_label")}
            </p>
            <p className="text-xs text-[#6B7280]">{t("comp_start_sub")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[rgba(222,80,21,0.10)] py-4">
            {[
              { stat: "100-250", label: t("comp_start_metric1_label") },
              { stat: "1", label: t("comp_start_metric2_label") },
              { stat: "8 weeks", label: t("comp_start_metric3_label") },
            ].map((metric) => (
              <div key={metric.label} className="text-center px-6 py-4">
                <p className="font-extrabold text-[#DE5015] mb-1" style={{ fontSize: "40px", lineHeight: "1" }}>
                  {metric.stat}
                </p>
                <p className="text-[#9CA3AF] text-xs leading-relaxed">{metric.label}</p>
              </div>
            ))}
          </div>
          <div
            className="px-7 py-4 border-t border-[rgba(222,80,21,0.10)]"
            style={{ background: "rgba(222,80,21,0.04)" }}
          >
            <p className="text-center text-xs text-[#6B7280]">{t("comp_start_footer")}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="glass-dark rounded-2xl p-6">
            <p className="text-xs font-bold tracking-widest uppercase text-[#DE5015] mb-4">
              {t("comp_company_gets_title")}
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-[#9CA3AF]">
              {companyWins.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#DE5015" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-dark rounded-2xl p-6">
            <p className="text-xs font-bold tracking-widest uppercase text-[#DE5015] mb-4">
              {t("comp_employee_keeps_title")}
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-[#9CA3AF]">
              {employeeWins.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "rgba(222,80,21,0.5)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleRequestDemo}
            data-cta="request-demo"
            data-cta-source="enterprise_layer"
            className="px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(222,80,21,0.4)]"
            style={{ background: "#DE5015" }}
          >
            {t("comp_cta")}
          </button>
        </div>
      </div>
    </section>
  )
}


