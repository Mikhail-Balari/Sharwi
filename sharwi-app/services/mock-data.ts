import {
  FeedItem,
  NotificationItem,
  ReputationBreakdown,
  Review,
  WorkerProfile,
  WorkerSummary,
} from "@/types/models";

export type SharwiToneId = "technical" | "human" | "corporate";

export type SharwiToneOption = {
  id: SharwiToneId;
  label: string;
  note: string;
};

export type SharwiFeedStoryItem = {
  id: string;
  status: "Published" | "Draft" | "Verified" | "Proof-backed";
  title: string;
  excerpt: string;
  timestamp: string;
  evidence: string[];
  skill: string;
  meta: string;
  kind: "published" | "draft" | "verified" | "proof";
};

export type SharwiMetric = {
  label: string;
  value: string;
};

export type SharwiSkillSignal = {
  skill: string;
  score: string;
};

export type SharwiVisibilityItem = {
  id: string;
  status: "Published" | "Verified" | "Proof-backed";
  title: string;
  detail: string;
  meta: string;
};

export const sharwiDemoIdentity = {
  fullName: "Mikhail Balari",
  role: "Business Data Scientist Manager",
  headline: "Bridging business, data, and execution",
  company: "Accenture",
  location: "Buenos Aires, AR",
  badge: "Sharwi Verified Identity",
  portableIdentity: "sharwi.id/mikhail-balari",
};

export const sharwiDefaultAchievement =
  "Led a data initiative that improved conversion by 22% by aligning business, analytics, and product.";

export const sharwiToneOptions: SharwiToneOption[] = [
  {
    id: "technical",
    label: "Technical",
    note: "Systems-first.",
  },
  {
    id: "human",
    label: "Human",
    note: "Personal, still sharp.",
  },
  {
    id: "corporate",
    label: "Corporate",
    note: "Business-led.",
  },
];

export const sharwiCreateEvidence = [
  "CRM metrics",
  "Internal deck",
  "Delivery notes",
];

export const sharwiPipelineStages = [
  "Work input",
  "Evidence",
  "AI draft",
  "Human control",
];

export function generateSharwiPost(achievement: string, tone: SharwiToneId) {
  const cleanedAchievement = achievement.trim() || sharwiDefaultAchievement;

  if (tone === "technical") {
    return `${cleanedAchievement}\n\nWe tightened the handoff across business, analytics, and product. Conversion improved 22%.`;
  }

  if (tone === "human") {
    return `${cleanedAchievement}\n\nThe real win was alignment. Once the team shared the same view, decisions moved faster.`;
  }

  return `${cleanedAchievement}\n\nThe work aligned business, analytics, and product around one performance view, lifting conversion 22%.`;
}

export const sharwiFeedOverview = {
  title: "Feed",
  subtitle: "Proof-backed activity",
  stats: [
    { label: "Published", value: "06" },
    { label: "Drafts", value: "02" },
    { label: "Verified", value: "14" },
    { label: "This month", value: "+9" },
  ] satisfies SharwiMetric[],
};

export const sharwiFeedItems: SharwiFeedStoryItem[] = [
  {
    id: "story-1",
    status: "Published",
    title: "Conversion uplift case shared",
    excerpt: "Built from proof after a 22% lift.",
    timestamp: "2h",
    evidence: ["CRM metrics", "Internal deck"],
    skill: "Growth Systems",
    meta: "LinkedIn",
    kind: "published",
  },
  {
    id: "story-2",
    status: "Draft",
    title: "Operating model draft ready",
    excerpt: "Prepared from workshop proof and sponsor input.",
    timestamp: "5h",
    evidence: ["Delivery notes", "Stakeholder feedback"],
    skill: "Stakeholder Alignment",
    meta: "Ready for review",
    kind: "draft",
  },
  {
    id: "story-3",
    status: "Verified",
    title: "Transformation contribution verified",
    excerpt: "A measurable process gain now strengthens the profile.",
    timestamp: "Today",
    evidence: ["Delivery summary", "Manager confirmation"],
    skill: "Business Strategy",
    meta: "Profile updated",
    kind: "verified",
  },
  {
    id: "story-4",
    status: "Proof-backed",
    title: "Funnel insight linked to proof",
    excerpt: "Metrics and strategy context are now attached.",
    timestamp: "Yesterday",
    evidence: ["Analytics snapshot", "Internal deck"],
    skill: "Analytics",
    meta: "Proof linked",
    kind: "proof",
  },
];

