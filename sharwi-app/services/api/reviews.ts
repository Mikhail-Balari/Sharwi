import { apiRequest } from "@/services/api/client";
import { Review } from "@/types/models";

export function fetchReviews() {
  return apiRequest<Review[]>("/reviews");
}
