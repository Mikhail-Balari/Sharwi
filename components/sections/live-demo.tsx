"use client"

import { useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import {
  trackCtaClick,
  trackMobileDemoInteraction,
  trackTryDemoLive,
} from "@/lib/analytics"
import { useI18n } from "@/lib/i18n"

const mobileDemoUrl = "https://sharwi-527721ed.base44.app"

export function LiveDemoSection() {
  const { t } = useI18n()

  useEffect(() => {
    let interactionTracked = false

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
              {t("demo_label")}
            </p>
            <h2 className="section-title">
              {t("demo_h2")}
            </h2>
            <p className="section-copy mt-5">
              {t("demo_body")}
            </p>

            <div className="grid gap-4 mt-8">
              {[
                {
                  title: t("demo_info1_title"),
                  body: t("demo_info1_body"),
                },
                {
                  title: t("demo_info2_title"),
                  body: t("demo_info2_body"),
                },
                {
                  title: t("demo_info3_title"),
                  body: t("demo_info3_body"),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="glass-card rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <p className="card-title">{item.title}</p>
                  <p className="card-copy mt-2">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap mt-8">
              <a
                href={mobileDemoUrl}
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
            className="relative mx-auto w-[85vw] min-w-[280px] max-w-[320px] md:max-w-[360px] lg:w-[min(400px,40vw)] lg:max-w-[400px]"
          >
            <div className="absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-[44px] bg-[radial-gradient(circle_at_top,rgba(222,80,21,0.2),transparent_58%)] blur-3xl" />
            <div
              className="relative mx-auto"
              style={{
                borderRadius: "clamp(32px, 3vw, 42px)",
                border: "1px solid rgba(255,255,255,0.10)",
                backgroundColor: "#0A0A0A",
                padding: "clamp(8px, 1vw, 14px)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="mx-auto"
                style={{
                  width: "clamp(72px, 7vw, 120px)",
                  height: "clamp(18px, 1.8vw, 26px)",
                  borderRadius: "100px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  marginBottom: "clamp(6px, 0.8vw, 14px)",
                }}
              />
              <div
                className="relative overflow-hidden border border-white/10 bg-black"
                style={{
                  borderRadius: "clamp(22px, 2.2vw, 30px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  aspectRatio: "390 / 760",
                  width: "100%",
                }}
              >
                <iframe
                  src={mobileDemoUrl}
                  scrolling="no"
                  title={t("demo_iframe_title")}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    display: "block",
                    backgroundColor: "#000000",
                  }}
                />
              </div>
            </div>
            <div className="mx-auto mt-6 grid gap-3 sm:grid-cols-3">
              {[t("demo_pill1"), t("demo_pill2"), t("demo_pill3")].map((item) => (
                <div
                  key={item}
                  className="glass-card flex h-12 items-center justify-center rounded-2xl px-3 text-center text-[13px] leading-[1.3] text-[#CCC6BA]"
                >
                  {item}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}


