# Sharwi landing and enterprise-demo agent

Scope: `app/`, `components/`, `lib/` and their tests.

- Preserve the existing visual design, interactions, embedded Expo demo, responsive behavior, accessibility and the public marketing funnel. Do not redesign without explicit scope.
- Next.js version is the installed version in package.json, not the older version mentioned in some docs.
- Distinguish live enterprise functionality from illustrative demo metrics; never imply fictional conversions or integrations are real.
- Conversion form: user-entered leads must reach a verified server-side persistent store before returning a "saved" success. The existing localStorage fallback is a known risk, not an acceptable production success state.
- Instrumentation must be consent-aware, data-minimal and documented. Prevent duplicate events; do not log sensitive form contents.
- Keep iframe demo navigation and load-fallback behavior working. Verify mobile + desktop rendering.
- Prefer focused changes and tests. Do not modify backend contracts without coordinating with backend.
