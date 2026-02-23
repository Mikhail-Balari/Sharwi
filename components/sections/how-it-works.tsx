"use client"

const steps = [
  {
    num: "01",
    title: "Capture",
    desc: "AI captures your real work contributions - insights, solutions, learnings - effortlessly.",
  },
  {
    num: "02",
    title: "Transform",
    desc: "Sharwi turns raw contributions into polished, shareable content that reflects your authentic voice.",
  },
  {
    num: "03",
    title: "Amplify",
    desc: "Your expertise reaches the right audience. Build reputation. Generate visibility. Create impact.",
  },
  {
    num: "04",
    title: "Measure",
    desc: "Track real engagement metrics. See the tangible value of genuine knowledge sharing.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24" style={{ position: "relative", zIndex: 3 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF6A00] text-center mb-3">
          PROCESS
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-14 text-balance">
          How <span className="text-[#FF6A00]">Sharwi</span> Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(255,106,0,0.2),inset_0_0_0_1px_rgba(255,106,0,0.15)]"
              style={{
                background: "rgba(20,14,8,0.65)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,106,0,0.15)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,106,0,0.55)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,106,0,0.15)"
              }}
            >
              {/* Big background number */}
              <span
                className="absolute top-2 right-4 font-extrabold transition-colors duration-300 select-none"
                style={{
                  fontSize: "90px",
                  lineHeight: "1",
                  color: "rgba(255,106,0,0.25)",
                }}
              >
                <span className="group-hover:text-[rgba(255,106,0,0.5)] transition-colors duration-300">
                  {s.num}
                </span>
              </span>

              <div className="relative z-10 pt-20">
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
