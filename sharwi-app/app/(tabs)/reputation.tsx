import { useCallback, useRef } from "react";
import { Animated } from "react-native";
import { useFocusEffect } from "expo-router";

import { ReputationScoreScreen } from "@/screens/ReputationScoreScreen";

export default function ReputationRoute() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(8)).current;

  useFocusEffect(
    useCallback(() => {
      fadeAnim.setValue(0);
      slideAnim.setValue(8);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }, [fadeAnim, slideAnim]),
  );

  return (
    <Animated.View
      style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      <ReputationScoreScreen />
    </Animated.View>
  );
}
