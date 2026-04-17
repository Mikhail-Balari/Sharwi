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
import { GlassCard } from "../glass-card"
import {
  trackCtaClick,
  trackEnterpriseDemoInteraction,
} from "@/lib/analytics"

type ScenarioId = "scaleup" | "advisory" | "operations"
type TimeRange = "30d" | "90d"
type TeamFilter = "all" | "gtm" | "delivery" | "leadership"

const rangeMultiplier: Record<TimeRange, number> = {
  "30d": 0.44,
  "90d": 1,
}

const scenarios = {
  scaleup: {
    label: "Series C SaaS",
    company: "Northstar Cloud",
    description:
      "Sharwi connects product, GTM, and customer evidence into a proof-backed advocacy pilot for a scaling revenue team.",
    stack: ["GitHub", "HubSpot", "LinkedIn"],
    narratives: {
      all: "Sharwi is converting product delivery proof into pipeline-facing visibility without asking employees to become marketers.",
      gtm: "Revenue teams are using launch and customer proof to increase trusted reach around active deals.",
      delivery: "Delivery teams can publish credible updates without exposing internal noise or rewriting work into marketing copy.",
      leadership: "Leadership gets a directional view of governance, trusted visibility, and CAC efficiency from one pilot layer.",
    },
    metrics: {
      activeEmployees: 196,
      postsGenerated: 1284,
      proofBackedRate: 94,
      vvr: 44,
      leadsInfluenced: 192,
      cacReduction: 24,
      attributionSnapshot: 42,
      governanceStatus: "Healthy",
      governanceNote: "6 escalations, 0 compliance incidents",
    },
    proofFlow: [
      { label: "Work signal captured", value: 95 },
      { label: "Proof attached", value: 91 },
      { label: "Approved", value: 82 },
      { label: "Verified visibility", value: 44 },
    ],
    teams: [
      { id: "gtm", label: "GTM", employees: 79, posts: 492, proofRate: 95, vvr: 48 },
      { id: "delivery", label: "Delivery", employees: 64, posts: 396, proofRate: 93, vvr: 42 },
      { id: "leadership", label: "Leadership", employees: 53, posts: 396, proofRate: 92, vvr: 39 },
    ],
    attribution: [
      { label: "Employee-sourced demo requests", value: 31, tone: "#FF6A00" },
      { label: "Assisted pipeline touchpoints", value: 42, tone: "#F59E0B" },
      { label: "Paid retargeting overlap", value: 17, tone: "#FB7185" },
      { label: "Direct / unattributed", value: 10, tone: "#6B7280" },
    ],
  },
  advisory: {
    label: "Advisory Firm",
    company: "Aster Advisory Group",
    description:
      "Sharwi helps experts publish client-safe insights with governance controls while keeping an executive lens on trusted visibility.",
    stack: ["CRM", "Knowledge Base", "LinkedIn"],
    narratives: {
      all: "The pilot is optimized for expert credibility, not raw content volume. Trust is coming from governed proof and consistent publishing.",
      gtm: "Business development sees which expert posts are opening conversations, without claiming perfect funnel attribution.",
      delivery: "Subject matter experts can share client-safe insights with approval guardrails and proof traceability.",
      leadership: "Leadership gets account-level signal without turning the pilot into a reporting burden.",
    },
    metrics: {
      activeEmployees: 118,
      postsGenerated: 628,
      proofBackedRate: 97,
      vvr: 49,
      leadsInfluenced: 101,
      cacReduction: 17,
      attributionSnapshot: 39,
      governanceStatus: "Strict",
      governanceNote: "Mandatory legal review on sensitive topics",
    },
    proofFlow: [
      { label: "Work signal captured", value: 93 },
      { label: "Proof attached", value: 97 },
      { label: "Approved", value: 74 },
      { label: "Verified visibility", value: 49 },
    ],
    teams: [
      { id: "gtm", label: "Business Dev", employees: 29, posts: 176, proofRate: 96, vvr: 46 },
      { id: "delivery", label: "Advisory", employees: 67, posts: 324, proofRate: 98, vvr: 50 },
      { id: "leadership", label: "Partners", employees: 22, posts: 128, proofRate: 95, vvr: 53 },
    ],
    attribution: [
      { label: "Employee-sourced meetings", value: 27, tone: "#FF6A00" },
      { label: "Assisted expansion pipeline", value: 39, tone: "#F59E0B" },
      { label: "Event / referral overlap", value: 22, tone: "#FB7185" },
      { label: "Direct / unattributed", value: 12, tone: "#6B7280" },
    ],
  },
  operations: {
    label: "Distributed Ops",
    company: "Relay Logistics",
    description:
      "Sharwi turns frontline and operational proof into visible trust signals for hiring, partnerships, and revenue teams without adding reporting burden.",
    stack: ["ServiceNow", "Salesforce", "LinkedIn"],
    narratives: {
      all: "Distributed teams are using real operational proof to create buyer trust and recruiting credibility with lightweight governance.",
      gtm: "Revenue teams are reusing verified field proof to warm late-stage accounts and reduce skepticism in complex deals.",
      delivery: "Operational leaders can surface quality, uptime, and delivery proof without writing content from scratch.",
      leadership: "Leadership sees how distributed trust signals support both pipeline and hiring narratives in one pilot dashboard.",
    },
    metrics: {
      activeEmployees: 238,
      postsGenerated: 944,
      proofBackedRate: 91,
      vvr: 39,
      leadsInfluenced: 141,
      cacReduction: 14,
      attributionSnapshot: 34,
      governanceStatus: "Managed",
      governanceNote: "12 escalations, 1 policy hold resolved",
    },
    proofFlow: [
      { label: "Work signal captured", value: 92 },
      { label: "Proof attached", value: 88 },
      { label: "Approved", value: 77 },
      { label: "Verified visibility", value: 39 },
    ],
    teams: [
      { id: "gtm", label: "Revenue", employees: 63, posts: 252, proofRate: 92, vvr: 41 },
      { id: "delivery", label: "Operations", employees: 133, posts: 496, proofRate: 90, vvr: 38 },
      { id: "leadership", label: "Regional leads", employees: 42, posts: 196, proofRate: 90, vvr: 37 },
    ],
    attribution: [
      { label: "Employee-sourced opportunities", value: 24, tone: "#FF6A00" },
      { label: "Assisted pipeline touchpoints", value: 34, tone: "#F59E0B" },
      { label: "Partner / referral overlap", value: 26, tone: "#FB7185" },
      { label: "Direct / unattributed", value: 16, tone: "#6B7280" },
    ],
  },
} as const

