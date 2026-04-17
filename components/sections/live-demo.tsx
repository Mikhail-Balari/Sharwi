"use client"

import { useEffect } from "react"
import { ArrowRight } from "lucide-react"
import {
  trackCtaClick,
  trackMobileDemoInteraction,
  trackTryDemoLive,
} from "@/lib/analytics"

const mobileDemoUrl = "https://sharwi-527721ed.base44.app"

export function LiveDemoSection() {
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
    <section id="mobile-demo" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[#FF8C00] mb-4">
              Embedded Mobile Demo
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.04em]">
              Show the product experience where Sharwi starts: in the hands of the professional.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              This embedded prototype gives visitors a real feel for the Personal Layer.
              It is intentionally lightweight: enough to validate the experience without
              pretending the final full product is already built.
            </p>

            <div className="grid gap-4 mt-8">
              {[
                {
                  title: "Capture in seconds",
                  body: "Log work fast or pull it from connected systems.",
                },
                {
                  title: "Keep the evidence attached",
                  body: "The story stays grounded in source material and context.",
                },
                {
                  title: "Approve before anything goes out",
                  body: "Human control is preserved even when AI drafts the first version.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <p className="text-base font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.body}</p>
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6a00] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,106,0,0.35)]"
              >
                Open Prototype
                <ArrowRight size={18} />
              </a>
              <a
                href="#request-demo"
                onClick={() => trackCtaClick("mobile_demo_request_demo")}
                data-cta="request-demo"
                data-cta-source="mobile_demo"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#ff6a00]/40 hover:bg-white/[0.08]"
              >
                Request Guided Demo
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px]">
            <div className="absolute inset-0 rounded-[44px] bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.2),transparent_55%)] blur-3xl" />
            <div className="relative mx-auto max-w-[430px] rounded-[42px] border border-white/12 bg-[#0c1016]/95 p-4 shadow-[0_28px_120px_rgba(0,0,0,0.5)]">
              <div className="mx-auto mb-4 h-7 w-36 rounded-full bg-white/10" />
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-black">
                <iframe
                  src={mobileDemoUrl}
                  scrolling="no"
                  title="Sharwi Mobile App Demo"
                  className="h-[760px] w-full bg-black"
                />
              </div>
            </div>
            <div className="mx-auto mt-6 grid max-w-[520px] gap-4 sm:grid-cols-3">
              {["Personal capture flow", "Proof-backed draft", "Approval-first UX"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
