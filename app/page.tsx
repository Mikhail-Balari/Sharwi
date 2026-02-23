"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { AudienceSelector } from "@/components/sections/audience-selector"
import { ForProfessionals } from "@/components/sections/for-professionals"
import { ForCompanies } from "@/components/sections/for-companies"
import { ProblemSection } from "@/components/sections/problem"
import { AdvocacyBroken } from "@/components/sections/advocacy-broken"
import { WhySharwi } from "@/components/sections/why-sharwi"
import { HowItWorks } from "@/components/sections/how-it-works"
import { BuiltFor } from "@/components/sections/built-for"
import { ValueForEveryone } from "@/components/sections/value-for-everyone"
import { TechnologySection } from "@/components/sections/technology"
import { UseCasesSection } from "@/components/sections/use-cases"
import { LiveDemoSection } from "@/components/sections/live-demo"
import { MetricsSection } from "@/components/sections/metrics"
import { ReputationSection } from "@/components/sections/reputation"
import { PrinciplesSection } from "@/components/sections/principles"
import { CtaFooter } from "@/components/sections/cta-footer"
import { RequestDemoModal, SuccessModal } from "@/components/modals"

export default function Home() {
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)

  const openDemoModal = () => setDemoModalOpen(true)

  return (
    <main className="min-h-screen">
      <Header onRequestDemo={openDemoModal} />
      <HeroSection onRequestDemo={openDemoModal} />
      <AudienceSelector />
      <ForProfessionals onRequestDemo={openDemoModal} />
      <ForCompanies onRequestDemo={openDemoModal} />
      <ProblemSection />
      <AdvocacyBroken />
      <WhySharwi />
      <HowItWorks />
      <BuiltFor />
      <ValueForEveryone />
      <TechnologySection />
      <UseCasesSection />
      <LiveDemoSection />
      <MetricsSection />
      <ReputationSection />
      <PrinciplesSection />
      <CtaFooter />

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
