import { apiRequest } from "@/services/api/client";
import { FeedItem, NotificationItem, ReputationBreakdown } from "@/types/models";

export function fetchFeed() {
  return apiRequest<FeedItem[]>("/feed");
}

export function fetchNotifications() {
  return apiRequest<NotificationItem[]>("/notifications");
}

export function fetchReputationScore() {
  return apiRequest<ReputationBreakdown>("/workers/me/reputation");
}
