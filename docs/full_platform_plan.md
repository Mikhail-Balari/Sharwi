# Full Platform Plan

## Architecture Summary

Sharwi now has an initial three-part platform plan inside this repository:

- `sharwi-landing`: existing marketing site and prototype funnel
- `sharwi-app`: new Expo React Native worker app scaffold
- `sharwi-backend`: new Express/PostgreSQL backend scaffold

The product architecture centers on one shared model:

Workers accumulate verified work history, skills, reviews, and reputation.
Companies verify, review, discover, and evaluate those workers through trusted signals.

## Repository Layout

```text
sharwi/
  app/                  # current Next.js landing
  components/
  lib/
  docs/
  sharwi-app/           # Expo mobile app
  sharwi-backend/       # Express API + PostgreSQL migrations
```

## Integration Contract

### App -> Backend

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/workers`
- `GET /api/workers/me`
- `PUT /api/workers/me`
- `GET /api/workers/me/reputation`
- `GET /api/workers/:id`
- `POST /api/jobs`
- `POST /api/jobs/verify`
- `POST /api/reviews`
- `GET /api/reviews`
- `GET /api/feed`
- `GET /api/notifications`

### Data Alignment

- Mobile worker cards map to backend `GET /workers`.
- Mobile profile screen maps to `GET /workers/me`.
- Mobile reviews screen maps to `GET /reviews`.
- Mobile reputation screen maps to `GET /workers/me/reputation`.
- Mobile feed and notifications map to `GET /feed` and `GET /notifications`.

## Development Roadmap

### Phase 1

- Finalize product language on landing page.
- Stand up backend locally with Postgres and migrations.
- Connect Expo app to live local API.

### Phase 2

- Add real signup/login flow with secure storage.
- Implement profile editing and skills mutation endpoints.
- Add job creation and verification UI.

### Phase 3

- Add company workspace onboarding.
- Add worker discovery filters and shortlist actions.
- Add richer reputation calculation and explainability.

### Phase 4

- Add connectors for GitHub, Jira, CRM, and docs.
- Add evidence ingestion and automated verification hints.
- Add audit trails and moderation tooling.

### Phase 5

- Harden deployment, observability, performance, and trust operations.
- Expand discovery, matching, and company workflows.
- Launch App Store and Play Store builds.
