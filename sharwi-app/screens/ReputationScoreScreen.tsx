import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Activity,
  Check,
  FileText,
  Share2,
  ShieldCheck,
  TrendingUp,
  X,
} from "lucide-react-native";

import { ShareModal } from "@/components/ShareModal";
import { Text } from "@/components/ui/Text";
import { COLORS, TYPOGRAPHY } from "@/constants/theme";

type MetricKey = "activation" | "verified" | "streak" | "speed";

const METRICS_INFO: Record<
  MetricKey,
  {
    label: string;
    value: string;
    sub: string;
    trend: string;
    trendColor: string;
    info: string;
  }
> = {
  activation: {
    label: "Activation rate",
    value: "78%",
    sub: "Publishing consistency",
    trend: "↑ 12% this month",
    trendColor: COLORS.verifiedGreen,
    info: "How often you publish content backed by real work. The higher this number, the more consistent your professional visibility.",
  },
  verified: {
    label: "Verified posts",
    value: "92%",
    sub: "Backed by evidence",
    trend: "↑ 5% this month",
    trendColor: COLORS.verifiedGreen,
    info: "The percentage of your posts connected to real evidence like code, tickets or documents. Sharwi verifies these automatically - no manual work needed.",
  },
  streak: {
    label: "Active streak",
    value: "8",
    sub: "Weeks in a row",
    trend: "Keep it up!",
    trendColor: COLORS.textMuted,
    info: "How many consecutive weeks you've published at least once. Consistency is the #1 driver of professional reputation growth.",
  },
  speed: {
    label: "Draft speed",
    value: "42s",
    sub: "Avg. post generation",
    trend: "Goal <60s ✓",
    trendColor: COLORS.verifiedGreen,
    info: "Average time from describing your work to having a post ready to publish. Sharwi's AI makes this faster than writing it yourself.",
  },
};

const SECONDARY_SKILLS = [
  "API Integration",
  "ML Models",
  "Product Analytics",
  "Python",
  "CRM Systems",
];

const SCORE_DRIVERS = [
  {
    key: "quality",
    title: "Evidence quality",
    sub: "Tickets, code and docs linked to your posts",
    value: "92%",
    Icon: FileText,
    tone: "neutral" as const,
  },
  {
    key: "habit",
    title: "Publishing habit",
    sub: "How regularly you share your work",
    value: "↑ Growing",
    Icon: Activity,
    tone: "success" as const,
  },
  {
    key: "impact",
    title: "Business impact",
    sub: "People clicking and reaching out after your posts",
    value: "8 leads",
    Icon: TrendingUp,
    tone: "neutral" as const,
  },
];