const teamOptions: Array<{ id: TeamFilter; label: string }> = [
  { id: "all", label: "Whole pilot" },
  { id: "gtm", label: "Revenue / GTM" },
  { id: "delivery", label: "Delivery / Ops" },
  { id: "leadership", label: "Leadership" },
]

function scaleValue(value: number, timeRange: TimeRange) {
  return Math.round(value * rangeMultiplier[timeRange])
}

function metricNote(label: string, timeRange: TimeRange) {
  const rangeLabel = timeRange === "90d" ? "pilot window" : "recent month"
  const notes: Record<string, string> = {
    active: `Active across the ${rangeLabel}`,
    posts: `Generated during the ${rangeLabel}`,
    proof: "Claim-level proof attached before publish",
    vvr: "Verified Visibility Rate in target audiences",
    leads: "CRM-linked and modeled influenced demand",
    cac: "Directional vs. previous channel mix",
    attribution: "Share of influenced pipeline with employee touch",
  }
  return notes[label]
}

export function EnterpriseDemoSection({
  onRequestDemo,
}: {
  onRequestDemo: () => void
}) {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("scaleup")
  const [timeRange, setTimeRange] = useState<TimeRange>("90d")
  const [teamFilter, setTeamFilter] = useState<TeamFilter>("all")

  const scenario = scenarios[scenarioId]
  const visibleTeams =
    teamFilter === "all"
      ? scenario.teams
      : scenario.teams.filter((team) => team.id === teamFilter)

  const cards = [
    {
      label: "Active Employees",
      value: scaleValue(scenario.metrics.activeEmployees, timeRange).toString(),
      note: metricNote("active", timeRange),
      icon: Users,
    },
    {
      label: "Posts Generated",
      value: scaleValue(scenario.metrics.postsGenerated, timeRange).toLocaleString(),
      note: metricNote("posts", timeRange),
      icon: Sparkles,
    },
    {
      label: "Proof-backed Rate",
      value: `${scenario.metrics.proofBackedRate - (timeRange === "30d" ? 2 : 0)}%`,
      note: metricNote("proof", timeRange),
      icon: BadgeCheck,
    },
    {
      label: "Verified Visibility Rate (VVR)",
      value: `${scenario.metrics.vvr - (timeRange === "30d" ? 3 : 0)}%`,
      note: metricNote("vvr", timeRange),
      icon: Gauge,
    },
    {
      label: "Leads Influenced",
      value: scaleValue(scenario.metrics.leadsInfluenced, timeRange).toString(),
      note: metricNote("leads", timeRange),
      icon: Target,
    },
    {
      label: "CAC Reduction",
      value: `${scenario.metrics.cacReduction - (timeRange === "30d" ? 6 : 0)}%`,
      note: metricNote("cac", timeRange),
      icon: TrendingDown,
    },
    {
      label: "Governance Status",
      value: scenario.metrics.governanceStatus,
      note: scenario.metrics.governanceNote,
      icon: ShieldCheck,
    },
    {
      label: "Attribution Snapshot",
      value: `${scenario.metrics.attributionSnapshot - (timeRange === "30d" ? 5 : 0)}%`,
      note: metricNote("attribution", timeRange),
      icon: ChartColumn,
    },
  ]

  return (
    <section id="enterprise-dashboard-demo" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
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
              Enterprise Dashboard Demo
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance"
              style={{ letterSpacing: "-0.03em" }}
            >
              A credible command-center visual,
              <span className="text-[#FF6A00]"> without pretending the full product already exists.</span>
            </h2>
            <p className="text-[#9CA3AF] max-w-2xl leading-relaxed">
              This section behaves like a high-fidelity dashboard concept for pilots. It shows how Sharwi could surface activation, governance, and directional business signal for sponsors.
            </p>
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
            Request Pilot Demo
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        <GlassCard className="mb-8" hoverEffect={false}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#FF6A00] mb-2">
                  Demo Account
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
                    Last {range === "30d" ? "30 days" : "90 days"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
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

              <div className="rounded-2xl p-5" style={{ background: "rgba(255,106,0,0.06)", border: "1px solid rgba(255,106,0,0.18)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <BriefcaseBusiness size={16} className="text-[#FF6A00]" />
                  <p className="text-white font-semibold">Pilot thesis</p>
                </div>
                <p className="text-sm text-[#D1D5DB] leading-relaxed">
                  Sharwi is being evaluated as infrastructure for trust distribution, proof-backed visibility,
                  governance, and directional CAC efficiency.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {cards.map((card) => (
            <GlassCard key={card.label} hoverEffect={false} className="min-h-[174px]">
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
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF6A00] mb-2">Pilot Coverage</p>
                <h3 className="font-display text-2xl font-bold text-white">Proof to visibility chain</h3>
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
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-sm text-[#D1D5DB] leading-relaxed mb-5">{scenario.narratives[teamFilter]}</p>
                <div className="space-y-4">
                  {scenario.proofFlow.map((step) => {
                    const value = Math.max(step.value - (timeRange === "30d" ? 3 : 0), 18)
                    return (
                      <div key={step.label}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#D1D5DB]">{step.label}</span>
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

              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#6B7280] mb-4">Active team breakdown</p>
                <div className="space-y-4">
                  {visibleTeams.map((team) => {
                    const employees = scaleValue(team.employees, timeRange)
                    const posts = scaleValue(team.posts, timeRange)
                    const proofRate = team.proofRate - (timeRange === "30d" ? 2 : 0)
                    const vvr = team.vvr - (timeRange === "30d" ? 3 : 0)
                    return (
                      <div key={team.label}>
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <div>
                            <p className="text-white font-medium">{team.label}</p>
                            <p className="text-xs text-[#9CA3AF]">{employees} active employees • {posts} posts generated</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-white">{proofRate}% proof-backed</p>
                            <p className="text-xs text-[#9CA3AF]">{vvr}% VVR</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-[1fr_1fr] gap-3">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B7280] mb-1">Proof-backed</p>
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
                            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B7280] mb-1">VVR</p>
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
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF6A00]">Governance Status</p>
                  <h3 className="font-display text-xl font-bold text-white mt-1">Policy guardrails are visible</h3>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  "Proof required before publishing claims tied to customer or product outcomes.",
                  "Manager and legal escalation only when topic risk crosses threshold.",
                  "Audit trail retained per post, proof source, approver, and status.",
                  "Employee keeps final publish control while the company keeps governance visibility.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl p-3.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
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
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF6A00]">Attribution Snapshot</p>
                  <h3 className="font-display text-xl font-bold text-white mt-1">Directional, not perfect</h3>
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
              <div className="rounded-2xl p-4" style={{ background: "rgba(255,106,0,0.05)", border: "1px solid rgba(255,106,0,0.14)" }}>
                <p className="text-sm text-[#D1D5DB] leading-relaxed">
                  Attribution here means CRM-linked and modeled influence from employee content touchpoints.
                  It helps validate the pilot story quickly, without promising finance-grade precision.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
