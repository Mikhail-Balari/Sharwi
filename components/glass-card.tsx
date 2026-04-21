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
        glass-card rounded-2xl p-6 relative overflow-hidden
        transition-all duration-300 ease-out
        ${hoverEffect ? "" : ""}
        ${className}
      `}
    >
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  )
}
