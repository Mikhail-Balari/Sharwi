"use client"

import { SharwiLogoIcon } from "../sharwi-logo"
import { Calendar } from "lucide-react"
import { trackScheduleLiveDemo } from "@/lib/analytics"

const mailtoLink =
  "mailto:sharwi.startup@gmail.com?subject=Schedule%20a%20Live%20Demo%20%E2%80%94%20Sharwi&body=Hi%20Sharwi%20team%2C%0D%0A%0D%0AI'd%20like%20to%20schedule%20a%20live%20demo.%20Here%20are%20my%20details%3A%0D%0AName%3A%0D%0ARole%3A%0D%0ACompany%3A%0D%0APreferred%20times%3A%0D%0A%0D%0AThanks!"

export function CtaFooter() {
  return (
    <>
      <section id="cta" className="py-24" style={{ position: "relative", zIndex: 3 }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="relative overflow-hidden">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(255,106,0,0.1) 0%, transparent 70%)",
              }}
            />
            <div
              className="relative z-10 rounded-3xl p-12 sm:p-16 text-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
                Visibility should reflect{" "}
                <span className="text-[#FF6A00]">reality.</span>
              </h2>
              <p className="text-[#9CA3AF] max-w-xl mx-auto mb-8 leading-relaxed">
                Schedule a live demo to see how Sharwi turns real work into real visibility.
              </p>
              <a
                href={mailtoLink}
                onClick={trackScheduleLiveDemo}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 hover:border-[#FF6A00]/50 hover:shadow-[0_0_20px_rgba(255,106,0,0.2)]"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Calendar size={18} className="text-[#FF6A00]" />
                Schedule a Live Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SharwiLogoIcon size={24} />
            <span className="font-display font-bold text-sm text-white tracking-wide">SHARWI</span>
          </div>
          <p className="text-[#6B7280] text-sm">{"© 2026 Sharwi. All rights reserved."}</p>
          <p className="text-[#6B7280] text-sm italic">Signal over noise. Real work over polish.</p>
        </div>
      </footer>
    </>
  )
}
