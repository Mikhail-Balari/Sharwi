import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { colors, radii, spacing } from "@/types/theme";

type ButtonProps = PropsWithChildren<{
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost";
}>;

export function Button({ children, onPress, variant = "primary" }: ButtonProps) {
  return (
    <Pressable style={[styles.button, styles[variant]]} onPress={onPress}>
      <View>
        <Text style={[styles.label, variant === "ghost" && styles.ghostLabel]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  primary: {
    backgroundColor: colors.accent,
  },
  secondary: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  label: {
    fontWeight: "700",
    color: colors.text,
  },
  ghostLabel: {
    color: colors.accent,
  },
});
