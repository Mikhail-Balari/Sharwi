"use client"

import { X, Check } from "lucide-react"

const llmItems = [
  "Generates content and moves on",
  "Same generic output for everyone",
  "No feedback loop \u2014 never improves",
  "Optimizes for sounding good, not for results",
]

const rlmItems = [
  "Learns from what actually gets engagement",
  "Adapts to your specific voice and style",
  "Gets smarter with every interaction",
  "Optimizes for real results, not just pretty text",
]

export function TechnologySection() {
  return (
    <section id="technology" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#FF6A00] text-center mb-3">
          THE TECHNOLOGY
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-4 text-balance max-w-3xl mx-auto">
          {"We don't use the "}
          <span className="text-[#FF6A00]">AI</span>
          {" everyone else uses. We use "}
          <span className="text-[#FF6A00]">RLM.</span>
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-3xl mx-auto mb-14 leading-relaxed">
          {"Most tools are built on LLMs \u2014 they generate content and stop there. Sharwi is built on RLM (Reinforcement Learning Model): AI that watches what works, learns your voice, and gets smarter every time you use it."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* LLM card */}
          <div
            className="rounded-2xl p-9 transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "rgba(20,14,8,0.65)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,106,0,0.1)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#6B7280] mb-6">
              {"LLM \u2014 What everyone else uses"}
            </p>
            <div className="flex flex-col gap-4">
              {llmItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <X
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  />
                  <span className="text-[#9CA3AF]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RLM card */}
          <div
            className="rounded-2xl p-9 transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "rgba(20,14,8,0.65)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,106,0,0.25)",
              boxShadow: "0 0 32px rgba(255,106,0,0.08), 0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#FF6A00] mb-6">
              {"RLM \u2014 How Sharwi works"}
            </p>
            <div className="flex flex-col gap-4">
              {rlmItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="shrink-0 mt-0.5 text-[#FF6A00]"
                  />
                  <span className="text-[#D1D5DB]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pill badge */}
        <div className="flex justify-center mb-8">
          <div
            className="rounded-full px-7 py-4 text-center"
            style={{
              background: "rgba(255,106,0,0.06)",
              border: "1px solid rgba(255,106,0,0.2)",
            }}
          >
            <p className="font-bold text-white text-sm">
              The more you use Sharwi, the better it knows you.
            </p>
            <p className="text-[#9CA3AF] text-xs mt-1">
              Most users see a measurable improvement in content quality within
              the first 2 weeks.
            </p>
          </div>
        </div>

        <p className="text-center text-white/80 italic text-lg">
          {"The result: content that sounds like you wrote it on your best day \u2014 every time."}
        </p>
      </div>
    </section>
  )
}
