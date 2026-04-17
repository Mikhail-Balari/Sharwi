import { Platform } from "react-native";

export const COLORS = {
  backgroundDeep: "#000000",
  backgroundSurface: "#0D0D0D",
  cardPrimary: "#1A1815",
  cardSecondary: "#252220",
  cardBorder: "#2E2B27",
  cardAccentBorder: "#3D3A35",
  textPrimary: "#FFFCF2",
  textSecondary: "#CCC6BA",
  textTertiary: "#8A8480",
  textMuted: "#5C5955",
  accentOrange: "#DE5015",
  accentOrangeDim: "#8F3310",
  accentOrangeGlow: "rgba(222,80,21,0.15)",
  verifiedGreen: "#2ECC71",
  verifiedGreenDim: "rgba(46,204,113,0.15)",
  chipBg: "#2A2724",
  chipBorder: "#3D3A35",
  white: "#FFFFFF",
  transparent: "transparent",
} as const;

export const TYPOGRAPHY = {
  fontFamily: Platform.select({
    ios: "SF Pro Display",
    android: "Roboto",
    default: "System",
  }),
  screenTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600" as const,
    color: COLORS.textTertiary,
    letterSpacing: 1.2,
    textTransform: "uppercase" as const,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: "400" as const,
    color: COLORS.textSecondary,
  },
  bodyText: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  metricLarge: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: COLORS.textPrimary,
    letterSpacing: -1,
  },
  metricMedium: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: COLORS.textPrimary,
  },
  chipText: {
    fontSize: 11,
    fontWeight: "600" as const,
    letterSpacing: 0.3,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    letterSpacing: 0.2,
  },
  timestamp: {
    fontSize: 11,
    fontWeight: "400" as const,
    color: COLORS.textMuted,
  },
  sizes: {
    title: 22,
    subtitle: 15,
    body: 14,
    caption: 11,
    label: 11,
    metricLarge: 32,
    metricMedium: 20,
  },
} as const;

export const SPACING = {
  horizontalPadding: 20,
  cardGap: 12,
  sectionGap: 24,
  elementGap: 8,
  chipGap: 6,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  safeBottomOffset: 16,
} as const;

export const BORDER_RADIUS = {
  compact: 12,
  button: 14,
  card: 16,
  featuredCard: 20,
  iconButton: 12,
  pill: 20,
  round: 999,
} as const;

export const colors = {
  background: COLORS.backgroundDeep,
  backgroundAlt: COLORS.backgroundSurface,
  backgroundInset: COLORS.cardSecondary,
  surface: COLORS.cardPrimary,
  surfaceElevated: COLORS.cardPrimary,
  surfaceStrong: COLORS.cardSecondary,
  surfaceSoft: COLORS.chipBg,
  border: COLORS.cardBorder,
  borderStrong: COLORS.cardAccentBorder,
  text: COLORS.textPrimary,
  mutedText: COLORS.textSecondary,
  accent: COLORS.accentOrange,
  accentPressed: COLORS.accentOrangeDim,
  accentSoft: COLORS.accentOrangeGlow,
  accentGlow: COLORS.accentOrangeGlow,
  accentMuted: COLORS.textSecondary,
  pressOverlay: COLORS.accentOrangeGlow,
  success: COLORS.verifiedGreen,
  successSoft: COLORS.verifiedGreenDim,
  info: COLORS.textSecondary,
  infoSoft: COLORS.chipBg,
  warning: COLORS.textSecondary,
  warningSoft: COLORS.chipBg,
} as const;

export const spacing = {
  xs: SPACING.xs,
  sm: SPACING.sm,
  md: SPACING.lg,
  lg: SPACING.xl,
  xl: SPACING.sectionGap,
  xxl: 32,
} as const;

export const radii = {
  md: BORDER_RADIUS.card,
  lg: BORDER_RADIUS.featuredCard,
  xl: 30,
  round: BORDER_RADIUS.round,
} as const;

export const typography = {
  title: TYPOGRAPHY.screenTitle.fontSize,
  subtitle: TYPOGRAPHY.cardTitle.fontSize,
  body: TYPOGRAPHY.bodyText.fontSize,
  caption: TYPOGRAPHY.timestamp.fontSize,
  label: TYPOGRAPHY.sectionLabel.fontSize,
} as const;
