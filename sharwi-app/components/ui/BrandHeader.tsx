import { StyleSheet, View } from "react-native";

import { SharwiLogo } from "@/components/ui/SharwiLogo";
import { Text } from "@/components/ui/Text";
import { colors, spacing } from "@/constants/theme";

type BrandHeaderProps = {
  title: string;
  subtitle: string;
  centered?: boolean;
};

export function BrandHeader({ title, subtitle, centered = false }: BrandHeaderProps) {
  return (
    <View style={[styles.container, centered && styles.centered]}>
      <View style={[styles.brandRow, centered && styles.centeredRow]}>
        <SharwiLogo size={34} />
        <Text variant="label">Sharwi</Text>
      </View>
      <Text variant="title" style={centered ? styles.centerText : undefined}>
        {title}
      </Text>
      <Text variant="caption" style={[styles.subtitle, centered && styles.centerText]}>
        {subtitle}
      </Text>
      <View style={[styles.accentLine, centered && styles.accentLineCentered]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  centered: {
    alignItems: "center",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    opacity: 0.92,
  },
  centeredRow: {
    justifyContent: "center",
  },
  subtitle: {
    lineHeight: 18,
    maxWidth: 220,
  },
  centerText: {
    textAlign: "center",
  },
  accentLine: {
    width: 44,
    height: 2,
    borderRadius: 999,
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  accentLineCentered: {
    alignSelf: "center",
  },
});

