import { Fragment, useMemo, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ChevronRight,
  Globe,
  Lock,
  LogOut,
  Share2,
  Users,
  X,
} from "lucide-react-native";
import { router } from "expo-router";

import { ShareModal } from "@/components/ShareModal";
import { StatusChip } from "@/components/ui/StatusChip";
import { Text } from "@/components/ui/Text";
import { COLORS, TYPOGRAPHY } from "@/constants/theme";
import { logoutUser } from "@/services/api/auth";
import { DEMO_USER, isDemoMode } from "@/services/demo-mode";

type ShareMode = "badge" | "profile";
type StatKey = "moments" | "score" | "verified";

type RecentPost = {
  id: string;
  title: string;
  subtitle: string;
  status: "published" | "draft";
  evidence: string[];
  clickRate: string | null;
  leads: number | null;
  fullText: string;
  date: string;
};

const STAT_INFO: Record<
  StatKey,
  { label: string; value: string; info: string }
> = {
  moments: {
    label: "Work moments",
    value: "24",
    info: "The number of professional achievements you have logged and turned into posts using Sharwi. Each one is verified with evidence.",
  },
  score: {
    label: "Your score",
    value: "87",
    info: "Your Sharwi Reputation Score out of 100. Built from evidence quality, publishing consistency, and the real business impact of your posts.",
  },
  verified: {
    label: "Verified",
    value: "92%",
    info: "Percentage of your posts backed by real evidence - code, tickets, documents. This is what makes your profile different from a regular LinkedIn profile.",
  },
};

const RECENT_POSTS: RecentPost[] = [
  {
    id: "1",
    title: "API integration shipped",
    subtitle: "Salesforce sync -40% latency",
    status: "published",
    evidence: ["#PR-2847"],
    clickRate: "2.4%",
    leads: 3,
    fullText:
      "Closed a critical API integration that cut Salesforce sync time by 40%.\n\nSales team no longer loses deals to data lag.\n\nWork that moves the business, not just the sprint board.\n\n#Engineering #Impact",
    date: "2h ago",
  },
  {
    id: "2",
    title: "Onboarding flow redesign",
    subtitle: "Time-on-task -28%",
    status: "published",
    evidence: ["#PR-2791"],
    clickRate: "1.8%",
    leads: 1,
    fullText:
      "Shipped the new onboarding flow after 3 weeks of iteration.\n\nTime-on-task dropped 28%. Less friction, more activation.\n\nSmall UX decisions compound.\n\n#Product #UX",
    date: "Yesterday",
  },
  {
    id: "3",
    title: "Churn prediction model",
    subtitle: "200+ accounts flagged",
    status: "draft",
    evidence: ["ML-044"],
    clickRate: null,
    leads: null,
    fullText:
      "Built a churn prediction model that flagged 200+ at-risk accounts before renewal season.\n\nPreliminary results show 18% reduction.\n\nStill validating - but the signal is strong.\n\n#DataScience #ML",
    date: "2 days ago",
  },
];

const SKILLS = [
  "API Integration",
  "ML Models",
  "Product Analytics",
  "Python",
  "CRM · Salesforce",
];

const activeCareer = {
  company: "[Current Company]",
  period: "2023 -> Now",
  role: "Business Data Scientist Manager",
};

const previousCareer = {
  company: "[Previous Company]",
  period: "2021 -> 2023",
  role: "Data Analyst",
};

