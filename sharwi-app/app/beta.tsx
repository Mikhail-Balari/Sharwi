import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shield, TrendingUp, Zap } from "lucide-react-native";

import { SharwiLogo } from "@/components/SharwiLogo";

export default function Beta() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.logoWrap}>
          <SharwiLogo size={64} color="#DE5015" />
        </View>

        <Text style={styles.title}>Sharwi Beta</Text>
        <Text style={styles.kicker}>Early access. Real product.</Text>

        <View style={styles.separator} />

        <View style={styles.valueRow}>
          <Zap size={16} color="#DE5015" />
          <Text style={styles.valueText}>
            Turn your work into verified professional content
          </Text>
        </View>

        <View style={styles.valueRow}>
          <Shield size={16} color="#2ECC71" />
          <Text style={styles.valueText}>
            Build a reputation that stays with you, always
          </Text>
        </View>

        <View style={styles.valueRow}>
          <TrendingUp size={16} color="#DE5015" />
          <Text style={styles.valueText}>
            Help your company grow through trusted visibility
          </Text>
        </View>

        <View style={styles.separator} />

        <Text style={styles.note}>
          This is an early beta. Some features are simulated.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login")}
          activeOpacity={0.88}
        >
          <Text style={styles.buttonText}>Get Access</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInRow}
          onPress={() => router.push("/login")}
          activeOpacity={0.7}
        >
          <Text style={styles.signInText}>Already have an account? </Text>
          <Text style={styles.signInLink}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  logoWrap: {
    alignSelf: "center",
    shadowColor: "#DE5015",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFCF2",
    letterSpacing: -1,
    textAlign: "center",
    marginTop: 24,
  },
  kicker: {
    fontSize: 14,
    color: "#DE5015",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#2E2B27",
    marginVertical: 28,
  },
  valueRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    alignItems: "flex-start",
  },
  valueText: {
    flex: 1,
    fontSize: 14,
    color: "#CCC6BA",
    lineHeight: 20,
  },
  note: {
    fontSize: 12,
    color: "#5C5955",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#DE5015",
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#DE5015",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  signInRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  signInText: {
    fontSize: 13,
    color: "#8A8480",
    textAlign: "center",
  },
  signInLink: {
    fontSize: 13,
    color: "#DE5015",
    fontWeight: "700",
  },
});
