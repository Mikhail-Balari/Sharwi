import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SharwiLogo } from "@/components/SharwiLogo";
import { isDemoMode } from "@/services/demo-mode";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: 1,
    headline: "Your work",
    accent: "matters.",
    body: "Most real professional work stays invisible. Sharwi changes that.",
  },
  {
    id: 2,
    headline: "Sharwi makes it",
    accent: "visible.",
    body: "Without self-promotion. Without pressure.",
  },
  {
    id: 3,
    headline: "You stay in",
    accent: "control.",
    body: "You decide what gets shared. Always.",
    isLast: true,
  },
] as const;

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = useCallback((e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  }, []);

  const handleContinue = async () => {
    if (currentIndex < SLIDES.length - 1) {
      const next = currentIndex + 1;
      scrollRef.current?.getNode?.().scrollTo?.({ x: next * width, animated: true });
      scrollRef.current?.scrollTo?.({ x: next * width, animated: true });
      setCurrentIndex(next);
    } else {
      await AsyncStorage.setItem("sharwi_onboarding_done", "true");
      if (isDemoMode()) {
        router.replace("/(tabs)/feed");
      } else {
        router.replace("/beta");
      }
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll },
        )}
        style={{ flex: 1 }}
      >
        {SLIDES.map((slide, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: "clamp",
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [24, 0, 24],
            extrapolate: "clamp",
          });

          return (
            <View key={slide.id} style={styles.slide}>
              <View style={styles.logoZone}>
                <View style={[styles.logoGlow, { top: insets.top + 48 }]} />
                <SharwiLogo size={80} color="#DE5015" />
              </View>

              <View style={styles.copyZone}>
                <Animated.View style={[styles.copyInner, { opacity, transform: [{ translateY }] }]}>
                  <Text style={styles.headline}>
                    {slide.headline} <Text style={styles.headlineAccent}>{slide.accent}</Text>
                  </Text>

                  <Text style={styles.body}>{slide.body}</Text>
                </Animated.View>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>

      <View style={styles.dots}>
        {SLIDES.map((_, index) => {
          const dotWidth = scrollX.interpolate({
            inputRange: [(index - 1) * width, index * width, (index + 1) * width],
            outputRange: [8, 28, 8],
            extrapolate: "clamp",
          });

          const dotColor = scrollX.interpolate({
            inputRange: [(index - 1) * width, index * width, (index + 1) * width],
            outputRange: ["#2E2B27", "#DE5015", "#2E2B27"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, { width: dotWidth, backgroundColor: dotColor }]}
            />
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          void handleContinue();
        }}
        activeOpacity={0.88}
      >
        <Text style={styles.buttonText}>
          {currentIndex === SLIDES.length - 1 ? "Get Started" : "Continue"}
        </Text>
        <Text style={styles.buttonArrow}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  slide: {
    width,
    flex: 1,
    alignItems: "center",
  },
  logoZone: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(222,80,21,0.06)",
    alignSelf: "center",
  },
  copyZone: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  copyInner: {
    alignItems: "center",
  },
  headline: {
    fontSize: 40,
    fontWeight: "800",
    color: "#FFFCF2",
    letterSpacing: -1.5,
    textAlign: "center",
    lineHeight: 48,
    marginBottom: 16,
  },
  headlineAccent: {
    color: "#DE5015",
  },
  body: {
    fontSize: 16,
    color: "#8A8480",
    lineHeight: 25,
    textAlign: "center",
    fontWeight: "400",
  },
  dots: {
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 28,
    marginBottom: 20,
    alignItems: "center",
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#DE5015",
    borderRadius: 18,
    height: 58,
    marginHorizontal: 20,
    marginBottom: 8,
    shadowColor: "#DE5015",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 10,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  buttonArrow: {
    fontSize: 26,
    color: "#FFFFFF",
    lineHeight: 28,
  },
});
