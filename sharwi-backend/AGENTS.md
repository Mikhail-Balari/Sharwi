# Sharwi backend and data agent

Scope: `sharwi-backend/`. Apply root AGENTS.md first.

- Existing stack: Express 4, TypeScript, PostgreSQL via pg, Zod validation, JWT authentication, Docker Postgres locally. Inspect actual modules/migrations before adding new frameworks.
- Product data must be durable; never mark mock or in-memory storage as production-ready.
- Enforce tenant membership, roles and ownership in every read/write. Add negative authorization tests: user A must not access user B or another organization's data.
- Evidence links have provenance, source type, organization visibility, verification status and audit history. Never infer verification from a URL alone.
- Draft generation must be grounded to authorized evidence. Every claim lacking proof must be flagged or weakened, not fabricated.
- Separate personal portable evidence from licensed corporate source content, access tokens and enterprise-only analytics. Revoking a company connection must revoke source access.
- Keep schemas, migration files and API contracts versioned. Prefer additive migrations with rollback plan; never drop data autonomously.
- Secrets only through environment variables. Use strict validation, parameterized SQL, rate limits, safe error responses and privacy-preserving logs.
- Verify `npm run build:backend` from root; add integration tests with real PostgreSQL and security cases before claiming enterprise readiness.
