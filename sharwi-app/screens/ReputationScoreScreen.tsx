import { useQuery } from "@tanstack/react-query";

import { ReputationScoreCard } from "@/components/domain/ReputationScoreCard";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Text } from "@/components/ui/Text";
import { fetchReputationScore } from "@/services/api/feed";

export function ReputationScoreScreen() {
  const scoreQuery = useQuery({
    queryKey: ["reputation-score"],
    queryFn: fetchReputationScore,
  });

  return (
    <Screen>
      <SectionHeader
        eyebrow="Reputation"
        title="How Sharwi ranks trust"
        description="Your score is driven by verification coverage, review quality, evidence strength, and recent work."
      />
      {scoreQuery.data ? <ReputationScoreCard score={scoreQuery.data} /> : null}
      <Card>
        <Text variant="subtitle">How to improve</Text>
        <Text>Request verification on unverified projects.</Text>
        <Text>Collect reviews after successful work.</Text>
        <Text>Add proof links and outcome metrics to achievements.</Text>
      </Card>
    </Screen>
  );
}
