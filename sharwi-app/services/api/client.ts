import Constants from "expo-constants";

import {
  mockFeed,
  mockNotifications,
  mockProfile,
  mockReviews,
  mockScore,
  mockWorkers,
} from "@/services/mock-data";
import {
  FeedItem,
  NotificationItem,
  ReputationBreakdown,
  Review,
  WorkerProfile,
  WorkerSummary,
} from "@/types/models";

type MockResponseMap = {
  "/feed": FeedItem[];
  "/notifications": NotificationItem[];
  "/reviews": Review[];
  "/workers": WorkerSummary[];
  "/workers/me": WorkerProfile;
  "/workers/me/reputation": ReputationBreakdown;
};

const mockResponses: MockResponseMap = {
  "/feed": mockFeed,
  "/notifications": mockNotifications,
  "/reviews": mockReviews,
  "/workers": mockWorkers,
  "/workers/me": mockProfile,
  "/workers/me/reputation": mockScore,
};

const configuredApiUrl =
  process.env.EXPO_PUBLIC_API_URL ?? (Constants.expoConfig?.extra?.apiUrl as string | undefined);

export async function apiRequest<T>(path: keyof MockResponseMap): Promise<T> {
  if (!configuredApiUrl) {
    return Promise.resolve(mockResponses[path] as T);
  }

  const response = await fetch(`${configuredApiUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }

  return (await response.json()) as T;
}
