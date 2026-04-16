import { useEffect } from "react";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";

import { useSessionStore } from "@/services/session-store";

export default function Index() {
  const { loadSession, isAuthenticated } = useSessionStore();

  useEffect(() => {
    const init = async () => {
      await loadSession();

      const state = useSessionStore.getState();

      if (state.isAuthenticated) {
        router.replace("/(tabs)/feed");
      } else {
        router.replace("/(auth)/login");
      }
    };

    init();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  );
}