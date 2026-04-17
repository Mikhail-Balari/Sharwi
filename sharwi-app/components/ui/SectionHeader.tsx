import { StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { spacing } from "@/constants/theme";

export function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <View style={styles.container}>
      {eyebrow ? <Text variant="label">{eyebrow}</Text> : null}
      <Text variant="title">{title}</Text>
      {description ? <Text variant="caption">{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
});

