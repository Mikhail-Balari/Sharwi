import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { colors, radii, spacing } from "@/types/theme";

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
    minHeight: 52,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    color: colors.text,
  },
});
