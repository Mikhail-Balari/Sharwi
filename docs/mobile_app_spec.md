# Sharwi Mobile App Specification

## Product Goal

The mobile app is the worker-facing MVP of Sharwi. It should help a worker create, prove, and grow a portable professional reputation from real work, while giving light company-facing workflows where needed.

## Screen Architecture

### Auth

- Login
- Signup
- Forgot Password

### Onboarding

- Welcome
- Role and industry selection
- Profile basics
- Skills setup
- Work history starter

### Main Tabs

- Feed
- Worker Discovery
- Reputation
- Notifications
- Profile

### Detail and Edit Screens

- Worker Profile
- Edit Profile
- Skills
- Work History
- Reviews
- Reputation Score
- Worker Search Results
- Worker Detail
- Verification Request Detail

## Navigation System

### Root

- `AuthStack`
- `AppTabs`
- `ModalStack`

### Tab Structure

- `FeedScreen`
- `WorkerSearchScreen`
- `ReputationScoreScreen`
- `NotificationsScreen`
- `ProfileScreen`

### Push Routes

- `EditProfileScreen`
- `SkillsScreen`
- `WorkHistoryScreen`
- `ReviewsScreen`
- `WorkerDetailScreen`

## State Management

### React Query

Use for:

- authenticated user
- worker profile
- reviews
- feed
- notifications
- search results

### Zustand

Use for:

- auth token state
- unsaved profile draft
- filter state for search
- UI preferences

## API Integration Layer

The mobile app should use a centralized typed client with:

- environment-based base URL
- auth token injection
- typed request helpers
- error normalization
- module-based API files

Suggested modules:

- `authApi`
- `workerApi`
- `reviewApi`
- `feedApi`
- `notificationApi`

## Data Models

### User

- id
- email
- role
- createdAt

### WorkerProfile

- id
- userId
- fullName
- headline
- bio
- location
- avatarUrl
- industry
- yearsExperience
- discoverable
- reputationScore
- verificationCount

### Skill

- id
- name
- category
- yearsExperience

### WorkHistoryItem

- id
- companyId
- companyName
- title
- employmentType
- startDate
- endDate
- isCurrent
- verificationStatus
- highlights

### Review

- id
- workerProfileId
- companyName
- reviewerName
- rating
- summary
- createdAt

### FeedItem

- id
- type
- title
- summary
- createdAt
- metadata

## UI Component System

### Primitives

- `Screen`
- `Text`
- `Button`
- `Input`
- `Badge`
- `Avatar`
- `Card`
- `SectionHeader`

### Domain Components

- `ProfileHeaderCard`
- `ReputationScoreCard`
- `SkillChip`
- `ReviewCard`
- `WorkerListCard`
- `WorkHistoryCard`
- `FeedCard`
- `EmptyState`

### Design Direction

- Dark, high-contrast interface inspired by the prototype.
- Warm orange brand accent.
- Clear trust markers for verified items.
- Visual separation between self-claimed and verified data.

## Core Screen Notes

### Login

- Email/password
- Entry point to signup
- Lightweight trust and benefit messaging

### Signup

- Fast onboarding
- Capture role and intent early

### Worker Profile

- Public-style profile summary
- Skills, work history, reviews, and reputation
- Clear edit entry points

### Edit Profile

- Personal info
- discoverability toggle
- profile completeness guidance

### Skills

- Add, remove, and categorize skills
- Support proficiency metadata

### Work History

- Timeline view
- verification badges
- request-verification CTA

### Reviews

- Overall rating
- structured list of reviews
- empty state if none yet

### Reputation Score

- Score value
- trend
- explanation pillars
- verification count

### Worker Discovery

- Search bar
- filters
- ranked results

### Feed

- Achievements
- suggested profile improvements
- featured workers
- new opportunities later

### Notifications

- Verification updates
- reviews received
- discovery events
- system nudges
