import { Pressable } from "react-native";
import { Tabs } from "expo-router";
import { Award, Layers, User, Zap } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS, TYPOGRAPHY } from "@/constants/theme";

function TabBarButton(props: any) {
  return (
    <Pressable
      {...props}
      android_ripple={null}
      style={({ pressed }) => [
        props.style,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    />
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.accentOrange,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarButton: (props) => <TabBarButton {...props} />,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          backgroundColor: "rgba(10, 9, 8, 0.92)",
          borderTopWidth: 1,
          borderTopColor: "rgba(255, 252, 242, 0.06)",
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          marginTop: 2,
          fontFamily: TYPOGRAPHY.fontFamily,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        sceneStyle: {
          backgroundColor: COLORS.backgroundDeep,
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, size }) => (
            <Layers color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => (
            <Zap color={color} size={22} />
          ),
        }}
      />

      <Tabs.Screen
        name="reputation"
        options={{
          title: "Reputation",
          tabBarIcon: ({ color, size }) => (
            <Award color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

