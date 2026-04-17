import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SharwiLogo } from "@/components/SharwiLogo";

void SplashScreen.preventAutoHideAsync();

export default function SplashAnimated() {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(10)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    void SplashScreen.hideAsync();
    runAnimation();
  }, []);

  const navigateNext = async () => {
    try {
      const seen = await AsyncStorage.getItem("sharwi_onboarding_done");
      router.replace(seen === "true" ? "/login" : "/onboarding");
    } catch {
      router.replace("/onboarding");
    }
  };

  const runAnimation = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 70,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(progressAnim, {
        toValue: 120,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),

      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(700),

      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      void navigateNext();
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <Animated.View
        style={{
          opacity: logoOpacity,
          transform: [{ scale: logoScale }],
        }}
      >
        <SharwiLogo size={72} color="#DE5015" />
      </Animated.View>

      <View style={styles.logoGap} />

      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: progressAnim }]} />
      </View>

      <Animated.View
        style={{
          alignItems: "center",
          marginTop: 40,
          opacity: textOpacity,
          transform: [{ translateY: textTranslate }],
        }}
      >
        <Text style={styles.brandName}>Sharwi</Text>
        <Text style={styles.tagline}>Your work. Visible.</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  logoGap: {
    height: 32,
  },
  progressTrack: {
    width: 120,
    height: 2,
    borderRadius: 1,
    backgroundColor: "rgba(255,252,242,0.08)",
    overflow: "hidden",
  },
  progressFill: {
    height: 2,
    borderRadius: 1,
    backgroundColor: "#DE5015",
  },
  brandName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFCF2",
    letterSpacing: -0.8,
  },
  tagline: {
    fontSize: 13,
    color: "#5C5955",
    marginTop: 6,
    letterSpacing: 0.2,
  },
});
