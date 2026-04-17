import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ShareModal } from "@/components/ShareModal";
import { Text } from "@/components/ui/Text";
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from "@/constants/theme";

type ToneOption = "Professional" | "Analytical" | "Executive";

const toneOptions: ToneOption[] = ["Professional", "Analytical", "Executive"];

const microcopy: Record<ToneOption, string> = {
  Professional: "Clear & credible. Works for any audience.",
  Analytical: "Data-first. Precise outcomes.",
  Executive: "Big picture. Strategic impact.",
};

const toneMap: Record<ToneOption, string> = {
  Professional:
    "Direct, credible and clear. Works for any audience and industry. Shows real impact without being arrogant.",
  Analytical:
    "Data-driven and precise. Leads with numbers and specific outcomes. Technical but readable by non-technical people.",
  Executive:
    "Strategic and high-level. Emphasizes business impact, broader implications and decisions made.",
};

async function generateDraft(
  inputText: string,
  tone: string,
  evidenceChips: string[],
) {
  const evidenceText = evidenceChips.length > 0
    ? `This work is backed by: ${evidenceChips.join(", ")}.`
    : "";

  const prompt = `You are helping a professional write a short LinkedIn post about their work.

Work description: "${inputText}"
${evidenceText}
Tone: ${toneMap[tone as ToneOption]}

Write a compelling LinkedIn post (max 200 words) that:
- Opens with a strong first line (NOT "Excited to share" or "Pleased to announce")
- Describes the work and its real-world impact in plain, human language
- Could be written by someone in ANY industry or profession
- Ends with a short insight or lesson
- Includes 2-3 relevant hashtags at the end only
- Feels authentic - not corporate, not AI-generated
- Is conversational and easy to read

Return ONLY the post text. No explanation. No preamble. Just the post.`;

  const apiKey = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

  if (apiKey && apiKey !== "sk-ant-api03-PLACEHOLDER") {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 400,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();

      if (data.content && data.content[0] && data.content[0].text) {
        return data.content[0].text.trim();
      }
    } catch (error) {
      console.log("API error, using mock:", error);
    }
  }

  const mockDrafts: Record<string, string[]> = {
    Professional: [
      `${inputText}\n\nThis wasn't just a technical task. It was a real business problem that needed solving.\n\nThe kind of work that doesn't get announced in all-hands meetings, but keeps things running.\n\n#ProfessionalGrowth #Work`,
      `Finished something worth sharing: ${inputText}\n\nSmall improvements, compounded over time, are what actually move organizations forward.\n\n#Progress #Impact`,
      `${inputText}\n\nThe best outcomes usually come from solving problems nobody else wanted to touch.\n\n#Work #Results`,
    ],
    Analytical: [
      `${inputText}\n\nKey outcome: measurable improvement in the area that mattered most.\nApproach: systematic analysis before any implementation.\nResult: zero rollbacks post-launch.\n\n#DataDriven #Engineering`,
      `${inputText}\n\nBy the numbers: scope defined, executed, validated. No surprises.\nThe process was as important as the output.\n\n#Analytics #Results`,
    ],
    Executive: [
      `${inputText}\n\nThe strategic implication: our team now operates faster, with less risk, and more clarity.\n\nThat's the kind of work that scales.\n\n#Leadership #Strategy`,
      `${inputText}\n\nEvery operational improvement is an investment in future capacity.\nThis one pays dividends.\n\n#ExecutiveLeadership #BusinessImpact`,
    ],
  };

  const options = mockDrafts[tone] || mockDrafts.Professional;
  return options[Math.floor(Math.random() * options.length)];
}

