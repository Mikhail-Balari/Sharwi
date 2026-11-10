# Sharwi — operating product charter (2026-11-10)

**Status:** delivery priority for agents, not a claim that features already exist. Source: Sharwi pitch-deck and MVP architecture PDFs provided to the team, reconciled with the repository's existing docs.

## What Sharwi is
B2B2C evidence-backed professional visibility:
1. Capture a work moment manually or from an authorized system.
2. Attach/protect source evidence with provenance and claim-level traceability.
3. Suggest an AI-generated professional story tailored to a worker's role, strictly grounded in authorized evidence.
4. Worker edits/rejects/approves; optional enterprise policy approval.
5. Distribute only via explicit human action, then measure participation, proof-backed content and consent-aware UTM conversion proxies.
6. Keep a portable worker-owned reputation profile without retaining restricted enterprise data.

## Primary paid buyer / first wedge
Marketing/RevOps owners of B2B employee-advocacy programs, with People/Employer Brand as important stakeholder. Workers are the active end users. The first pilot is not a talent marketplace launch. The product should support professional roles across operations, engineering, product, design, consulting, sales and marketing.

## Product boundaries
- A job board, broad discovery marketplace, gamified feed or universal reputation score is NOT the first pilot's core deliverable. Preserve existing prototype screens and schemas; defer new expansion unless needed for the pilot.
- Do not shift Sharwi into an AI posting factory, an industrial-only product or a social network.
- LinkedIn API publishing, Jira, GitHub and CRM connectors are **candidate integrations** until independently verified in code and live tests.
- Revenue/CAC impact is a hypothesis to measure, not a guaranteed outcome. Published benchmarks and illustrative projections in decks must be source-checked, marked illustrative or removed before sales use.
- No guarantee of source-data portability across employers: export only worker-owned or explicitly approved data; company permissions override access to corporate source material.

## MVP acceptance journey
As (a) company admin, (b) worker and (c) reviewer, across two test tenants:
- Company admin creates workspace, invites worker and sets policy/visibility limits.
- Worker authenticates and logs a real manual work moment with evidence URL or permitted file.
- Worker asks for a draft; generated claims are linked to evidence and unsupported claims are blocked or marked.
- Worker edits and approves; reviewer can approve/reject when policy requires it; actions auditable.
- Worker exports/copies content only by explicit action.
- Enterprise dashboard reports accurate active participants, proof-backed rate, approved drafts, time-to-draft and a **clearly labeled** tracked-click/UTM proxy where available.
- Worker can view their profile, and leaving an organization removes private-source access while preserving only permissible portable history.
- Data persists on restart, authorization is enforced, and tests confirm users cannot cross tenant boundaries.

## Pilot commercial readiness
A repeatable staging + production deployment, auth/tenant isolation, permissions, audit logs, data backup/recovery, secret hygiene, monitoring, clear demo-vs-live labels, and a verifiable 8-week pilot measurement plan. Pricing from pitch materials remains a proposal, not validated customer willingness to pay.

## Resolving competing docs
The repo's `docs/product_spec.md` also describes recruiting/search, jobs, reviews and scoring. Those are possible later extensions, not permission to abandon the first B2B advocacy/evidence loop. Preserve the implemented functionality; do not erase code or rewrite existing docs. Log substantial product tradeoffs as decisions for the owner.
