"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { ProblemSection } from "@/components/sections/problem"
import { HowItWorks } from "@/components/sections/how-it-works"
import { ForProfessionals } from "@/components/sections/for-professionals"
import { ForCompanies } from "@/components/sections/for-companies"
import { TechnologySection } from "@/components/sections/technology"
import { EnterpriseDemoSection } from "@/components/sections/enterprise-demo"
import { LiveDemoSection } from "@/components/sections/live-demo"
import { MetricsSection } from "@/components/sections/metrics"
import { CtaFooter } from "@/components/sections/cta-footer"
import { RequestDemoModal, SuccessModal } from "@/components/modals"
import { trackLandingPageView } from "@/lib/analytics"

export default function Home() {
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)

  const openDemoModal = () => setDemoModalOpen(true)

  useEffect(() => {
    trackLandingPageView()
  }, [])

  return (
    <main className="min-h-screen">
      <Header onRequestDemo={openDemoModal} />
      <HeroSection onRequestDemo={openDemoModal} />
      <ProblemSection />
      <HowItWorks />
      <ForProfessionals onRequestDemo={openDemoModal} />
      <LiveDemoSection />
      <ForCompanies onRequestDemo={openDemoModal} />
      <TechnologySection />
      <EnterpriseDemoSection onRequestDemo={openDemoModal} />
      <MetricsSection />
      <CtaFooter onRequestDemo={openDemoModal} />

      <RequestDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onSuccess={() => setSuccessModalOpen(true)}
      />
      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />
    </main>
  )
}