export default function CreatePostScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    prefillText?: string;
    prefillEvidence?: string;
  }>();
  const [inputText, setInputText] = useState("");
  const [selectedTone, setSelectedTone] = useState<ToneOption>("Professional");
  const [evidenceChips, setEvidenceChips] = useState<string[]>([
    "#PR-2847",
    "Jira TKT-491",
    "metrics.pdf",
  ]);
  const [draftText, setDraftText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEvidenceSheet, setShowEvidenceSheet] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const draftOpacity = useRef(new Animated.Value(0)).current;
  const draftTranslateY = useRef(new Animated.Value(12)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const editInputRef = useRef<TextInput>(null);

  const hasDraft = draftText.length > 0;

  useEffect(() => {
    if (!draftText) {
      return;
    }

    draftOpacity.setValue(0);
    draftTranslateY.setValue(12);

    Animated.parallel([
      Animated.timing(draftOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(draftTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [draftOpacity, draftText, draftTranslateY]);

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        editInputRef.current?.measureLayout(
          scrollViewRef.current?.getInnerViewNode?.() as any,
          (_x, y) => {
            scrollViewRef.current?.scrollTo({ y: y - 20, animated: true });
          },
          () => {},
        );
        editInputRef.current?.focus();
      }, 100);
    }
  }, [isEditing]);

  useEffect(() => {
    if (!params.prefillText && !params.prefillEvidence) {
      return;
    }

    const nextText =
      typeof params.prefillText === "string" ? params.prefillText : "";

    let nextEvidence = evidenceChips;

    if (typeof params.prefillEvidence === "string") {
      try {
        const parsed = JSON.parse(params.prefillEvidence);
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
          nextEvidence = parsed;
        }
      } catch {
        nextEvidence = evidenceChips;
      }
    }

    if (nextText) {
      setInputText(nextText);
      setDraftText(nextText);
      setIsEditing(true);
    }

    setEvidenceChips(nextEvidence);
  }, [params.prefillEvidence, params.prefillText]);

  const shareText = useMemo(() => {
    return draftText || "Check my Sharwi verified professional profile: https://sharwi.com/profile/mikhail-balari";
  }, [draftText]);

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      return;
    }

    setIsGenerating(true);
    setIsEditing(false);

    try {
      const result = await generateDraft(inputText, selectedTone, evidenceChips);
      setDraftText(result);
    } catch {
      setDraftText("Could not generate draft. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(draftText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const addEvidence = (chip: string) => {
    setEvidenceChips((prev) => [...prev, chip]);
    setShowEvidenceSheet(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: hasDraft ? 160 : 160 + insets.bottom },
            ]}
          >
            <View style={styles.inputCard}>
              <Text style={styles.label}>What did you work on?</Text>

              <TextInput
                multiline
                maxLength={280}
                placeholder="e.g. Finished the API integration. Cut processing time by 40%."
                placeholderTextColor="#3A3735"
                selectionColor={COLORS.accentOrange}
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                textAlignVertical="top"
              />

              <View style={styles.divider} />

              <View style={styles.evidenceHeader}>
                <Text style={styles.evidenceLabel}>Evidence</Text>

                <Pressable
                  onPress={() => setShowEvidenceSheet(true)}
                  style={({ pressed }) => pressed && styles.pressed}
                >
                  <View style={styles.addRow}>
                    <Text style={styles.addText}>+ Add</Text>
                  </View>
                </Pressable>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.evidenceRow}
              >
                {evidenceChips.map((chip, index) => (
                  <Pressable
                    key={`${chip}-${index}`}
                    onPress={() => setEvidenceChips((prev) => prev.filter((_, i) => i !== index))}
                    style={({ pressed }) => [
                      styles.evidenceChip,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.evidenceChipText}>{chip}</Text>
                    <MaterialCommunityIcons
                      name="close"
                      size={9}
                      color={COLORS.textMuted}
                    />
                  </Pressable>
                ))}
              </ScrollView>

              <View style={styles.counterRow}>
                <Text style={styles.counterText}>{inputText.length} / 280</Text>
              </View>
            </View>

            <View style={styles.block}>
              <Text style={styles.voiceLabel}>Voice tone</Text>

              <View style={styles.toneRow}>
                {toneOptions.map((tone) => {
                  const active = selectedTone === tone;

                  return (
                    <Pressable
                      key={tone}
                      onPress={() => setSelectedTone(tone)}
                      style={({ pressed }) => [
                        styles.toneButton,
                        active && styles.toneButtonActive,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text style={[styles.toneText, active && styles.toneTextActive]}>
                        {tone}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={styles.microcopy}>{microcopy[selectedTone]}</Text>
            </View>

            <Pressable
              onPress={handleGenerate}
              disabled={isGenerating || !inputText.trim()}
              style={({ pressed }) => [
                styles.generateButton,
                (isGenerating || !inputText.trim()) && styles.generateButtonDisabled,
                pressed && styles.generateButtonPressed,
              ]}
            >
              {isGenerating ? (
                <View style={styles.generateRow}>
                  <ActivityIndicator size="small" color={COLORS.white} />
                  <Text style={styles.generateText}>Generating...</Text>
                </View>
              ) : !inputText.trim() ? (
                <Text style={styles.generateTextDisabled}>Write something first</Text>
              ) : (
                <View style={styles.generateRow}>
                  <Text style={styles.lightning}>⚡</Text>
                  <Text style={styles.generateText}>Generate Draft</Text>
                </View>
              )}
            </Pressable>

            {!hasDraft ? (
              <Text style={styles.hint}>Your work · Your voice · Verified by Sharwi</Text>
            ) : null}

            {hasDraft ? (
              <Animated.View
                style={[
                  styles.draftBlock,
                  {
                    opacity: draftOpacity,
                    transform: [{ translateY: draftTranslateY }],
                  },
                ]}
              >
                <View style={styles.draftHeader}>
                  <View style={styles.draftReadyRow}>
                    <View style={styles.readyDot} />
                    <Text style={styles.draftReadyText}>Draft ready</Text>
                  </View>

                  <View style={styles.proofChip}>
                    <Text style={styles.proofChipText}>✓ proof-backed</Text>
                  </View>
                </View>

                <View style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>MB</Text>
                    </View>

                    <View>
                      <Text style={styles.postAuthor}>Mikhail Balari</Text>
                      <Text style={styles.postRole}>Business Data Scientist</Text>
                    </View>
                  </View>

                  {isEditing ? (
                    <TextInput
                      ref={editInputRef}
                      autoFocus={false}
                      multiline
                      scrollEnabled={false}
                      value={draftText}
                      onChangeText={setDraftText}
                      style={styles.editor}
                      selectionColor={COLORS.accentOrange}
                      textAlignVertical="top"
                    />
                  ) : (
                    <Text style={styles.postBody}>{draftText}</Text>
                  )}

                  <View style={styles.dividerSoft} />

                  <View style={styles.actionRow}>
                    <View style={styles.leftActions}>
                      <Pressable
                        onPress={handleGenerate}
                        style={({ pressed }) => [styles.actionAccent, pressed && styles.pressed]}
                      >
                        <View style={styles.actionInner}>
                          <Text style={styles.actionAccentGlyph}>↻</Text>
                          <Text style={styles.actionAccentText}>Redo</Text>
                        </View>
                      </Pressable>

                      <Pressable
                        onPress={() => setIsEditing((prev) => !prev)}
                        style={({ pressed }) => [styles.actionNeutral, pressed && styles.pressed]}
                      >
                        <View style={styles.actionInner}>
                          <Text
                            style={[
                              styles.actionNeutralGlyph,
                              isEditing && styles.actionSuccessText,
                            ]}
                          >
                            {isEditing ? "✓" : "✎"}
                          </Text>
                          <Text
                            style={[
                              styles.actionNeutralText,
                              isEditing && styles.actionSuccessText,
                            ]}
                          >
                            {isEditing ? "Done" : "Edit"}
                          </Text>
                        </View>
                      </Pressable>

                      <Pressable
                        onPress={handleCopy}
                        style={({ pressed }) => [
                          copySuccess ? styles.actionSuccess : styles.actionNeutral,
                          pressed && styles.pressed,
                        ]}
                      >
                        <View style={styles.actionInner}>
                          <Text
                            style={[
                              styles.actionNeutralGlyph,
                              copySuccess && styles.actionSuccessText,
                            ]}
                          >
                            {copySuccess ? "✓" : "⎘"}
                          </Text>
                          <Text
                            style={[
                              styles.actionNeutralText,
                              copySuccess && styles.actionSuccessText,
                            ]}
                          >
                            {copySuccess ? "Copied!" : "Copy"}
                          </Text>
                        </View>
                      </Pressable>
                    </View>

                    <Pressable
                      onPress={() => setShowShareModal(true)}
                      style={({ pressed }) => [
                        styles.publishButton,
                        pressed && styles.generateButtonPressed,
                      ]}
                    >
                      <View style={styles.actionInner}>
                        <Text style={styles.publishGlyph}>↗</Text>
                        <Text style={styles.publishText}>Publish</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </Animated.View>
            ) : null}
          </ScrollView>
        </KeyboardAvoidingView>

        <ShareModal
          visible={showShareModal}
          onClose={() => setShowShareModal(false)}
          mode="post"
          shareText={shareText}
        />

        <Modal
          visible={showEvidenceSheet}
          animationType="slide"
          presentationStyle="pageSheet"
          transparent
          onRequestClose={() => setShowEvidenceSheet(false)}
        >
          <View style={styles.sheetOverlay}>
            <View style={styles.sheet}>
              <View style={styles.sheetHandle} />

              <Text style={styles.sheetTitle}>Link evidence</Text>
              <Text style={styles.sheetSubtitle}>
                Connect your work artifacts to verify this post
              </Text>

              <View style={styles.sheetGrid}>
                <Pressable
                  onPress={() => addEvidence(`#PR-${Math.floor(Math.random() * 8000) + 1000}`)}
                  style={({ pressed }) => [styles.sheetOption, pressed && styles.pressed]}
                >
                  <Text style={styles.sheetOptionGlyph}>⌥</Text>
                  <Text style={styles.sheetOptionTitle}>GitHub PR</Text>
                  <Text style={styles.sheetOptionSubtitle}>Pull requests</Text>
                </Pressable>

                <Pressable
                  onPress={() => addEvidence(`TKT-${Math.floor(Math.random() * 900) + 100}`)}
                  style={({ pressed }) => [styles.sheetOption, pressed && styles.pressed]}
                >
                  <Text style={styles.sheetOptionGlyph}>◈</Text>
                  <Text style={styles.sheetOptionTitle}>Jira Ticket</Text>
                  <Text style={styles.sheetOptionSubtitle}>Issues & tasks</Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    addEvidence(`doc-${Date.now().toString().slice(-4)}.pdf`)
                  }
                  style={({ pressed }) => [styles.sheetOption, pressed && styles.pressed]}
                >
                  <Text style={styles.sheetOptionGlyph}>▤</Text>
                  <Text style={styles.sheetOptionTitle}>Document</Text>
                  <Text style={styles.sheetOptionSubtitle}>Docs, slides, reports</Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    addEvidence(
                      `metrics-${new Date().toLocaleDateString("en", { month: "short" })}.csv`,
                    )
                  }
                  style={({ pressed }) => [styles.sheetOption, pressed && styles.pressed]}
                >
                  <Text style={styles.sheetOptionGlyph}>↗</Text>
                  <Text style={styles.sheetOptionTitle}>Metrics</Text>
                  <Text style={styles.sheetOptionSubtitle}>Data & analytics</Text>
                </Pressable>
              </View>

              <Pressable
                onPress={() => setShowEvidenceSheet(false)}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.sheetCancel}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundDeep,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDeep,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputCard: {
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 18,
    marginBottom: 16,
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  input: {
    backgroundColor: COLORS.transparent,
    borderWidth: 0,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.textPrimary,
    lineHeight: 24,
    minHeight: 90,
    maxHeight: 200,
    padding: 0,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardSecondary,
    marginVertical: 14,
  },
  evidenceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  evidenceLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textTertiary,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  addText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.accentOrange,
  },
  evidenceRow: {
    gap: 8,
    paddingRight: 6,
  },
  evidenceChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: COLORS.cardSecondary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardAccentBorder,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  evidenceChipText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textSecondary,
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  counterText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textMuted,
  },
  block: {
    marginBottom: 16,
  },
  voiceLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textTertiary,
    marginBottom: 10,
  },
  toneRow: {
    flexDirection: "row",
    gap: 8,
  },
  toneButton: {
    flex: 1,
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: 13,
    alignItems: "center",
  },
  toneButtonActive: {
    backgroundColor: "rgba(222,80,21,0.10)",
    borderWidth: 1.5,
    borderColor: COLORS.accentOrange,
  },
  toneText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textMuted,
  },
  toneTextActive: {
    fontWeight: "700",
    color: COLORS.accentOrange,
  },
  microcopy: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: 6,
  },
  generateButton: {
    backgroundColor: COLORS.accentOrange,
    borderRadius: 16,
    height: 54,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  generateButtonDisabled: {
    backgroundColor: COLORS.chipBg,
  },
  generateButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  generateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  lightning: {
    fontSize: 16,
  },
  generateText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.white,
  },
  generateTextDisabled: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  hint: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.cardAccentBorder,
    textAlign: "center",
  },
  draftBlock: {
    marginTop: 20,
  },
  draftHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  draftReadyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  readyDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.verifiedGreen,
  },
  draftReadyText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  proofChip: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(46,204,113,0.3)",
    backgroundColor: "rgba(46,204,113,0.10)",
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  proofChipText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.verifiedGreen,
  },
  postCard: {
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.cardSecondary,
    borderWidth: 1.5,
    borderColor: COLORS.accentOrange,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
    color: COLORS.accentOrange,
    includeFontPadding: false,
  },
  postAuthor: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  postRole: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textTertiary,
  },
  postBody: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  editor: {
    backgroundColor: COLORS.cardSecondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardAccentBorder,
    padding: 12,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textPrimary,
    lineHeight: 22,
    minHeight: 160,
    textAlignVertical: "top",
  },
  dividerSoft: {
    height: 1,
    backgroundColor: COLORS.cardSecondary,
    marginVertical: 14,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  leftActions: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    flex: 1,
  },
  actionAccent: {
    backgroundColor: "rgba(222,80,21,0.08)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(222,80,21,0.3)",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  actionAccentGlyph: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    color: COLORS.accentOrange,
  },
  actionAccentText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.accentOrange,
  },
  actionNeutral: {
    backgroundColor: COLORS.cardSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardAccentBorder,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  actionSuccess: {
    backgroundColor: "rgba(46,204,113,0.10)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(46,204,113,0.3)",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  actionInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  actionNeutralGlyph: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  actionNeutralText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  actionSuccessText: {
    color: COLORS.verifiedGreen,
  },
  publishButton: {
    backgroundColor: COLORS.accentOrange,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  publishGlyph: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    color: COLORS.white,
  },
  publishText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.white,
  },
  sheetOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: COLORS.backgroundSurface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.cardAccentBorder,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 24,
  },
  sheetTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  sheetSubtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.textTertiary,
    marginBottom: 24,
  },
  sheetGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  sheetOption: {
    width: "47%",
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 18,
    alignItems: "center",
    gap: 8,
  },
  sheetOptionGlyph: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 26,
    fontWeight: "600",
    color: COLORS.accentOrange,
  },
  sheetOptionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },
  sheetOptionSubtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textMuted,
    textAlign: "center",
  },
  sheetCancel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textTertiary,
    textAlign: "center",
    marginTop: 16,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
