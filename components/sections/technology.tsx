"use client"

import { ArrowRight, Check, X } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useI18n } from "@/lib/i18n"

type FlowNode = {
  title: string
  subtitle?: string
  tone: "neutral" | "orange" | "green"
}

function Flow({ nodes }: { nodes: FlowNode[] }) {
  return (
    <div className="grid gap-3">
      {nodes.map((node, index) => (
        <div key={`${node.title}-${index}`} className="flex items-center gap-3">
          <div
            className="min-h-[68px] flex-1 rounded-2xl border px-4 py-3"
            style={{
              background:
                node.tone === "neutral"
                  ? "rgba(255,252,242,0.03)"
                  : node.tone === "green"
                    ? "rgba(52,211,153,0.06)"
                    : "rgba(222,80,21,0.06)",
              borderColor:
                node.tone === "neutral"
                  ? "rgba(255,252,242,0.08)"
                  : node.tone === "green"
                    ? "rgba(52,211,153,0.22)"
                    : "rgba(222,80,21,0.22)",
            }}
          >
            <p
              className={node.tone === "neutral" ? "text-white/70" : "text-[#FFFCF2]"}
              style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.3 }}
            >
              {node.title}
            </p>
            {node.subtitle ? (
              <p className="mt-1 text-[12px] leading-5 text-[#8A8480]">{node.subtitle}</p>
            ) : null}
          </div>
          {index < nodes.length - 1 ? (
            <ArrowRight size={18} className="hidden shrink-0 text-[#DE5015]/70 sm:block" />
          ) : null}
        </div>
      ))}
    </div>
  )
}

export function TechnologySection() {
  const { t } = useI18n()

  const genericNodes: FlowNode[] = [
    { title: t("tech_generic_node1"), tone: "neutral" },
    { title: t("tech_generic_node2"), tone: "neutral" },
    { title: t("tech_generic_node3"), tone: "neutral" },
  ]

  const ragNodes: FlowNode[] = [
    { title: t("tech_rag_node1"), subtitle: t("tech_rag_node1_sub"), tone: "orange" },
    { title: t("tech_rag_node2"), subtitle: t("tech_rag_node2_sub"), tone: "orange" },
    { title: t("tech_rag_node3"), subtitle: t("tech_rag_node3_sub"), tone: "orange" },
    { title: t("tech_rag_node4"), subtitle: t("tech_rag_node4_sub"), tone: "orange" },
    { title: t("tech_rag_node5"), subtitle: t("tech_rag_node5_sub"), tone: "green" },
  ]

  const genericBullets = [
    t("tech_generic_bullet1"),
    t("tech_generic_bullet2"),
    t("tech_generic_bullet3"),
  ]

  const ragBullets = [
    t("tech_rag_bullet1"),
    t("tech_rag_bullet2"),
    t("tech_rag_bullet3"),
  ]

  return (
    <section id="technology" className="landing-section">
      <div className="section-wrapper">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-eyebrow mb-4 text-center">{t("tech_label")}</p>
            <h2 className="section-title text-center">{t("tech_h2")}</h2>
            <p className="section-copy mx-auto mt-5 max-w-3xl text-center">{t("tech_sub")}</p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <ScrollReveal direction="left" delay={0.08}>
            <div
              className="h-full rounded-2xl p-7"
              style={{
                background: "rgba(251,113,133,0.05)",
                border: "1px solid rgba(251,113,133,0.15)",
              }}
            >
              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-400/10 text-rose-300">
                  <X size={18} />
                </span>
                <h3 className="card-title">{t("tech_generic_title")}</h3>
              </div>

              <Flow nodes={genericNodes} />

              <p className="card-copy mt-6">{t("tech_generic_body")}</p>

              <div className="mt-6 grid gap-3">
                {genericBullets.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <X size={16} className="mt-1 shrink-0 text-rose-300" />
                    <p className="card-copy">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.16}>
            <div
              className="h-full rounded-2xl p-7"
              style={{
                background: "rgba(222,80,21,0.05)",
                border: "1px solid rgba(222,80,21,0.20)",
              }}
            >
              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DE5015]/12 text-[#DE5015]">
                  <Check size={18} />
                </span>
                <h3 className="card-title">{t("tech_rag_title")}</h3>
              </div>

              <Flow nodes={ragNodes} />

              <div className="mt-6 grid gap-3">
                {ragBullets.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check size={16} className="mt-1 shrink-0 text-[#DE5015]" />
                    <p className="card-copy">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div
            className="mx-auto mt-8 max-w-[900px] rounded-[20px] px-8 py-8 text-center sm:px-10"
            style={{
              background: "rgba(222,80,21,0.04)",
              border: "1px solid rgba(222,80,21,0.12)",
            }}
          >
            <h3
              className="font-display"
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#FFFCF2",
              }}
            >
              {t("tech_dataset_title")}
            </h3>
            <p
              className="mx-auto mt-3 max-w-[680px]"
              style={{
                fontSize: "15px",
                color: "#8A8480",
                lineHeight: 1.75,
              }}
            >
              {t("tech_dataset_body")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
