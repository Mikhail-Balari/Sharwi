# Sharwi — prioritized autonomous engineering backlog

This is a **task list**, not a feature-completion claim. Each slice needs its own test evidence and PR. Select the highest unblocked item; fix critical security or broken main CI first.

| ID | Priority | Slice | Acceptance evidence |
|---|---|---|---|
| S-000 | P0 | Establish reproducible CI for Next.js landing, Expo typecheck and Express backend | 3 commands pass on clean runner; failure surfaced |
| S-001 | P0 | Audit and fix demo lead persistence | Test submission stored server-side and queryable; no false-success localStorage path; consent/privacy review |
| S-002 | P0 | Backend smoke test with real PostgreSQL | Docker migration, health, register/login, authenticated read and restart persistence proven |
| S-003 | P0 | Cross-tenant authorization contract and negative tests | Other tenant's data inaccessible across API routes |
| S-004 | P0 | App-to-API environment configuration and auth correctness | Login/register/profile with durable backend; no fake session |
| S-005 | P1 | Work Moment create/list/edit | DB migration, API contract, app UI and integration tests |
| S-006 | P1 | Evidence Vault | Source metadata, privacy boundary, visibility and immutable verification/audit events tested |
| S-007 | P1 | Evidence-grounded AI drafts | Given claims and sources -> anchored draft; unproven claims blocked/flagged; repeatable test fixtures |
| S-008 | P1 | Worker approval / optional company reviewer | Correct roles, states, audit trail and consent gates |
| S-009 | P1 | Real enterprise dashboard | Active workers, verified visibility rate, proof-backed rate, time to draft from stored events |
| S-010 | P1 | Consent-aware UTM conversion proxy | Verified event ingestion, documented attribution limits and no invented CAC |
| S-011 | P2 | One real work-system connector, GitHub first | OAuth scope, import provenance, de-duplication, revoke and tested provider contract |
| S-012 | P2 | Worker-owned portable profile | Revocation of corporate permissions, permitted evidence export, privacy tests |
| S-013 | P2 | Production hardening | Threat model, secure headers, rate limiting, backups, monitoring, incident and rollback runbooks |
| S-014 | P2 | Pilot evidence pack | Reproducible demo, test accounts, sample labeled demo data, measurement definitions |

## Autonomy protocol
- If CI is broken, repair S-000 before feature work. If a task is blocked on missing third-party credentials, log the blocker and move to the next unblocked item; **do not create fake integrations**.
- One bounded vertical slice per run. Re-check the actual state of the code and open PRs; this roadmap may lag implementation.
- Agent edits must not automatically modify this roadmap, workflow definitions, policy files or deployment secrets. Those require review.
- To progress: issue/PR linked, tests and risk notes attached. Avoid scope inflation or cosmetic redesign.
- Do not make expensive infrastructure changes, send messages, publish content or merge to production without authorization.

## Initial verified discovery (limited)
- One GitHub repository `Mikhail-Balari/Sharwi` contains root Next.js landing, `sharwi-app/` Expo and `sharwi-backend/` Express.
- Root NPM workspaces + package-lock present. Current scripts: `npm run build`, `npm run build:backend`, `npm run typecheck:mobile`.
- Vercel has a production-ready deployment of the landing, last observed commit `5253ee9` from April 2026.
- Root `AGENTS.md` and `.github/workflows/ci.yml` were absent when inspected.
- No Supabase project was visible under the currently connected account. This is NOT proof that no other DB or Supabase project exists.
- Landing `lib/supabase.ts` returns success with `local_backup` when no Supabase is configured: a concrete lead-loss risk on other browsers/devices.

**Not yet verified:** passing build/tests, backend production URL, actual DB availability, EAS distribution, OAuth integrations, GitHub Actions write permissions, security posture and complete UX.
