import { Redirect } from "expo-router";

import { useSessionStore } from "@/services/session-store";

export default function IndexRoute() {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);

  return <Redirect href={isAuthenticated ? "/(tabs)/feed" : "/(auth)/login"} />;
}
