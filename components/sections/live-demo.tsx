"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import {
  trackCtaClick,
  trackMobileDemoInteraction,
  trackTryDemoLive,
} from "@/lib/analytics"
import { useI18n } from "@/lib/i18n"

const DEMO_URL = "/app/"
const FALLBACK_URL = "https://sharwi-527721ed.base44.app"

export function LiveDemoSection() {
  const { t } = useI18n()
  const [useFallback, setUseFallback] = useState(false)
  const activeDemoUrl = useFallback ? FALLBACK_URL : DEMO_URL

  useEffect(() => {
    let interactionTracked = false
    let cancelled = false

    fetch(DEMO_URL, { method: "HEAD" })
      .then((response) => {
        if (!cancelled && !response.ok) setUseFallback(true)
      })
      .catch(() => {
        if (!cancelled) setUseFallback(true)
      })

    const markInteraction = (source: string) => {
      if (interactionTracked) return
      interactionTracked = true
      trackMobileDemoInteraction(source)
    }

    const handleMessage = (event: MessageEvent) => {
      if (typeof event.origin === "string" && event.origin.includes("base44.app")) {
        markInteraction("iframe_message")
      }
    }

    const handleBlur = () => {
      markInteraction("iframe_focus")
    }

    window.addEventListener("message", handleMessage)
    window.addEventListener("blur", handleBlur)

    return () => {
      cancelled = true
      window.removeEventListener("message", handleMessage)
      window.removeEventListener("blur", handleBlur)
    }
  }, [])

  return (
    <section id="mobile-demo" className="landing-section">
      <div className="section-wrapper">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-[60px] 2xl:gap-[80px]">
          <ScrollReveal direction="left">
            <p className="section-eyebrow mb-4">
              PERSONAL LAYER · LIVE DEMO
            </p>
            <h2 className="section-title">
              {t("demo_h2")}
            </h2>
            <p className="section-copy mt-5">
              {t("demo_body")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap mt-8">
              <a
                href={activeDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackTryDemoLive}
                data-cta="open-mobile-demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#DE5015] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(222,80,21,0.35)]"
              >
                {t("demo_cta_primary")}
                <ArrowRight size={18} />
              </a>
              <a
                href="#request-demo"
                onClick={() => trackCtaClick("mobile_demo_request_demo")}
                data-cta="request-demo"
                data-cta-source="mobile_demo"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#DE5015]/40 hover:bg-white/[0.08]"
              >
                {t("demo_cta_secondary")}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal
            direction="right"
            delay={0.15}
            className="relative mx-auto w-full"
          >
            <div className="absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-[44px] bg-[radial-gradient(circle_at_top,rgba(222,80,21,0.2),transparent_58%)] blur-3xl" />
            <div
              className="relative mx-auto"
              style={{
                maxWidth: "clamp(280px, 38vw, 390px)",
                width: "100%",
                margin: "0 auto",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
                aspectRatio: "390 / 780",
                position: "relative",
                backgroundColor: "#000000",
              }}
            >
                <iframe
                  key={useFallback ? "fallback" : "demo"}
                  src={useFallback ? FALLBACK_URL : DEMO_URL}
                  title="Sharwi App Demo"
                  scrolling="no"
                  onError={() => setUseFallback(true)}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    display: "block",
                    overflow: "hidden",
                  }}
                  allow="clipboard-read; clipboard-write"
                />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}


