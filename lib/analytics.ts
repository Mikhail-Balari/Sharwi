// Google Analytics 4 event tracking utility
// GA_ID: G-4JFEK747YT

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export function trackEvent(
  eventName: string,
  params?: {
    event_category?: string
    event_label?: string
    value?: number
    [key: string]: unknown
  }
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params)
  }
}

// ── Pre-defined events ──────────────────────────────────────────

// Navigation
export const trackNavRequestDemo = () =>
  trackEvent("click", { event_category: "navigation", event_label: "nav_request_demo" })

// Hero
export const trackHeroRequestDemo = () =>
  trackEvent("click", { event_category: "hero", event_label: "hero_request_demo" })

export const trackHeroSeeHowItWorks = () =>
  trackEvent("click", { event_category: "hero", event_label: "hero_see_how_it_works" })

// Audience selector
export const trackExploreAsProfessional = () =>
  trackEvent("click", { event_category: "audience", event_label: "explore_as_professional" })

export const trackExploreForCompanies = () =>
  trackEvent("click", { event_category: "audience", event_label: "explore_for_companies" })

// For Professionals / For Companies CTAs
export const trackForProfessionalsRequestDemo = () =>
  trackEvent("click", { event_category: "for_professionals", event_label: "for_professionals_request_demo" })

export const trackForCompaniesRequestDemo = () =>
  trackEvent("click", { event_category: "for_companies", event_label: "for_companies_request_demo" })

// Use Cases
export const trackSeeExample = (useCaseName: string) =>
  trackEvent("click", {
    event_category: "use_cases",
    event_label: `see_example_${useCaseName.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
  })

// Live Demo
export const trackTryDemoLive = () =>
  trackEvent("click", { event_category: "live_demo", event_label: "try_demo_live" })

export const trackDemoInteraction = () =>
  trackEvent("demo_interaction", { event_category: "live_demo", event_label: "embedded_demo_used" })

// Request Demo Modal
export const trackDemoModalOpen = () =>
  trackEvent("modal_open", { event_category: "demo_modal", event_label: "request_demo_modal_opened" })

export const trackDemoFormSubmit = (formData: {
  name: string
  role: string
  company: string
  email: string
}) =>
  trackEvent("form_submit", {
    event_category: "conversion",
    event_label: "request_demo_submitted",
    role: formData.role,
    company: formData.company,
  })

// Final CTA
export const trackScheduleLiveDemo = () =>
  trackEvent("click", { event_category: "cta", event_label: "schedule_live_demo" })
