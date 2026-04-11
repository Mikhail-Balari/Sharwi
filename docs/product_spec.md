# Sharwi Product Specification

## 1. Product Overview

Sharwi is a mobile-first platform for building verified professional reputation from real work. Workers capture achievements, evidence, skills, and reviews in one portable profile. Companies use Sharwi to verify work, discover credible talent, and optionally transform team activity into authentic brand visibility.

The MVP should optimize for one clear promise:

Workers can prove what they have done.
Companies can trust what they see.

## 2. Core Users

### Workers

- Individual contributors
- Managers
- Founders
- Consultants and contractors
- Professionals in product, engineering, sales, operations, HR, and marketing

### Companies

- Hiring managers
- Recruiters and talent teams
- Team leads and department heads
- Marketing or employer-brand operators
- Company admins and verifiers

## 3. User Roles

### Worker

- Creates and maintains a Sharwi profile
- Adds skills, work history, and achievements
- Requests verification
- Receives reviews
- Opts into discovery and content generation

### Company Member

- Belongs to a company workspace
- Can verify work or review workers depending on permissions
- Can search and shortlist workers

### Company Admin

- Manages company profile and members
- Configures verification rules
- Approves or rejects job verification requests
- Reviews analytics and discovery activity

### Platform Admin

- Handles abuse, moderation, and trust operations
- Reviews suspicious profiles or verifications

## 4. Platform Value Proposition

### For Workers

- Build a portable identity around verified work, not self-promotion.
- Convert daily effort into career capital.
- Show evidence, not just claims.
- Become discoverable through proof-backed reputation.

### For Companies

- Evaluate workers through verifiable outcomes.
- Reduce reliance on low-signal resumes and generic profiles.
- Verify prior work and collect structured reviews.
- Activate authentic expertise as optional advocacy content.

## 5. Core Features

### Account and Identity

- Email/password authentication
- Profile onboarding
- Role and industry selection
- Discovery visibility controls

### Worker Profile

- Headline, bio, location, work preferences
- Skills and proficiency
- Work history with linked companies and dates
- Verified achievements and evidence
- Reviews and reputation summary

### Achievement and Work Logging

- Manual achievement creation
- Evidence attachments and links
- Import-ready metadata for future GitHub/Jira/CRM syncs

### Verification

- Submit work items for company verification
- Track pending, approved, rejected, and disputed states
- Maintain verification history for auditability

### Reviews

- Company-authored review after verified collaboration
- Structured dimensions: reliability, impact, communication, quality
- Free-text summary

### Reputation Score

- Aggregated score derived from proof quality, review quality, recency, and consistency
- Public high-level score with private explainability details

### Discovery

- Worker search by skill, role, location, industry, availability, and reputation
- Result ranking by trust, relevance, and recency
- Featured worker feed and recommendations

### Notifications

- Verification requests updated
- Review received
- Profile completeness reminders
- New company interest or shortlist inclusion

### Feed

- Personalized stream of achievements, suggested posts, featured workers, and relevant jobs

## 6. Worker Profile System

The worker profile is the canonical entity in Sharwi.

### Profile Sections

- Identity: full name, headline, avatar, location
- Professional summary: bio, years of experience, work preferences
- Skills: normalized skill tags with optional endorsements later
- Work history: company, title, dates, employment type
- Achievements: structured outcomes with metrics, links, and verification state
- Reviews: structured and narrative feedback
- Reputation: overall score, trust level, verification count

### Profile Principles

- Worker-owned and portable
- Evidence attached wherever possible
- Clear separation between verified and self-claimed information
- Privacy controls for discoverability and individual fields

## 7. Reputation Scoring Model

The MVP reputation score should be explainable and composable.

### Proposed Inputs

- Verification coverage: percentage of work items that are verified
- Evidence quality: number and strength of supporting links/documents
- Review quality: average weighted review score
- Recency: more recent work has more weight
- Consistency: regular verified contributions over time
- Completeness: profile richness and structured data quality

### Proposed Output

- `0-100` reputation score
- Trust tier labels: `emerging`, `trusted`, `proven`, `elite`
- Explanation payload for internal use

### Example Weighting

- 35% verification coverage
- 25% review quality
- 20% evidence quality
- 10% recency
- 10% consistency/completeness

## 8. Job Verification Workflow

### Goal

Turn a claimed work experience into a trusted record.

### Flow

1. Worker creates or imports a job/work item.
2. Worker links company, role, dates, and achievement evidence.
3. Worker submits verification request.
4. Company verifier receives notification.
5. Verifier approves, rejects, or requests more information.
6. Approved items update worker profile and reputation score.
7. Audit log is stored for each decision.

### Verification States

- draft
- pending
- approved
- rejected
- needs_more_info
- disputed

## 9. Company Interaction Workflow

### Discovery and Evaluation

1. Company user searches workers.
2. Company user opens worker profile.
3. Sharwi highlights verified work, score explainers, and review summaries.
4. Company user shortlists or contacts worker.

### Post-Work Relationship

1. Company confirms worker relationship or verified project.
2. Company submits structured review.
3. Worker chooses whether review is public if policy allows.
4. Reputation score recalculates.

### Advocacy Extension

1. Worker achievement is transformed into suggested content.
2. Worker approves.
3. Company sees aggregated impact, never private profile controls.

## 10. Worker Discovery Logic

Discovery should prefer trust and relevance over popularity.

### Ranking Inputs

- Skill match
- Role match
- Industry relevance
- Reputation score
- Verification count
- Review quality
- Recency of verified work
- Availability and location fit

### Discovery Principles

- Verified profiles rank above unverified profiles.
- Reputation score helps rank, but does not fully dominate search.
- Recent, relevant, evidence-backed work should outperform generic profiles.
- Worker privacy and discoverability settings are always respected.

### MVP Discovery Filters

- Skills
- Role/title
- Location
- Remote/on-site preference
- Years of experience
- Reputation range
- Verified-only toggle
- Industry
