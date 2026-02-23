"use client"

import { useState } from "react"
import { GlassCard } from "../glass-card"
import { UseCaseModal } from "../modals"
import { Megaphone, Users, Target, Lightbulb, Award, Rocket, ArrowRight } from "lucide-react"
import { trackSeeExample } from "@/lib/analytics"

const useCases = [
  {
    icon: Megaphone,
    title: "Marketing Teams",
    shortDesc: "Amplify campaigns through authentic employee voices that resonate with audiences.",
    modalDesc: "Transform your marketing reach by enabling employees to share branded content authentically.",
    examplePost: "Just wrapped up an incredible product launch at [Company]. Proud to be part of a team that truly listens to customer feedback and delivers solutions that matter. The response has been overwhelming!",
    benefits: [
      "Increase organic reach by 10x compared to brand accounts",
      "Build trust through authentic employee advocacy",
      "Streamline content distribution across the organization",
      "Track engagement and ROI with comprehensive analytics",
    ],
  },
  {
    icon: Users,
    title: "HR & Talent",
    shortDesc: "Showcase company culture and attract top talent through genuine employee stories.",
    modalDesc: "Turn your employees into your best recruiters by showcasing your culture authentically.",
    examplePost: "Excited to share that [Company] just hit a major milestone in our DEI journey. The initiatives our People team has built are genuinely changing how we work together every day.",
    benefits: [
      "Attract top talent through genuine employee stories",
      "Reduce cost-per-hire with organic employer branding",
      "Showcase culture without scripted or forced content",
      "Build a reputation that top candidates actively seek out",
    ],
  },
  {
    icon: Target,
    title: "Sales Teams",
    shortDesc: "Build credibility and trust with prospects through thought leadership content.",
    modalDesc: "Equip your sales team with thought leadership content that builds trust before the first call.",
    examplePost: "After 6 months working with clients in [industry], the #1 thing I've learned: buyers don't want to be sold to \u2014 they want someone who genuinely understands their problem.",
    benefits: [
      "Shorten sales cycles with pre-built credibility",
      "Generate warm inbound leads through consistent visibility",
      "Establish reps as trusted advisors, not just salespeople",
      "Differentiate from competitors through authentic expertise",
    ],
  },
  {
    icon: Lightbulb,
    title: "Product Teams",
    shortDesc: "Share innovations and build excitement around product development milestones.",
    modalDesc: "Share the thinking behind your product decisions and build an audience that follows your journey.",
    examplePost: "We shipped a feature this week that 3 customers had requested for over a year. What made it hard wasn't the code \u2014 it was getting the UX right without adding complexity. Here's what we learned.",
    benefits: [
      "Build excitement around product milestones organically",
      "Attract users who align with your product vision",
      "Create a feedback loop with your most engaged audience",
      "Demonstrate engineering and product excellence publicly",
    ],
  },
  {
    icon: Award,
    title: "Leadership",
    shortDesc: "Demonstrate organizational values and vision through executive visibility.",
    modalDesc: "Help executives share their vision and values in an authentic, consistent way \u2014 without the content creation burden.",
    examplePost: "The best decision I made as a leader this quarter wasn't a strategy call \u2014 it was choosing to ask my team what they needed instead of telling them what to do. The results spoke for themselves.",
    benefits: [
      "Build executive presence without ghostwriting",
      "Reinforce company values through leadership visibility",
      "Attract partners, investors, and talent who align with your vision",
      "Create a cultural tone that cascades through the organization",
    ],
  },
  {
    icon: Rocket,
    title: "Startups",
    shortDesc: "Build brand awareness and credibility without a dedicated marketing team.",
    modalDesc: "Compete with larger companies by turning your small team into a content engine that punches above its weight.",
    examplePost: "We're a team of 8 and we just closed our first enterprise contract. No marketing team. No PR agency. Just real work, shared honestly. Sharwi made it possible.",
    benefits: [
      "Build brand awareness with zero marketing budget",
      "Leverage founder and team stories as your strongest asset",
      "Create credibility with investors, clients, and recruits",
      "Scale visibility without scaling headcount",
    ],
  },
]

export function UseCasesSection() {
  const [openModal, setOpenModal] = useState<number | null>(null)

  const handleSeeExample = (index: number, title: string) => {
    trackSeeExample(title)
    setOpenModal(index)
  }

  return (
    <section id="use-cases" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-3">
          Use Cases
        </h2>
        <p className="text-[#9CA3AF] text-center mb-14">
          Sharwi adapts to your industry, team, and goals.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <GlassCard key={uc.title} className="flex flex-col text-center" hoverEffect>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(255,106,0,0.15)" }}
              >
                <uc.icon size={22} className="text-[#FF6A00]" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{uc.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4 flex-1">{uc.shortDesc}</p>
              <button
                onClick={() => handleSeeExample(i, uc.title)}
                className="group inline-flex items-center justify-center gap-1.5 text-[#FF6A00] text-sm font-medium hover:underline transition-all duration-200"
              >
                See example
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </GlassCard>
          ))}
        </div>
      </div>

      {useCases.map((uc, i) => (
        <UseCaseModal
          key={uc.title}
          isOpen={openModal === i}
          onClose={() => setOpenModal(null)}
          title={uc.title}
          description={uc.modalDesc}
          examplePost={uc.examplePost}
          benefits={uc.benefits}
        />
      ))}
    </section>
  )
}
