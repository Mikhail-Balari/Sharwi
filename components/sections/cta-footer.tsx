"use client"

import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SharwiLogoCombined } from "../sharwi-logo"
import { trackScheduleLiveDemo } from "@/lib/analytics"
import { useI18n } from "@/lib/i18n"

function HighlightSharwi({ text }: { text: string }) {
  const parts = text.split("Sharwi")

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 ? (
            <span style={{ color: "#DE5015" }}>Sharwi</span>
          ) : null}
        </span>
      ))}
    </>
  )
}

export function CtaFooter({ onRequestDemo }: { onRequestDemo: () => void }) {
  const { t } = useI18n()

  return (
    <>
      <section id="request-demo" className="landing-section">
        <div className="section-wrapper">
          <ScrollReveal>
          <div
            className="glass-card-orange relative overflow-hidden rounded-[36px] px-8 py-10 sm:px-10 lg:px-12"
          >
            <div className="text-center">
                <p className="section-eyebrow mb-4 text-center">
                  {t("cta_label")}
                </p>
                <h2 className="section-title text-center">
                  <HighlightSharwi text={t("cta_h2")} />
                </h2>
                <p className="section-copy mx-auto mt-5 max-w-2xl text-center">
                  {t("cta_body")}
                </p>
                <p
                  style={{
                    fontSize: "clamp(15px, 1.4vw, 17px)",
                    color: "#8A8480",
                    lineHeight: 1.75,
                    maxWidth: "560px",
                    margin: "16px auto 32px",
                    textAlign: "center",
                  }}
                >
                  Whether you lead marketing, revenue, or people —{" "}
                  Sharwi gives your organization a system
                  to turn employee expertise into measurable business impact. One platform. Two
                  layers. Results you can defend to leadership.
                </p>
                <button
                  onClick={() => {
                    trackScheduleLiveDemo()
                    onRequestDemo()
                  }}
                  data-cta="request-demo"
                  data-cta-source="request_demo_section"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#DE5015] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(222,80,21,0.35)]"
                >
                  Request Demo
                  <ArrowRight size={18} />
                </button>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      <footer id="footer" className="border-t border-white/10 py-10">
        <div className="section-wrapper flex flex-col gap-6 px-6 lg:flex-row lg:items-center lg:justify-between">
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


