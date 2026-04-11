# Sharwi Mobile Deployment

## Environment Configuration

Create `sharwi-app/.env` from `sharwi-app/.env.example`.

Required variable:

- `EXPO_PUBLIC_API_URL`

Suggested values:

- local: `http://localhost:4000/api`
- preview: `https://api-preview.sharwi.com/api`
- production: `https://api.sharwi.com/api`

## API Environment Switching

The mobile app reads `EXPO_PUBLIC_API_URL`.

- If set, the app uses the live backend.
- If not set, the app falls back to local mock data so the UI remains explorable during early development.

## Production Build Setup

The Expo project includes `eas.json` with:

- `development`
- `preview`
- `production`

Recommended flow:

1. Install dependencies in `sharwi-app`
2. Run `npx expo start`
3. Validate local API integration
4. Log in to Expo with `npx eas login`
5. Configure project with `npx eas build:configure`
6. Build preview binaries
7. Build production binaries

## Expo Build Configuration

### Development

- Uses local API URL
- Enables fast iteration

### Preview

- Uses preview API
- Produces internal distribution builds for QA

### Production

- Uses production API
- Auto-increments build number

## App Store Deployment

Before iOS release:

- Create Apple App Store Connect app
- Set bundle identifier to `com.sharwi.app`
- Provide privacy policy and support URL
- Add screenshots, icon, description, and age rating
- Upload production build with EAS Submit or Transporter

## Play Store Deployment

Before Android release:

- Create Google Play Console app
- Set package to `com.sharwi.app`
- Prepare store listing assets
- Upload AAB from EAS build
- Complete Data safety section

## Readiness Checklist

- API URL points to correct environment
- Auth works end to end
- Crash reporting is installed
- App icon and splash are branded
- Legal documents are hosted
- QA pass completed on iOS and Android
