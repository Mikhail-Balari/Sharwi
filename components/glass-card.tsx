"use client"

import { type ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
}

export function GlassCard({ children, className = "", hoverEffect = true }: GlassCardProps) {
  return (
    <div
      className={`
        rounded-2xl p-6
        transition-all duration-300 ease-out
        ${hoverEffect ? "hover:scale-[1.03]" : ""}
        ${className}
      `}
      style={{
        background: "linear-gradient(135deg, rgba(255,80,0,0.13) 0%, rgba(120,30,0,0.22) 45%, rgba(10,4,2,0.75) 100%)",
        backdropFilter: "blur(18px) saturate(1.4)",
        WebkitBackdropFilter: "blur(18px) saturate(1.4)",
        border: "1px solid rgba(255,90,0,0.22)",
        borderTop: "1px solid rgba(255,140,60,0.35)",
        borderLeft: "1px solid rgba(255,120,40,0.28)",
        boxShadow: `
          0 4px 32px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(255,160,60,0.18),
          inset 0 -1px 0 rgba(180,40,0,0.12),
          0 0 0 0.5px rgba(255,80,0,0.08)
        `,
      }}
      onMouseEnter={hoverEffect ? (e) => {
        e.currentTarget.style.borderColor = "rgba(255,106,0,0.45)"
        e.currentTarget.style.borderTopColor = "rgba(255,160,80,0.55)"
        e.currentTarget.style.boxShadow = `
          0 8px 40px rgba(0,0,0,0.6),
          inset 0 1px 0 rgba(255,180,80,0.25),
          inset 0 -1px 0 rgba(200,50,0,0.15),
          0 0 20px rgba(255,80,0,0.08)
        `
      } : undefined}
      onMouseLeave={hoverEffect ? (e) => {
        e.currentTarget.style.borderColor = "rgba(255,90,0,0.22)"
        e.currentTarget.style.borderTopColor = "rgba(255,140,60,0.35)"
        e.currentTarget.style.boxShadow = `
          0 4px 32px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(255,160,60,0.18),
          inset 0 -1px 0 rgba(180,40,0,0.12),
          0 0 0 0.5px rgba(255,80,0,0.08)
        `
      } : undefined}
    >
      {children}
    </div>
  )
}