export const sharwiReputationStory = {
  score: 91,
  status: "Verified momentum",
  summary: "Verified delivery. Consistent proof.",
  verifiedContributions: 14,
  proofBackedRate: 93,
  consistency: "11 months",
  activeSkills: 6,
  badge: {
    name: "Sharwi Verified Identity",
    description: "Backed by work history and verified proof.",
  },
  metrics: [
    { label: "Verified", value: "14" },
    { label: "Proof-backed", value: "93%" },
    { label: "Consistency", value: "11 mo" },
    { label: "Skills", value: "6" },
  ] satisfies SharwiMetric[],
  topSkills: [
    { skill: "Business Strategy", score: "94" },
    { skill: "Data Science", score: "92" },
    { skill: "Product Thinking", score: "90" },
    { skill: "Analytics", score: "93" },
    { skill: "Growth Systems", score: "89" },
    { skill: "Stakeholder Alignment", score: "95" },
  ] satisfies SharwiSkillSignal[],
  narrative: [
    "Proof-backed work",
    "Evidence-linked posts",
    "Verified outcomes",
  ],
};

export const sharwiProfileStory = {
  ...sharwiDemoIdentity,
  summary: "Identity built from measurable work and portable proof.",
  skills: [
    "Business Strategy",
    "Data Science",
    "Product Thinking",
    "Analytics",
    "Growth Systems",
    "Stakeholder Alignment",
  ],
  metrics: [
    { label: "Verified work", value: "14" },
    { label: "Published", value: "06" },
    { label: "Proof-backed", value: "93%" },
  ] satisfies SharwiMetric[],
  recentVisibility: [
    {
      id: "visibility-1",
      status: "Published",
      title: "Conversion case shared",
      detail: "Built from CRM proof.",
      meta: "Today",
    },
    {
      id: "visibility-2",
      status: "Verified",
      title: "Transformation initiative verified",
      detail: "Added to profile.",
      meta: "Yesterday",
    },
    {
      id: "visibility-3",
      status: "Proof-backed",
      title: "Strategy update linked",
      detail: "Deck + analytics attached.",
      meta: "This week",
    },
  ] satisfies SharwiVisibilityItem[],
  evidenceSummary: [
    { label: "Delivery", value: "Operating model gains" },
    { label: "Strategy", value: "Decks and planning" },
    { label: "Metrics", value: "CRM and analytics proof" },
  ],
  continuity: "This reputation follows Mikhail across strategy, analytics, and delivery.",
};

export const mockFeed: FeedItem[] = sharwiFeedItems.map((item) => ({
  id: item.id,
  type:
    item.kind === "verified"
      ? "achievement"
      : item.kind === "draft"
        ? "profile"
        : "discovery",
  title: item.title,
  summary: item.excerpt,
  createdAtLabel: item.timestamp,
}));

export const mockWorkers: WorkerSummary[] = [
  {
    id: "worker-1",
    fullName: sharwiDemoIdentity.fullName,
    headline: `${sharwiDemoIdentity.role} | ${sharwiDemoIdentity.headline}`,
    bio: sharwiProfileStory.summary,
    location: sharwiDemoIdentity.location,
    reputationScore: sharwiReputationStory.score,
    topSkills: sharwiProfileStory.skills.slice(0, 3),
  },
];

export const mockReviews: Review[] = [
  {
    id: "review-1",
    companyName: "Accenture",
    reviewerName: "Program Sponsor",
    rating: 5,
    summary:
      "Mikhail translated messy business questions into measurable delivery and made the work easy to trust.",
    createdAtLabel: "Apr 2026",
  },
  {
    id: "review-2",
    companyName: "Transformation Program",
    reviewerName: "Cross-functional Lead",
    rating: 4.9,
    summary:
      "Strong at aligning stakeholders, clarifying metrics, and turning progress into visible professional signal.",
    createdAtLabel: "Feb 2026",
  },
];

export const mockScore: ReputationBreakdown = {
  value: sharwiReputationStory.score,
  tier: sharwiReputationStory.status,
  summary: sharwiReputationStory.summary,
  pillars: [
    { label: "Verification", value: 92 },
    { label: "Evidence", value: 93 },
    { label: "Consistency", value: 90 },
    { label: "Visibility", value: 88 },
  ],
};

export const mockProfile: WorkerProfile = {
  id: "worker-1",
  userId: "user-1",
  fullName: sharwiProfileStory.fullName,
  headline: `${sharwiProfileStory.role} | ${sharwiProfileStory.headline}`,
  bio: sharwiProfileStory.summary,
  location: sharwiProfileStory.location,
  yearsExperience: 9,
  discoverable: true,
  skills: sharwiProfileStory.skills,
  workHistory: [
    {
      id: "work-1",
      companyName: sharwiProfileStory.company,
      title: sharwiProfileStory.role,
      verificationStatus: "approved",
    },
  ],
};

export const mockNotifications: NotificationItem[] = [
  {
    id: "notification-1",
    title: "Draft ready",
    body: "Your corporate draft is ready for final review.",
    createdAtLabel: "24m ago",
  },
  {
    id: "notification-2",
    title: "Contribution verified",
    body: "A transformation outcome was added to Mikhail Balari's profile.",
    createdAtLabel: "Yesterday",
  },
];
