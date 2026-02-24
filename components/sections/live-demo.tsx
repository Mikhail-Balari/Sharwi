"use client"

import { useEffect } from "react"
import { trackTryDemoLive, trackDemoInteraction } from "@/lib/analytics"

export function LiveDemoSection() {
  useEffect(() => {
    let interactionTracked = false
    const handleMessage = (e: MessageEvent) => {
      if (
        typeof e.origin === "string" &&
        e.origin.includes("base44.app") &&
        !interactionTracked
      ) {
        interactionTracked = true
        trackDemoInteraction()
      }
    }
    const handleIframeFocus = () => {
      if (!interactionTracked) {
        interactionTracked = true
        trackDemoInteraction()
      }
    }
    window.addEventListener("message", handleMessage)
    window.addEventListener("blur", handleIframeFocus)
    return () => {
      window.removeEventListener("message", handleMessage)
      window.removeEventListener("blur", handleIframeFocus)
    }
  }, [])

  return (
    <section id="live-demo" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3">
          See Sharwi in <span className="text-[#FF6A00]">action</span>
        </h2>
        <p className="text-[#9CA3AF] text-center mb-10">
          Try the product prototype directly below
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", padding: "40px 20px" }}>
        <div style={{
          width: "100%", maxWidth: "520px", margin: "auto", borderRadius: "28px",
          background: "rgba(20, 14, 8, 0.65)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 106, 0, 0.25)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4), 0 0 80px rgba(255,106,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          overflow: "hidden", position: "relative",
        }}>
          <div style={{
            position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%",
            background: "radial-gradient(circle, rgba(255,106,0,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "relative", zIndex: 1, width: "calc(100% - 36px)",
            aspectRatio: "390 / 844", height: "min(92vh, 844px)", maxHeight: "844px",
            overflow: "hidden", borderRadius: "22px", margin: "18px",
            background: "rgba(0,0,0,0.55)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}>
            <iframe
              src="https://sharwi-527721ed.base44.app"
              scrolling="no"
              style={{
                width: "calc(100% + 18px)", height: "100%", border: "none",
                overflow: "hidden", display: "block", marginLeft: "-9px", position: "relative",
              }}
              title="Sharwi Mobile App Demo"
            />
          </div>
        </div>

        <a
          href="https://sharwi-527721ed.base44.app"
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackTryDemoLive}
          className="group inline-block relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,106,0,0.5)]"
          style={{
            padding: "16px 32px", fontSize: "18px", fontWeight: 600,
            background: "#ff6a00", color: "white", borderRadius: "12px",
            textDecoration: "none", boxShadow: "0 8px 24px rgba(255,106,0,0.4)",
          }}
        >
          <span style={{ position: "relative", zIndex: 1 }}>Try Demo Live</span>
        </a>
      </div>
    </section>
  )
}
