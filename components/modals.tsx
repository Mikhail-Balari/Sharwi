"use client"

import { useState, useEffect, useCallback, type ReactNode } from "react"
import { X, CheckCircle } from "lucide-react"
import { saveDemoRequest } from "@/lib/supabase"
import {
  trackDemoModalOpen,
  trackDemoFormSubmit,
} from "@/lib/analytics"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  maxWidth?: string
}

export function Modal({ isOpen, onClose, children, maxWidth = "580px" }: ModalProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleEsc])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full rounded-2xl overflow-y-auto max-h-[90vh]"
        style={{
          maxWidth,
          background: "rgba(20,20,20,0.95)",
          border: "1px solid rgba(255,106,0,0.3)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-[#9CA3AF] hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  )
}

interface RequestDemoModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function RequestDemoModal({ isOpen, onClose, onSuccess }: RequestDemoModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Track modal open
  useEffect(() => {
    if (isOpen) {
      trackDemoModalOpen()
    }
  }, [isOpen])

  const roles = [
    "Founder",
    "HR & Talent",
    "Marketing",
    "Data & Analytics",
    "Engineering",
    "Operations",
    "Digital Transformation",
    "Other",
  ]

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.role) newErrors.role = "Role is required"
    if (!formData.company.trim()) newErrors.company = "Company is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError("")

    // Save to Supabase
    const result = await saveDemoRequest({
      name: formData.name,
      role: formData.role,
      company: formData.company,
      email: formData.email,
      message: formData.message,
    })

    if (!result.success) {
      console.error("Failed to save lead:", result.error)
      // Still proceed — don't block UX for a DB error
    }

    // Track in Google Analytics
    trackDemoFormSubmit({
      name: formData.name,
      role: formData.role,
      company: formData.company,
      email: formData.email,
    })

    setIsSubmitting(false)
    onClose()
    onSuccess()
    setFormData({ name: "", role: "", company: "", email: "", message: "" })
    setErrors({})
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#FF6A00]/50 transition-all"
  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="520px">
      <div className="p-8">
        <h2 className="font-display text-2xl font-bold text-white mb-2">
          Request your personalized demo
        </h2>
        <p className="text-[#9CA3AF] mb-6">
          See how Sharwi transforms real work into real visibility.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className={`${inputClass} appearance-none`}
              style={{
                ...inputStyle,
                color: formData.role ? "#F5F5F5" : "#6B7280",
              }}
            >
              <option value="" disabled>
                Role *
              </option>
              {roles.map((r) => (
                <option key={r} value={r} className="bg-[#1A1A1A] text-white">
                  {r}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Company *"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
            {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <textarea
              placeholder="Message (optional)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className={`${inputClass} resize-none`}
              style={inputStyle}
            />
          </div>
          {submitError && (
            <p className="text-red-400 text-sm text-center">{submitError}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(255,106,0,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: "#FF6A00" }}
          >
            {isSubmitting ? "Sending..." : "Request Demo"}
          </button>
        </form>
      </div>
    </Modal>
  )
}

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="420px">
      <div className="p-8 flex flex-col items-center text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ background: "rgba(34,197,94,0.15)" }}
        >
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">Thank you!</h2>
        <p className="text-[#9CA3AF] mb-6">{"We'll be in touch"}</p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(255,106,0,0.4)]"
          style={{ background: "#FF6A00" }}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

interface UseCaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  examplePost: string
  benefits: string[]
}

export function UseCaseModal({ isOpen, onClose, title, description, examplePost, benefits }: UseCaseModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <h2 className="font-display text-2xl font-bold text-white mb-3">{title}</h2>
        <p className="text-[#9CA3AF] mb-6">{description}</p>
        <div
          className="rounded-xl p-5 mb-6"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-sm font-bold text-white mb-2">Example Post</p>
          <p className="text-[#D1D5DB] italic leading-relaxed">{`"${examplePost}"`}</p>
        </div>
        <div className="mb-6">
          <p className="font-bold text-white mb-3">Key Benefits</p>
          <ul className="flex flex-col gap-2.5">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[#9CA3AF]">
                <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: "#FF6A00" }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:border-[#FF6A00]/50"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
