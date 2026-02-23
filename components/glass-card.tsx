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
        transition-all duration-400 ease-out
        ${hoverEffect ? "hover:scale-[1.03]" : ""}
        ${className}
      `}
      style={{
        /* Cuerpo oscuro con tinte ámbar — como el interior de la burbuja */
        background: "radial-gradient(ellipse at 30% 25%, rgba(160,55,0,0.28) 0%, rgba(60,15,0,0.55) 45%, rgba(4,2,1,0.82) 100%)",
        backdropFilter: "blur(24px) saturate(1.6) brightness(1.05)",
        WebkitBackdropFilter: "blur(24px) saturate(1.6) brightness(1.05)",
        /* Borde con gradiente — simula el borde brillante del vidrio */
        border: "1px solid transparent",
        backgroundClip: "padding-box",
        boxShadow: `
          /* Borde externo — anillo de luz ámbar */
          0 0 0 1px rgba(255,140,40,0.35),
          /* Reflejo superior — highlight de luz */
          inset 0 1.5px 0 rgba(255,200,100,0.45),
          /* Reflejo lateral izquierdo */
          inset 1.5px 0 0 rgba(255,160,60,0.25),
          /* Sombra interna inferior — profundidad */
          inset 0 -2px 12px rgba(0,0,0,0.6),
          /* Sombra interna derecha */
          inset -2px 0 8px rgba(0,0,0,0.4),
          /* Glow exterior muy sutil */
          0 8px 32px rgba(0,0,0,0.6),
          0 0 0 0.5px rgba(255,100,0,0.08)
        `,
      }}
    >
      {/* Highlight superior — reflejo de luz como en la burbuja */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "8%",
          right: "8%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,210,120,0.7), rgba(255,180,80,0.5), transparent)",
          borderRadius: "0 0 50% 50%",
          pointerEvents: "none",
        }}
      />
      {/* Reflejo secundario — zona de luz difusa arriba-izquierda */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-30%",
          left: "-10%",
          width: "55%",
          height: "55%",
          background: "radial-gradient(ellipse, rgba(255,150,50,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      />
      {/* Contenido */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
