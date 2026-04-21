"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Locale = "en" | "es"

export const translations = {
  en: {
    nav_problem: "Problem",
    nav_how_it_works: "How Sharwi Works",
    nav_for_professionals: "Personal Layer",
    nav_for_companies: "Enterprise Layer",
    nav_enterprise: "ROI",
    nav_request_demo: "Request Demo",

    hero_label: "Trusted visibility infrastructure for modern teams",
    hero_h1_line1: "Turn real work into",
    hero_h1_line2: "visible reputation and measurable business impact.",
    hero_sub:
      "Sharwi is infrastructure, not another content tool. It captures real work, keeps evidence attached, drafts with AI, leaves humans in control, and gives companies a clearer way to measure trusted visibility.",
    hero_cta_primary: "Request Demo",
    hero_cta_secondary: "See the Product Loop",
    hero_signal1_label: "Product model",
    hero_signal1_value: "Personal Layer + Enterprise Layer",
    hero_signal2_label: "Workflow",
    hero_signal2_value: "Capture to evidence to draft to control to impact",
    hero_signal3_label: "Time to results",
    hero_signal3_value: "Built to deliver impact in weeks, not quarters",
    hero_panel_title: "Sharwi infrastructure loop",
    hero_panel_sub: "Proof-backed reputation for people and companies",
    hero_panel_badge: "Live product",
    hero_panel_step1_title: "Capture work",
    hero_panel_step1_body:
      "Pull signal from commits, documents, tickets, CRM notes, launches, and wins.",
    hero_panel_step2_title: "Attach evidence",
    hero_panel_step2_body:
      "Keep source material, approvals, and proof tied to each story candidate.",
    hero_panel_step3_title: "Draft with AI, publish with humans",
    hero_panel_step3_body:
      "Sharwi drafts the narrative, but the professional or reviewer still controls what goes out.",
    hero_panel_outcome1_label: "Personal outcome",
    hero_panel_outcome1_body:
      "Visible reputation built from real contribution, not performance.",
    hero_panel_outcome2_label: "Enterprise outcome",
    hero_panel_outcome2_body:
      "Trusted employee visibility tied to governance and measurable impact.",

    problem_label: "Problem",
    problem_h2:
      "Expertise, advocacy, and measurement are still treated as separate problems.",
    problem_sub:
      "That fragmentation is why strong professionals stay invisible, employee advocacy stalls, and leadership teams struggle to justify the spend. Sharwi connects the full system.",
    problem_card1_title: "Important work stays invisible",
    problem_card1_body:
      "Most of the value people create lives inside systems of work, not in public narratives.",
    problem_card2_title: "Advocacy depends on the loudest few",
    problem_card2_body:
      "Programs break when visibility relies on confidence, spare time, or generic prompts.",
    problem_card3_title: "AI without evidence lowers trust",
    problem_card3_body:
      "Buyers, leaders, and compliance teams need proof, not polished claims detached from reality.",
    problem_card4_title: "Leadership still struggles to prove ROI",
    problem_card4_body:
      "Impressions are easy to count. Business impact is much harder to defend without the right measurement layer.",
    problem_callout:
      "Sharwi solves this as infrastructure: capture the work, attach the proof, draft the story, keep human control, and measure the result across the Personal Layer and Enterprise Layer.",

    how_label: "How Sharwi Works",
    how_h2: "One product loop for credibility, control, and ROI.",
    how_sub:
      "Sharwi does not invent stories. It operationalizes the proof already sitting inside real work and makes it useful for both professionals and enterprise teams.",
    how_step1_title: "Capture work",
    how_step1_body:
      "Pull signal from the systems where work already happens: commits, docs, CRM notes, tickets, launches, and outcomes.",
    how_step2_title: "Attach evidence",
    how_step2_body:
      "Keep the proof, source links, approvals, and supporting context tied to every story candidate.",
    how_step3_title: "AI draft",
    how_step3_body:
      "Sharwi turns raw work into a credible narrative draft tailored to the professional and the use case.",
    how_step4_title: "Human control",
    how_step4_body:
      "The user, manager, or reviewer still approves, edits, or rejects before anything goes public.",
    how_step5_title: "Measure impact",
    how_step5_body:
      "Track trusted visibility, proof-backed publishing, meetings influenced, and business signals.",
    how_why_title: "Why this matters",
    how_why_body:
      "Evidence stays attached throughout the workflow, which means better trust, better governance, and a clearer way to measure business outcomes later.",

    prof_label: "Personal Layer",
    prof_h2_line1: "Give professionals a system that makes",
    prof_h2_highlight: "real contribution visible",
    prof_sub:
      "The Personal Layer helps experts capture meaningful work, keep evidence attached, approve what gets shared, and build a reputation that belongs to them.",
    prof_highlight_lead: "Most experts do not need more prompts.",
    prof_highlight_body:
      "They need a faster path from real work to proof-backed visibility without turning into full-time creators.",
    prof_card1_title: "Your work, finally visible",
    prof_card1_body:
      "Sharwi captures meaningful contributions and turns them into proof-backed reputation instead of leaving them buried in internal systems.",
    prof_card2_title: "Reputation built on substance",
    prof_card2_body:
      "No vanity metrics and no performance theater. The story starts from what you actually shipped, solved, or influenced.",
    prof_card3_title: "You keep the final say",
    prof_card3_body:
      "Sharwi proposes the draft, but the professional still reviews, edits, approves, or rejects before anything is published.",
    prof_card4_title: "Portable across roles and companies",
    prof_card4_body:
      "The reputation layer is meant to compound with your career instead of being trapped inside a single employer's content program.",
    prof_card5_title: "AI aligned to your context",
    prof_card5_body:
      "Technical, commercial, or operational work can all be translated into a narrative that sounds credible for the role behind it.",
    prof_card6_title: "Designed for real professionals",
    prof_card6_body:
      "Sharwi is built for people whose work matters more than their willingness to self-promote online every week.",
    prof_experience_title: "What the professional experiences",
    prof_step1_title: "Capture the work",
    prof_step1_body:
      "Log it quickly or connect the systems where the work already happened.",
    prof_step2_title: "Review the draft",
    prof_step2_body:
      "Sharwi drafts a story with evidence still attached and ready for review.",
    prof_step3_title: "Approve what matters",
    prof_step3_body:
      "Only the stories worth sharing move forward. Nothing publishes automatically.",
    prof_cta: "Request Demo",

    demo_label: "Embedded Mobile Demo",
    demo_h2:
      "Show the product experience where Sharwi starts: in the hands of the professional.",
    demo_body:
      "This is Sharwi's Personal Layer. The professional logs what they worked on, selects a tone, and gets a proof-backed draft in seconds. They review it, edit if needed, and publish. That is the full loop and it happens directly from their phone.",
    demo_info1_title: "Capture in seconds",
    demo_info1_body: "Log work fast or pull it from connected systems.",
    demo_info2_title: "Keep the evidence attached",
    demo_info2_body: "The story stays grounded in source material and context.",
    demo_info3_title: "Approve before anything goes out",
    demo_info3_body: "Human control is preserved even when AI drafts the first version.",
    demo_pill1: "Log work in seconds",
    demo_pill2: "AI draft with evidence",
    demo_pill3: "You approve before anything goes out",
    demo_cta_primary: "Try the app",
    demo_cta_secondary: "Request Guided Demo",
    demo_iframe_title: "Sharwi Mobile App Demo",

    comp_label: "Enterprise Layer",
    comp_h2_line1: "Give companies a system for",
    comp_h2_highlight: "credible employee visibility",
    comp_sub:
      "The Enterprise Layer is the system your marketing, HR, and revenue teams have been missing. It activates your experts, maintains governance, and gives leadership a clear view of what employee visibility actually produces for the business.",
    comp_card1_title: "Connects to existing systems",
    comp_card1_body:
      "Sharwi is designed to sit on top of the tools where teams already work, which keeps activation friction low.",
    comp_card2_title: "Activates more than the loudest few",
    comp_card2_body:
      "The system helps silent experts participate by starting from the work they already do instead of asking them to become creators first.",
    comp_card3_title: "Governance is part of the product",
    comp_card3_body:
      "Approval paths, evidence trails, and review visibility make the rollout easier for leadership to manage.",
    comp_card4_title: "Measurement goes beyond vanity",
    comp_card4_body:
      "Sharwi is framed around proof-backed publishing, trusted visibility, meetings influenced, and directional pipeline signal.",
    comp_card5_title: "Built for CAC conversations",
    comp_card5_body:
      "The Enterprise Layer gives leadership a cleaner path to discuss trusted reach, conversion quality, and benchmark efficiency.",
    comp_card6_title: "Fast to deploy",
    comp_card6_body:
      "Sharwi connects to your existing systems in days, not months. Your team starts generating verified visibility without changing how they work.",
    comp_start_label: "How it starts",
    comp_start_sub: "Sharwi is designed to deliver real results fast.",
    comp_start_metric1_label: "Employees activated",
    comp_start_metric2_label: "Source system to start",
    comp_start_metric3_label: "Weeks to first results",
    comp_start_footer:
      "Start with one team, one integration, and a clear measurement baseline. Scale once the signal is confirmed.",
    comp_company_gets_title: "What the company gets",
    comp_company_gets_1:
      "Verified visibility infrastructure instead of another content library",
    comp_company_gets_2:
      "Attribution logic from story to meeting and directional pipeline touch",
    comp_company_gets_3: "Approval flows and auditability for sensitive claims",
    comp_company_gets_4: "A dashboard with proof-backed and activation metrics",
    comp_company_gets_5:
      "A stronger internal narrative than asking employees to post more",
    comp_employee_keeps_title: "What the employee keeps",
    comp_employee_keeps_1: "The professional keeps the final publish decision",
    comp_employee_keeps_2:
      "Their reputation compounds instead of disappearing inside one employer",
    comp_employee_keeps_3:
      "The system starts from real work, not performance theater",
    comp_employee_keeps_4: "Evidence remains attached throughout the workflow",
    comp_employee_keeps_5: "AI assists the story without replacing authorship",
    comp_cta: "Request Demo",
    tech_label: "AI Architecture · Why It Matters",
    tech_h2: "Not generative AI. Grounded AI.",
    tech_sub:
      "Sharwi uses RAG — Retrieval-Augmented Generation — to draft content anchored to real work evidence. The result is not a hallucination. It is your actual work, written in your voice.",
    tech_generic_title: "Generic AI tools",
    tech_generic_node1: "Prompt or topic",
    tech_generic_node2: "LLM generates",
    tech_generic_node3: "Generic content",
    tech_generic_body:
      "No evidence. No context. No connection to real work. Content that sounds professional but cannot be verified.",
    tech_generic_bullet1: "Hallucination risk — content not grounded in fact",
    tech_generic_bullet2: "No proof — cannot survive a compliance review",
    tech_generic_bullet3: "Generic voice — loses authenticity at scale",
    tech_rag_title: "Sharwi RAG model",
    tech_rag_node1: "Real work signal",
    tech_rag_node1_sub: "PR, ticket, CRM note, doc, outcome",
    tech_rag_node2: "Evidence retrieval",
    tech_rag_node2_sub: "Linked source material pulled",
    tech_rag_node3: "RAG context window",
    tech_rag_node3_sub: "Work + evidence + role context",
    tech_rag_node4: "Grounded draft",
    tech_rag_node4_sub: "Content anchored to real facts",
    tech_rag_node5: "Human approval",
    tech_rag_node5_sub: "Professional reviews before publish",
    tech_rag_bullet1: "Zero hallucination — every claim links to source",
    tech_rag_bullet2: "Governance-ready — evidence trail attached automatically",
    tech_rag_bullet3: "Authentic voice — based on your actual work, not a template",
    tech_dataset_title: "The dataset that makes this better over time",
    tech_dataset_body:
      "Every proof-backed post Sharwi generates becomes a training signal. Which work type, for which role, in which industry, generated which engagement and pipeline result. No generic AI model has this. It is built exclusively from real professional work — and it compounds with every new company that uses Sharwi.",
    enterprise_label: "Enterprise Dashboard Demo",
    enterprise_h2: "The command center for verified employee visibility.",
    enterprise_sub:
      "Real-time view of what your team is publishing, what is verified, and what is generating pipeline. Everything your leadership needs to see the impact of employee visibility in one place.",
    enterprise_cta: "Request a Demo",
    enterprise_demo_account: "Demo Account",
    enterprise_range_30d: "Last 30 days",
    enterprise_range_90d: "Last 90 days",
    enterprise_overview_title: "Company overview",
    enterprise_overview_body:
      "How Sharwi is working across this organization: verified content, governance controls, and business impact in one view.",
    enterprise_card_active: "Active Employees",
    enterprise_card_posts: "Posts Generated",
    enterprise_card_proof: "Proof-backed Rate",
    enterprise_card_vvr: "Verified Visibility Rate (VVR)",
    enterprise_card_leads: "Leads Influenced",
    enterprise_card_cac: "CAC Reduction",
    enterprise_card_governance: "Governance Status",
    enterprise_card_attribution: "Attribution Snapshot",
    enterprise_note_active: "Active this period",
    enterprise_note_posts: "Generated this period",
    enterprise_note_proof: "Claim-level proof attached before publish",
    enterprise_note_vvr: "Verified Visibility Rate in target audiences",
    enterprise_note_leads: "CRM-linked and modeled influenced demand",
    enterprise_note_cac: "Directional vs. previous channel mix",
    enterprise_note_attribution: "Share of influenced pipeline with employee touch",
    enterprise_coverage_label: "Coverage",
    enterprise_coverage_title: "Proof to visibility chain",
    enterprise_filter_all: "Whole company",
    enterprise_filter_gtm: "Revenue / GTM",
    enterprise_filter_delivery: "Delivery / Ops",
    enterprise_filter_leadership: "Leadership",
    enterprise_breakdown_label: "Active team breakdown",
    enterprise_breakdown_active_posts: "active employees",
    enterprise_breakdown_posts_generated: "posts generated",
    enterprise_breakdown_proof: "proof-backed",
    enterprise_breakdown_vvr: "VVR",
    enterprise_governance_label: "Governance Status",
    enterprise_governance_title: "Policy guardrails are visible",
    enterprise_governance_1:
      "Proof required before publishing claims tied to customer or product outcomes.",
    enterprise_governance_2:
      "Manager and legal escalation only when topic risk crosses threshold.",
    enterprise_governance_3:
      "Audit trail retained per post, proof source, approver, and status.",
    enterprise_governance_4:
      "Employee keeps final publish control while the company keeps governance visibility.",
    enterprise_attr_label: "Attribution Snapshot",
    enterprise_attr_title: "Directional, not perfect",
    enterprise_attr_body:
      "Attribution here means CRM-linked and modeled influence from employee content touchpoints. It shows how employee visibility contributes to pipeline in a way leadership can actually use.",
    enterprise_flow_captured: "Work signal captured",
    enterprise_flow_proof: "Proof attached",
    enterprise_flow_approved: "Approved",
    enterprise_flow_visible: "Verified visibility",
    enterprise_scenario_scaleup_label: "Series C SaaS",
    enterprise_scenario_scaleup_company: "Northstar Cloud",
    enterprise_scenario_scaleup_description:
      "Sharwi connects product, GTM, and customer evidence into a proof-backed advocacy rollout for a scaling revenue team.",
    enterprise_scenario_scaleup_narrative_all:
      "Sharwi is converting product delivery proof into pipeline-facing visibility without asking employees to become marketers.",
    enterprise_scenario_scaleup_narrative_gtm:
      "Revenue teams are using launch and customer proof to increase trusted reach around active deals.",
    enterprise_scenario_scaleup_narrative_delivery:
      "Delivery teams can publish credible updates without exposing internal noise or rewriting work into marketing copy.",
    enterprise_scenario_scaleup_narrative_leadership:
      "Leadership gets a directional view of governance, trusted visibility, and CAC efficiency from one operating layer.",
    enterprise_scenario_scaleup_governance: "Healthy",
    enterprise_scenario_scaleup_governance_note:
      "6 escalations, 0 compliance incidents",
    enterprise_scenario_scaleup_team_gtm: "GTM",
    enterprise_scenario_scaleup_team_delivery: "Delivery",
    enterprise_scenario_scaleup_team_leadership: "Leadership",
    enterprise_scenario_scaleup_attr_1: "Employee-sourced demo requests",
    enterprise_scenario_scaleup_attr_2: "Assisted pipeline touchpoints",
    enterprise_scenario_scaleup_attr_3: "Paid retargeting overlap",
    enterprise_scenario_scaleup_attr_4: "Direct / unattributed",
    enterprise_scenario_advisory_label: "Advisory Firm",
    enterprise_scenario_advisory_company: "Aster Advisory Group",
    enterprise_scenario_advisory_description:
      "Sharwi helps experts publish client-safe insights with governance controls while keeping an executive lens on trusted visibility.",
    enterprise_scenario_advisory_narrative_all:
      "This rollout is optimized for expert credibility, not raw content volume. Trust is coming from governed proof and consistent publishing.",
    enterprise_scenario_advisory_narrative_gtm:
      "Business development sees which expert posts are opening conversations, without claiming perfect funnel attribution.",
    enterprise_scenario_advisory_narrative_delivery:
      "Subject matter experts can share client-safe insights with approval guardrails and proof traceability.",
    enterprise_scenario_advisory_narrative_leadership:
      "Leadership gets account-level signal without turning reporting into a burden.",
    enterprise_scenario_advisory_governance: "Strict",
    enterprise_scenario_advisory_governance_note:
      "Mandatory legal review on sensitive topics",
    enterprise_scenario_advisory_team_gtm: "Business Dev",
    enterprise_scenario_advisory_team_delivery: "Advisory",
    enterprise_scenario_advisory_team_leadership: "Partners",
    enterprise_scenario_advisory_attr_1: "Employee-sourced meetings",
    enterprise_scenario_advisory_attr_2: "Assisted expansion pipeline",
    enterprise_scenario_advisory_attr_3: "Event / referral overlap",
    enterprise_scenario_advisory_attr_4: "Direct / unattributed",
    enterprise_scenario_operations_label: "Distributed Ops",
    enterprise_scenario_operations_company: "Relay Logistics",
    enterprise_scenario_operations_description:
      "Sharwi turns frontline and operational proof into visible trust signals for hiring, partnerships, and revenue teams without adding reporting burden.",
    enterprise_scenario_operations_narrative_all:
      "Distributed teams are using real operational proof to create buyer trust and recruiting credibility with lightweight governance.",
    enterprise_scenario_operations_narrative_gtm:
      "Revenue teams are reusing verified field proof to warm late-stage accounts and reduce skepticism in complex deals.",
    enterprise_scenario_operations_narrative_delivery:
      "Operational leaders can surface quality, uptime, and delivery proof without writing content from scratch.",
    enterprise_scenario_operations_narrative_leadership:
      "Leadership sees how distributed trust signals support both pipeline and hiring narratives in one dashboard.",
    enterprise_scenario_operations_governance: "Managed",
    enterprise_scenario_operations_governance_note:
      "12 escalations, 1 policy hold resolved",
    enterprise_scenario_operations_team_gtm: "Revenue",
    enterprise_scenario_operations_team_delivery: "Operations",
    enterprise_scenario_operations_team_leadership: "Regional leads",
    enterprise_scenario_operations_attr_1: "Employee-sourced opportunities",
    enterprise_scenario_operations_attr_2: "Assisted pipeline touchpoints",
    enterprise_scenario_operations_attr_3: "Partner / referral overlap",
    enterprise_scenario_operations_attr_4: "Direct / unattributed",
    metrics_label: "Results",
    metrics_h2: "The numbers that move when employee visibility works.",
    metrics_sub:
      "Companies using proof-backed employee advocacy consistently see these results. Sharwi is built to make them reproducible and measurable, not left to chance.",
    metrics_m1_label: "Reach multiplier",
    metrics_m1_body:
      "More reach than brand-only distribution when employees share verified expertise in their own voice.",
    metrics_m2_label: "Conversion lift",
    metrics_m2_body:
      "Higher conversion rate when pipeline contacts have been exposed to verified employee content before outreach.",
    metrics_m3_label: "CPL reduction",
    metrics_m3_body:
      "Lower cost per lead when employee visibility is part of the acquisition mix because trust reduces friction in the funnel.",
    metrics_m4_label: "Time to results",
    metrics_m4_body:
      "Most teams see meaningful activation, governance coverage, and first business signals within 8 weeks of deployment.",
    metrics_how_title: "How Sharwi works",
    metrics_how_body:
      "Sharwi connects work capture, proof-backed publishing, and trusted reach into a single loop. Every post generates a signal. Every signal improves the next cycle. The business impact compounds.",
    metrics_lead_title: "For leadership",
    metrics_lead_body:
      'Sharwi gives leadership a cleaner narrative than "we should post more." It gives them infrastructure, governance, and a measurement model so employee visibility becomes a channel, not a campaign.',
    cta_label: "Request Demo",
    cta_h2: "Book the Sharwi walkthrough that explains the story in one meeting.",
    cta_body:
      "We will walk through the full product: the Personal Layer where professionals build verified visibility, and the Enterprise Layer where your team measures impact, manages governance, and tracks what employee content generates for the business.",
    cta_button: "Request Demo",
    cta_card1_title: "For companies",
    cta_card1_body:
      "See how Sharwi activates your team, maintains governance, and measures the business impact of employee visibility.",
    cta_card2_title: "For revenue leaders",
    cta_card2_body:
      "See how verified employee content reduces CAC, improves conversion quality, and builds pipeline without paid spend.",
    cta_card3_title: "For HR and employer brand",
    cta_card3_body:
      "See how Sharwi turns your people's real work into credible visibility that attracts talent and builds trust without asking them to become content creators.",
    footer_body:
      "Sharwi turns real work into visible reputation and measurable business impact through a Personal Layer for professionals and an Enterprise Layer for companies.",
    modal_close: "Close",
    modal_request_title: "Request a Sharwi demo",
    modal_request_body:
      "Tell us about your team and the visibility problem you want to solve, and we'll tailor the walkthrough.",
    modal_full_name: "Full name *",
    modal_company: "Company *",
    modal_role: "Role *",
    modal_email: "Work email *",
    modal_company_size: "Company or team size *",
    modal_problem: "Problem to solve *",
    modal_notes: "Optional notes",
    modal_role_founder: "Founder / CEO",
    modal_role_advisor: "Advisor",
    modal_role_marketing: "Marketing",
    modal_role_revenue: "Revenue / GTM",
    modal_role_people: "People / Talent",
    modal_role_operations: "Operations",
    modal_role_data: "Data / Analytics",
    modal_role_transformation: "Digital Transformation",
    modal_role_other: "Other",
    modal_size_solo: "Solo / team",
    modal_problem_advocacy: "Proof-backed employee advocacy",
    modal_problem_governance: "Governance and approvals",
    modal_problem_visibility: "Visibility into trusted reach",
    modal_problem_cac: "Directional CAC improvement",
    modal_problem_attribution: "Attribution clarity",
    modal_problem_reporting: "Executive reporting",
    modal_problem_overview: "Product overview",
    modal_error_full_name: "Full name is required",
    modal_error_company: "Company is required",
    modal_error_role: "Role is required",
    modal_error_email: "Work email is required",
    modal_error_email_valid: "Enter a valid email",
    modal_error_company_size: "Company size is required",
    modal_error_problem: "Choose the main problem to solve",
    modal_error_submit:
      "We couldn't save the request right now. Please try again.",
    modal_submit_idle: "Request Demo",
    modal_submit_loading: "Sending...",
    modal_success_title: "Demo request received",
    modal_success_body:
      "We'll use this context to tailor the next Sharwi enterprise walkthrough.",
    use_case_example_post: "Example Post",
    use_case_key_benefits: "Key Benefits",

    lang_label: "EN",
  },
  es: {
    nav_problem: "Problema",
    nav_how_it_works: "Cómo funciona",
    nav_for_professionals: "Capa Personal",
    nav_for_companies: "Capa Enterprise",
    nav_enterprise: "Resultados",
    nav_request_demo: "Pedir demo",

    hero_label: "Infraestructura de visibilidad confiable para equipos modernos",
    hero_h1_line1: "Convertí trabajo real en",
    hero_h1_line2: "reputación visible e impacto de negocio medible.",
    hero_sub:
      "Sharwi es infraestructura, no otra herramienta de contenido. Captura trabajo real, mantiene la evidencia adjunta, redacta con IA, deja el control en manos humanas y les da a las empresas una forma más clara de medir visibilidad confiable.",
    hero_cta_primary: "Pedir demo",
    hero_cta_secondary: "Ver el loop del producto",
    hero_signal1_label: "Modelo de producto",
    hero_signal1_value: "Capa Personal + Capa Enterprise",
    hero_signal2_label: "Flujo",
    hero_signal2_value: "Captura, evidencia, borrador, control e impacto",
    hero_signal3_label: "Tiempo a resultados",
    hero_signal3_value: "Diseñado para generar impacto en semanas, no trimestres",
    hero_panel_title: "Loop de infraestructura Sharwi",
    hero_panel_sub: "Reputación respaldada por evidencia para personas y empresas",
    hero_panel_badge: "Producto en vivo",
    hero_panel_step1_title: "Capturá el trabajo",
    hero_panel_step1_body:
      "Tomá señales de commits, documentos, tickets, notas de CRM, lanzamientos y logros.",
    hero_panel_step2_title: "Adjuntá evidencia",
    hero_panel_step2_body:
      "Mantené el material fuente, las aprobaciones y la prueba vinculados a cada historia candidata.",
    hero_panel_step3_title: "Redactá con IA, publicá con control humano",
    hero_panel_step3_body:
      "Sharwi redacta la narrativa, pero el profesional o revisor sigue controlando qué sale.",
    hero_panel_outcome1_label: "Resultado personal",
    hero_panel_outcome1_body:
      "Reputación visible construida desde contribuciones reales, no actuación.",
    hero_panel_outcome2_label: "Resultado enterprise",
    hero_panel_outcome2_body:
      "Visibilidad confiable de empleados ligada a gobernanza e impacto medible.",

    problem_label: "Problema",
    problem_h2:
      "La expertise, la advocacy y la medición todavía se tratan como problemas separados.",
    problem_sub:
      "Esa fragmentación hace que grandes profesionales sigan invisibles, que la employee advocacy se estanque y que los equipos de liderazgo no logren justificar la inversión. Sharwi conecta todo el sistema.",
    problem_card1_title: "El trabajo importante queda invisible",
    problem_card1_body:
      "La mayor parte del valor que crea la gente vive dentro de sistemas de trabajo, no en narrativas públicas.",
    problem_card2_title: "La advocacy depende de los pocos más ruidosos",
    problem_card2_body:
      "Los programas se rompen cuando la visibilidad depende de confianza, tiempo libre o prompts genéricos.",
    problem_card3_title: "La IA sin evidencia baja la confianza",
    problem_card3_body:
      "Compradores, líderes y equipos de compliance necesitan pruebas, no claims pulidos desconectados de la realidad.",
    problem_card4_title: "Liderazgo todavía lucha por probar el ROI",
    problem_card4_body:
      "Las impresiones son fáciles de contar. El impacto de negocio es mucho más difícil de defender sin la capa correcta de medición.",
    problem_callout:
      "Sharwi resuelve esto como infraestructura: capturá el trabajo, adjuntá la prueba, redactá la historia, mantené el control humano y medí el resultado en la Capa Personal y la Capa Enterprise.",

    how_label: "Cómo funciona Sharwi",
    how_h2: "Un loop de producto para credibilidad, control y ROI.",
    how_sub:
      "Sharwi no inventa historias. Operacionaliza la prueba que ya existe dentro del trabajo real y la vuelve útil tanto para profesionales como para equipos enterprise.",
    how_step1_title: "Capturá el trabajo",
    how_step1_body:
      "Tomá señales de los sistemas donde el trabajo ya ocurre: commits, docs, notas de CRM, tickets, lanzamientos y resultados.",
    how_step2_title: "Adjuntá evidencia",
    how_step2_body:
      "Mantené la prueba, los links de fuente, aprobaciones y contexto de soporte vinculados a cada historia candidata.",
    how_step3_title: "Borrador con IA",
    how_step3_body:
      "Sharwi convierte trabajo en bruto en un borrador narrativo creíble, adaptado al profesional y al caso de uso.",
    how_step4_title: "Control humano",
    how_step4_body:
      "El usuario, manager o revisor sigue aprobando, editando o rechazando antes de que algo se publique.",
    how_step5_title: "Medí el impacto",
    how_step5_body:
      "Seguí visibilidad confiable, publicaciones verificadas, reuniones influenciadas y señales de negocio.",
    how_why_title: "Por qué importa",
    how_why_body:
      "La evidencia se mantiene adjunta durante todo el flujo, lo que significa más confianza, mejor gobernanza y una manera más clara de medir resultados de negocio después.",

    prof_label: "Capa Personal",
    prof_h2_line1: "Dale a los profesionales un sistema que haga",
    prof_h2_highlight: "visible la contribución real",
    prof_sub:
      "La Capa Personal ayuda a expertos a capturar trabajo valioso, mantener evidencia adjunta, aprobar lo que se comparte y construir una reputación que les pertenece.",
    prof_highlight_lead: "La mayoría de los expertos no necesita más prompts.",
    prof_highlight_body:
      "Necesitan un camino más rápido desde trabajo real hacia visibilidad respaldada por evidencia, sin convertirse en creadores full-time.",
    prof_card1_title: "Tu trabajo, por fin visible",
    prof_card1_body:
      "Sharwi captura contribuciones valiosas y las convierte en reputación respaldada por evidencia, en lugar de dejarlas enterradas en sistemas internos.",
    prof_card2_title: "Reputación construida sobre sustancia",
    prof_card2_body:
      "Sin vanity metrics y sin performance theater. La historia empieza en lo que realmente lanzaste, resolviste o influenciaste.",
    prof_card3_title: "Vos conservás la decisión final",
    prof_card3_body:
      "Sharwi propone el borrador, pero el profesional sigue revisando, editando, aprobando o rechazando antes de que algo se publique.",
    prof_card4_title: "Portable entre roles y empresas",
    prof_card4_body:
      "La capa de reputación está pensada para acumularse con tu carrera, en lugar de quedar atrapada dentro del programa de contenido de una sola empresa.",
    prof_card5_title: "IA alineada con tu contexto",
    prof_card5_body:
      "Trabajo técnico, comercial u operativo puede traducirse en una narrativa que suene creíble para el rol que está detrás.",
    prof_card6_title: "Diseñado para profesionales reales",
    prof_card6_body:
      "Sharwi está hecho para personas cuyo trabajo importa más que su disposición a autopromocionarse online cada semana.",
    prof_experience_title: "Lo que vive el profesional",
    prof_step1_title: "Capturá el trabajo",
    prof_step1_body:
      "Registralo rápido o conectá los sistemas donde el trabajo ya ocurrió.",
    prof_step2_title: "Revisá el borrador",
    prof_step2_body:
      "Sharwi redacta una historia con la evidencia todavía adjunta y lista para revisión.",
    prof_step3_title: "Aprobá lo que importa",
    prof_step3_body:
      "Solo avanzan las historias que vale la pena compartir. Nada se publica automáticamente.",
    prof_cta: "Pedir demo",

    demo_label: "Demo Mobile Embebida",
    demo_h2:
      "Mostrá la experiencia del producto donde Sharwi empieza: en las manos del profesional.",
    demo_body:
      "Esta es la Capa Personal de Sharwi. El profesional registra en qué trabajó, elige un tono y obtiene un borrador respaldado por evidencia en segundos. Lo revisa, edita si quiere y publica. Ese es el loop completo y sucede directamente desde su teléfono.",
    demo_info1_title: "Capturá en segundos",
    demo_info1_body: "Registrá trabajo rápido o traelo desde sistemas conectados.",
    demo_info2_title: "Mantené la evidencia adjunta",
    demo_info2_body: "La historia se mantiene anclada en material fuente y contexto.",
    demo_info3_title: "Aprobá antes de que salga",
    demo_info3_body: "El control humano se mantiene incluso cuando la IA redacta la primera versión.",
    demo_pill1: "Registrá trabajo en segundos",
    demo_pill2: "Borrador con IA y evidencia",
    demo_pill3: "Vos aprobás antes de que salga algo",
    demo_cta_primary: "Probar la app",
    demo_cta_secondary: "Pedir demo guiada",
    demo_iframe_title: "Demo de la app mobile de Sharwi",

    comp_label: "Capa Enterprise",
    comp_h2_line1: "Dale a las empresas un sistema para",
    comp_h2_highlight: "visibilidad creíble de empleados",
    comp_sub:
      "La Capa Enterprise es el sistema que tus equipos de marketing, RRHH y revenue estaban necesitando. Activa a tus expertos, mantiene la gobernanza y le da al liderazgo una vista clara de lo que la visibilidad de empleados realmente produce para el negocio.",
    comp_card1_title: "Se conecta a sistemas existentes",
    comp_card1_body:
      "Sharwi está diseñado para montarse sobre las herramientas donde los equipos ya trabajan, lo que mantiene baja la fricción de activación.",
    comp_card2_title: "Activa a más que los pocos más ruidosos",
    comp_card2_body:
      "El sistema ayuda a que participen expertos silenciosos empezando desde el trabajo que ya hacen, en lugar de pedirles que primero se vuelvan creadores.",
    comp_card3_title: "La gobernanza es parte del producto",
    comp_card3_body:
      "Flujos de aprobación, trazas de evidencia y visibilidad de revisión hacen que el despliegue sea más fácil de gestionar para liderazgo.",
    comp_card4_title: "La medición va más allá de la vanidad",
    comp_card4_body:
      "Sharwi se estructura alrededor de publicaciones verificadas, visibilidad confiable, reuniones influenciadas y señal direccional de pipeline.",
    comp_card5_title: "Diseñado para conversaciones de CAC",
    comp_card5_body:
      "La Capa Enterprise le da al liderazgo un camino más claro para discutir alcance confiable, calidad de conversión y eficiencia de benchmark.",
    comp_card6_title: "Rápido de implementar",
    comp_card6_body:
      "Sharwi se conecta a tus sistemas existentes en días, no meses. Tu equipo empieza a generar visibilidad verificada sin cambiar cómo trabaja.",
    comp_start_label: "Cómo empieza",
    comp_start_sub: "Sharwi está diseñado para entregar resultados reales rápido.",
    comp_start_metric1_label: "Empleados activados",
    comp_start_metric2_label: "Sistema fuente para empezar",
    comp_start_metric3_label: "Semanas a primeros resultados",
    comp_start_footer:
      "Empezá con un equipo, una integración y una línea de base clara de medición. Escalá una vez que la señal esté confirmada.",
    comp_company_gets_title: "Lo que obtiene la empresa",
    comp_company_gets_1:
      "Infraestructura de visibilidad verificada en lugar de otra librería de contenido",
    comp_company_gets_2:
      "Lógica de atribución desde la historia hasta la reunión y el toque direccional en pipeline",
    comp_company_gets_3:
      "Flujos de aprobación y auditabilidad para claims sensibles",
    comp_company_gets_4:
      "Un dashboard con métricas de activación y publicaciones verificadas",
    comp_company_gets_5:
      "Una narrativa interna más fuerte que pedirle a empleados que publiquen más",
    comp_employee_keeps_title: "Lo que conserva el empleado",
    comp_employee_keeps_1: "El profesional mantiene la decisión final de publicación",
    comp_employee_keeps_2:
      "Su reputación se acumula en lugar de desaparecer dentro de un solo empleador",
    comp_employee_keeps_3:
      "El sistema parte del trabajo real, no del performance theater",
    comp_employee_keeps_4: "La evidencia permanece adjunta durante todo el flujo",
    comp_employee_keeps_5: "La IA asiste la historia sin reemplazar la autoría",
    comp_cta: "Pedir demo",
    tech_label: "Arquitectura de IA · Por qué importa",
    tech_h2: "No IA generativa. IA con evidencia.",
    tech_sub:
      "Sharwi usa RAG — Retrieval-Augmented Generation — para redactar contenido anclado a evidencia de trabajo real. El resultado no es una alucinación. Es tu trabajo real, escrito en tu voz.",
    tech_generic_title: "Herramientas de IA genérica",
    tech_generic_node1: "Prompt o tema",
    tech_generic_node2: "El LLM genera",
    tech_generic_node3: "Contenido genérico",
    tech_generic_body:
      "Sin evidencia. Sin contexto. Sin conexión con trabajo real. Contenido que suena profesional pero no se puede verificar.",
    tech_generic_bullet1: "Riesgo de alucinación — contenido no basado en hechos",
    tech_generic_bullet2: "Sin prueba — no sobrevive una revisión de compliance",
    tech_generic_bullet3: "Voz genérica — pierde autenticidad a escala",
    tech_rag_title: "Modelo RAG de Sharwi",
    tech_rag_node1: "Señal de trabajo real",
    tech_rag_node1_sub: "PR, ticket, nota de CRM, doc, resultado",
    tech_rag_node2: "Recuperación de evidencia",
    tech_rag_node2_sub: "Material fuente vinculado",
    tech_rag_node3: "Ventana de contexto RAG",
    tech_rag_node3_sub: "Trabajo + evidencia + contexto de rol",
    tech_rag_node4: "Borrador fundamentado",
    tech_rag_node4_sub: "Contenido anclado a hechos reales",
    tech_rag_node5: "Aprobación humana",
    tech_rag_node5_sub: "El profesional revisa antes de publicar",
    tech_rag_bullet1: "Cero alucinación — cada claim vincula a una fuente",
    tech_rag_bullet2: "Listo para gobernanza — evidencia adjunta automáticamente",
    tech_rag_bullet3: "Voz auténtica — basada en tu trabajo real, no en una plantilla",
    tech_dataset_title: "El dataset que mejora esto con el tiempo",
    tech_dataset_body:
      "Cada post respaldado por evidencia que Sharwi genera se convierte en una señal de entrenamiento. Qué tipo de trabajo, para qué rol, en qué industria, generó qué engagement y qué resultado de pipeline. Ningún modelo genérico de IA tiene esto. Está construido exclusivamente desde trabajo profesional real — y se acumula con cada nueva empresa que usa Sharwi.",
    enterprise_label: "Demo del Dashboard Enterprise",
    enterprise_h2: "El centro de comando para visibilidad verificada de empleados.",
    enterprise_sub:
      "Vista en tiempo real de lo que tu equipo publica, qué está verificado y qué está generando pipeline. Todo lo que liderazgo necesita ver sobre el impacto de la visibilidad de empleados en un solo lugar.",
    enterprise_cta: "Pedir demo",
    enterprise_demo_account: "Cuenta demo",
    enterprise_range_30d: "Últimos 30 días",
    enterprise_range_90d: "Últimos 90 días",
    enterprise_overview_title: "Resumen de la empresa",
    enterprise_overview_body:
      "Cómo está funcionando Sharwi en esta organización: contenido verificado, controles de gobernanza e impacto de negocio en una sola vista.",
    enterprise_card_active: "Empleados activos",
    enterprise_card_posts: "Posts generados",
    enterprise_card_proof: "Tasa con evidencia",
    enterprise_card_vvr: "Verified Visibility Rate (VVR)",
    enterprise_card_leads: "Leads influenciados",
    enterprise_card_cac: "Reducción de CAC",
    enterprise_card_governance: "Estado de gobernanza",
    enterprise_card_attribution: "Snapshot de atribución",
    enterprise_note_active: "Activos en este período",
    enterprise_note_posts: "Generados en este período",
    enterprise_note_proof: "Prueba a nivel claim adjunta antes de publicar",
    enterprise_note_vvr: "Verified Visibility Rate en audiencias objetivo",
    enterprise_note_leads: "Demanda influenciada vinculada al CRM y modelada",
    enterprise_note_cac: "Direccional vs. mix previo de canales",
    enterprise_note_attribution: "Porción del pipeline influenciado con toque de empleado",
    enterprise_coverage_label: "Cobertura",
    enterprise_coverage_title: "Cadena de prueba a visibilidad",
    enterprise_filter_all: "Toda la empresa",
    enterprise_filter_gtm: "Revenue / GTM",
    enterprise_filter_delivery: "Delivery / Ops",
    enterprise_filter_leadership: "Liderazgo",
    enterprise_breakdown_label: "Desglose de equipos activos",
    enterprise_breakdown_active_posts: "empleados activos",
    enterprise_breakdown_posts_generated: "posts generados",
    enterprise_breakdown_proof: "con evidencia",
    enterprise_breakdown_vvr: "VVR",
    enterprise_governance_label: "Estado de gobernanza",
    enterprise_governance_title: "Los guardrails de política son visibles",
    enterprise_governance_1:
      "Se requiere prueba antes de publicar claims ligados a resultados de clientes o producto.",
    enterprise_governance_2:
      "Escalación a manager y legal solo cuando el riesgo del tema supera el umbral.",
    enterprise_governance_3:
      "Se retiene trazabilidad por post, fuente de prueba, aprobador y estado.",
    enterprise_governance_4:
      "El empleado conserva el control final de publicación mientras la empresa mantiene visibilidad de gobernanza.",
    enterprise_attr_label: "Snapshot de atribución",
    enterprise_attr_title: "Direccional, no perfecto",
    enterprise_attr_body:
      "Atribución acá significa influencia vinculada al CRM y modelada desde puntos de contacto de contenido de empleados. Muestra cómo la visibilidad de empleados contribuye al pipeline de una forma que liderazgo realmente puede usar.",
    enterprise_flow_captured: "Señal de trabajo capturada",
    enterprise_flow_proof: "Prueba adjunta",
    enterprise_flow_approved: "Aprobado",
    enterprise_flow_visible: "Visibilidad verificada",
    enterprise_scenario_scaleup_label: "SaaS Serie C",
    enterprise_scenario_scaleup_company: "Northstar Cloud",
    enterprise_scenario_scaleup_description:
      "Sharwi conecta evidencia de producto, GTM y clientes en un despliegue de advocacy respaldado por evidencia para un equipo de revenue en escala.",
    enterprise_scenario_scaleup_narrative_all:
      "Sharwi está convirtiendo prueba de delivery de producto en visibilidad orientada a pipeline sin pedirles a los empleados que se vuelvan marketers.",
    enterprise_scenario_scaleup_narrative_gtm:
      "Los equipos de revenue están usando pruebas de lanzamientos y clientes para aumentar alcance confiable alrededor de deals activos.",
    enterprise_scenario_scaleup_narrative_delivery:
      "Los equipos de delivery pueden publicar actualizaciones creíbles sin exponer ruido interno ni reescribir trabajo como copy de marketing.",
    enterprise_scenario_scaleup_narrative_leadership:
      "Liderazgo obtiene una vista direccional de gobernanza, visibilidad confiable y eficiencia de CAC desde una sola capa operativa.",
    enterprise_scenario_scaleup_governance: "Saludable",
    enterprise_scenario_scaleup_governance_note:
      "6 escalaciones, 0 incidentes de compliance",
    enterprise_scenario_scaleup_team_gtm: "GTM",
    enterprise_scenario_scaleup_team_delivery: "Delivery",
    enterprise_scenario_scaleup_team_leadership: "Liderazgo",
    enterprise_scenario_scaleup_attr_1: "Demo requests originados por empleados",
    enterprise_scenario_scaleup_attr_2: "Touchpoints de pipeline asistidos",
    enterprise_scenario_scaleup_attr_3: "Solapamiento con paid retargeting",
    enterprise_scenario_scaleup_attr_4: "Directo / sin atribución",
    enterprise_scenario_advisory_label: "Firma de advisory",
    enterprise_scenario_advisory_company: "Aster Advisory Group",
    enterprise_scenario_advisory_description:
      "Sharwi ayuda a expertos a publicar insights seguros para clientes con controles de gobernanza, manteniendo a la vez una mirada ejecutiva sobre visibilidad confiable.",
    enterprise_scenario_advisory_narrative_all:
      "Este despliegue está optimizado para credibilidad experta, no para volumen bruto de contenido. La confianza viene de prueba gobernada y publicación consistente.",
    enterprise_scenario_advisory_narrative_gtm:
      "Business development ve qué posts de expertos están abriendo conversaciones, sin reclamar atribución perfecta del funnel.",
    enterprise_scenario_advisory_narrative_delivery:
      "Los subject matter experts pueden compartir insights seguros para clientes con guardrails de aprobación y trazabilidad de pruebas.",
    enterprise_scenario_advisory_narrative_leadership:
      "Liderazgo obtiene señal a nivel cuenta sin convertir el reporting en una carga.",
    enterprise_scenario_advisory_governance: "Estricto",
    enterprise_scenario_advisory_governance_note:
      "Revisión legal obligatoria en temas sensibles",
    enterprise_scenario_advisory_team_gtm: "Business Dev",
    enterprise_scenario_advisory_team_delivery: "Advisory",
    enterprise_scenario_advisory_team_leadership: "Partners",
    enterprise_scenario_advisory_attr_1: "Reuniones originadas por empleados",
    enterprise_scenario_advisory_attr_2: "Pipeline de expansión asistido",
    enterprise_scenario_advisory_attr_3: "Solapamiento con eventos / referidos",
    enterprise_scenario_advisory_attr_4: "Directo / sin atribución",
    enterprise_scenario_operations_label: "Operaciones distribuidas",
    enterprise_scenario_operations_company: "Relay Logistics",
    enterprise_scenario_operations_description:
      "Sharwi convierte prueba operativa y de frontline en señales visibles de confianza para hiring, partnerships y equipos de revenue sin agregar carga de reporting.",
    enterprise_scenario_operations_narrative_all:
      "Equipos distribuidos están usando prueba operativa real para crear confianza con compradores y credibilidad de recruiting con gobernanza liviana.",
    enterprise_scenario_operations_narrative_gtm:
      "Los equipos de revenue están reutilizando prueba verificada de campo para calentar cuentas late-stage y reducir escepticismo en deals complejos.",
    enterprise_scenario_operations_narrative_delivery:
      "Líderes operativos pueden mostrar prueba de calidad, uptime y delivery sin escribir contenido desde cero.",
    enterprise_scenario_operations_narrative_leadership:
      "Liderazgo ve cómo señales distribuidas de confianza apoyan tanto pipeline como narrativas de hiring en un solo dashboard.",
    enterprise_scenario_operations_governance: "Gestionado",
    enterprise_scenario_operations_governance_note:
      "12 escalaciones, 1 hold de política resuelto",
    enterprise_scenario_operations_team_gtm: "Revenue",
    enterprise_scenario_operations_team_delivery: "Operaciones",
    enterprise_scenario_operations_team_leadership: "Líderes regionales",
    enterprise_scenario_operations_attr_1: "Oportunidades originadas por empleados",
    enterprise_scenario_operations_attr_2: "Touchpoints de pipeline asistidos",
    enterprise_scenario_operations_attr_3: "Solapamiento con partners / referidos",
    enterprise_scenario_operations_attr_4: "Directo / sin atribución",
    metrics_label: "Resultados",
    metrics_h2: "Los números que se mueven cuando la visibilidad de empleados funciona.",
    metrics_sub:
      "Las empresas que usan employee advocacy respaldado por evidencia ven estos resultados de forma consistente. Sharwi está construido para volverlos reproducibles y medibles, no dejarlos librados al azar.",
    metrics_m1_label: "Multiplicador de alcance",
    metrics_m1_body:
      "Más alcance que la distribución solo de marca cuando los empleados comparten expertise verificado con su propia voz.",
    metrics_m2_label: "Mejora de conversión",
    metrics_m2_body:
      "Mayor tasa de conversión cuando los contactos del pipeline estuvieron expuestos a contenido verificado de empleados antes del outreach.",
    metrics_m3_label: "Reducción de CPL",
    metrics_m3_body:
      "Menor costo por lead cuando la visibilidad de empleados forma parte del mix de adquisición porque la confianza reduce fricción en el funnel.",
    metrics_m4_label: "Tiempo a resultados",
    metrics_m4_body:
      "La mayoría de los equipos ve activación significativa, cobertura de gobernanza y primeras señales de negocio dentro de 8 semanas de implementación.",
    metrics_how_title: "Cómo funciona Sharwi",
    metrics_how_body:
      "Sharwi conecta captura de trabajo, publicación respaldada por evidencia y alcance confiable en un único loop. Cada post genera una señal. Cada señal mejora el siguiente ciclo. El impacto de negocio se compone.",
    metrics_lead_title: "Para liderazgo",
    metrics_lead_body:
      'Sharwi le da al liderazgo una narrativa más limpia que "deberíamos postear más." Les da infraestructura, gobernanza y un modelo de medición para que la visibilidad de empleados se convierta en un canal, no en una campaña.',
    cta_label: "Pedir demo",
    cta_h2: "Agendá el recorrido por Sharwi que explica toda la historia en una reunión.",
    cta_body:
      "Vamos a recorrer el producto completo: la Capa Personal donde los profesionales construyen visibilidad verificada, y la Capa Enterprise donde tu equipo mide impacto, gestiona gobernanza y sigue qué genera para el negocio el contenido de empleados.",
    cta_button: "Pedir demo",
    cta_card1_title: "Para empresas",
    cta_card1_body:
      "Mirá cómo Sharwi activa a tu equipo, mantiene la gobernanza y mide el impacto de negocio de la visibilidad de empleados.",
    cta_card2_title: "Para líderes de revenue",
    cta_card2_body:
      "Mirá cómo el contenido verificado de empleados reduce CAC, mejora la calidad de conversión y construye pipeline sin paid spend.",
    cta_card3_title: "Para RRHH y employer brand",
    cta_card3_body:
      "Mirá cómo Sharwi convierte el trabajo real de tu gente en visibilidad creíble que atrae talento y genera confianza sin pedirles que se conviertan en creadores de contenido.",
    footer_body:
      "Sharwi convierte trabajo real en reputación visible e impacto de negocio medible mediante una Capa Personal para profesionales y una Capa Enterprise para empresas.",
    modal_close: "Cerrar",
    modal_request_title: "Pedir una demo de Sharwi",
    modal_request_body:
      "Contanos sobre tu equipo y el problema de visibilidad que querés resolver, y vamos a adaptar el recorrido.",
    modal_full_name: "Nombre completo *",
    modal_company: "Empresa *",
    modal_role: "Rol *",
    modal_email: "Email laboral *",
    modal_company_size: "Tamaño de empresa o equipo *",
    modal_problem: "Problema a resolver *",
    modal_notes: "Notas opcionales",
    modal_role_founder: "Founder / CEO",
    modal_role_advisor: "Advisor",
    modal_role_marketing: "Marketing",
    modal_role_revenue: "Revenue / GTM",
    modal_role_people: "People / Talent",
    modal_role_operations: "Operations",
    modal_role_data: "Data / Analytics",
    modal_role_transformation: "Digital Transformation",
    modal_role_other: "Other",
    modal_size_solo: "Solo / equipo",
    modal_problem_advocacy: "Employee advocacy respaldado por evidencia",
    modal_problem_governance: "Gobernanza y aprobaciones",
    modal_problem_visibility: "Visibilidad sobre alcance confiable",
    modal_problem_cac: "Mejora direccional de CAC",
    modal_problem_attribution: "Claridad de atribución",
    modal_problem_reporting: "Reporting ejecutivo",
    modal_problem_overview: "Vista general del producto",
    modal_error_full_name: "El nombre completo es obligatorio",
    modal_error_company: "La empresa es obligatoria",
    modal_error_role: "El rol es obligatorio",
    modal_error_email: "El email laboral es obligatorio",
    modal_error_email_valid: "Ingresá un email válido",
    modal_error_company_size: "El tamaño de empresa es obligatorio",
    modal_error_problem: "Elegí el problema principal a resolver",
    modal_error_submit:
      "No pudimos guardar la solicitud ahora. Probá de nuevo.",
    modal_submit_idle: "Pedir demo",
    modal_submit_loading: "Enviando...",
    modal_success_title: "Solicitud de demo recibida",
    modal_success_body:
      "Vamos a usar este contexto para adaptar el próximo recorrido enterprise de Sharwi.",
    use_case_example_post: "Post de ejemplo",
    use_case_key_benefits: "Beneficios clave",

    lang_label: "ES",
  },
} as const

type TranslationKey = keyof typeof translations.en

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => translations.en[key],
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  const t = (key: TranslationKey): string => {
    return translations[locale][key] ?? translations.en[key] ?? key
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
