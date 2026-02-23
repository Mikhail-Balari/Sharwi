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
              className="group relative overflow-hidden flex items-center gap-5 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: "radial-gradient(ellipse at 30% 25%, rgba(160,55,0,0.28) 0%, rgba(60,15,0,0.55) 45%, rgba(4,2,1,0.82) 100%)",
                backdropFilter: "blur(24px) saturate(1.6) brightness(1.05)",
                WebkitBackdropFilter: "blur(24px) saturate(1.6) brightness(1.05)",
                border: "1px solid transparent",
                backgroundClip: "padding-box",
                boxShadow: `
                  0 0 0 1px rgba(255,140,40,0.35),
                  inset 0 1.5px 0 rgba(255,200,100,0.45),
                  inset 1.5px 0 0 rgba(255,160,60,0.25),
                  inset 0 -2px 12px rgba(0,0,0,0.6),
                  0 8px 32px rgba(0,0,0,0.6)
                `,
                textDecoration: "none",
              }}
            >
              {/* Highlight line top */}
              <div aria-hidden="true" style={{
                position: "absolute", top: 0, left: "8%", right: "8%", height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(255,210,120,0.7), rgba(255,180,80,0.5), transparent)",
                pointerEvents: "none",
              }} />
              {/* Reflejo difuso */}
              <div aria-hidden="true" style={{
                position: "absolute", top: "-30%", left: "-10%", width: "50%", height: "50%",
                background: "radial-gradient(ellipse, rgba(255,150,50,0.10) 0%, transparent 70%)",
                pointerEvents: "none", borderRadius: "50%",
              }} />
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 relative z-10"
                style={{ background: "rgba(255,106,0,0.15)" }}
              >
                <a.icon size={26} className="text-[#FF6A00]" />
              </div>
              <div className="flex-1 min-w-0 relative z-10">
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
