"use client"

import { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  BarChart3,
  ChartBar,
  Database,
  FileText,
  GitBranch,
  ShieldCheck,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"
import {
  trackCtaClick,
  trackEnterpriseDemoInteraction,
} from "@/lib/analytics"

type ScenarioKey = "saas" | "advisory" | "ops"
type TimeRange = "30d" | "90d"

const SCENARIOS = {
  saas: {
    company: "Northstar Cloud",
    industry: "Series C SaaS",
    employees: 196,
    totalEmployees: 312,
    postsGenerated: 1284,
    proofBackedRate: 94,
    vvr: 44,
    leadsInfluenced: 192,
    cacReduction: 24,
    cplReduction: 41,
    reachMultiplier: 5.8,
    conversionLift: 2.1,
    governanceStatus: "healthy",
    governanceEscalations: 6,
    governanceIncidents: 0,
    stack: ["GitHub", "HubSpot", "LinkedIn"],
    weeklyPosts: [142, 168, 155, 182, 171, 195, 143, 128],
    vvrTrend: [26, 29, 31, 33, 36, 38, 41, 44],
    attribution: [
      { name: "Employee-sourced demos", value: 31, color: "#DE5015" },
      { name: "Assisted pipeline touches", value: 42, color: "#2ECC71" },
      { name: "Paid retargeting overlap", value: 17, color: "#FB7185" },
      { name: "Direct / unattributed", value: 10, color: "#5C5955" },
    ],
    proofFunnel: [
      {
        stage: "Work signals captured",
        value: 95,
        description: "From GitHub, HubSpot, docs",
      },
      {
        stage: "Evidence attached",
        value: 91,
        description: "PR, ticket, or doc linked",
      },
      {
        stage: "Approved by employee",
        value: 82,
        description: "Human review passed",
      },
      {
        stage: "Published & verified",
        value: 44,
        description: "Live with proof intact",
      },
    ],
    teams: [
      {
        name: "Sales & GTM",
        employees: 79,
        posts: 492,
        proofRate: 95,
        vvr: 48,
        leads: 89,
      },
      {
        name: "Engineering",
        employees: 64,
        posts: 396,
        proofRate: 93,
        vvr: 42,
        leads: 61,
      },
      {
        name: "Leadership",
        employees: 53,
        posts: 396,
        proofRate: 92,
        vvr: 39,
        leads: 42,
      },
    ],
  },
  advisory: {
    company: "Aster Advisory Group",
    industry: "Professional Services",
    employees: 118,
    totalEmployees: 195,
    postsGenerated: 628,
    proofBackedRate: 97,
    vvr: 49,
    leadsInfluenced: 101,
    cacReduction: 17,
    cplReduction: 33,
    reachMultiplier: 4.9,
    conversionLift: 1.8,
    governanceStatus: "strict",
    governanceEscalations: 14,
    governanceIncidents: 0,
    stack: ["CRM", "Knowledge Base", "LinkedIn"],
    weeklyPosts: [68, 74, 71, 82, 79, 88, 84, 82],
    vvrTrend: [31, 33, 36, 38, 41, 43, 46, 49],
    attribution: [
      { name: "Expert-sourced inquiries", value: 38, color: "#DE5015" },
      { name: "Referral pipeline touches", value: 35, color: "#2ECC71" },
      { name: "Event follow-up overlap", value: 18, color: "#FB7185" },
      { name: "Direct / unattributed", value: 9, color: "#5C5955" },
    ],
    proofFunnel: [
      {
        stage: "Work signals captured",
        value: 93,
        description: "Client work, docs, meetings",
      },
      {
        stage: "Evidence attached",
        value: 97,
        description: "Case reference or doc linked",
      },
      {
        stage: "Legal/compliance review",
        value: 88,
        description: "Sensitive topics reviewed",
      },
      {
        stage: "Published & verified",
        value: 49,
        description: "Live with proof intact",
      },
    ],
    teams: [
      {
        name: "Partners & Principals",
        employees: 42,
        posts: 198,
        proofRate: 98,
        vvr: 52,
        leads: 48,
      },
      {
        name: "Senior Consultants",
        employees: 51,
        posts: 264,
        proofRate: 97,
        vvr: 48,
        leads: 35,
      },
      {
        name: "Associates",
        employees: 25,
        posts: 166,
        proofRate: 95,
        vvr: 44,
        leads: 18,
      },
    ],
  },
  ops: {
    company: "Relay Logistics",
    industry: "Distributed Operations",
    employees: 238,
    totalEmployees: 520,
    postsGenerated: 944,
    proofBackedRate: 91,
    vvr: 39,
    leadsInfluenced: 143,
    cacReduction: 19,
    cplReduction: 38,
    reachMultiplier: 6.2,
    conversionLift: 2.3,
    governanceStatus: "healthy",
    governanceEscalations: 9,
    governanceIncidents: 0,
    stack: ["ServiceNow", "Salesforce", "LinkedIn"],
    weeklyPosts: [98, 112, 108, 124, 118, 131, 122, 131],
    vvrTrend: [21, 24, 26, 29, 31, 34, 37, 39],
    attribution: [
      { name: "Frontline-sourced leads", value: 27, color: "#DE5015" },
      { name: "Partnership touchpoints", value: 39, color: "#2ECC71" },
      { name: "Paid campaign overlap", value: 22, color: "#FB7185" },
      { name: "Direct / unattributed", value: 12, color: "#5C5955" },
    ],
    proofFunnel: [
      {
        stage: "Work signals captured",
        value: 91,
        description: "ServiceNow tickets, ops logs",
      },
      {
        stage: "Evidence attached",
        value: 88,
        description: "Ticket or outcome linked",
      },
      {
        stage: "Manager approval",
        value: 79,
        description: "Team lead review",
      },
      {
        stage: "Published & verified",
        value: 39,
        description: "Live with proof intact",
      },
    ],
    teams: [
      {
        name: "Sales & Partnerships",
        employees: 88,
        posts: 374,
        proofRate: 93,
        vvr: 43,
        leads: 67,
      },
      {
        name: "Operations",
        employees: 96,
        posts: 312,
        proofRate: 90,
        vvr: 37,
        leads: 48,
      },
      {
        name: "Leadership",
        employees: 54,
        posts: 258,
        proofRate: 91,
        vvr: 38,
        leads: 28,
      },
    ],
  },
} as const

const TIME_MULTIPLIERS: Record<TimeRange, number> = { "30d": 0.38, "90d": 1 }
const funnelColors = ["#DE5015", "#DE5015", "#DE5015", "#2ECC71"]

const comparisonRows = [
  ["Content distribution", "yes", "yes", "yes", "yes"],
  ["AI draft generation", "partial", "partial", "partial", "full"],
  ["Proof / evidence attachment", "no", "no", "no", "yes"],
  ["Work signal capture (Jira, GitHub, CRM)", "no", "no", "no", "yes"],
  ["Verified Visibility Rate (VVR)", "no", "no", "no", "yes"],
  ["Lead attribution to employee content", "no", "no", "no", "yes"],
  ["CAC/CPL measurement", "no", "no", "no", "yes"],
  ["Governance + compliance trails", "partial", "partial", "partial", "full"],
  ["Portable employee reputation", "no", "no", "no", "yes"],
  ["Proprietary conversion dataset", "no", "no", "no", "yes"],
]

function StatusCell({
  status,
  highlight = false,
}: {
  status: string
  highlight?: boolean
}) {
  const map = {
    yes: { label: "✓", color: "#2ECC71" },
    no: { label: "✕", color: "#FB7185" },
    partial: { label: "Partial", color: "#DE5015" },
    full: { label: "✓ Full", color: "#2ECC71" },
  } as const
  const item = map[status as keyof typeof map]

  return (
    <td
      className="px-4 py-4 text-center text-sm"
      style={{
        color: item.color,
        background: highlight ? "rgba(222,80,21,0.05)" : "transparent",
      }}
    >
      <span className="font-semibold">{item.label}</span>
    </td>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  subtext,
  trend,
  trendColor = "#2ECC71",
  valueColor = "#FFFCF2",
  tooltip,
}: {
  icon: typeof Users
  label: string
  value: string
  subtext: string
  trend: string
  trendColor?: string
  valueColor?: string
  tooltip?: string
}) {
  return (
    <div
      className="group rounded-2xl p-5 transition-colors duration-200 hover:border-[#DE5015]/25"
      style={{
        background: "rgba(255,252,242,0.03)",
        border: "1px solid rgba(255,252,242,0.06)",
      }}
    >
      <div className="mb-5 flex items-center gap-2">
        <Icon size={16} color="#DE5015" />
        <div className="relative flex items-center gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-[1px] text-[#8A8480]">
            {label}
          </span>
          {tooltip && (
            <span className="relative cursor-help text-[11px] text-[#8A8480]">
              ⓘ
              <span
                className="pointer-events-none absolute left-1/2 top-6 z-20 hidden w-64 -translate-x-1/2 rounded-lg p-3 text-left text-xs leading-relaxed text-[#FFFCF2] shadow-2xl group-hover:block"
                style={{
                  background: "#1A1815",
                  border: "1px solid #2E2B27",
                }}
              >
                {tooltip}
              </span>
            </span>
          )}
        </div>
      </div>
      <p
        className="text-4xl font-extrabold leading-none tracking-[-1px]"
        style={{ color: valueColor }}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-[#5C5955]">{subtext}</p>
      <div
        className="mt-4 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold"
        style={{
          color: trendColor,
          background: `${trendColor}18`,
          border: `1px solid ${trendColor}35`,
        }}
      >
        {trend}
      </div>
    </div>
  )
}

function MiniProgress({ value, color }: { value: number; color: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-1.5 w-[30px] overflow-hidden rounded-full bg-[#2E2B27]">
        <span
          className="block h-full rounded-full"
          style={{ width: `${value}%`, background: color }}
        />
      </span>
      <span>{value}%</span>
    </span>
  )
}

function AnimatedTeamRow({
  team,
  mult,
  selected,
}: {
  team: (typeof SCENARIOS)["saas"]["teams"][number]
  mult: number
  selected: boolean
}) {
  const employees = useAnimatedNumber(team.employees)
  const posts = useAnimatedNumber(Math.round(team.posts * mult))
  const proofRate = useAnimatedNumber(team.proofRate)
  const vvr = useAnimatedNumber(team.vvr)
  const leads = useAnimatedNumber(Math.round(team.leads * mult))

  return (
    <tr
      className="border-b border-[#FFFCF2]/[0.04] transition-colors hover:bg-[#FFFCF2]/[0.02]"
      style={{
        background: selected ? "rgba(222,80,21,0.05)" : "transparent",
        boxShadow: selected ? "inset 3px 0 0 #DE5015" : "none",
      }}
    >
      <td
        className="sticky left-0 z-10 px-4 py-4 font-semibold text-[#FFFCF2]"
        style={{ background: selected ? "#0D0D0D" : "#050505" }}
      >
        {team.name}
      </td>
      <td className="px-4 py-4 text-[13px] text-[#CCC6BA]">{employees}</td>
      <td className="px-4 py-4 text-[13px] text-[#CCC6BA]">{posts.toLocaleString()}</td>
      <td className="px-4 py-4 text-[13px] text-[#CCC6BA]">
        <MiniProgress value={proofRate} color="#DE5015" />
      </td>
      <td className="px-4 py-4 text-[13px] text-[#CCC6BA]">
        <MiniProgress value={vvr} color={vvr > 40 ? "#2ECC71" : "#DE5015"} />
      </td>
      <td className="px-4 py-4 text-[13px] font-bold text-[#FFFCF2]">{leads}</td>
    </tr>
  )
}

function useAnimatedNumber(value: number, duration = 600) {
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const start = Date.now()
    const from = display
    const to = value

    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [value])

  return display
}

const tooltipStyle = {
  background: "#1A1815",
  border: "1px solid #2E2B27",
  borderRadius: 8,
  color: "#FFFCF2",
  fontSize: 12,
}

export function EnterpriseDemoSection({
  onRequestDemo,
}: {
  onRequestDemo: () => void
}) {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("saas")
  const [timeRange, setTimeRange] = useState<TimeRange>("90d")
  const [activeTeam, setActiveTeam] = useState<string>("all")
  const [activeSlice, setActiveSlice] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const scenario = SCENARIOS[activeScenario]
  const mult = TIME_MULTIPLIERS[timeRange]
  const posts = Math.round(scenario.postsGenerated * mult)
  const leads = Math.round(scenario.leadsInfluenced * mult)
  const activeEmployees = scenario.employees
  const activationRate = Math.round(
    (activeEmployees / scenario.totalEmployees) * 100
  )
  const selectedRows =
    activeTeam === "all"
      ? scenario.teams
      : scenario.teams.filter((team) => team.name === activeTeam)
  const totals = selectedRows.reduce(
    (acc, team) => ({
      employees: acc.employees + team.employees,
      posts: acc.posts + Math.round(team.posts * mult),
      leads: acc.leads + Math.round(team.leads * mult),
    }),
    { employees: 0, posts: 0, leads: 0 }
  )
  const avgProof = Math.round(
    selectedRows.reduce((sum, team) => sum + team.proofRate, 0) /
      selectedRows.length
  )
  const avgVvr = Math.round(
    selectedRows.reduce((sum, team) => sum + team.vvr, 0) /
      selectedRows.length
  )
  const weeklyPostData = scenario.weeklyPosts.map((value, index) => ({
    week: `W${index + 1}`,
    posts: Math.round(value * mult),
  }))
  const vvrData = scenario.vvrTrend.map((value, index) => ({
    week: `W${index + 1}`,
    vvr: value,
  }))
  const animatedActiveEmployees = useAnimatedNumber(activeEmployees)
  const animatedPosts = useAnimatedNumber(posts)
  const animatedLeads = useAnimatedNumber(leads)
  const animatedProof = useAnimatedNumber(scenario.proofBackedRate)
  const animatedVvr = useAnimatedNumber(scenario.vvr)
  const animatedCac = useAnimatedNumber(scenario.cacReduction)
  const animatedTotalsEmployees = useAnimatedNumber(totals.employees)
  const animatedTotalsPosts = useAnimatedNumber(totals.posts)
  const animatedTotalsLeads = useAnimatedNumber(totals.leads)
  const activeAttribution = activeSlice === null ? null : scenario.attribution[activeSlice]
  const attributionDescriptions: Record<string, string> = {
    "Employee-sourced demos": "Leads that came directly from employee content",
    "Assisted pipeline touches": "Deals with at least one employee content touchpoint",
    "Paid retargeting overlap": "Prospects who also saw paid ads",
    "Direct / unattributed": "Pipeline without a confirmed content touch",
    "Expert-sourced inquiries": "Leads that came directly from employee content",
    "Referral pipeline touches": "Deals with at least one employee content touchpoint",
    "Event follow-up overlap": "Prospects who also saw paid ads",
    "Frontline-sourced leads": "Leads that came directly from employee content",
    "Partnership touchpoints": "Deals with at least one employee content touchpoint",
    "Paid campaign overlap": "Prospects who also saw paid ads",
  }

  return (
    <section id="enterprise-demo" className="landing-section">
      <div className="section-wrapper">
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#DE5015]">
            2&nbsp;&nbsp;Enterprise Layer
          </div>
          <h2
            className="font-display text-3xl font-extrabold text-[#FFFCF2] sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            The infrastructure that turns your team&apos;s work into measurable pipeline.
          </h2>
          <p className="mx-auto mt-5 max-w-[680px] text-base leading-relaxed text-[#CCC6BA]">
            Most employee advocacy programs fail because they can&apos;t prove ROI. Sharwi connects
            work evidence to business outcomes — giving your marketing, sales, and HR teams a
            system they can actually defend to leadership.
          </p>
        </div>

        <div className="mx-auto mb-3 grid max-w-[760px] grid-cols-1 overflow-hidden rounded-2xl border border-[#DE5015]/20 bg-black/70 sm:grid-cols-3">
          {[
            ["4×", "More leads"],
            ["−23%", "Average CAC reduction"],
            ["92%", "Proof-backed rate"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className="border-l border-[#DE5015]/30 px-5 py-5 text-center"
              style={{
                borderRight:
                  index < 2 ? "1px solid rgba(255,252,242,0.06)" : "0",
              }}
            >
              <p className="text-[32px] font-extrabold leading-none text-[#DE5015]">{value}</p>
              <p className="mt-2 text-[13px] leading-snug text-[#8A8480]">{label}</p>
            </div>
          ))}
        </div>
        <p className="mb-10 text-center text-[11px] text-[#5C5955]">
          Source: Employee Advocacy Benchmark Report 2026
        </p>

        <div
          className="rounded-[24px] p-5 sm:p-8"
          style={{
            background: "rgba(10, 9, 8, 0.95)",
            border: "1px solid rgba(255,252,242,0.08)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 80px rgba(0,0,0,0.5)",
          }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                ["saas", "Series C SaaS"],
                ["advisory", "Advisory Firm"],
                ["ops", "Distributed Ops"],
              ].map(([key, label]) => {
                const active = activeScenario === key
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveScenario(key as ScenarioKey)
                      setActiveTeam("all")
                      trackEnterpriseDemoInteraction("scenario_change", key)
                    }}
                    className="rounded-full px-[18px] py-[7px] text-[13px] font-semibold transition-colors"
                    style={{
                      background: active ? "rgba(222,80,21,0.15)" : "transparent",
                      border: active
                        ? "1px solid rgba(222,80,21,0.4)"
                        : "1px solid rgba(255,252,242,0.08)",
                      color: active ? "#DE5015" : "#8A8480",
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                ["30d", "Last 30 days"],
                ["90d", "Last 90 days"],
              ].map(([key, label]) => {
                const active = timeRange === key
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setTimeRange(key as TimeRange)
                      trackEnterpriseDemoInteraction("time_range_change", key)
                    }}
                    className="rounded-full px-4 py-2 text-xs font-semibold transition-colors"
                    style={{
                      background: active ? "rgba(222,80,21,0.15)" : "transparent",
                      border: active
                        ? "1px solid rgba(222,80,21,0.4)"
                        : "1px solid rgba(255,252,242,0.08)",
                      color: active ? "#DE5015" : "#8A8480",
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-b border-[#FFFCF2]/[0.06] pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {[scenario.company, scenario.industry].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full px-[10px] py-1 text-[11px] text-[#8A8480]"
                  style={{
                    background: "rgba(255,252,242,0.05)",
                    border: "1px solid rgba(255,252,242,0.08)",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {scenario.stack.map((stack) => (
                <span
                  key={stack}
                  className="rounded-full px-[10px] py-1 text-[11px] text-[#8A8480]"
                  style={{
                    background: "rgba(255,252,242,0.05)",
                    border: "1px solid rgba(255,252,242,0.08)",
                  }}
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <MetricCard
              icon={Users}
              label="Active Employees"
              value={`${animatedActiveEmployees} / ${scenario.totalEmployees}`}
              subtext="employees publishing verified content"
              trend={`+${activationRate}% activation rate`}
              trendColor={activationRate > 40 ? "#2ECC71" : "#DE5015"}
            />
            <MetricCard
              icon={FileText}
              label="Posts Generated"
              value={animatedPosts.toLocaleString()}
              subtext="proof-backed posts in period"
              trend={`${animatedProof}% have verified evidence`}
            />
            <MetricCard
              icon={ChartBar}
              label="VVR"
              value={`${animatedVvr}%`}
              subtext="Sharwi's North Star metric"
              trend="↑ +18pp since activation"
              tooltip="% of employees who published verified content at least once this period. Industry baseline: <15%. Sharwi target: >40%."
            />
            <MetricCard
              icon={Target}
              label="Leads Influenced"
              value={`${animatedLeads}`}
              subtext="pipeline touches from employee content"
              trend={`+${Math.round(animatedLeads * 0.31)} directly sourced`}
            />
            <MetricCard
              icon={TrendingDown}
              label="CAC Reduction"
              value={`−${animatedCac}%`}
              subtext="customer acquisition cost improvement"
              trend={`−${scenario.cplReduction}% CPL reduction`}
              valueColor="#2ECC71"
            />
            <MetricCard
              icon={ShieldCheck}
              label="Governance"
              value={scenario.governanceStatus === "healthy" ? "Healthy" : "Strict"}
              subtext={`${scenario.governanceEscalations} escalations · ${scenario.governanceIncidents} incidents`}
              trend={
                scenario.governanceStatus === "healthy"
                  ? "✓ No compliance incidents"
                  : "Legal review active"
              }
              trendColor={scenario.governanceStatus === "healthy" ? "#2ECC71" : "#DE5015"}
              valueColor={scenario.governanceStatus === "healthy" ? "#2ECC71" : "#DE5015"}
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-[#FFFCF2]/[0.06] bg-[#FFFCF2]/[0.03] p-5">
              <h3 className="text-[13px] font-semibold text-[#FFFCF2]">
                Weekly posts generated
              </h3>
              <p className="mt-1 text-[11px] text-[#5C5955]">
                Recent activity · proof-backed only
              </p>
              <div className="mt-5 h-[200px]">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyPostData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,252,242,0.04)"
                    />
                    <XAxis
                      dataKey="week"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#5C5955", fontSize: 11 }}
                    />
                    <YAxis hide />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="posts" fill="#DE5015" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-[#FFFCF2]/[0.06] bg-[#FFFCF2]/[0.03] p-5">
              <h3 className="text-[13px] font-semibold text-[#FFFCF2]">
                Activation rate (VVR) trend
              </h3>
              <p className="mt-1 text-[11px] text-[#5C5955]">
                Verified Visibility Rate · 8-week progression
              </p>
              <div className="mt-5 h-[200px]">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={vvrData}>
                    <defs>
                      <linearGradient id="vvrGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#DE5015" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#DE5015" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,252,242,0.04)"
                    />
                    <XAxis
                      dataKey="week"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#5C5955", fontSize: 11 }}
                    />
                    <YAxis
                      unit="%"
                      width={35}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#5C5955", fontSize: 11 }}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <ReferenceLine
                      y={40}
                      stroke="rgba(46,204,113,0.4)"
                      strokeDasharray="4 4"
                      label={{
                        value: "Target 40%",
                        fill: "#2ECC71",
                        fontSize: 11,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="vvr"
                      stroke="#DE5015"
                      strokeWidth={2}
                      fill="url(#vvrGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-[#FFFCF2]/[0.06] bg-[#FFFCF2]/[0.03] p-5">
              <h3 className="text-[13px] font-semibold text-[#FFFCF2]">
                Proof pipeline — content quality funnel
              </h3>
              <p className="mt-1 text-[11px] text-[#5C5955]">
                From work signal to verified published post
              </p>
              <div className="mt-6 space-y-5">
                {scenario.proofFunnel.map((stage, index) => (
                  <div key={stage.stage}>
                    <div className="grid gap-2 md:grid-cols-[180px_1fr_40px] md:items-center">
                      <span className="text-xs font-medium text-[#CCC6BA]">
                        {stage.stage}
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded bg-[#FFFCF2]/[0.06]">
                        <div
                          className="h-full rounded transition-[width] duration-700 ease-out"
                          style={{
                            width: `${stage.value}%`,
                            background: funnelColors[index],
                          }}
                        />
                      </div>
                      <span className="text-right text-[13px] font-bold text-[#FFFCF2]">
                        {stage.value}%
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#5C5955] md:ml-[180px]">
                      {stage.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#FFFCF2]/[0.06] bg-[#FFFCF2]/[0.03] p-5">
              <h3 className="text-[13px] font-semibold text-[#FFFCF2]">
                Pipeline attribution
              </h3>
              <p className="mt-1 text-[11px] text-[#5C5955]">
                How employee content touches pipeline
              </p>
              <div
                className="relative mx-auto mt-4 h-[220px] max-w-[280px]"
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect()
                  setTooltipPos({ x: event.clientX - rect.left, y: event.clientY - rect.top })
                }}
              >
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={scenario.attribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      dataKey="value"
                      paddingAngle={3}
                      activeIndex={activeSlice ?? undefined}
                      activeShape={(props: any) => (
                        <Sector {...props} outerRadius={(props.outerRadius ?? 0) + 6} />
                      )}
                    >
                      {scenario.attribution.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={entry.color}
                          onMouseEnter={() => setActiveSlice(index)}
                          onMouseLeave={() => setActiveSlice(null)}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {activeAttribution ? (
                  <div
                    className="pointer-events-none absolute z-20"
                    style={{
                      left: Math.min(Math.max(tooltipPos.x - 80, 8), 170),
                      top: Math.max(tooltipPos.y - 72, 8),
                      backgroundColor: "#1A1815",
                      border: "1px solid #DE5015",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                      width: "210px",
                    }}
                  >
                    <p className="text-[13px] font-bold text-[#FFFCF2]">{activeAttribution.name}</p>
                    <p className="mt-1 text-[20px] font-black leading-none text-[#DE5015]">
                      {activeAttribution.value}%
                    </p>
                    <p className="mt-2 text-[11px] leading-snug text-[#8A8480]">
                      {attributionDescriptions[activeAttribution.name] ?? "Pipeline with an employee content signal"}
                    </p>
                  </div>
                ) : null}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="text-[22px] font-extrabold text-[#FFFCF2]">
                    {scenario.attribution[0].value}%
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#8A8480]">
                    employee-sourced
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {scenario.attribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span className="text-[#CCC6BA]">{item.name}</span>
                    <span className="ml-auto font-bold text-[#FFFCF2]">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#FFFCF2]/[0.06] bg-[#FFFCF2]/[0.03] p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="text-[13px] font-semibold text-[#FFFCF2]">
                  Performance by team
                </h3>
                <p className="mt-1 text-[11px] text-[#5C5955]">
                  Active employees · posts generated · proof rate · VVR · leads
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["all", ...scenario.teams.map((team) => team.name)].map((teamName) => {
                  const active = activeTeam === teamName
                  return (
                    <button
                      key={teamName}
                      onClick={() => {
                        setActiveTeam(teamName)
                        trackEnterpriseDemoInteraction("team_filter", teamName)
                      }}
                      className="rounded-full px-3 py-1.5 text-[11px] font-semibold"
                      style={{
                        background: active ? "rgba(222,80,21,0.15)" : "transparent",
                        border: active
                          ? "1px solid rgba(222,80,21,0.4)"
                          : "1px solid rgba(255,252,242,0.08)",
                        color: active ? "#DE5015" : "#8A8480",
                      }}
                    >
                      {teamName === "all" ? "All teams" : teamName}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-[820px] w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#FFFCF2]/[0.06] bg-[#FFFCF2]/[0.04] text-xs uppercase tracking-[0.12em] text-[#8A8480]">
                    {[
                      "Team",
                      "Active employees",
                      "Posts",
                      "Proof rate",
                      "VVR",
                      "Leads influenced",
                    ].map((head, index) => (
                      <th
                        key={head}
                        className={`px-4 py-3 font-semibold ${
                          index === 0 ? "sticky left-0 z-10 bg-black" : ""
                        }`}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scenario.teams.map((team) => (
                    <AnimatedTeamRow
                      key={team.name}
                      team={team}
                      mult={mult}
                      selected={activeTeam === team.name}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-[#DE5015]/[0.12] bg-[#DE5015]/[0.04] font-semibold">
                    <td
                      className="sticky left-0 z-10 px-4 py-4 text-[#FFFCF2]"
                      style={{ background: "#160f0b" }}
                    >
                      Total
                    </td>
                    <td className="px-4 py-4 text-[13px] text-[#CCC6BA]">{animatedTotalsEmployees}</td>
                    <td className="px-4 py-4 text-[#CCC6BA]">
                      {animatedTotalsPosts.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-[#CCC6BA]">
                      <MiniProgress value={avgProof} color="#DE5015" />
                    </td>
                    <td className="px-4 py-4 text-[#CCC6BA]">
                      <MiniProgress
                        value={avgVvr}
                        color={avgVvr > 40 ? "#2ECC71" : "#DE5015"}
                      />
                    </td>
                    <td className="px-4 py-4 text-[13px] text-[#FFFCF2]">{animatedTotalsLeads}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div
            className="mt-6 rounded-2xl p-7"
            style={{
              background:
                "linear-gradient(135deg, rgba(222,80,21,0.06), rgba(0,0,0,0))",
              border: "1px solid rgba(222,80,21,0.15)",
            }}
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2">
                <Database size={20} color="#DE5015" />
                <h3 className="text-base font-bold text-[#FFFCF2]">
                  Why Sharwi&apos;s dataset is irreplaceable
                </h3>
              </div>
              <span
                className="w-fit rounded-full px-3 py-1.5 text-[11px] font-semibold text-[#DE5015]"
                style={{
                  background: "rgba(222,80,21,0.12)",
                  border: "1px solid rgba(222,80,21,0.3)",
                }}
              >
                Proprietary Data Moat
              </span>
            </div>
            <p className="mt-3 max-w-[700px] text-[13px] leading-[1.7] text-[#8A8480]">
              Every proof-backed post creates a training signal: which work type, for which role,
              in which industry, generated which business outcome. No employee advocacy tool has
              this. It compounds with every company that uses Sharwi.
            </p>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {[
                [
                  GitBranch,
                  "Work signal taxonomy",
                  "PR merge, ticket close, deal signed, doc published, presentation delivered",
                ],
                [
                  TrendingUp,
                  "Conversion correlations",
                  "Which signals, for which roles, in which industries, generate qualified pipeline",
                ],
                [
                  BarChart3,
                  "Compounding value",
                  "Every new company adds data points that improve the model for all others",
                ],
              ].map(([Icon, title, copy]) => {
                const TypedIcon = Icon as typeof GitBranch
                return (
                  <div key={title as string}>
                    <TypedIcon size={16} color="#DE5015" />
                    <p className="mt-3 font-semibold text-[#FFFCF2]">
                      {title as string}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#8A8480]">
                      {copy as string}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="mx-auto mb-10 max-w-[720px] text-center">
            <h3 className="font-display text-3xl font-extrabold text-[#FFFCF2]">
              How Sharwi compares to existing advocacy tools
            </h3>
            <p className="mt-3 text-[#8A8480]">
              The market amplifies content. Sharwi builds infrastructure.
            </p>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-[#FFFCF2]/[0.08] bg-black/90">
            <table className="min-w-[880px] w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#FFFCF2]/[0.08] text-left text-[#8A8480]">
                  {["Feature", "EveryoneSocial", "Haiilo", "DSMN8", "Sharwi"].map((head) => (
                    <th
                      key={head}
                      className="px-4 py-4 font-semibold"
                      style={{
                        background:
                          head === "Sharwi" ? "rgba(222,80,21,0.08)" : "transparent",
                        borderTop: head === "Sharwi" ? "2px solid #DE5015" : "0",
                        color: head === "Sharwi" ? "#DE5015" : "#8A8480",
                      }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(
                  ([feature, everyoneSocial, haiilo, dsmn8, sharwi]) => (
                    <tr key={feature} className="border-b border-[#FFFCF2]/[0.05]">
                      <td className="px-4 py-4 font-medium text-[#FFFCF2]">
                        {feature}
                      </td>
                      <StatusCell status={everyoneSocial} />
                      <StatusCell status={haiilo} />
                      <StatusCell status={dsmn8} />
                      <StatusCell status={sharwi} highlight />
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-[#5C5955]">
            Source: public product documentation.
          </p>
        </div>

        <div className="mt-14 rounded-[20px] border border-[#DE5015]/20 bg-[#DE5015]/[0.06] p-10 text-center">
          <h3 className="text-[28px] font-extrabold tracking-[-0.8px] text-[#FFFCF2]">
            Ready to see your numbers here?
          </h3>
          <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-relaxed text-[#8A8480]">
            Book a 30-minute session. We&apos;ll map your team size, current stack, and advocacy
            baseline to show you what Sharwi would surface.
          </p>
          <button
            onClick={() => {
              trackCtaClick("enterprise_dashboard_bottom_cta")
              onRequestDemo()
            }}
            className="mt-6 h-[52px] rounded-full px-8 text-[15px] font-bold text-white transition-transform hover:scale-[1.03]"
            style={{
              backgroundColor: "#DE5015",
              boxShadow: "0 8px 32px rgba(222,80,21,0.35)",
            }}
          >
            Request a Demo →
          </button>
        </div>
      </div>
    </section>
  )
}
