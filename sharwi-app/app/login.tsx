import React, { useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SharwiLogo } from "@/components/SharwiLogo";

export default function Login() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const btnScale = useRef(new Animated.Value(1)).current;

  const goToApp = () => {
    setLoading(true);
    Animated.sequence([
      Animated.timing(btnScale, { toValue: 0.97, duration: 100, useNativeDriver: true }),
      Animated.timing(btnScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    setTimeout(() => {
      router.replace("/(tabs)/feed");
    }, 500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: insets.top + 24,
            paddingBottom: insets.bottom + 24,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.logoArea}>
            <SharwiLogo size={52} color="#DE5015" />
          </View>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View
            style={[
              styles.inputWrap,
              emailFocused && styles.inputWrapFocused,
            ]}
          >
            <Mail size={16} color="#5C5955" />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#3A3735"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </View>

          <View
            style={[
              styles.inputWrap,
              styles.passwordWrap,
              passFocused && styles.inputWrapFocused,
            ]}
          >
            <Lock size={16} color="#5C5955" />
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              placeholderTextColor="#3A3735"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
              returnKeyType="done"
              onSubmitEditing={goToApp}
              onFocus={() => setPassFocused(true)}
              onBlur={() => setPassFocused(false)}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeButton}>
              {showPass ? (
                <EyeOff size={16} color="#5C5955" />
              ) : (
                <Eye size={16} color="#5C5955" />
              )}
            </TouchableOpacity>
          </View>

          <Animated.View style={{ transform: [{ scale: btnScale }], marginBottom: 16 }}>
            <TouchableOpacity style={styles.primaryButton} onPress={goToApp} activeOpacity={0.88}>
              <Text style={styles.primaryButtonText}>
                {loading ? "Signing in..." : "Sign In"}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.separator}>
            <View style={styles.sepLine} />
            <Text style={styles.sepText}>or</Text>
            <View style={styles.sepLine} />
          </View>

          <TouchableOpacity style={styles.googleButton} onPress={goToApp} activeOpacity={0.88}>
            <MaterialCommunityIcons name="google" size={20} color="#FFFCF2" />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createRow} onPress={goToApp} activeOpacity={0.7}>
            <Text style={styles.createBase}>Don&apos;t have an account? </Text>
            <Text style={styles.createLink}>Create account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  content: {
    justifyContent: "center",
  },
  logoArea: {
    alignSelf: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFCF2",
    letterSpacing: -1.2,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#5C5955",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 40,
  },
  inputWrap: {
    backgroundColor: "#1A1815",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2E2B27",
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  inputWrapFocused: {
    borderColor: "rgba(222,80,21,0.5)",
  },
  passwordWrap: {
    marginBottom: 28,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#FFFCF2",
    padding: 0,
  },
  passwordInput: {
    flex: 1,
  },
  eyeButton: {
    padding: 4,
  },
  primaryButton: {
    backgroundColor: "#DE5015",
    borderRadius: 16,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#DE5015",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  sepLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#1E1C1A",
  },
  sepText: {
    fontSize: 13,
    color: "#5C5955",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#1A1815",
    borderRadius: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#2E2B27",
    marginBottom: 32,
  },
  googleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFCF2",
  },
  createRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  createBase: {
    fontSize: 14,
    color: "#5C5955",
  },
  createLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DE5015",
  },
});
