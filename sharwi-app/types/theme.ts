import {
  BORDER_RADIUS,
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "@/constants/theme";

export {
  BORDER_RADIUS,
  COLORS,
  SPACING,
  TYPOGRAPHY,
};

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
};

export const spacing = {
  xs: SPACING.xs,
  sm: SPACING.sm,
  md: SPACING.lg,
  lg: SPACING.xl,
  xl: SPACING.sectionGap,
  xxl: 32,
};

export const radii = {
  md: BORDER_RADIUS.card,
  lg: BORDER_RADIUS.featuredCard,
  xl: 30,
  round: BORDER_RADIUS.round,
};

export const typography = {
  title: TYPOGRAPHY.screenTitle.fontSize,
  subtitle: TYPOGRAPHY.cardTitle.fontSize,
  body: TYPOGRAPHY.bodyText.fontSize,
  caption: TYPOGRAPHY.timestamp.fontSize,
  label: TYPOGRAPHY.sectionLabel.fontSize,
};
