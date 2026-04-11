export type FeedItem = {
  id: string;
  type: "achievement" | "profile" | "discovery";
  title: string;
  summary: string;
  createdAtLabel: string;
};

export type WorkerSummary = {
  id: string;
  fullName: string;
  headline: string;
  bio: string;
  location: string;
  reputationScore: number;
  topSkills: string[];
};

export type Review = {
  id: string;
  companyName: string;
  reviewerName: string;
  rating: number;
  summary: string;
  createdAtLabel: string;
};

export type ReputationBreakdown = {
  value: number;
  tier: string;
  summary: string;
  pillars: Array<{
    label: string;
    value: number;
  }>;
};

export type WorkerProfile = {
  id: string;
  userId: string;
  fullName: string;
  headline: string;
  bio: string;
  location: string;
  yearsExperience: number;
  discoverable: boolean;
  skills: string[];
  workHistory: Array<{
    id: string;
    companyName: string;
    title: string;
    verificationStatus: string;
  }>;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  createdAtLabel: string;
};
