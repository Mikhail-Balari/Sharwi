"use client"

import { useState } from "react"
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChartColumn,
  Gauge,
  GitBranch,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  Users,
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlassCard } from "../glass-card"
import { trackCtaClick, trackEnterpriseDemoInteraction } from "@/lib/analytics"
import { useI18n } from "@/lib/i18n"

type ScenarioId = "scaleup" | "advisory" | "operations"
type TimeRange = "30d" | "90d"
type TeamFilter = "all" | "gtm" | "delivery" | "leadership"
type ProofFlowKey =
  | "enterprise_flow_captured"
  | "enterprise_flow_proof"
  | "enterprise_flow_approved"
  | "enterprise_flow_visible"

const rangeMultiplier: Record<TimeRange, number> = {
  "30d": 0.44,
  "90d": 1,
}

function scaleValue(value: number, timeRange: TimeRange) {
  return Math.round(value * rangeMultiplier[timeRange])
}

export function EnterpriseDemoSection({
  onRequestDemo,
}: {
  onRequestDemo: () => void
}) {
  const { t } = useI18n()
  const [scenarioId, setScenarioId] = useState<ScenarioId>("scaleup")
  const [timeRange, setTimeRange] = useState<TimeRange>("90d")
  const [teamFilter, setTeamFilter] = useState<TeamFilter>("all")

  const scenarios = {
    scaleup: {
      label: t("enterprise_scenario_scaleup_label"),
      company: t("enterprise_scenario_scaleup_company"),
      description: t("enterprise_scenario_scaleup_description"),
      stack: ["GitHub", "HubSpot", "LinkedIn"],
      narratives: {
        all: t("enterprise_scenario_scaleup_narrative_all"),
        gtm: t("enterprise_scenario_scaleup_narrative_gtm"),
        delivery: t("enterprise_scenario_scaleup_narrative_delivery"),
        leadership: t("enterprise_scenario_scaleup_narrative_leadership"),
      },
      metrics: {
        activeEmployees: 196,
        postsGenerated: 1284,
        proofBackedRate: 94,
        vvr: 44,
        leadsInfluenced: 192,
        cacReduction: 24,
        attributionSnapshot: 42,
        governanceStatus: t("enterprise_scenario_scaleup_governance"),
        governanceNote: t("enterprise_scenario_scaleup_governance_note"),
      },
      teams: [
        { id: "gtm", label: t("enterprise_scenario_scaleup_team_gtm"), employees: 79, posts: 492, proofRate: 95, vvr: 48 },
        { id: "delivery", label: t("enterprise_scenario_scaleup_team_delivery"), employees: 64, posts: 396, proofRate: 93, vvr: 42 },
        { id: "leadership", label: t("enterprise_scenario_scaleup_team_leadership"), employees: 53, posts: 396, proofRate: 92, vvr: 39 },
      ],
      attribution: [
        { label: t("enterprise_scenario_scaleup_attr_1"), value: 31, tone: "#FF6A00" },
        { label: t("enterprise_scenario_scaleup_attr_2"), value: 42, tone: "#F59E0B" },
        { label: t("enterprise_scenario_scaleup_attr_3"), value: 17, tone: "#FB7185" },
        { label: t("enterprise_scenario_scaleup_attr_4"), value: 10, tone: "#6B7280" },
      ],
    },
    advisory: {
      label: t("enterprise_scenario_advisory_label"),
      company: t("enterprise_scenario_advisory_company"),
      description: t("enterprise_scenario_advisory_description"),
      stack: ["CRM", "Knowledge Base", "LinkedIn"],
      narratives: {
        all: t("enterprise_scenario_advisory_narrative_all"),
        gtm: t("enterprise_scenario_advisory_narrative_gtm"),
        delivery: t("enterprise_scenario_advisory_narrative_delivery"),
        leadership: t("enterprise_scenario_advisory_narrative_leadership"),
      },
      metrics: {
        activeEmployees: 118,
        postsGenerated: 628,
        proofBackedRate: 97,
        vvr: 49,
        leadsInfluenced: 101,
        cacReduction: 17,
        attributionSnapshot: 39,
        governanceStatus: t("enterprise_scenario_advisory_governance"),
        governanceNote: t("enterprise_scenario_advisory_governance_note"),
      },
      teams: [
        { id: "gtm", label: t("enterprise_scenario_advisory_team_gtm"), employees: 29, posts: 176, proofRate: 96, vvr: 46 },
        { id: "delivery", label: t("enterprise_scenario_advisory_team_delivery"), employees: 67, posts: 324, proofRate: 98, vvr: 50 },
        { id: "leadership", label: t("enterprise_scenario_advisory_team_leadership"), employees: 22, posts: 128, proofRate: 95, vvr: 53 },
      ],
      attribution: [
        { label: t("enterprise_scenario_advisory_attr_1"), value: 27, tone: "#FF6A00" },
        { label: t("enterprise_scenario_advisory_attr_2"), value: 39, tone: "#F59E0B" },
        { label: t("enterprise_scenario_advisory_attr_3"), value: 22, tone: "#FB7185" },
        { label: t("enterprise_scenario_advisory_attr_4"), value: 12, tone: "#6B7280" },
      ],
    },
    operations: {
      label: t("enterprise_scenario_operations_label"),
      company: t("enterprise_scenario_operations_company"),
      description: t("enterprise_scenario_operations_description"),
      stack: ["ServiceNow", "Salesforce", "LinkedIn"],
      narratives: {
        all: t("enterprise_scenario_operations_narrative_all"),
        gtm: t("enterprise_scenario_operations_narrative_gtm"),
        delivery: t("enterprise_scenario_operations_narrative_delivery"),
        leadership: t("enterprise_scenario_operations_narrative_leadership"),
      },
      metrics: {
        activeEmployees: 238,
        postsGenerated: 944,
        proofBackedRate: 91,
        vvr: 39,
        leadsInfluenced: 141,
        cacReduction: 14,
        attributionSnapshot: 34,
        governanceStatus: t("enterprise_scenario_operations_governance"),
        governanceNote: t("enterprise_scenario_operations_governance_note"),
      },
      teams: [
        { id: "gtm", label: t("enterprise_scenario_operations_team_gtm"), employees: 63, posts: 252, proofRate: 92, vvr: 41 },
        { id: "delivery", label: t("enterprise_scenario_operations_team_delivery"), employees: 133, posts: 496, proofRate: 90, vvr: 38 },
        { id: "leadership", label: t("enterprise_scenario_operations_team_leadership"), employees: 42, posts: 196, proofRate: 90, vvr: 37 },
      ],
      attribution: [
        { label: t("enterprise_scenario_operations_attr_1"), value: 24, tone: "#FF6A00" },
        { label: t("enterprise_scenario_operations_attr_2"), value: 34, tone: "#F59E0B" },
        { label: t("enterprise_scenario_operations_attr_3"), value: 26, tone: "#FB7185" },
        { label: t("enterprise_scenario_operations_attr_4"), value: 16, tone: "#6B7280" },
      ],
    },
  } as const

  const teamOptions: Array<{ id: TeamFilter; label: string }> = [
    { id: "all", label: t("enterprise_filter_all") },
    { id: "gtm", label: t("enterprise_filter_gtm") },
    { id: "delivery", label: t("enterprise_filter_delivery") },
    { id: "leadership", label: t("enterprise_filter_leadership") },
  ]

  const proofFlowBase: Array<{ key: ProofFlowKey; value: number }> = [
    { key: "enterprise_flow_captured", value: 95 },
    { key: "enterprise_flow_proof", value: 91 },
    { key: "enterprise_flow_approved", value: 82 },
    { key: "enterprise_flow_visible", value: 44 },
  ]

  const scenario = scenarios[scenarioId]
  const proofFlow: Array<{ key: ProofFlowKey; value: number }> =
    scenarioId === "scaleup"
      ? proofFlowBase
      : scenarioId === "advisory"
        ? [
            { key: "enterprise_flow_captured", value: 93 },
            { key: "enterprise_flow_proof", value: 97 },
            { key: "enterprise_flow_approved", value: 74 },
            { key: "enterprise_flow_visible", value: 49 },
          ]
        : [
            { key: "enterprise_flow_captured", value: 92 },
            { key: "enterprise_flow_proof", value: 88 },
            { key: "enterprise_flow_approved", value: 77 },
            { key: "enterprise_flow_visible", value: 39 },
          ]

  const visibleTeams =
    teamFilter === "all"
      ? scenario.teams
      : scenario.teams.filter((team) => team.id === teamFilter)

  const noteMap = {
    active: t("enterprise_note_active"),
    posts: t("enterprise_note_posts"),
    proof: t("enterprise_note_proof"),
    vvr: t("enterprise_note_vvr"),
    leads: t("enterprise_note_leads"),
    cac: t("enterprise_note_cac"),
    attribution: t("enterprise_note_attribution"),
  }

  const cards = [
    {
      label: t("enterprise_card_active"),
      value: scaleValue(scenario.metrics.activeEmployees, timeRange).toString(),
      note: noteMap.active,
      icon: Users,
    },
    {
      label: t("enterprise_card_posts"),
      value: scaleValue(scenario.metrics.postsGenerated, timeRange).toLocaleString(),
      note: noteMap.posts,
      icon: Sparkles,
    },
    {
      label: t("enterprise_card_proof"),
      value: `${scenario.metrics.proofBackedRate - (timeRange === "30d" ? 2 : 0)}%`,
      note: noteMap.proof,
      icon: BadgeCheck,
    },
    {
      label: t("enterprise_card_vvr"),
      value: `${scenario.metrics.vvr - (timeRange === "30d" ? 3 : 0)}%`,
      note: noteMap.vvr,
      icon: Gauge,
    },
    {
      label: t("enterprise_card_leads"),
      value: scaleValue(scenario.metrics.leadsInfluenced, timeRange).toString(),
      note: noteMap.leads,
      icon: Target,
    },
    {
      label: t("enterprise_card_cac"),
      value: `${scenario.metrics.cacReduction - (timeRange === "30d" ? 6 : 0)}%`,
      note: noteMap.cac,
      icon: TrendingDown,
    },
    {
      label: t("enterprise_card_governance"),
      value: scenario.metrics.governanceStatus,
      note: scenario.metrics.governanceNote,
      icon: ShieldCheck,
    },
    {
      label: t("enterprise_card_attribution"),
      value: `${scenario.metrics.attributionSnapshot - (timeRange === "30d" ? 5 : 0)}%`,
      note: noteMap.attribution,
      icon: ChartColumn,
    },
  ]

  return (
    <section id="enterprise-dashboard-demo" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10">
            <div className="max-w-3xl">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-[0.25em] uppercase text-[#FF6A00] mb-5"
                style={{
                  background: "rgba(255,106,0,0.08)",
                  border: "1px solid rgba(255,106,0,0.18)",
                }}
              >
                <Building2 size={14} />
                {t("enterprise_label")}
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance"
                style={{ letterSpacing: "-0.03em" }}
              >
                {t("enterprise_h2")}
              </h2>
              <p className="text-[#9CA3AF] max-w-2xl leading-relaxed">{t("enterprise_sub")}</p>
            </div>

            <button
              onClick={() => {
                trackCtaClick("enterprise_demo_primary")
                onRequestDemo()
              }}
              data-cta="request-demo"
              data-cta-source="enterprise_dashboard"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(255,106,0,0.35)]"
              style={{ background: "#FF6A00" }}
            >
              {t("enterprise_cta")}
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </ScrollReveal>

        <GlassCard className="mb-8" hoverEffect={false}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#FF6A00] mb-2">
                  {t("enterprise_demo_account")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(scenarios) as Array<[ScenarioId, (typeof scenarios)[ScenarioId]]>).map(
                    ([id, item]) => (
                      <button
                        key={id}
                        onClick={() => {
                          setScenarioId(id)
                          trackEnterpriseDemoInteraction("scenario", id)
                        }}
                        className="px-4 py-2 rounded-full text-sm transition-all duration-200"
                        style={{
                          background: scenarioId === id ? "rgba(255,106,0,0.18)" : "rgba(255,255,255,0.05)",
                          border: scenarioId === id ? "1px solid rgba(255,106,0,0.35)" : "1px solid rgba(255,255,255,0.08)",
                          color: scenarioId === id ? "#FFF7ED" : "#9CA3AF",
                        }}
                      >
                        {item.label}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {(["30d", "90d"] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setTimeRange(range)
                      trackEnterpriseDemoInteraction("time_range", range)
                    }}
                    className="px-4 py-2 rounded-full text-sm transition-all duration-200"
                    style={{
                      background: timeRange === range ? "rgba(255,106,0,0.18)" : "rgba(255,255,255,0.05)",
                      border: timeRange === range ? "1px solid rgba(255,106,0,0.35)" : "1px solid rgba(255,255,255,0.08)",
                      color: timeRange === range ? "#FFF7ED" : "#9CA3AF",
                    }}
                  >
                    {range === "30d" ? t("enterprise_range_30d") : t("enterprise_range_90d")}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="glass-dark rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <p className="text-white font-semibold text-lg">{scenario.company}</p>
                  <span
                    className="text-[11px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full text-[#FF6A00]"
                    style={{ background: "rgba(255,106,0,0.1)", border: "1px solid rgba(255,106,0,0.18)" }}
                  >
                    {scenario.label}
                  </span>
                </div>
                <p className="text-[#9CA3AF] leading-relaxed mb-4">{scenario.description}</p>
                <div className="flex flex-wrap gap-2">
                  {scenario.stack.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full text-xs text-[#D1D5DB]"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card-orange rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BriefcaseBusiness size={16} className="text-[#FF6A00]" />
                  <p className="text-white font-semibold">{t("enterprise_overview_title")}</p>
                </div>
                <p className="text-sm text-[#D1D5DB] leading-relaxed">{t("enterprise_overview_body")}</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {cards.map((card) => (
            <GlassCard key={card.label} hoverEffect={false} className="glass-card min-h-[174px]">
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#6B7280] mb-3">{card.label}</p>
                  <p className="font-display text-4xl font-bold text-white mb-2">{card.value}</p>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">{card.note}</p>
                </div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,106,0,0.12)" }}>
                  <card.icon size={20} className="text-[#FF6A00]" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <GlassCard hoverEffect={false}>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF6A00] mb-2">{t("enterprise_coverage_label")}</p>
                <h3 className="font-display text-2xl font-bold text-white">{t("enterprise_coverage_title")}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {teamOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setTeamFilter(option.id)
                      trackEnterpriseDemoInteraction("team_filter", option.id)
                    }}
                    className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                    style={{
                      background: teamFilter === option.id ? "rgba(255,106,0,0.16)" : "rgba(255,255,255,0.04)",
                      border: teamFilter === option.id ? "1px solid rgba(255,106,0,0.28)" : "1px solid rgba(255,255,255,0.08)",
                      color: teamFilter === option.id ? "#FFF7ED" : "#9CA3AF",
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="glass-dark rounded-2xl p-5">
                <p className="text-sm text-[#D1D5DB] leading-relaxed mb-5">{scenario.narratives[teamFilter]}</p>
                <div className="space-y-4">
                  {proofFlow.map((step) => {
                    const value = Math.max(step.value - (timeRange === "30d" ? 3 : 0), 18)
                    return (
                      <div key={step.key}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#D1D5DB]">{t(step.key)}</span>
                          <span className="text-sm font-semibold text-white">{value}%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${value}%`,
                              background: "linear-gradient(90deg, rgba(255,106,0,0.9), rgba(245,158,11,0.9))",
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="glass-dark rounded-2xl p-5">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#6B7280] mb-4">{t("enterprise_breakdown_label")}</p>
                <div className="space-y-4">
                  {visibleTeams.map((team) => {
                    const employees = scaleValue(team.employees, timeRange)
                    const posts = scaleValue(team.posts, timeRange)
                    const proofRate = team.proofRate - (timeRange === "30d" ? 2 : 0)
                    const vvr = team.vvr - (timeRange === "30d" ? 3 : 0)
                    return (
                      <div key={team.label} className="glass-dark rounded-2xl p-3.5">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <div>
                            <p className="text-white font-medium">{team.label}</p>
                            <p className="text-xs text-[#9CA3AF]">
                              {employees} {t("enterprise_breakdown_active_posts")} - {posts} {t("enterprise_breakdown_posts_generated")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-white">{proofRate}% {t("enterprise_breakdown_proof")}</p>
                            <p className="text-xs text-[#9CA3AF]">{vvr}% {t("enterprise_breakdown_vvr")}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-[1fr_1fr] gap-3">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B7280] mb-1">{t("enterprise_breakdown_proof")}</p>
                            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${proofRate}%`,
                                  background: "linear-gradient(90deg, rgba(255,106,0,0.9), rgba(245,158,11,0.9))",
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B7280] mb-1">{t("enterprise_breakdown_vvr")}</p>
                            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${vvr}%`,
                                  background: "linear-gradient(90deg, rgba(251,113,133,0.9), rgba(255,106,0,0.9))",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-6">
            <GlassCard hoverEffect={false}>
              <div className="flex items-center gap-2 mb-5">
                <GitBranch size={16} className="text-[#FF6A00]" />
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF6A00]">{t("enterprise_governance_label")}</p>
                  <h3 className="font-display text-xl font-bold text-white mt-1">{t("enterprise_governance_title")}</h3>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  t("enterprise_governance_1"),
                  t("enterprise_governance_2"),
                  t("enterprise_governance_3"),
                  t("enterprise_governance_4"),
                ].map((item) => (
                  <div key={item} className="glass-dark flex items-start gap-3 rounded-2xl p-3.5">
                    <ShieldCheck size={16} className="text-[#FF6A00] mt-0.5 shrink-0" />
                    <p className="text-sm text-[#D1D5DB] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard hoverEffect={false}>
              <div className="flex items-center gap-2 mb-5">
                <ChartColumn size={16} className="text-[#FF6A00]" />
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF6A00]">{t("enterprise_attr_label")}</p>
                  <h3 className="font-display text-xl font-bold text-white mt-1">{t("enterprise_attr_title")}</h3>
                </div>
              </div>
              <div className="space-y-4 mb-5">
                {scenario.attribution.map((item) => {
                  const value = Math.max(item.value - (timeRange === "30d" ? 3 : 0), 8)
                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="text-sm text-[#D1D5DB]">{item.label}</span>
                        <span className="text-sm font-semibold text-white">{value}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <div className="h-full rounded-full" style={{ width: `${value}%`, background: item.tone }} />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="glass-card-orange rounded-2xl p-4">
                <p className="text-sm text-[#D1D5DB] leading-relaxed">{t("enterprise_attr_body")}</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}

