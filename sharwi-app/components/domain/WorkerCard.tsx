import { StyleSheet, View } from "react-native";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { WorkerSummary } from "@/types/models";
import { spacing } from "@/types/theme";

export function WorkerCard({ worker }: { worker: WorkerSummary }) {
  return (
    <Card>
      <View style={styles.header}>
        <View style={styles.identity}>
          <Text variant="subtitle">{worker.fullName}</Text>
          <Text variant="caption">
            {worker.headline} • {worker.location}
          </Text>
        </View>
        <Badge label={`${worker.reputationScore} score`} tone="success" />
      </View>
      <Text>{worker.bio}</Text>
      <View style={styles.skills}>
        {worker.topSkills.map((skill) => (
          <Badge key={skill} label={skill} tone="neutral" />
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  identity: {
    flex: 1,
    gap: spacing.xs,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
});
