"use client"

import {
  Building2,
  User,
  BarChart3,
  Users,
  Shield,
  Zap,
  Globe,
  Heart,
  UserCircle,
} from "lucide-react"

const orgCards = [
  {
    icon: BarChart3,
    title: "Increased Reach",
    desc: "Expand your brand visibility through authentic employee voices.",
  },
  {
    icon: Users,
    title: "Talent Attraction",
    desc: "Showcase your culture and attract top candidates organically.",
  },
  {
    icon: Shield,
    title: "Brand Protection",
    desc: "Maintain message consistency while empowering individual expression.",
  },
  {
    icon: Zap,
    title: "Engagement Boost",
    desc: "Drive 10x higher engagement compared to corporate content.",
  },
]

const empCards = [
  {
    icon: Globe,
    title: "Professional Visibility",
    desc: "Build your reputation without the burden of content creation.",
  },
  {
    icon: Heart,
    title: "Authentic Voice",
    desc: "Content that matches your style and reflects your real achievements.",
  },
  {
    icon: Shield,
    title: "Full Control",
    desc: "You choose what to share. Always review before publishing.",
  },
  {
    icon: UserCircle,
    title: "Career Growth",
    desc: "Documented achievements that open doors to new opportunities.",
  },
]

function ValueCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof BarChart3
  title: string
  desc: string
}) {
  return (
    <div
      className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_18px_rgba(255,106,0,0.12)]"
      style={{
        background: "rgba(20,14,8,0.65)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,106,0,0.15)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,106,0,0.45)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,106,0,0.15)"
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "rgba(255,106,0,0.2)" }}
      >
        <Icon size={20} className="text-[#FF6A00]" />
      </div>
      <div>
        <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
        <p className="text-[#9CA3AF] text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

export function ValueForEveryone() {
  return (
    <section className="py-20" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3 text-balance">
          Value for <span className="text-[#FF6A00]">everyone.</span>
        </h2>
        <p className="text-[#9CA3AF] text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Sharwi creates a win-win: organizations gain visibility while
          employees maintain full control.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* For Organizations */}
          <div>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(255,106,0,0.2)" }}
              >
                <Building2 size={20} className="text-[#FF6A00]" />
              </div>
              <span className="font-bold text-white">For Organizations</span>
            </div>
            <div className="flex flex-col gap-3">
              {orgCards.map((c) => (
                <ValueCard key={c.title} {...c} />
              ))}
            </div>
          </div>

          {/* For Employees */}
          <div>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(255,106,0,0.2)" }}
              >
                <User size={20} className="text-[#FF6A00]" />
              </div>
              <span className="font-bold text-white">For Employees</span>
            </div>
            <div className="flex flex-col gap-3">
              {empCards.map((c) => (
                <ValueCard key={c.title} {...c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
