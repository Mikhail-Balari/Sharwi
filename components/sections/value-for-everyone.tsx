"use client"

import { Building2, User, TrendingDown, BarChart3, ShieldCheck, Globe, UserCircle, Zap, Link2, Heart } from "lucide-react"

function ValueCard({ icon: Icon, title, desc }: { icon: typeof BarChart3; title: string; desc: string }) {
  return (
    <div
      className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: "rgba(20,14,8,0.65)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,106,0,0.15)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,106,0,0.45)" }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,106,0,0.15)" }}
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "rgba(255,106,0,0.2)" }}>
        <Icon size={20} className="text-[#FF6A00]" />
      </div>
      <div>
        <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
        <p className="text-[#9CA3AF] text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

const orgCards = [
  { icon: TrendingDown, title: "Lower CAC, measurably", desc: "Employee-led content converts at 2× the rate of brand content, reducing the cost to acquire a customer." },
  { icon: BarChart3,   title: "Pipeline you can attribute", desc: "UTM tracking from post → click → lead → deal. Real revenue metrics, not impressions." },
  { icon: Link2,       title: "Works with your stack", desc: "Connects to Jira, GitHub, Salesforce, CRM and more. No new habits required from employees." },
  { icon: ShieldCheck, title: "Enterprise governance", desc: "Guardrails, approval flows and audit trails per post. Legal and compliance covered from day one." },
]

const empCards = [
  { icon: Globe,       title: "Visibility without self-promotion", desc: "Your real work becomes public proof. No need to write, perform, or manufacture content." },
  { icon: Heart,       title: "Content in your voice", desc: "AI adapts to your tone — technical, commercial or executive. It sounds like you, always." },
  { icon: ShieldCheck, title: "You control everything", desc: "Review and approve every post before it's published. You decide what goes out and when." },
  { icon: UserCircle,  title: "Reputation that's truly yours", desc: "Portable Sharwi Profile and Badge — your verified career history, regardless of where you work." },
]

export function ValueForEveryone() {
  return (
    <section className="py-20" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance">
          Value for <span className="text-[#FF6A00]">everyone.</span>
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-2xl mx-auto mb-4 leading-relaxed">
          Sharwi aligns incentives: companies get measurable revenue impact, employees get portable career capital.
          No tension. No tradeoffs.
        </p>

        {/* Alignment statement */}
        <div className="max-w-3xl mx-auto mb-14 rounded-xl px-6 py-4 text-center"
          style={{ background: "rgba(255,106,0,0.06)", border: "1px solid rgba(255,106,0,0.18)" }}>
          <p className="text-sm text-[#D1D5DB]">
            <span className="text-[#FF6A00] font-semibold">Traditional advocacy platforms</span> ask employees to share brand content — they resist.
            Sharwi generates content <em>from their own work</em> — they participate because it benefits them too.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* For Organizations */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold text-black"
                style={{ background: "#FF6A00" }}>1</div>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-[#FF6A00]">Enterprise Layer</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Building2 size={16} className="text-white" />
                  <span className="font-bold text-white text-sm">For Organizations</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {orgCards.map((c) => <ValueCard key={c.title} {...c} />)}
            </div>
          </div>

          {/* For Employees */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                style={{ background: "rgba(255,106,0,0.15)", color: "#FF6A00", border: "1px solid rgba(255,106,0,0.4)" }}>2</div>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-[#FF6A00]">Personal Layer</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <User size={16} className="text-white" />
                  <span className="font-bold text-white text-sm">For Employees</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {empCards.map((c) => <ValueCard key={c.title} {...c} />)}
            </div>
          </div>
        </div>

        {/* Portability note */}
        <div className="max-w-3xl mx-auto mt-10 rounded-2xl p-6"
          style={{
            background: "radial-gradient(ellipse at 15% 10%, rgba(100,30,0,0.18) 0%, rgba(3,1,0,0.92) 55%)",
            boxShadow: "0 0 0 1px rgba(255,90,10,0.35), inset 0 1px 0 rgba(255,160,40,0.20)",
          }}>
          <p className="text-xs font-bold tracking-widest uppercase text-[#FF6A00] mb-3">WHAT HAPPENS WHEN AN EMPLOYEE LEAVES</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-white mb-2">✓ Stays with the person</p>
              <ul className="text-[#9CA3AF] flex flex-col gap-1.5">
                <li>• Sharwi Profile + Badge + verified history</li>
                <li>• Evidence of past work (links, context)</li>
                <li>• Portable reputation for career moves</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">✗ Stays with the company</p>
              <ul className="text-[#9CA3AF] flex flex-col gap-1.5">
                <li>• Access to internal connectors and data</li>
                <li>• Internal governance and approval flows</li>
                <li>• Pipeline and CAC attribution metrics</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
