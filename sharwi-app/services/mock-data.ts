import {
  FeedItem,
  NotificationItem,
  ReputationBreakdown,
  Review,
  WorkerProfile,
  WorkerSummary,
} from "@/types/models";

export const mockFeed: FeedItem[] = [
  {
    id: "feed-1",
    type: "achievement",
    title: "Verification approved for Series A hiring sprint",
    summary: "Your last growth hiring project was verified by Acme and added 6 points to your score.",
    createdAtLabel: "2h ago",
  },
  {
    id: "feed-2",
    type: "profile",
    title: "Your profile is 84% complete",
    summary: "Add one more verified work item to unlock Trusted tier visibility in search.",
    createdAtLabel: "Today",
  },
  {
    id: "feed-3",
    type: "discovery",
    title: "3 companies viewed your profile this week",
    summary: "Product and talent teams are engaging most with your retention and onboarding work.",
    createdAtLabel: "This week",
  },
];

export const mockWorkers: WorkerSummary[] = [
  {
    id: "worker-1",
    fullName: "Alex Mercer",
    headline: "Growth operator building repeatable GTM systems",
    bio: "Verified work across product-led growth, hiring, and revenue operations.",
    location: "Buenos Aires",
    reputationScore: 88,
    topSkills: ["Growth", "Ops", "Analytics"],
  },
  {
    id: "worker-2",
    fullName: "Sarah Kim",
    headline: "Product leader focused on marketplace trust",
    bio: "Blends user research, experimentation, and cross-functional delivery.",
    location: "Remote",
    reputationScore: 92,
    topSkills: ["Product", "Research", "Strategy"],
  },
];

export const mockReviews: Review[] = [
  {
    id: "review-1",
    companyName: "Acme Corp",
    reviewerName: "James Patel",
    rating: 4.9,
    summary: "Alex created clarity fast, aligned stakeholders, and delivered measurable revenue impact.",
    createdAtLabel: "Jan 2026",
  },
  {
    id: "review-2",
    companyName: "Northstar Health",
    reviewerName: "Maya Flores",
    rating: 4.7,
    summary: "Strong communicator with a rare ability to turn messy systems into reliable operating processes.",
    createdAtLabel: "Nov 2025",
  },
];

export const mockScore: ReputationBreakdown = {
  value: 88,
  tier: "Proven",
  summary: "High verification coverage with strong recent reviews.",
  pillars: [
    { label: "Verification", value: 91 },
    { label: "Reviews", value: 89 },
    { label: "Evidence", value: 84 },
    { label: "Recency", value: 82 },
  ],
};

export const mockProfile: WorkerProfile = {
  id: "worker-1",
  userId: "user-1",
  fullName: "Alex Mercer",
  headline: "Growth operator building repeatable GTM systems",
  bio: "I turn messy business problems into verified outcomes teams can trust and scale.",
  location: "Buenos Aires",
  yearsExperience: 8,
  discoverable: true,
  skills: ["Growth", "Operations", "Analytics", "Hiring"],
  workHistory: [
    {
      id: "work-1",
      companyName: "Acme Corp",
      title: "Revenue Operations Lead",
      verificationStatus: "approved",
    },
    {
      id: "work-2",
      companyName: "Northstar Health",
      title: "Growth Manager",
      verificationStatus: "pending",
    },
  ],
};

export const mockNotifications: NotificationItem[] = [
  {
    id: "notification-1",
    title: "Verification approved",
    body: "Acme Corp approved your Revenue Operations Lead role.",
    createdAtLabel: "1h ago",
  },
  {
    id: "notification-2",
    title: "New review received",
    body: "James Patel left a 4.9 review on your latest verified project.",
    createdAtLabel: "Yesterday",
  },
];
