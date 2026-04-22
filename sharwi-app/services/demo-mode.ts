export const isDemoMode = () =>
  process.env.EXPO_PUBLIC_DEMO_MODE === "true";

export const DEMO_USER = {
  id: "demo-user-001",
  fullName: "Mikhail Balari",
  email: "demo@sharwi.com",
  role: "Business Data Scientist Manager",
  headline: "Bridging business, data, and execution",
  company: "Accenture",
  location: "Buenos Aires, AR",
  badge: "Sharwi Verified Identity",
};
