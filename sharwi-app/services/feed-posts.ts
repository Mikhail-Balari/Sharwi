export type SharwiPostStatus = "published" | "draft" | "proof-backed";

export type SharwiPost = {
  id: string;
  status: SharwiPostStatus;
  featured: boolean;
  title: string;
  excerpt: string;
  fullText: string;
  evidence: string[];
  date: string;
  ctr?: string;
  leads?: number;
  reach?: string;
};

export type SharwiNotification = {
  id: string;
  title: string;
  time: string;
  icon: "trending-up" | "users" | "zap" | "award";
};

export const SHARWI_POSTS: SharwiPost[] = [
  {
    id: "1",
    status: "published",
    featured: true,
    title: "API integration shipped",
    excerpt:
      "Closed a critical API integration that cut Salesforce sync time by 40%. Sales team no longer loses deals to data lag.",
    fullText:
      "Closed a critical API integration that cut Salesforce sync time by 40%.\n\nSales team no longer loses deals to data lag.\n\nWork that moves the business, not just the sprint board.\n\n#Engineering #Impact",
    evidence: ["#PR-2847", "Jira TKT-491", "metrics.pdf"],
    date: "2h ago",
    ctr: "2.4%",
    leads: 3,
    reach: "1.2K",
  },
  {
    id: "2",
    status: "published",
    featured: false,
    title: "Onboarding flow redesign",
    excerpt:
      "Shipped new onboarding after 3 weeks of iteration. Time-on-task dropped 28%. Less friction, more activation.",
    fullText:
      "Shipped the new onboarding flow after 3 weeks of iteration.\n\nTime-on-task dropped 28%. Less friction, more activation.\n\nSmall UX decisions compound.\n\n#Product #UX",
    evidence: ["#PR-2791", "analytics"],
    date: "Yesterday",
    ctr: "1.8%",
    leads: 1,
    reach: "890",
  },
  {
    id: "3",
    status: "draft",
    featured: false,
    title: "Churn prediction model",
    excerpt:
      "Built a model that flagged 200+ at-risk accounts before renewal season. Preliminary results show 18% reduction.",
    fullText:
      "Built a churn prediction model that flagged 200+ at-risk accounts before renewal season.\n\nPreliminary results show 18% reduction in churn rate.\n\nStill validating — but the signal is strong.\n\n#DataScience #ML",
    evidence: ["Jira ML-044", "colab notebook"],
    date: "2 days ago",
  },
  {
    id: "4",
    status: "proof-backed",
    featured: false,
    title: "API error rate fix",
    excerpt:
      "Reduced API error rate from 2.3% to 0.1% after root cause analysis on timeout patterns. Zero incidents in 2 weeks.",
    fullText:
      "Reduced API error rate from 2.3% to 0.1% after root cause analysis on timeout patterns.\n\nZero incidents in 2 weeks post-fix.\n\nThe fix was boring. The result was not.\n\n#Engineering #Reliability",
    evidence: ["#PR-2654", "Datadog report", "runbook.md"],
    date: "3 days ago",
    ctr: "3.1%",
    leads: 5,
    reach: "2.1K",
  },
  {
    id: "5",
    status: "published",
    featured: false,
    title: "Data pipeline architecture",
    excerpt:
      "Designed the pipeline for the new reporting module. Handles 2M events/day. No downtime on migration.",
    fullText:
      "Designed the data pipeline architecture for the new reporting module.\n\nHandles 2M events/day. No downtime on migration.\n\nGood architecture is invisible until it matters.\n\n#DataEngineering",
    evidence: ["design doc", "PR #2801", "load test"],
    date: "1 week ago",
    ctr: "2.9%",
    leads: 4,
    reach: "1.8K",
  },
];

export const SHARWI_NOTIFICATIONS: SharwiNotification[] = [
  {
    id: "notification-1",
    title: "Your API post reached 1.2K views",
    time: "2 hours ago",
    icon: "trending-up",
  },
  {
    id: "notification-2",
    title: "3 new leads influenced by your last post",
    time: "Yesterday",
    icon: "users",
  },
  {
    id: "notification-3",
    title: "New work moment detected from Jira",
    time: "2 days ago",
    icon: "zap",
  },
  {
    id: "notification-4",
    title: "Your reputation score increased to 87",
    time: "1 week ago",
    icon: "award",
  },
];
