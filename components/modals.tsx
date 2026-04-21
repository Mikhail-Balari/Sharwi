"use client"

import { useState, useEffect, useCallback, type ReactNode } from "react"
import { CheckCircle, X } from "lucide-react"
import { saveDemoRequest } from "@/lib/supabase"
import {
  trackDemoFormStart,
  trackDemoFormSubmit,
  trackDemoSuccess,
} from "@/lib/analytics"
import { useI18n } from "@/lib/i18n"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  maxWidth?: string
}

export function Modal({ isOpen, onClose, children, maxWidth = "580px" }: ModalProps) {
  const { t } = useI18n()
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
          background: "rgba(10,15,22,0.9)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-[#9CA3AF] hover:text-white transition-colors"
          aria-label={t("modal_close")}
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
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    role: "",
    workEmail: "",
    companySize: "",
    problemToSolve: "",
    notes: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [hasStarted, setHasStarted] = useState(false)

  const roles = [
    t("modal_role_founder"),
    t("modal_role_advisor"),
    t("modal_role_marketing"),
    t("modal_role_revenue"),
    t("modal_role_people"),
    t("modal_role_operations"),
    t("modal_role_data"),
    t("modal_role_transformation"),
    t("modal_role_other"),
  ]

  const companySizes = [
    t("modal_size_solo"),
    "1-50",
    "51-200",
    "201-1,000",
    "1,001-5,000",
    "5,000+",
  ]

  const problems = [
    t("modal_problem_advocacy"),
    t("modal_problem_governance"),
    t("modal_problem_visibility"),
    t("modal_problem_cac"),
    t("modal_problem_attribution"),
    t("modal_problem_reporting"),
    t("modal_problem_overview"),
  ]

  useEffect(() => {
    if (!isOpen) {
      setHasStarted(false)
    }
  }, [isOpen])

  const markStarted = () => {
    if (hasStarted) return
    setHasStarted(true)
    trackDemoFormStart()
  }

  const updateField = (field: keyof typeof formData, value: string) => {
    markStarted()
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const validate = () => {
    const nextErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) nextErrors.fullName = t("modal_error_full_name")
    if (!formData.company.trim()) nextErrors.company = t("modal_error_company")
    if (!formData.role) nextErrors.role = t("modal_error_role")
    if (!formData.workEmail.trim()) nextErrors.workEmail = t("modal_error_email")
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail))
      nextErrors.workEmail = t("modal_error_email_valid")
    if (!formData.companySize) nextErrors.companySize = t("modal_error_company_size")
    if (!formData.problemToSolve) nextErrors.problemToSolve = t("modal_error_problem")

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError("")

    const result = await saveDemoRequest({
      fullName: formData.fullName,
      company: formData.company,
      role: formData.role,
      workEmail: formData.workEmail,
      companySize: formData.companySize,
      problemToSolve: formData.problemToSolve,
      notes: formData.notes,
    })

    if (!result.success) {
      setSubmitError(t("modal_error_submit"))
      setIsSubmitting(false)
      return
    }

    trackDemoFormSubmit({
      role: formData.role,
      companySize: formData.companySize,
      problemToSolve: formData.problemToSolve,
      hasNotes: Boolean(formData.notes.trim()),
    })

    setIsSubmitting(false)
    onClose()
    onSuccess()
    setFormData({
      fullName: "",
      company: "",
      role: "",
      workEmail: "",
      companySize: "",
      problemToSolve: "",
      notes: "",
    })
    setErrors({})
  }

  const inputClass =
    "glass-input w-full px-4 py-3 rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#DE5015]/50 transition-all"
  const inputStyle = {}

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="640px">
      <div className="p-8">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            {t("modal_request_title")}
          </h2>
          <p className="text-[#9CA3AF] leading-relaxed">
            {t("modal_request_body")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <input
              type="text"
              placeholder={t("modal_full_name")}
              value={formData.fullName}
              onFocus={markStarted}
              onChange={(e) => updateField("fullName", e.target.value)}
              className={inputClass}
              style={inputStyle}
            />
            {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div className="md:col-span-1">
            <input
              type="text"
              placeholder={t("modal_company")}
              value={formData.company}
              onFocus={markStarted}
              onChange={(e) => updateField("company", e.target.value)}
              className={inputClass}
              style={inputStyle}
            />
            {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
          </div>

          <div className="md:col-span-1">
            <select
              value={formData.role}
              onFocus={markStarted}
              onChange={(e) => updateField("role", e.target.value)}
              className={`${inputClass} appearance-none`}
              style={{
                ...inputStyle,
                color: formData.role ? "#F5F5F5" : "#6B7280",
              }}
            >
              <option value="" disabled>
                {t("modal_role")}
              </option>
              {roles.map((role) => (
                <option key={role} value={role} className="bg-[#1A1A1A] text-white">
                  {role}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
          </div>

          <div className="md:col-span-1">
            <input
              type="email"
              placeholder={t("modal_email")}
              value={formData.workEmail}
              onFocus={markStarted}
              onChange={(e) => updateField("workEmail", e.target.value)}
              className={inputClass}
              style={inputStyle}
            />
            {errors.workEmail && <p className="text-red-400 text-sm mt-1">{errors.workEmail}</p>}
          </div>

          <div className="md:col-span-1">
            <select
              value={formData.companySize}
              onFocus={markStarted}
              onChange={(e) => updateField("companySize", e.target.value)}
              className={`${inputClass} appearance-none`}
              style={{
                ...inputStyle,
                color: formData.companySize ? "#F5F5F5" : "#6B7280",
              }}
            >
              <option value="" disabled>
                {t("modal_company_size")}
              </option>
              {companySizes.map((size) => (
                <option key={size} value={size} className="bg-[#1A1A1A] text-white">
                  {size}
                </option>
              ))}
            </select>
            {errors.companySize && <p className="text-red-400 text-sm mt-1">{errors.companySize}</p>}
          </div>

          <div className="md:col-span-1">
            <select
              value={formData.problemToSolve}
              onFocus={markStarted}
              onChange={(e) => updateField("problemToSolve", e.target.value)}
              className={`${inputClass} appearance-none`}
              style={{
                ...inputStyle,
                color: formData.problemToSolve ? "#F5F5F5" : "#6B7280",
              }}
            >
              <option value="" disabled>
                {t("modal_problem")}
              </option>
              {problems.map((problem) => (
                <option key={problem} value={problem} className="bg-[#1A1A1A] text-white">
                  {problem}
                </option>
              ))}
            </select>
            {errors.problemToSolve && <p className="text-red-400 text-sm mt-1">{errors.problemToSolve}</p>}
          </div>

          <div className="md:col-span-2">
            <textarea
              placeholder={t("modal_notes")}
              value={formData.notes}
              onFocus={markStarted}
              onChange={(e) => updateField("notes", e.target.value)}
              rows={4}
              className={`${inputClass} resize-none`}
              style={inputStyle}
            />
          </div>

          {submitError && (
            <p className="text-red-400 text-sm text-center md:col-span-2">{submitError}</p>
          )}

          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(222,80,21,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "#DE5015" }}
            >
              {isSubmitting ? t("modal_submit_loading") : t("modal_submit_idle")}
            </button>
          </div>
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
  const { t } = useI18n()

  useEffect(() => {
    if (isOpen) {
      trackDemoSuccess()
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="420px">
      <div className="p-8 flex flex-col items-center text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ background: "rgba(34,197,94,0.15)" }}
        >
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">{t("modal_success_title")}</h2>
        <p className="text-[#9CA3AF] mb-6">
          {t("modal_success_body")}
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(222,80,21,0.4)]"
          style={{ background: "#DE5015" }}
        >
          {t("modal_close")}
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

export function UseCaseModal({
  isOpen,
  onClose,
  title,
  description,
  examplePost,
  benefits,
}: UseCaseModalProps) {
  const { t } = useI18n()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <h2 className="font-display text-2xl font-bold text-white mb-3">{title}</h2>
        <p className="text-[#9CA3AF] mb-6">{description}</p>
        <div
          className="rounded-xl p-5 mb-6"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-sm font-bold text-white mb-2">{t("use_case_example_post")}</p>
          <p className="text-[#D1D5DB] italic leading-relaxed">{`"${examplePost}"`}</p>
        </div>
        <div className="mb-6">
          <p className="font-bold text-white mb-3">{t("use_case_key_benefits")}</p>
          <ul className="flex flex-col gap-2.5">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2.5 text-[#9CA3AF]">
                <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: "#DE5015" }} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:border-[#DE5015]/50"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {t("modal_close")}
        </button>
      </div>
    </Modal>
  )
}


