import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Text } from "@/components/ui/Text";
import { useSessionStore } from "@/services/session-store";
import { colors, spacing } from "@/types/theme";

export function LoginScreen() {
  const signIn = useSessionStore((state) => state.signIn);

  return (
    <Screen contentStyle={styles.container}>
      <View style={styles.hero}>
        <Text variant="label">Sharwi</Text>
        <SectionHeader
          title="Build reputation from real work"
          description="Log in to manage your verified profile, reviews, work history, and discovery visibility."
        />
      </View>
      <View style={styles.form}>
        <Input label="Email" placeholder="alex@sharwi.com" keyboardType="email-address" autoCapitalize="none" />
        <Input label="Password" placeholder="••••••••" secureTextEntry />
        <Button
          onPress={() => {
            signIn();
            router.replace("/(tabs)/feed");
          }}
        >
          Log In
        </Button>
        <Button variant="ghost">Create account</Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    gap: spacing.xl,
  },
  hero: {
    gap: spacing.md,
  },
  form: {
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
