"use client"

import { Check, X } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const llmBullets = [
  "Generates content from prompts, not from your actual work",
  "Same generic output — no connection to evidence",
  "No feedback loop — model never improves for your context",
  "Optimizes for sounding good, not for business results",
]

const ragBullets = [
  "Retrieves real work evidence before generating anything",
  "Every draft is anchored to a PR, ticket, doc, or outcome",
  "Learns what formats and signals drive engagement for your role",
  "Optimizes for real pipeline results, not pretty text",
]

function BulletRow({
  item,
  positive,
}: {
  item: string
  positive?: boolean
}) {
  const Icon = positive ? Check : X
  return (
    <div className="flex items-start gap-3">
      <Icon
        size={18}
        className="mt-0.5 shrink-0"
        color={positive ? "#DE5015" : "#FB7185"}
      />
      <p className="text-[14px] leading-[1.65] text-[#CCC6BA]">{item}</p>
    </div>
  )
}

export function TechnologySection() {
  return (
    <section id="technology" className="landing-section">
      <div className="section-wrapper">
        <ScrollReveal>
          <div className="mx-auto mb-14 max-w-[760px] text-center">
            <p className="section-eyebrow mb-4 text-center">The Technology</p>
            <h2 className="section-title text-center">
              We don&apos;t use the AI{" "}
              <span style={{ color: "#DE5015" }}>everyone else uses</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-[680px] text-center text-[16px] leading-[1.75] text-[#8A8480]">
              Most tools are built on generic LLMs — they generate content and stop there. Sharwi is built on RAG: AI that retrieves real work evidence before generating anything. No hallucinations. No generic output. Content anchored to what actually happened.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div
              className="h-full rounded-[20px] p-8"
              style={{
                background: "rgba(251,113,133,0.04)",
                border: "1px solid rgba(251,113,133,0.15)",
              }}
            >
              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FB7185]/10">
                  <X size={18} color="#FB7185" />
                </span>
                <h3 className="text-[18px] font-bold text-[#FFFCF2]">LLM — What everyone else uses</h3>
              </div>
              <div className="grid gap-4">
                {llmBullets.map((item) => (
                  <BulletRow key={item} item={item} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div
              className="h-full rounded-[20px] p-8"
              style={{
                background: "rgba(222,80,21,0.05)",
                border: "1px solid rgba(222,80,21,0.20)",
              }}
            >
              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DE5015]/10">
                  <Check size={18} color="#DE5015" />
                </span>
                <h3 className="text-[18px] font-bold text-[#FFFCF2]">RAG — How Sharwi works</h3>
              </div>
              <div className="grid gap-4">
                {ragBullets.map((item) => (
                  <BulletRow key={item} item={item} positive />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="glass-card mx-auto mt-8 max-w-[900px] px-8 py-8 text-center sm:px-10">
            <h3 className="text-[22px] font-bold text-[#FFFCF2]">
              The dataset that makes this better over time
            </h3>
            <p className="mx-auto mt-3 max-w-[680px] text-[15px] leading-[1.75] text-[#8A8480]">
              Every proof-backed post Sharwi generates becomes a training signal. Which work type, for which role, in which industry, generated which engagement and pipeline result. No generic AI model has this. It is built exclusively from real professional work — and it compounds with every company that uses Sharwi.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