export function ReputationScoreScreen() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeInfo, setActiveInfo] = useState<MetricKey | null>(null);

  const activeMetric = useMemo(
    () => (activeInfo ? METRICS_INFO[activeInfo] : null),
    [activeInfo],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => setShowShareModal(true)} style={({ pressed }) => pressed && styles.pressed}>
            <Share2 size={22} color={COLORS.textTertiary} />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.identityCard}>
            <View style={styles.identityRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>MB</Text>
              </View>

              <View style={styles.identityInfo}>
                <Text style={styles.identityName}>Mikhail Balari</Text>
                <Text style={styles.identityRole}>Business Data Scientist</Text>
                <Text style={styles.identityMeta}>Data · AI · Product</Text>
              </View>

              <View style={styles.verifiedStack}>
                <ShieldCheck size={20} color={COLORS.verifiedGreen} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.verifiedRow}>
              <View style={styles.verifiedLeft}>
                <Check size={12} color={COLORS.verifiedGreen} />
                <Text style={styles.verifiedIdentityText}>Sharwi Verified Identity</Text>
              </View>

              <View style={styles.activeChip}>
                <Text style={styles.activeChipText}>Active</Text>
              </View>
            </View>
          </View>

          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Your Score</Text>

            <View style={styles.scoreRing}>
              <View style={styles.scoreValueRow}>
                <Text style={styles.scoreValue}>87</Text>
                <Text style={styles.scoreDenominator}>/100</Text>
              </View>
              <Text style={styles.scoreRank}>Top 12%</Text>
            </View>

            <Text style={styles.scoreCaption}>Built on 24 verified work moments</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key metrics</Text>

            <View style={styles.metricsGrid}>
              {(Object.entries(METRICS_INFO) as [MetricKey, (typeof METRICS_INFO)[MetricKey]][]).map(
                ([key, metric]) => (
                  <View key={key} style={styles.metricCard}>
                    <View style={styles.metricTopRow}>
                      <Text style={styles.metricLabel}>{metric.label}</Text>
                      <Pressable onPress={() => setActiveInfo(key)} style={({ pressed }) => pressed && styles.pressed}>
                        <View style={styles.infoChip}>
                          <Text style={styles.infoChipText}>i</Text>
                        </View>
                      </Pressable>
                    </View>

                    <Text style={styles.metricValue}>{metric.value}</Text>
                    <Text style={styles.metricSub}>{metric.sub}</Text>
                    <Text style={[styles.metricTrend, { color: metric.trendColor }]}>
                      {metric.trend}
                    </Text>
                  </View>
                ),
              )}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top skills</Text>
              <Text style={styles.sectionMeta}>Verified from your work</Text>
            </View>

            <View style={styles.skillsWrap}>
              <View style={styles.skillChipAccent}>
                <Text style={styles.skillChipAccentText}>Data Science</Text>
              </View>

              {SECONDARY_SKILLS.map((skill) => (
                <View key={skill} style={styles.skillChip}>
                  <Text style={styles.skillChipText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What builds your score</Text>

            {SCORE_DRIVERS.map((item, index) => (
              <View
                key={item.key}
                style={[
                  styles.driverRow,
                  index !== SCORE_DRIVERS.length - 1 && styles.driverRowBorder,
                ]}
              >
                <item.Icon size={20} color={COLORS.accentOrange} />

                <View style={styles.driverCopy}>
                  <Text style={styles.driverTitle}>{item.title}</Text>
                  <Text style={styles.driverSub}>{item.sub}</Text>
                </View>

                <Text
                  style={[
                    styles.driverValue,
                    item.tone === "success" && styles.driverValueSuccess,
                  ]}
                >
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {activeMetric ? (
          <Modal
            visible
            transparent
            animationType="fade"
            onRequestClose={() => setActiveInfo(null)}
          >
            <View style={styles.infoOverlay}>
              <View style={styles.infoModal}>
                <View style={styles.infoHeader}>
                  <Text style={styles.infoTitle}>{activeMetric.label}</Text>
                  <Pressable onPress={() => setActiveInfo(null)} style={({ pressed }) => pressed && styles.pressed}>
                    <X size={18} color={COLORS.textTertiary} />
                  </Pressable>
                </View>

                <Text style={styles.infoBody}>{activeMetric.info}</Text>

                <View style={styles.infoDivider} />

                <Pressable
                  onPress={() => setActiveInfo(null)}
                  style={({ pressed }) => [
                    styles.infoButton,
                    pressed && styles.infoButtonPressed,
                  ]}
                >
                  <Text style={styles.infoButtonText}>Got it</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : null}

        <ShareModal
          visible={showShareModal}
          onClose={() => setShowShareModal(false)}
          mode="badge"
        />
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  identityCard: {
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(46,204,113,0.20)",
    padding: 18,
    marginBottom: 16,
  },
  identityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.cardSecondary,
    borderWidth: 1.5,
    borderColor: COLORS.accentOrange,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
    color: COLORS.accentOrange,
    includeFontPadding: false,
  },
  identityInfo: {
    flex: 1,
  },
  identityName: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  identityRole: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  identityMeta: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textMuted,
    marginTop: 1,
  },
  verifiedStack: {
    alignItems: "center",
    gap: 3,
  },
  verifiedText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.verifiedGreen,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: 14,
  },
  verifiedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedLeft: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  verifiedIdentityText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.verifiedGreen,
  },
  activeChip: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(46,204,113,0.25)",
    backgroundColor: "rgba(46,204,113,0.10)",
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  activeChipText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.verifiedGreen,
  },
  scoreCard: {
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
  },
  scoreLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textTertiary,
    letterSpacing: 0.8,
    marginBottom: 20,
  },
  scoreRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.backgroundSurface,
    borderWidth: 3,
    borderColor: COLORS.accentOrange,
    shadowColor: COLORS.accentOrange,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  scoreValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 52,
    lineHeight: 58,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: -2,
    includeFontPadding: false,
  },
  scoreDenominator: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.textTertiary,
    marginLeft: 2,
  },
  scoreRank: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.accentOrange,
    marginTop: 2,
    textAlign: "center",
  },
  scoreCaption: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textTertiary,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionMeta: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textMuted,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  metricCard: {
    width: "48.5%",
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
  },
  metricTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  metricLabel: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textTertiary,
    letterSpacing: 0.3,
  },
  infoChip: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.cardSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  infoChipText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textPrimary,
    includeFontPadding: false,
  },
  metricValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  metricSub: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  metricTrend: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
  },
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillChipAccent: {
    backgroundColor: "rgba(222,80,21,0.10)",
    borderColor: "rgba(222,80,21,0.3)",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skillChipAccentText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.accentOrange,
  },
  skillChip: {
    backgroundColor: COLORS.cardPrimary,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skillChipText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textTertiary,
  },
  driverRow: {
    flexDirection: "row",
    gap: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  driverRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardPrimary,
  },
  driverCopy: {
    flex: 1,
  },
  driverTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  driverSub: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  driverValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  driverValueSuccess: {
    fontSize: 13,
    color: COLORS.verifiedGreen,
  },
  infoOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  infoModal: {
    width: "100%",
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 24,
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  infoTitle: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  infoBody: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  infoDivider: {
    height: 1,
    backgroundColor: COLORS.cardSecondary,
    marginVertical: 16,
  },
  infoButton: {
    backgroundColor: COLORS.accentOrange,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  infoButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  infoButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },
  bottomSpacer: {
    height: 100,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
});
