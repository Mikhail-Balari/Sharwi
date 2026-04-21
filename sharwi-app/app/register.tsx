import React, { useState } from "react";
import {
  Alert,
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
import { Briefcase, Eye, EyeOff, Lock, Mail, User } from "lucide-react-native";

import { SharwiLogo } from "@/components/SharwiLogo";
import { registerUser } from "@/services/api/auth";

export default function Register() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [headlineFocused, setHeadlineFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        email: email.trim(),
        password,
        fullName: name.trim(),
        headline: headline.trim() || "Professional",
      });
      router.replace("/(tabs)/feed");
    } catch (err: any) {
      Alert.alert("Registration failed", err.message ?? "Please try again.");
    } finally {
      setLoading(false);
    }
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

          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Join Sharwi</Text>

          <View style={[styles.inputWrap, nameFocused && styles.inputWrapFocused]}>
            <User size={16} color="#5C5955" />
            <TextInput
              style={styles.input}
              placeholder="Full name"
              placeholderTextColor="#3A3735"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
            />
          </View>

          <View style={[styles.inputWrap, headlineFocused && styles.inputWrapFocused]}>
            <Briefcase size={16} color="#5C5955" />
            <TextInput
              style={styles.input}
              placeholder="e.g. Data Scientist, Sales Manager, Engineer"
              placeholderTextColor="#3A3735"
              value={headline}
              onChangeText={setHeadline}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              onFocus={() => setHeadlineFocused(true)}
              onBlur={() => setHeadlineFocused(false)}
            />
          </View>

          <View style={[styles.inputWrap, emailFocused && styles.inputWrapFocused]}>
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
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#3A3735"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
              returnKeyType="done"
              onSubmitEditing={() => {
                void handleRegister();
              }}
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

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              void handleRegister();
            }}
            activeOpacity={0.88}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? "Creating account..." : "Create Account"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signInRow}
            onPress={() => router.push("/login")}
            activeOpacity={0.7}
          >
            <Text style={styles.signInBase}>Already have an account? </Text>
            <Text style={styles.signInLink}>Sign in</Text>
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
    marginBottom: 32,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  signInRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInBase: {
    fontSize: 14,
    color: "#5C5955",
  },
  signInLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DE5015",
  },
});
