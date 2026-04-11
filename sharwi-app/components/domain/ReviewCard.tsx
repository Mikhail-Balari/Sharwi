import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { Review } from "@/types/models";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card>
      <Badge label={`${review.rating.toFixed(1)} / 5`} tone="success" />
      <Text variant="subtitle">{review.companyName}</Text>
      <Text variant="caption">
        {review.reviewerName} • {review.createdAtLabel}
      </Text>
      <Text>{review.summary}</Text>
    </Card>
  );
}
