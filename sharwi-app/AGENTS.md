# Sharwi Mobile App — Agent Instructions

## Proyecto
MVP mobile de Sharwi en Expo Router. Demo para inversores y validación comercial.
Stack: React Native + Expo Go. NO usar Reanimated, NO usar LinearGradient,
NO usar BlurView. Todo debe funcionar en Expo Go sin eject.

## Reglas de diseño — NO negociables
- Background siempre #000000
- Cards: backgroundColor #1A1815, borderRadius 16, borderWidth 1, borderColor #2E2B27
- Accent orange: #DE5015 — usar SOLO para CTA, tab activo, y highlights
- Verde #2ECC71 — SOLO para estados verified/trust
- Safe area: siempre SafeAreaView, nada toca status bar
- Íconos: lucide-react-native, NUNCA dentro de círculos rellenos
- Tab bar: 4 tabs únicamente — Feed, Create, Reputation, Profile
- Datos demo: el usuario siempre es "Mikhail Balari", iniciales "MB"

## Estructura del repo
- sharwi-app/app/(tabs)/ → pantallas principales
- sharwi-app/components/ → componentes reutilizables
- sharwi-app/constants/  → colores, tipografía, spacing

## Lo que NO hacer nunca
- No instalar Reanimated
- No usar expo-linear-gradient
- No agregar tabs nuevas sin instrucción explícita
- No usar datos de usuarios distintos a Mikhail Balari en la demo
- No poner íconos dentro de View circulares rellenas

## Autonomous build addendum
- Preserve every design and Expo Go compatibility rule above; do not change the four-tab structure without explicit product authorization.
- These fixed demo identity details apply to *demo fixtures only*. Real authenticated users and enterprise data must never be replaced with demo values or portrayed as verified.
- Prioritize manual work capture, source-backed evidence, AI draft review, explicit human approval and portable profile; preserve existing routes while connecting real typed API flows.
- Never imply seeded/fake data is imported from a vendor or persisted in production. Label demonstration experiences explicitly.
- Use typed API contracts and authenticated storage; handle offline/expired-session states and protect corporate private sources.
- Run `npm run typecheck:mobile` from the repository root, and test affected UX flows as part of the task.
