"use client"

const DEBUG_EVENT_KEY = "sharwi_event_log"
const DEBUG_EVENT_LIMIT = 60

export type SharwiEventName =
  | "landing_page_view"
  | "cta_click"
  | "mobile_demo_interaction"
  | "enterprise_demo_interaction"
  | "demo_form_start"
  | "demo_form_submit"
  | "demo_success"

type EventParams = Record<string, string | number | boolean | null | undefined>

export interface AnalyticsDebugEvent {
  name: SharwiEventName
  params: EventParams
  at: string
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    __sharwiAnalyticsDebug?: AnalyticsDebugEvent[]
    __sharwiLandingTracked?: boolean
  }
}

function appendDebugEvent(event: AnalyticsDebugEvent) {
  if (typeof window === "undefined") {
    return
  }

  const existing = getDebugEvents()
  const next = [...existing, event].slice(-DEBUG_EVENT_LIMIT)
  window.__sharwiAnalyticsDebug = next
  window.localStorage.setItem(DEBUG_EVENT_KEY, JSON.stringify(next))
}

export function getDebugEvents(): AnalyticsDebugEvent[] {
  if (typeof window === "undefined") {
    return []
  }

  const cached = window.__sharwiAnalyticsDebug
  if (cached?.length) {
    return cached
  }

  const raw = window.localStorage.getItem(DEBUG_EVENT_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw) as AnalyticsDebugEvent[]
    window.__sharwiAnalyticsDebug = parsed
    return parsed
  } catch {
    return []
  }
}

export function trackEvent(name: SharwiEventName, params: EventParams = {}) {
  if (typeof window === "undefined") {
    return
  }

  const eventParams = {
    page_path: window.location.pathname,
    ...params,
  }

  appendDebugEvent({
    name,
    params: eventParams,
    at: new Date().toISOString(),
  })

  if (typeof window.gtag === "function") {
    window.gtag("event", name, eventParams)
  }
}

export const trackLandingPageView = () => {
  if (typeof window === "undefined" || window.__sharwiLandingTracked) {
    return
  }

  window.__sharwiLandingTracked = true
  trackEvent("landing_page_view", {
    location: "landing",
  })
}

export const trackCtaClick = (location: string, ctaType = "request_demo") =>
  trackEvent("cta_click", {
    location,
    cta_type: ctaType,
  })

export const trackMobileDemoInteraction = (interaction: string) =>
  trackEvent("mobile_demo_interaction", {
    interaction,
  })

export const trackEnterpriseDemoInteraction = (
  module: string,
  value?: string | number
) =>
  trackEvent("enterprise_demo_interaction", {
    module,
    value,
  })

export const trackDemoFormStart = (entryPoint = "request_demo_modal") =>
  trackEvent("demo_form_start", {
    entry_point: entryPoint,
  })

export const trackDemoFormSubmit = (details: {
  role: string
  companySize: string
  problemToSolve: string
  hasNotes: boolean
}) =>
  trackEvent("demo_form_submit", {
    role: details.role,
    company_size: details.companySize,
    problem_to_solve: details.problemToSolve,
    has_notes: details.hasNotes,
  })

export const trackDemoSuccess = (surface = "request_demo_modal") =>
  trackEvent("demo_success", {
    surface,
  })

// Compatibility wrappers for the existing landing page components.
export const trackNavRequestDemo = () => trackCtaClick("header_nav")

export const trackHeroRequestDemo = () => trackCtaClick("hero_primary")

export const trackHeroSeeHowItWorks = () =>
  trackCtaClick("hero_secondary", "see_how_it_works")

export const trackExploreAsProfessional = () =>
  trackCtaClick("audience_selector_professional", "explore")

export const trackExploreForCompanies = () =>
  trackCtaClick("audience_selector_company", "explore")

export const trackForProfessionalsRequestDemo = () =>
  trackCtaClick("for_professionals")

export const trackForCompaniesRequestDemo = () =>
  trackCtaClick("for_companies")

export const trackSeeExample = (useCaseName: string) =>
  trackCtaClick(`use_case_${useCaseName.toLowerCase().replace(/[^a-z0-9]/g, "_")}`, "see_example")

export const trackTryDemoLive = () => trackCtaClick("mobile_demo_external", "open_demo")

export const trackDemoInteraction = () => trackMobileDemoInteraction("iframe_engaged")

export const trackDemoModalOpen = () => trackCtaClick("request_demo_modal", "modal_open")

export const trackScheduleLiveDemo = () =>
  trackCtaClick("request_demo_section", "schedule_live_demo")
