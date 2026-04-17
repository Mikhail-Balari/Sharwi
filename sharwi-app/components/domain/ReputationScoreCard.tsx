import { StyleSheet, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { ReputationBreakdown } from "@/types/models";
import { colors, spacing } from "@/constants/theme";

export function ReputationScoreCard({ score }: { score: ReputationBreakdown }) {
  return (
    <Card>
      <Text variant="label">Reputation Score</Text>
      <View style={styles.row}>
        <Text style={styles.score}>{score.value}</Text>
        <View style={styles.meta}>
          <Text variant="subtitle">{score.tier}</Text>
          <Text variant="caption">{score.summary}</Text>
        </View>
      </View>
      {score.pillars.map((pillar) => (
        <View key={pillar.label} style={styles.pillar}>
          <Text variant="caption">{pillar.label}</Text>
          <Text>{pillar.value}%</Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
  score: {
    fontSize: 48,
    fontWeight: "800",
    color: colors.accent,
  },
  meta: {
    flex: 1,
    gap: spacing.xs,
  },
  pillar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

