import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { BrandHeader } from "@/components/ui/BrandHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { useSessionStore } from "@/services/session-store";
import { colors, radii, spacing } from "@/constants/theme";

export function LoginScreen() {
  const signIn = useSessionStore((state) => state.signIn);

  const handleLogin = async () => {
    await signIn("demo-session");
    router.replace("/(tabs)/feed");
  };

  return (
    <Screen contentStyle={styles.container}>
      <View style={styles.hero}>
        <BrandHeader
          title="Sharwi Demo"
          subtitle="Mikhail Balari"
          centered
        />
      </View>

      <View style={styles.form}>
        <Input
          label="Email"
          placeholder="mikhail@sharwi.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="Password"
          placeholder="********"
          secureTextEntry
        />

        <Button onPress={handleLogin}>
          Enter demo
        </Button>

        <Button variant="ghost">
          Request access
        </Button>
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
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  form: {
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    shadowColor: "#000000",
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
});

