"use client"

import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SharwiLogoCombined } from "../sharwi-logo"
import { trackScheduleLiveDemo } from "@/lib/analytics"
import { useI18n } from "@/lib/i18n"

export function CtaFooter({ onRequestDemo }: { onRequestDemo: () => void }) {
  const { t } = useI18n()

  return (
    <>
      <section id="request-demo" className="py-24" style={{ position: "relative", zIndex: 3 }}>
        <div className="max-w-[1240px] mx-auto px-6">
          <ScrollReveal>
          <div
            className="glass-card-orange relative overflow-hidden rounded-[36px] px-8 py-10 sm:px-10 lg:px-12"
          >
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[#FFB47C] mb-4">
                  {t("cta_label")}
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-[-0.04em]">
                  {t("cta_h2")}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
                  {t("cta_body")}
                </p>
                <button
                  onClick={() => {
                    trackScheduleLiveDemo()
                    onRequestDemo()
                  }}
                  data-cta="request-demo"
                  data-cta-source="request_demo_section"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6a00] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,106,0,0.35)]"
                >
                  {t("cta_button")}
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="grid gap-4">
                {[
                  { title: t("cta_card1_title"), body: t("cta_card1_body") },
                  { title: t("cta_card2_title"), body: t("cta_card2_body") },
                  { title: t("cta_card3_title"), body: t("cta_card3_body") },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="glass-card rounded-[24px] border border-white/10 bg-white/[0.08] p-5"
                  >
                    <p className="text-base font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-200">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      <footer id="footer" className="border-t border-white/10 py-10">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <SharwiLogoCombined />
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
              {t("footer_body")}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400 lg:justify-end">
            <a href="#problem" className="transition-colors hover:text-white">{t("nav_problem")}</a>
            <a href="#how-it-works" className="transition-colors hover:text-white">{t("nav_how_it_works")}</a>
            <a href="#personal-layer" className="transition-colors hover:text-white">{t("nav_for_professionals")}</a>
            <a href="#enterprise-layer" className="transition-colors hover:text-white">{t("nav_for_companies")}</a>
            <a href="#request-demo" className="transition-colors hover:text-white">{t("nav_request_demo")}</a>
          </div>
        </div>
      </footer>
    </>
  )
}
