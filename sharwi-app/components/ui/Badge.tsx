import { StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { colors, radii, spacing } from "@/types/theme";

export function Badge({ label, tone = "accent" }: { label: string; tone?: "accent" | "neutral" | "success" }) {
  return (
    <View
      style={[
        styles.badge,
        tone === "accent" && styles.accent,
        tone === "neutral" && styles.neutral,
        tone === "success" && styles.success,
      ]}
    >
      <Text variant="caption" style={styles.text}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.round,
  },
  accent: {
    backgroundColor: colors.accentSoft,
  },
  neutral: {
    backgroundColor: colors.surfaceElevated,
  },
  success: {
    backgroundColor: colors.successSoft,
  },
  text: {
    color: colors.text,
    fontWeight: "600",
  },
});
