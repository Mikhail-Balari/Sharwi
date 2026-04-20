"use client"

import { ArrowRight } from "lucide-react"
import { SharwiLogoCombined } from "../sharwi-logo"
import { trackScheduleLiveDemo } from "@/lib/analytics"

export function CtaFooter({ onRequestDemo }: { onRequestDemo: () => void }) {
  return (
    <>
      <section id="request-demo" className="py-24" style={{ position: "relative", zIndex: 3 }}>
        <div className="max-w-[1240px] mx-auto px-6">
          <div
            className="relative overflow-hidden rounded-[36px] px-8 py-10 sm:px-10 lg:px-12"
            style={{
              background: "linear-gradient(145deg, rgba(255,106,0,0.14), rgba(13,17,24,0.96))",
              border: "1px solid rgba(255,106,0,0.18)",
            }}
          >
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[#FFB47C] mb-4">
                  Request Demo
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-[-0.04em]">
                  Book the Sharwi walkthrough that explains the story in one meeting.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
                  We will walk through the full product: the Personal Layer where professionals build verified visibility,
                  and the Enterprise Layer where your team measures impact, manages governance, and tracks what employee
                  content generates for the business.
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
                  Request Demo
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="grid gap-4">
                {[
                  {
                    title: "For companies",
                    body: "See how Sharwi activates your team, maintains governance, and measures the business impact of employee visibility.",
                  },
                  {
                    title: "For revenue leaders",
                    body: "See how verified employee content reduces CAC, improves conversion quality, and builds pipeline without paid spend.",
                  },
                  {
                    title: "For HR and employer brand",
                    body: "See how Sharwi turns your people&apos;s real work into credible visibility that attracts talent and builds trust without asking them to become content creators.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-white/10 bg-white/[0.08] p-5"
                  >
                    <p className="text-base font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-200">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="footer" className="border-t border-white/10 py-10">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <SharwiLogoCombined />
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
              Sharwi turns real work into visible reputation and measurable business impact
              through a Personal Layer for professionals and an Enterprise Layer for companies.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400 lg:justify-end">
            <a href="#problem" className="transition-colors hover:text-white">Problem</a>
            <a href="#how-it-works" className="transition-colors hover:text-white">How Sharwi Works</a>
            <a href="#personal-layer" className="transition-colors hover:text-white">Personal Layer</a>
            <a href="#enterprise-layer" className="transition-colors hover:text-white">Enterprise Layer</a>
            <a href="#request-demo" className="transition-colors hover:text-white">Request Demo</a>
          </div>
        </div>
      </footer>
    </>
  )
}
