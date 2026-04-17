# Sharwi Landing Page

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables
Create a `.env.local` file in the root with:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run locally
```bash
npm run dev
```

## Enterprise Demo MVP

The landing page now includes:
- a semi-interactive `Enterprise Pilot View` dashboard
- an expanded enterprise-focused `Request Demo` modal
- lightweight analytics instrumentation with a local debug trail

## Demo Request Storage

Primary storage:
- Supabase table: `demo_requests`

Recommended columns:
- `id` (int8, auto)
- `created_at` (timestamptz, auto)
- `name` (text)
- `role` (text)
- `company` (text)
- `email` (text)
- `message` (text)
- `source` (text)
- `company_size` (text, optional but recommended)
- `problem_to_solve` (text, optional but recommended)
- `notes` (text, optional but recommended)

Fallback behavior:
- if Supabase is not configured, submissions are stored in `localStorage["sharwi_demo_requests_backup"]`
- if the table does not yet have the new enterprise columns, the form still saves through the legacy columns and serializes the extra fields into `message`

## Tracked Events

The app emits these custom events:
- `landing_page_view`
- `cta_click`
- `mobile_demo_interaction`
- `enterprise_demo_interaction`
- `demo_form_start`
- `demo_form_submit`
- `demo_success`

Analytics payloads intentionally avoid sending personal data like full name or email.

## How To Test

### Test the enterprise demo and CTA events
1. Start the app with `npm run dev`
2. Open `http://localhost:3000`
3. Open DevTools Console
4. Run:
```js
JSON.parse(localStorage.getItem("sharwi_event_log") ?? "[]")
```
5. Click any request-demo CTA, switch enterprise scenarios, change the time range, and change the team filter
6. Re-run the command and confirm you see `cta_click` and `enterprise_demo_interaction` entries

### Test mobile demo interactions
1. Scroll to the mobile demo section
2. Click into the embedded demo iframe or open the external demo button
3. Re-run:
```js
JSON.parse(localStorage.getItem("sharwi_event_log") ?? "[]")
```
4. Confirm you see `mobile_demo_interaction` and/or `cta_click`

### Test the request-demo form flow
1. Open the request demo modal from any CTA
2. Focus or type into any field
3. Confirm `demo_form_start` appears in `localStorage["sharwi_event_log"]`
4. Fill:
   - full name
   - company
   - role
   - work email
   - company size
   - problem to solve
   - optional notes
5. Submit the form
6. Confirm `demo_form_submit` appears in `localStorage["sharwi_event_log"]`
7. Confirm the success modal appears and `demo_success` is logged

### Inspect stored form data

If Supabase is configured:
- open your Supabase project
- inspect the `demo_requests` table

If Supabase is not configured:
- open DevTools Console
- run:
```js
JSON.parse(localStorage.getItem("sharwi_demo_requests_backup") ?? "[]")
```

## Deploy to Vercel
1. Push this repo to GitHub
2. Import in Vercel
3. Add the same environment variables
4. Deploy
