import { Tabs } from "expo-router";
import { Compass, Flame, ShieldCheck, UserCircle2, Sparkles } from "lucide-react-native";

import { colors } from "@/types/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 86,
          paddingBottom: 12,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, size }) => (
            <Flame color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Compass color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <Sparkles color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="reputation"
        options={{
          title: "Score",
          tabBarIcon: ({ color, size }) => (
            <ShieldCheck color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <UserCircle2 color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}