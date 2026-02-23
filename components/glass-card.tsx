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
        rounded-2xl p-6 relative overflow-hidden
        transition-all duration-300 ease-out
        ${hoverEffect ? "hover:scale-[1.03]" : ""}
        ${className}
      `}
      style={{
        /* Interior casi negro con degradé mínimo solo en esquina superior izquierda */
        background: "radial-gradient(ellipse at 15% 10%, rgba(100,30,0,0.18) 0%, rgba(3,1,0,0.92) 55%)",
        backdropFilter: "blur(20px) saturate(1.3)",
        WebkitBackdropFilter: "blur(20px) saturate(1.3)",
        boxShadow: `
          /* Anillo exterior naranja-rojo fuerte — el efecto cristal principal */
          0 0 0 1.5px rgba(255,90,10,0.75),
          /* Highlight superior — línea de luz brillante */
          inset 0 1.5px 0 rgba(255,160,40,0.55),
          /* Highlight lateral izquierdo */
          inset 1.5px 0 0 rgba(255,120,20,0.30),
          /* Sombra interna — profundidad oscura */
          inset 0 -2px 16px rgba(0,0,0,0.7),
          inset -2px 0 10px rgba(0,0,0,0.5),
          /* Glow exterior naranja muy sutil */
          0 0 12px rgba(255,80,0,0.10),
          0 6px 28px rgba(0,0,0,0.65)
        `,
      }}
    >
      {/* Línea highlight superior — reflejo de luz sobre el borde */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "6%",
          right: "6%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,180,60,0.80), rgba(255,140,30,0.60), transparent)",
          pointerEvents: "none",
        }}
      />
      {/* Contenido */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
