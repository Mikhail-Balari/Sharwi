"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { SharwiLogoCombined } from "./sharwi-logo"
import { trackNavRequestDemo } from "@/lib/analytics"

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "How Sharwi Works", href: "#how-it-works" },
  { label: "Personal Layer", href: "#personal-layer" },
  { label: "Enterprise Layer", href: "#enterprise-layer" },
  { label: "ROI", href: "#roi-benchmark" },
]

export function Header({ onRequestDemo }: { onRequestDemo: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleRequestDemo = () => {
    trackNavRequestDemo()
    onRequestDemo()
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto mt-4 max-w-[1240px] px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between rounded-full border border-white/10 bg-[#0a0f16]/82 px-5 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <a href="#top" className="shrink-0">
            <SharwiLogoCombined />
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={handleRequestDemo}
              data-cta="request-demo"
              data-cta-source="header_nav"
              className="rounded-full bg-[#ff6a00] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(255,106,0,0.32)]"
            >
              Request Demo
            </button>
          </nav>

          <button
            className="text-white lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="mt-3 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-[#0a0f16]/94 px-6 py-6 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-300 transition-colors hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false)
                handleRequestDemo()
              }}
              data-cta="request-demo"
              data-cta-source="header_nav_mobile"
              className="rounded-full bg-[#ff6a00] px-5 py-3 text-sm font-semibold text-white transition-all duration-300"
            >
              Request Demo
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
