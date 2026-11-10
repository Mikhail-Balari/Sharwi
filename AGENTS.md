# SHARWI — standing instructions for coding agents

## Mission and product boundary
Finish the **existing Sharwi monorepo** as a deployable B2B2C product. Sharwi converts real work -> evidence -> AI-assisted, evidence-grounded professional story -> human review/approval -> measured enterprise impact. The worker owns a portable professional profile; the organization governs what internal information can be used. This is **not** a generic social network, resume marketplace, or industrial-only application.

The immediate commercial wedge is **verified employee-led advocacy for B2B companies** (Marketing / RevOps / People stakeholders). Worker discovery, jobs and reputation scoring already appear in the repository; preserve working code, but do not prioritize those extensions ahead of an end-to-end evidence/approval/measurement pilot. The source documentation is not fully aligned: read `docs/AUTONOMOUS_PRODUCT_CHARTER.md` for delivery priority, and consult existing `docs/product_spec.md`, `docs/product_analysis.md`, `docs/full_platform_plan.md` and `docs/system_architecture.md` before altering their respective domains.

## Existing architecture — do not rebuild
- Root: Next.js 15 landing and enterprise demo in `app/`, `components/`, `lib/`.
- `sharwi-app/`: Expo 54 / React Native worker-facing mobile app.
- `sharwi-backend/`: Express, TypeScript and PostgreSQL; existing JWT auth and endpoints.
- NPM workspaces and `package-lock.json` at repository root.
- Vercel currently hosts the landing. **The backend and mobile app must not be assumed deployed.**
- `lib/supabase.ts` currently includes a localStorage lead fallback. Never describe this as durable enterprise lead storage.

## Autonomous operating loop
1. Inspect the actual code, GitHub issues and CI results relevant to your task. Report factual status, not desired status.
2. Select ONE highest-impact unblocked item from `docs/AUTONOMOUS_ROADMAP.md`, or a critical regression. Write a bounded acceptance test before coding.
3. Implement a small vertical slice, reusing existing components and APIs. Delegate independent work to specialist subagents when the runtime supports it; see `ops/agents/`. Never have agents concurrently modify the same files.
4. Run relevant checks, inspect failures, repair and retest. Do not mark anything done merely because code compiled.
5. Request independent review where available (security, authorization, evidence grounding and test gaps).
6. Submit an evidence-backed PR. Do not autonomously merge to `main`. Update roadmap/status only in PRs, preserving the historical record.
7. After integration, select the next unblocked slice. If a missing credential or product decision blocks progress, work on another safe task and record the blocker.

## Mandatory domain guarantees
- Clear states for unverified / verified / disputed evidence and claims.
- No invented evidence, synthetic proof, fictional provider-native responses or unsupported ROI/uniqueness claims. Label demo data clearly.
- **Human consent before any external publication**; never auto-post to LinkedIn or disclose corporate/internal source text.
- Cross-tenant authorization is enforced server-side; never trust a client-provided organization ID alone. Respect private/portable data boundaries.
- Event/analytics tracking must be disclosed, minimized, consent-aware where needed, and exclude secrets/PII from telemetry.
- Treat credentials and internal enterprise records as confidential. Never copy them into code, logs, PRs or prompts.
- Keep production, paid resources, external messaging, third-party integrations and destructive database operations behind explicit authorization.

## Required engineering gates
- `npm ci` from root when dependencies change; commit lockfile.
- `npm run build:backend`, `npm run typecheck:mobile`, `npm run build` when relevant; CI repeats all three.
- Add or improve automated tests for behavior, auth/tenancy, API contracts and failure paths. Verify a real DB when claiming persistence.
- No fabricated screenshots, test runs, metrics, deployment states, commits or external service integrations.
- Respect root and per-package scoped `AGENTS.md`. Keep architecture decisions documented in the task PR.
- For risky changes: provide rollback/migration notes. Production deploy requires separate explicit authorization, not just green CI.

## Definition of done
A task is DONE only with changed files, passing checks, relevant test evidence, security/tenant review where applicable, clear user-visible behavior, and a PR/commit link. A live feature additionally requires staging smoke testing. An MVP is complete only when capture/evidence/draft/approval/measure work end to end with persistence, permissions and deployment verified.

## Communication
Be concise and factual. Report: completed, tests (exact commands/results), open risks, next item, only approvals strictly required. Do not ask the founder to act as an intermediary between tools. When blocked, choose a different safe backlog item instead of asking open-ended questions.
