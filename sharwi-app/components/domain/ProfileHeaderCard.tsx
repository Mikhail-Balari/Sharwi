import { StyleSheet, View } from "react-native";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { WorkerProfile } from "@/types/models";
import { spacing } from "@/types/theme";

export function ProfileHeaderCard({ profile }: { profile: WorkerProfile }) {
  return (
    <Card style={styles.card}>
      <Badge label={profile.discoverable ? "Discoverable" : "Private"} tone={profile.discoverable ? "success" : "neutral"} />
      <Text variant="title">{profile.fullName}</Text>
      <Text variant="subtitle">{profile.headline}</Text>
      <Text>{profile.bio}</Text>
      <View style={styles.meta}>
        <Text variant="caption">{profile.location}</Text>
        <Text variant="caption">{profile.yearsExperience} years experience</Text>
      </View>
      <Button variant="secondary">Edit Profile</Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
});
