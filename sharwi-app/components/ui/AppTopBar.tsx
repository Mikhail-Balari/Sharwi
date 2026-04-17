import { StyleSheet, View } from "react-native";

import { SharwiLogo } from "@/components/ui/SharwiLogo";
import { Text } from "@/components/ui/Text";
import { colors, radii, spacing } from "@/constants/theme";

type AppTopBarProps = {
  badge?: string;
  tone?: "neutral" | "accent" | "success";
};

const toneStyles = {
  neutral: {
    backgroundColor: colors.backgroundInset,
    borderColor: colors.border,
    textColor: colors.mutedText,
  },
  accent: {
    backgroundColor: colors.backgroundInset,
    borderColor: colors.accentSoft,
    textColor: colors.accent,
  },
  success: {
    backgroundColor: colors.successSoft,
    borderColor: "rgba(112, 211, 138, 0.28)",
    textColor: colors.success,
  },
} as const;

export function AppTopBar({ badge, tone = "neutral" }: AppTopBarProps) {
  const appearance = toneStyles[tone];

  return (
    <View style={styles.row}>
      <View style={styles.brandRow}>
        <SharwiLogo size={30} />
        <Text variant="label" style={styles.brandText}>
          Sharwi
        </Text>
      </View>

      {badge ? (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: appearance.backgroundColor,
              borderColor: appearance.borderColor,
            },
          ]}
        >
          <Text style={[styles.badgeText, { color: appearance.textColor }]}>{badge}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: 4,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  brandText: {
    color: colors.mutedText,
  },
  badge: {
    borderRadius: radii.round,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
});

