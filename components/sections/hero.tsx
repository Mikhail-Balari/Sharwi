"use client"

import { ArrowRight } from "lucide-react"
import { HeroLogo3D } from "@/components/hero-logo-3d"
import { trackHeroRequestDemo, trackHeroSeeHowItWorks } from "@/lib/analytics"
import { useI18n } from "@/lib/i18n"

export function HeroSection({ onRequestDemo }: { onRequestDemo: () => void }) {
  const { t } = useI18n()

  const handleRequestDemo = () => {
    trackHeroRequestDemo()
    onRequestDemo()
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "calc(var(--section-padding-y) + 64px)",
        paddingBottom: "var(--section-padding-y)",
        paddingLeft: "var(--section-padding-x)",
        paddingRight: "var(--section-padding-x)",
        position: "relative",
        zIndex: 3,
      }}
    >
      <div className="section-wrapper grid min-h-[calc(100vh-180px)] items-center gap-8 md:grid-cols-[45fr_55fr] md:gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="order-2 text-center md:order-1 md:text-left">
          <div
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 uppercase"
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              fontWeight: 600,
              color: "#DE5015",
            }}
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-[#DE5015]" />
            {t("hero_label")}
          </div>

          <h1
            className="mt-7 font-display"
            style={{
              fontSize: "clamp(38px, 5.5vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#FFFCF2",
            }}
          >
            {t("hero_h1_line1")}
            <span className="block text-[#DE5015]">{t("hero_h1_line2")}</span>
          </h1>

          <p
            className="mx-auto mt-7 md:mx-0"
            style={{
              maxWidth: "480px",
              fontSize: "clamp(16px, 1.6vw, 18px)",
              lineHeight: 1.7,
              color: "#8A8480",
              fontWeight: 400,
              textAlign: "inherit",
            }}
          >
            {t("hero_sub")}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap md:justify-start">
            <button
              onClick={handleRequestDemo}
              data-cta="request-demo"
              data-cta-source="hero_primary"
              className="group inline-flex items-center justify-center gap-2 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(222,80,21,0.5)]"
              style={{
                backgroundColor: "#DE5015",
                borderRadius: "100px",
                height: "52px",
                paddingLeft: "28px",
                paddingRight: "28px",
                fontSize: "15px",
                fontWeight: 700,
                boxShadow: "0 8px 28px rgba(222,80,21,0.35)",
              }}
            >
              {t("hero_cta_primary")}
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <a
              href="#how-it-works"
              onClick={trackHeroSeeHowItWorks}
              data-cta="see-how-it-works"
              className="inline-flex items-center justify-center transition-all duration-300 hover:border-white/30"
              style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(255,252,242,0.15)",
                borderRadius: "100px",
                height: "52px",
                paddingLeft: "28px",
                paddingRight: "28px",
                fontSize: "15px",
                fontWeight: 600,
                color: "#FFFCF2",
              }}
            >
              {t("hero_cta_secondary")}
            </a>
          </div>
        </div>

        <div className="order-1 flex min-h-[360px] items-center justify-center md:order-2 md:min-h-[500px]">
          <HeroLogo3D />
        </div>
      </div>
    </section>
  )
}
