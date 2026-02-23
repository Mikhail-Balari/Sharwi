"use client"

import { useState } from "react"
import { SharwiLogoCombined } from "./sharwi-logo"
import { Menu, X } from "lucide-react"
import { trackNavRequestDemo } from "@/lib/analytics"

const navLinks = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Live Demo", href: "#live-demo" },
  { label: "Metrics", href: "#metrics" },
  { label: "Principles", href: "#principles" },
]

export function Header({ onRequestDemo }: { onRequestDemo: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleRequestDemo = () => {
    trackNavRequestDemo()
    onRequestDemo()
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        background: "rgba(10,7,4,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,106,0,0.08)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="shrink-0">
          <SharwiLogoCombined />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#9CA3AF] hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={handleRequestDemo}
            className="ml-2 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,106,0,0.4)]"
            style={{ background: "#FF6A00", borderRadius: "10px" }}
          >
            Request Demo
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          className="md:hidden flex flex-col gap-4 px-6 pb-6 pt-2"
          style={{ background: "rgba(10,7,4,0.96)", backdropFilter: "blur(20px)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#9CA3AF] hover:text-white transition-colors"
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
            className="px-5 py-2.5 font-semibold text-white w-full transition-all duration-300"
            style={{ background: "#FF6A00", borderRadius: "10px" }}
          >
            Request Demo
          </button>
        </nav>
      )}
    </header>
  )
}
