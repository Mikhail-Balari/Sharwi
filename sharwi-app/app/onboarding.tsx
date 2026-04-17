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

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: 1,
    headline: "Your work",
    accent: "matters.",
    body: "Most real professional work stays invisible.\nSharwi changes that.",
  },
  {
    id: 2,
    headline: "Sharwi makes\nit",
    accent: "visible.",
    body: "Without self-promotion.\nWithout pressure.",
  },
  {
    id: 3,
    headline: "You stay\nin",
    accent: "control.",
    body: "You decide what gets shared.\nAlways.",
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
      router.replace("/login");
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={[styles.logoWrap, { paddingTop: insets.top + 20 }]}>
        <SharwiLogo size={32} color="#DE5015" />
      </View>

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
        contentContainerStyle={{ alignItems: "flex-end" }}
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
              <Animated.View style={{ opacity, transform: [{ translateY }] }}>
                <Text style={styles.headline}>
                  {slide.headline}
                  {"\n"}
                  <Text style={styles.headlineAccent}>{slide.accent}</Text>
                </Text>

                <Text style={styles.body}>{slide.body}</Text>
              </Animated.View>
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
        <Text style={styles.buttonArrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  logoWrap: {
    position: "absolute",
    left: 24,
    zIndex: 10,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 28,
    paddingBottom: 48,
  },
  headline: {
    fontSize: 46,
    fontWeight: "800",
    color: "#FFFCF2",
    letterSpacing: -1.8,
    lineHeight: 54,
    marginBottom: 18,
  },
  headlineAccent: {
    color: "#DE5015",
  },
  body: {
    fontSize: 17,
    color: "#5C5955",
    lineHeight: 27,
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
