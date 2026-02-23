"use client"

import { Briefcase, Building2, ChevronRight } from "lucide-react"
import { trackExploreAsProfessional, trackExploreForCompanies } from "@/lib/analytics"

const audiences = [
  {
    icon: Briefcase,
    title: "I'm a professional",
    subtitle: "I want to share what I know and gain <accent>recognition</accent>.",
    cta: "Explore as a Professional",
    href: "#for-professionals",
    onTrack: trackExploreAsProfessional,
  },
  {
    icon: Building2,
    title: "I represent a company",
    subtitle: "I want my team to share knowledge and gain <accent>visibility</accent>.",
    cta: "Explore for Companies",
    href: "#for-companies",
    onTrack: trackExploreForCompanies,
  },
]

function renderSubtitle(text: string) {
  const parts = text.split(/<accent>(.*?)<\/accent>/)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-[#FF6A00]">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

const glassStyle = {
  background: "linear-gradient(135deg, rgba(255,80,0,0.13) 0%, rgba(120,30,0,0.22) 45%, rgba(10,4,2,0.75) 100%)",
  backdropFilter: "blur(18px) saturate(1.4)",
  WebkitBackdropFilter: "blur(18px) saturate(1.4)",
  border: "1px solid rgba(255,90,0,0.22)",
  borderTop: "1px solid rgba(255,140,60,0.35)",
  borderLeft: "1px solid rgba(255,120,40,0.28)",
  boxShadow: "0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,160,60,0.18), inset 0 -1px 0 rgba(180,40,0,0.12)",
  textDecoration: "none",
}

export function AudienceSelector() {
  return (
    <section className="py-20" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3" style={{ letterSpacing: "-0.03em" }}>
          How do you want to use Sharwi?
        </h2>
        <p className="text-[#9CA3AF] text-center mb-12">
          Choose the option that best reflects your role.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {audiences.map((a) => (
            <a
              key={a.title}
              href={a.href}
              onClick={a.onTrack}
              className="group flex items-center gap-5 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.03]"
              style={glassStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,106,0,0.45)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,90,0,0.22)"
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,106,0,0.15)" }}
              >
                <a.icon size={26} className="text-[#FF6A00]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-bold text-white mb-1">{a.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">
                  {renderSubtitle(a.subtitle)}
                </p>
                <span className="inline-flex items-center gap-1 text-[#FF6A00] text-sm font-medium mt-3 transition-all duration-200 group-hover:gap-2">
                  {a.cta}
                  <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
