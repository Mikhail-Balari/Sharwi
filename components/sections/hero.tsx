"use client"

import { ArrowRight } from "lucide-react"
import { HeroLogo3D } from "@/components/hero-logo-3d"
import { trackHeroRequestDemo, trackHeroSeeHowItWorks } from "@/lib/analytics"

export function HeroSection({ onRequestDemo }: { onRequestDemo: () => void }) {
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
        padding: "calc(var(--section-padding-y) + 64px) var(--section-padding-x) var(--section-padding-y)",
        zIndex: 3,
        backgroundColor: "#000000",
      }}
    >
      <div className="section-wrapper grid min-h-[calc(100vh-190px)] items-center gap-8 md:grid-cols-2 lg:gap-14">
        <div className="order-2 text-center md:order-1 md:text-left">
          <div
            className="mb-7 inline-flex rounded-full uppercase"
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: "#DE5015",
              backgroundColor: "rgba(222,80,21,0.08)",
              border: "1px solid rgba(222,80,21,0.20)",
              borderRadius: "100px",
              padding: "6px 16px",
            }}
          >
            Trusted visibility infrastructure for modern teams
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(38px, 5.2vw, 68px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#FFFCF2",
            }}
          >
            Real Work Deserves{" "}
            <span style={{ color: "#DE5015" }}>Real Visibility.</span>
          </h1>

          <p
            className="mx-auto mt-5 md:mx-0"
            style={{
              maxWidth: "460px",
              fontSize: "clamp(16px, 1.5vw, 18px)",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "#8A8480",
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: "#DE5015" }}>Sharwi</span> transforms everyday work into visible
            impact, for professionals and the organizations they power.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4 md:justify-start">
            <button
              onClick={handleRequestDemo}
              data-cta="request-demo"
              data-cta-source="hero_primary"
              className="group inline-flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(222,80,21,0.5)]"
              style={{
                backgroundColor: "#DE5015",
                borderRadius: "100px",
                height: "52px",
                paddingLeft: "28px",
                paddingRight: "28px",
                fontSize: "15px",
                fontWeight: 700,
                color: "#FFFFFF",
                boxShadow: "0 8px 28px rgba(222,80,21,0.35)",
              }}
            >
              Request Demo
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
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
              See how it works
            </a>
          </div>

          <div className="mx-auto mt-12 grid max-w-[460px] grid-cols-3 gap-4 md:mx-0 md:flex md:max-w-none md:gap-8">
            {[
              ["4×", "more leads"],
              ["−23%", "CAC reduction"],
              ["92%", "proof-backed rate"],
            ].map(([value, label], index) => (
              <div
                key={value}
                className={index > 0 ? "md:border-l md:border-[#FFFCF2]/10 md:pl-8" : ""}
              >
                <p style={{ fontSize: "22px", fontWeight: 800, color: "#DE5015", lineHeight: 1 }}>
                  {value}
                </p>
                <p className="mt-2 text-[12px] leading-snug text-[#5C5955]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="order-1 flex min-h-[300px] items-center justify-center md:order-2 md:min-h-[560px]"
          style={{
            background: "transparent",
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            overflow: "visible",
          }}
        >
          <HeroLogo3D />
        </div>
      </div>
    </section>
  )
}
