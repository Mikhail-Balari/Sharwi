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
        ${hoverEffect ? "hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(255,106,0,0.15)]" : ""}
        ${className}
      `}
      style={{
        background: "rgba(20,14,8,0.65)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,106,0,0.15)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
      onMouseEnter={hoverEffect ? (e) => {
        e.currentTarget.style.borderColor = "rgba(255,106,0,0.5)"
      } : undefined}
      onMouseLeave={hoverEffect ? (e) => {
        e.currentTarget.style.borderColor = "rgba(255,106,0,0.15)"
      } : undefined}
    >
      {children}
    </div>
  )
}
