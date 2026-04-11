import { useQuery } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";

import { WorkerCard } from "@/components/domain/WorkerCard";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fetchWorkers } from "@/services/api/workers";
import { spacing } from "@/types/theme";

const filters = ["Verified", "Remote", "Product", "Engineering"];

export function WorkerSearchScreen() {
  const workersQuery = useQuery({
    queryKey: ["workers"],
    queryFn: fetchWorkers,
  });

  return (
    <Screen>
      <SectionHeader
        eyebrow="Discovery"
        title="Find trusted workers"
        description="Search profiles ranked by verified work, reviews, and reputation signal."
      />
      <Input placeholder="Search by skill, role, or company" />
      <View style={styles.filters}>
        {filters.map((filter) => (
          <Badge key={filter} label={filter} tone="neutral" />
        ))}
      </View>
      {workersQuery.data?.map((worker) => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
});
