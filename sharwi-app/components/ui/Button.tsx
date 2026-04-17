import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { colors, radii, spacing } from "@/constants/theme";

type ButtonProps = PropsWithChildren<{
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost";
}>;

export function Button({ children, onPress, variant = "primary" }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
        pressed && variant === "primary" && styles.primaryPressed,
        pressed && variant === "secondary" && styles.secondaryPressed,
        pressed && variant === "ghost" && styles.ghostPressed,
      ]}
      onPress={onPress}
    >
      <View>
        <Text
          style={[
            styles.label,
            variant === "ghost" && styles.ghostLabel,
          ]}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: radii.lg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  primary: {
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.38,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  primaryPressed: {
    backgroundColor: colors.accentPressed,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  secondaryPressed: {
    backgroundColor: colors.pressOverlay,
    borderColor: colors.accent,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  ghostPressed: {
    backgroundColor: colors.pressOverlay,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.94,
  },
  label: {
    fontWeight: "800",
    color: colors.text,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  ghostLabel: {
    color: colors.accent,
  },
});

