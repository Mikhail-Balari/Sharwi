"use client"

import { useI18n } from "@/lib/i18n"

export function LanguageSelector() {
  const { locale, setLocale } = useI18n()

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as "en" | "es")}
        style={{
          backgroundColor: "transparent",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "20px",
          color: "#FFFCF2",
          fontSize: "13px",
          fontWeight: "600",
          padding: "6px 28px 6px 12px",
          cursor: "pointer",
          appearance: "none",
          WebkitAppearance: "none",
          outline: "none",
          letterSpacing: "0.5px",
        }}
        aria-label="Language selector"
      >
        <option value="en" style={{ backgroundColor: "#1A1815", color: "#FFFCF2" }}>
          🇬🇧 EN
        </option>
        <option value="es" style={{ backgroundColor: "#1A1815", color: "#FFFCF2" }}>
          🇦🇷 ES
        </option>
      </select>
      <span
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          fontSize: "10px",
          color: "#8A8480",
        }}
      >
        ▾
      </span>
    </div>
  )
}
