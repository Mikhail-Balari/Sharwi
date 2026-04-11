import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

import { ProfileHeaderCard } from "@/components/domain/ProfileHeaderCard";
import { ReviewCard } from "@/components/domain/ReviewCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Text } from "@/components/ui/Text";
import { fetchReviews } from "@/services/api/reviews";
import { fetchCurrentWorkerProfile } from "@/services/api/workers";

export function ProfileScreen() {
  const profileQuery = useQuery({
    queryKey: ["worker-profile", "me"],
    queryFn: fetchCurrentWorkerProfile,
  });

  const reviewsQuery = useQuery({
    queryKey: ["reviews", "me"],
    queryFn: fetchReviews,
  });

  if (!profileQuery.data) {
    return <Screen />;
  }

  return (
    <Screen>
      <ProfileHeaderCard profile={profileQuery.data} />
      <SectionHeader eyebrow="Skills" title="Top skills" description="Verified proof and reviews strengthen these claims." />
      <Card>
        {profileQuery.data.skills.map((skill) => (
          <Badge key={skill} label={skill} tone="neutral" />
        ))}
      </Card>
      <SectionHeader eyebrow="Reviews" title="Latest feedback" />
      {reviewsQuery.data?.slice(0, 2).map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
      <Button variant="secondary" onPress={() => router.push("/reviews")}>
        See all reviews
      </Button>
      <Card>
        <Text variant="subtitle">Work history</Text>
        {profileQuery.data.workHistory.map((item) => (
          <Text key={item.id}>
            {item.title} at {item.companyName} • {item.verificationStatus}
          </Text>
        ))}
      </Card>
    </Screen>
  );
}
