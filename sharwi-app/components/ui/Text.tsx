import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, Text as RNText, TextStyle } from "react-native";

import { colors, typography } from "@/constants/theme";

type TextVariant = "title" | "subtitle" | "body" | "caption" | "label";

type TextProps = PropsWithChildren<{
  variant?: TextVariant;
  style?: StyleProp<TextStyle>;
}>;

export function Text({ children, variant = "body", style }: TextProps) {
  return <RNText style={[styles.base, styles[variant], style]}>{children}</RNText>;
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "800",
    lineHeight: 38,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: typography.subtitle,
    fontWeight: "700",
    lineHeight: 24,
  },
  body: {
    fontSize: typography.body,
    color: colors.text,
    lineHeight: 21,
  },
  caption: {
    fontSize: typography.caption,
    color: colors.mutedText,
    lineHeight: 18,
  },
  label: {
    fontSize: typography.label,
    color: colors.mutedText,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: "700",
  },
});

