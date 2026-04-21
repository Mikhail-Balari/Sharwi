"use client"

import {
  Award,
  BarChart2,
  Briefcase,
  Building2,
  Mic,
  ShieldCheck,
  Star,
  TrendingUp,
  User,
  Users,
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const organizationItems = [
  {
    icon: TrendingUp,
    title: "Increased Reach",
    desc: "Expand brand visibility through authentic employee voices that outperform brand-only content by up to 5.6×.",
  },
  {
    icon: Users,
    title: "Talent Attraction",
    desc: "Showcase real culture through documented work — not just careers page copy.",
  },
  {
    icon: ShieldCheck,
    title: "Brand Protection",
    desc: "Governance controls ensure message consistency without removing employee authenticity.",
  },
  {
    icon: BarChart2,
    title: "Measurable Pipeline Impact",
    desc: "Track which employee content influences leads, meetings, and CAC — not just likes.",
  },
]

const employeeItems = [
  {
    icon: Award,
    title: "Verified Reputation",
    desc: "Build a Sharwi Badge backed by real work evidence — not just endorsements on a profile.",
  },
  {
    icon: Briefcase,
    title: "Portable Career Capital",
    desc: "Your reputation travels with you. Every achievement verified by Sharwi stays yours when you change jobs.",
  },
  {
    icon: Mic,
    title: "Your Voice, Your Content",
    desc: "AI drafts from your actual work. You approve. Content that sounds like you — because it is you.",
  },
  {
    icon: Star,
    title: "Career Growth",
    desc: "Documented achievements open doors before you even apply. Proof over promise.",
  },
]

function ValueItem({ item }: { item: (typeof organizationItems)[number] }) {
  return (
    <div className="mb-5 flex items-start gap-3 last:mb-0">
      <item.icon size={16} className="mt-0.5 shrink-0 text-[#DE5015]" />
      <div>
        <h4 className="mb-0.5 text-[14px] font-bold text-[#FFFCF2]">{item.title}</h4>
        <p className="text-[13px] leading-[1.65] text-[#8A8480]">{item.desc}</p>
      </div>
    </div>
  )
}

export function ValueForEveryone() {
  return (
    <section id="value-exchange" className="landing-section">
      <div className="section-wrapper">
        <ScrollReveal>
          <div className="mx-auto mb-14 max-w-[720px] text-center">
            <p className="section-eyebrow mb-4 text-center">The Sharwi Value Exchange</p>
            <h2 className="section-title text-center">
              Value for <span style={{ color: "#DE5015" }}>everyone.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[580px] text-center text-[16px] leading-[1.75] text-[#8A8480]">
              Sharwi creates a win-win: organizations gain measurable visibility while employees build reputation that stays with them — forever.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="glass-card h-full p-8">
              <div className="mb-7 flex items-center gap-3">
                <Building2 size={20} color="#DE5015" />
                <h3 className="text-[18px] font-bold text-[#FFFCF2]">For Organizations</h3>
              </div>
              {organizationItems.map((item) => (
                <ValueItem key={item.title} item={item} />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="glass-card h-full p-8">
              <div className="mb-7 flex items-center gap-3">
                <User size={20} color="#DE5015" />
                <h3 className="text-[18px] font-bold text-[#FFFCF2]">For Employees</h3>
              </div>
              {employeeItems.map((item) => (
                <ValueItem key={item.title} item={item} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
