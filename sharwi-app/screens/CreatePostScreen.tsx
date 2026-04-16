import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Tone = "technical" | "human" | "corporate";

export default function CreatePostScreen() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState<Tone>("human");
  const [generatedPost, setGeneratedPost] = useState("");
  const [generatedTone, setGeneratedTone] = useState<Tone | null>(null);
  const [generated, setGenerated] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  const generatePostByTone = (tone: Tone, input: string) => {
    const achievement = input || "Q4 Pipeline Growth +127%";

    switch (tone) {
      case "technical":
        return `Implemented: ${achievement}.

Focused on system performance, scalability, and reliability. Key challenges included handling edge cases and optimizing throughput under load.

This resulted in measurable improvements across key metrics and reinforced best practices in architecture design.

#Engineering #Scalability #TechLeadership`;

      case "human":
        return `Something I'm genuinely proud of 🙌

We achieved ${achievement}, but what really mattered was the journey behind it.

Late nights, problem-solving, supporting each other — and seeing people grow along the way.

Grateful to be building something meaningful with an incredible team.

#Growth #TeamWins #Learning`;

      case "corporate":
        return `Delivered strong results this quarter: ${achievement}.

This outcome reflects a focused execution strategy, cross-functional alignment, and consistent operational discipline.

The impact extends beyond metrics — strengthening our positioning and enabling scalable growth moving forward.

#BusinessImpact #Leadership #Execution`;

      default:
        return "";
    }
  };

  const handleGenerate = () => {
    const post = generatePostByTone(tone, input);

    // fuerza re-render real
    setGenerated(false);
    setGeneratedPost("");
    setGeneratedTone(null);

    setTimeout(() => {
      setGeneratedPost(post);
      setGeneratedTone(tone);
      setGenerated(true);

      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll}>
        
        {/* HEADER */}
        <Text style={styles.title}>Generate Content</Text>
        <Text style={styles.subtitle}>
          Create posts from your achievements
        </Text>

        {/* INPUT */}
        <View style={styles.card}>
          <Text style={styles.microLabel}>ORIGINAL ACHIEVEMENT</Text>
          <TextInput
            placeholder="Q4 Pipeline Growth +127%"
            placeholderTextColor="#666"
            value={input}
            onChangeText={setInput}
            style={styles.achievementInput}
          />
        </View>

        {/* TONE */}
        <Text style={styles.sectionLabel}>Select tone</Text>

        <View style={styles.toneRow}>
          {(["technical", "human", "corporate"] as Tone[]).map((t) => {
            const active = tone === t;

            return (
              <TouchableOpacity
                key={t}
                onPress={() => setTone(t)}
                style={[
                  styles.toneButton,
                  active && styles.toneActive,
                ]}
              >
                <Text
                  style={[
                    styles.toneText,
                    active && styles.toneTextActive,
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* GENERATE */}
        <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate}>
          <Text style={styles.generateText}>Generate</Text>
        </TouchableOpacity>

        {/* RESULT */}
        {generated && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <Text style={styles.postLabel}>
                  Generated Post • {generatedTone}
                </Text>
              </View>

              <View style={styles.separator} />

              <Text style={styles.postText}>
                {generatedPost}
              </Text>
            </View>

            {/* ACTIONS */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.secondaryBtn}>
                <Text style={styles.secondaryText}>Save draft</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn}>
                <Text style={styles.secondaryText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryText}>
                Share on LinkedIn
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },

  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#888",
    marginBottom: 24,
  },

  card: {
    backgroundColor: "#1C1C1C",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 24,
  },

  microLabel: {
    fontSize: 11,
    color: "#555",
    letterSpacing: 1,
    marginBottom: 8,
  },

  achievementInput: {
    fontSize: 19,
    fontWeight: "700",
    color: "#FFF",
  },

  sectionLabel: {
    fontSize: 15,
    color: "#888",
    marginBottom: 12,
  },

  toneRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  toneButton: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  toneActive: {
    backgroundColor: "rgba(255,107,0,0.12)",
    borderColor: "#FF6B00",
    borderWidth: 1.5,
  },

  toneText: {
    color: "#888",
    fontSize: 13,
    textTransform: "capitalize",
  },

  toneTextActive: {
    color: "#FFF",
    fontWeight: "700",
  },

  generateBtn: {
    backgroundColor: "#FF6B00",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },

  generateText: {
    color: "#FFF",
    fontWeight: "700",
  },

  postCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
  },

  postHeader: {
    marginBottom: 10,
  },

  postLabel: {
    fontSize: 13,
    color: "#555",
    textTransform: "capitalize",
  },

  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
    marginBottom: 14,
  },

  postText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#FFF",
  },

  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    marginBottom: 12,
  },

  secondaryBtn: {
    flex: 1,
    height: 52,
    backgroundColor: "#1A1A1A",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2C2C2C",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryText: {
    color: "#FFF",
    fontWeight: "600",
  },

  primaryBtn: {
    height: 56,
    backgroundColor: "#0A66C2",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});