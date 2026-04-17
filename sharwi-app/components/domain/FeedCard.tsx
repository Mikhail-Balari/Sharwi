import { StyleSheet, View } from "react-native";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { FeedItem } from "@/types/models";
import { spacing } from "@/constants/theme";

export function FeedCard({ item }: { item: FeedItem }) {
  return (
    <Card>
      <View style={styles.header}>
        <Badge label={item.type.toUpperCase()} />
        <Text variant="caption">{item.createdAtLabel}</Text>
      </View>
      <Text variant="subtitle">{item.title}</Text>
      <Text>{item.summary}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
  },
});

