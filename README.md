# Sharwi Landing Page

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables
Create a `.env.local` file in the root with:
```
NEXT_PUBLIC_SUPABASE_URL=https://mjtywaubgatgmooqyknk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ Do NOT commit `.env.local` to GitHub.  
> Add these same variables in **Vercel → Settings → Environment Variables**.

### 3. Run locally
```bash
npm run dev
```

## Supabase Table
Make sure the `demo_requests` table exists in your Supabase project with these columns:
- `id` (int8, auto)
- `created_at` (timestamptz, auto)
- `name` (text)
- `role` (text)
- `company` (text)
- `email` (text)
- `message` (text)
- `source` (text)

## Google Analytics
GA ID: `G-4JFEK747YT` — already configured in `app/layout.tsx`.

## Tracked Events (Google Analytics)
| Event | Label | Triggered when |
|-------|-------|----------------|
| `click` | `nav_request_demo` | Header "Request Demo" |
| `click` | `hero_request_demo` | Hero "Request Demo" |
| `click` | `hero_see_how_it_works` | Hero "See How it Works" |
| `click` | `explore_as_professional` | Audience selector card |
| `click` | `explore_for_companies` | Audience selector card |
| `click` | `for_professionals_request_demo` | Section CTA |
| `click` | `for_companies_request_demo` | Section CTA |
| `click` | `see_example_[name]` | Each Use Case card |
| `click` | `try_demo_live` | Live Demo button |
| `demo_interaction` | `embedded_demo_used` | User interacts with iframe |
| `modal_open` | `request_demo_modal_opened` | Modal opens |
| `form_submit` | `request_demo_submitted` | Form submitted |
| `click` | `schedule_live_demo` | Footer CTA |

## Deploy to Vercel
1. Push this repo to GitHub
2. Import in Vercel → New Project → select the repo
3. Add env variables in Vercel dashboard
4. Deploy