export function ProfileScreen() {
  const demoMode = isDemoMode();
  const profileUser = demoMode
    ? DEMO_USER
    : {
        fullName: "Mikhail Balari",
        role: "Business Data Scientist",
        headline: "Manager - Data & AI",
      };
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareMode, setShareMode] = useState<ShareMode>("profile");
  const [showStatInfo, setShowStatInfo] = useState<StatKey | null>(null);

  const activeStat = useMemo(
    () => (showStatInfo ? STAT_INFO[showStatInfo] : null),
    [showStatInfo],
  );

  const openPost = (post: RecentPost) => {
    router.push({
      pathname: "/post-detail",
      params: {
        post: JSON.stringify(post),
      },
    });
  };

  const handleLogout = async () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          await logoutUser();
          await AsyncStorage.removeItem("sharwi_onboarding_done");
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          {demoMode ? (
            <View style={styles.demoBadge}>
              <Text style={styles.demoBadgeText}>DEMO MODE</Text>
            </View>
          ) : (
            <Pressable
              onPress={() => {
                void handleLogout();
              }}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <LogOut size={20} color={COLORS.textTertiary} />
            </Pressable>
          )}

          <Pressable
            onPress={() => {
              setShareMode("profile");
              setShowShareModal(true);
            }}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Share2 size={22} color={COLORS.textTertiary} />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.heroCard}>
            <View style={styles.heroRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>MB</Text>
              </View>

              <View style={styles.identityBlock}>
                <Text style={styles.name}>{profileUser.fullName}</Text>
                <Text style={styles.role}>{profileUser.role}</Text>
                <Text style={styles.roleMeta}>{profileUser.headline}</Text>

                <View style={styles.opportunityChip}>
                  <Text style={styles.opportunityText}>Open to opportunities</Text>
                </View>
              </View>

              <View style={styles.badgeStack}>
                <View style={styles.badgeOrb}>
                  <Text style={styles.badgeOrbText}>S</Text>
                </View>
                <Text style={styles.badgeLabel}>Sharwi</Text>
                <Text style={styles.badgeVerified}>Verified</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.portableRow}>
              <Globe size={13} color={COLORS.textTertiary} />
              <Text style={styles.portableLabel}>Portable identity</Text>
              <Text style={styles.portableCopy}>- yours, not your employer&apos;s</Text>
            </View>

            <View style={styles.statsRow}>
              {(Object.entries(STAT_INFO) as [StatKey, (typeof STAT_INFO)[StatKey]][]).map(
                ([key, stat], index) => (
                  <Fragment key={key}>
                    {index > 0 ? <View style={styles.statDivider} /> : null}
                    <View style={styles.statColumn}>
                      <View style={styles.statValueRow}>
                        <Text
                          style={[
                            styles.statValue,
                            key === "score" && styles.statValueAccent,
                          ]}
                        >
                          {stat.value}
                        </Text>
                        <Pressable onPress={() => setShowStatInfo(key)} style={({ pressed }) => pressed && styles.pressed}>
                          <View style={styles.infoPill}>
                            <Text style={styles.infoPillText}>i</Text>
                          </View>
                        </Pressable>
                      </View>
                      <Text style={styles.statLabel}>{stat.label}</Text>
                    </View>
                  </Fragment>
                ),
              )}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top skills</Text>
              <Text style={styles.sectionMeta}>From your work</Text>
            </View>

            <View style={styles.skillsWrap}>
              <View style={styles.skillChipAccent}>
                <Text style={styles.skillChipAccentText}>Data Science</Text>
              </View>

              {SKILLS.map((skill) => (
                <View key={skill} style={styles.skillChip}>
                  <Text style={styles.skillChipText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent posts</Text>
            </View>

            {RECENT_POSTS.map((post) => (
              <Pressable
                key={post.id}
                onPress={() => openPost(post)}
                style={({ pressed }) => [styles.postCard, pressed && styles.pressed]}
              >
                <View style={styles.postTopRow}>
                  <View style={styles.postCopy}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <Text style={styles.postSubtitle}>{post.subtitle}</Text>

                    <View style={styles.postMetaRow}>
                      <StatusChip status={post.status} />

                      {post.evidence[0] ? (
                        <View style={styles.evidencePill}>
                          <Text style={styles.evidencePillText}>{post.evidence[0]}</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>

                  <View style={styles.postAside}>
                    {post.status === "published" ? (
                      <View style={styles.performanceWrap}>
                        <Text style={styles.postPerformance}>{post.clickRate} click rate</Text>
                        <View style={styles.leadsRow}>
                          <Users size={11} color={COLORS.verifiedGreen} />
                          <Text style={styles.postLeads}>{post.leads} leads</Text>
                        </View>
                      </View>
                    ) : (
                      <Text style={styles.editDraftText}>Edit -&gt;</Text>
                    )}

                    <ChevronRight size={14} color={COLORS.cardAccentBorder} />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Career history</Text>
              <View style={styles.portableMeta}>
                <Lock size={12} color={COLORS.textMuted} />
                <Text style={styles.sectionMeta}>Portable</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineBarActive} />

              <View style={styles.timelineCopy}>
                <View style={styles.timelineHeader}>
                  <Text style={styles.timelineCompany}>{activeCareer.company}</Text>
                  <Text style={styles.timelinePeriod}>{activeCareer.period}</Text>
                </View>
                <Text style={styles.timelineRole}>{activeCareer.role}</Text>
                <View style={styles.timelineMetaRow}>
                  <Text style={styles.timelineMeta}>24 work moments</Text>
                  <Text style={styles.timelineMeta}>·</Text>
                  <Text style={styles.timelineMetaAccent}>87 score</Text>
                </View>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineBarInactive} />

              <View style={styles.timelineCopy}>
                <View style={styles.timelineHeader}>
                  <Text style={styles.timelineCompanyInactive}>{previousCareer.company}</Text>
                  <Text style={styles.timelinePeriod}>{previousCareer.period}</Text>
                </View>
                <Text style={styles.timelineRoleInactive}>{previousCareer.role}</Text>
                <Text style={styles.timelineMeta}>8 work moments · Portable history</Text>
              </View>
            </View>
          </View>

          <View style={styles.badgeCard}>
            <View style={styles.badgeCopy}>
              <Text style={styles.badgeTitle}>Sharwi Verified Badge</Text>
              <Text style={styles.badgeSubtitle}>Share your proof-backed identity</Text>
            </View>

            <Pressable
              onPress={() => {
                setShareMode("badge");
                setShowShareModal(true);
              }}
              style={({ pressed }) => [styles.shareButton, pressed && styles.shareButtonPressed]}
            >
              <Share2 size={13} color={COLORS.white} />
              <Text style={styles.shareButtonText}>Share</Text>
            </Pressable>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {activeStat ? (
          <Modal
            visible
            transparent
            animationType="fade"
            onRequestClose={() => setShowStatInfo(null)}
          >
            <View style={styles.infoOverlay}>
              <View style={styles.infoModal}>
                <View style={styles.infoHeader}>
                  <Text style={styles.infoTitle}>{activeStat.label}</Text>
                  <Pressable onPress={() => setShowStatInfo(null)} style={({ pressed }) => pressed && styles.pressed}>
                    <X size={18} color={COLORS.textTertiary} />
                  </Pressable>
                </View>

                <Text style={styles.infoBody}>{activeStat.info}</Text>

                <View style={styles.infoDivider} />

                <Pressable
                  onPress={() => setShowStatInfo(null)}
                  style={({ pressed }) => [styles.infoButton, pressed && styles.shareButtonPressed]}
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
          mode={shareMode}
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
    alignItems: "center",
    gap: 16,
  },
  demoBadge: {
    backgroundColor: "rgba(222,80,21,0.12)",
    borderWidth: 1,
    borderColor: "rgba(222,80,21,0.25)",
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  demoBadgeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.accentOrange,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  heroCard: {
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 20,
    marginBottom: 14,
    shadowColor: COLORS.accentOrange,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.07,
    shadowRadius: 28,
    elevation: 4,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.cardSecondary,
    borderWidth: 2,
    borderColor: COLORS.accentOrange,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "700",
    color: COLORS.accentOrange,
    includeFontPadding: false,
  },
  identityBlock: {
    flex: 1,
  },
  name: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
  },
  role: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textSecondary,
    marginTop: 3,
  },
  roleMeta: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  opportunityChip: {
    alignSelf: "flex-start",
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardAccentBorder,
    backgroundColor: "rgba(222,80,21,0.08)",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  opportunityText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.accentOrange,
  },
  badgeStack: {
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
  },
  badgeOrb: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.backgroundSurface,
    borderWidth: 1.5,
    borderColor: COLORS.verifiedGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeOrbText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    color: COLORS.accentOrange,
    includeFontPadding: false,
  },
  badgeLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: "600",
    color: COLORS.textTertiary,
  },
  badgeVerified: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: "600",
    color: COLORS.verifiedGreen,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: 16,
  },
  portableRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  portableLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textTertiary,
  },
  portableCopy: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textMuted,
    fontStyle: "italic",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.cardBorder,
  },
  statColumn: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  statValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  statValueAccent: {
    color: COLORS.accentOrange,
  },
  infoPill: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.cardSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  infoPillText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.textMuted,
    includeFontPadding: false,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textTertiary,
    textAlign: "center",
  },
  section: {
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textTertiary,
  },
  sectionMeta: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textMuted,
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
  postCard: {
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 14,
    marginBottom: 10,
  },
  postTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  postCopy: {
    flex: 1,
    marginRight: 12,
  },
  postTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  postSubtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textTertiary,
  },
  postMetaRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 6,
    alignItems: "center",
    flexWrap: "wrap",
  },
  evidencePill: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardAccentBorder,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  evidencePillText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: "400",
    color: COLORS.textTertiary,
  },
  postAside: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    minHeight: 50,
  },
  performanceWrap: {
    alignItems: "flex-end",
    gap: 2,
  },
  postPerformance: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  leadsRow: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  postLeads: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.verifiedGreen,
  },
  editDraftText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.accentOrange,
  },
  portableMeta: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  timelineItem: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 12,
  },
  timelineBarActive: {
    width: 2,
    height: 60,
    backgroundColor: COLORS.accentOrange,
    borderRadius: 1,
  },
  timelineBarInactive: {
    width: 2,
    height: 52,
    backgroundColor: COLORS.cardBorder,
    borderRadius: 1,
  },
  timelineCopy: {
    flex: 1,
  },
  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  timelineCompany: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  timelineCompanyInactive: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textTertiary,
  },
  timelinePeriod: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textMuted,
  },
  timelineRole: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  timelineRoleInactive: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textMuted,
    marginTop: 2,
  },
  timelineMetaRow: {
    flexDirection: "row",
    marginTop: 6,
    gap: 6,
  },
  timelineMeta: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textMuted,
    marginTop: 4,
  },
  timelineMetaAccent: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.accentOrange,
    marginTop: 4,
  },
  badgeCard: {
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(46,204,113,0.20)",
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badgeCopy: {
    flex: 1,
    marginRight: 12,
  },
  badgeTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  badgeSubtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textTertiary,
    marginTop: 3,
  },
  shareButton: {
    backgroundColor: COLORS.accentOrange,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  shareButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.white,
  },
  infoOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  infoModal: {
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 24,
    width: "100%",
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
  infoButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },
  shareButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  bottomSpacer: {
    height: 100,
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.98 }],
  },
});
