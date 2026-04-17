import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { colors, radii, spacing } from "@/constants/theme";

type InputProps = TextInputProps & {
  label?: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text variant="caption">{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.mutedText}
        style={styles.input}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  input: {
    minHeight: 54,
    backgroundColor: colors.backgroundInset,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    color: colors.text,
  },
});

