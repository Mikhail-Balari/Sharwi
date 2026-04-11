import { useQuery } from "@tanstack/react-query";

import { FeedCard } from "@/components/domain/FeedCard";
import { ReputationScoreCard } from "@/components/domain/ReputationScoreCard";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fetchFeed, fetchReputationScore } from "@/services/api/feed";

export function WorkerFeedScreen() {
  const feedQuery = useQuery({
    queryKey: ["feed"],
    queryFn: fetchFeed,
  });

  const reputationQuery = useQuery({
    queryKey: ["reputation-score"],
    queryFn: fetchReputationScore,
  });

  return (
    <Screen>
      <SectionHeader
        eyebrow="Worker Feed"
        title="Today’s signal"
        description="Track achievements, profile progress, and discovery opportunities from one place."
      />
      {reputationQuery.data ? <ReputationScoreCard score={reputationQuery.data} /> : null}
      {feedQuery.data?.map((item) => (
        <FeedCard key={item.id} item={item} />
      ))}
    </Screen>
  );
}
