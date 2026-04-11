import { useQuery } from "@tanstack/react-query";

import { ReviewCard } from "@/components/domain/ReviewCard";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fetchReviews } from "@/services/api/reviews";

export function ReviewsScreen() {
  const reviewsQuery = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  return (
    <Screen>
      <SectionHeader
        eyebrow="Reviews"
        title="Proof from real collaborators"
        description="Structured reviews complement verified work history and evidence."
      />
      {reviewsQuery.data?.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </Screen>
  );
}
