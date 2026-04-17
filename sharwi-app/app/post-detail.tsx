import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import { EvidenceChip } from "@/components/ui/EvidenceChip";
import { StatusChip } from "@/components/ui/StatusChip";
import { Text } from "@/components/ui/Text";
import { COLORS, TYPOGRAPHY } from "@/constants/theme";
import { SHARWI_POSTS, type SharwiPost } from "@/services/feed-posts";

type DetailPost = {
  id?: string;
  title: string;
  subtitle?: string;
  status: "published" | "draft" | "proof-backed";
  evidence: string[];
  clickRate?: string | null;
  ctr?: string;
  leads?: number | null;
  reach?: string;
  fullText: string;
  date: string;
};

export default function PostDetailRoute() {
  const params = useLocalSearchParams<{ postId?: string; post?: string }>();

  let post: DetailPost | undefined;

  if (typeof params.post === "string") {
    try {
      post = JSON.parse(params.post) as DetailPost;
    } catch {
      post = undefined;
    }
  }

  if (!post && typeof params.postId === "string") {
    post = SHARWI_POSTS.find((item) => item.id === params.postId);
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.container}>
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Post not found</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const clickRate = post.clickRate ?? post.ctr ?? "-";
  const leads = post.leads ?? 0;
  const reach = post.reach ?? "1.2K";

  const handleEditDraft = () => {
    router.push({
      pathname: "/(tabs)/create",
      params: {
        prefillText: post.fullText,
        prefillEvidence: JSON.stringify(post.evidence),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={({ pressed }) => pressed && styles.pressed}>
            <ArrowLeft size={22} color={COLORS.textPrimary} />
          </Pressable>

          <View style={styles.headerCenter}>
            <StatusChip status={post.status} />
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.date}>{post.date}</Text>
          <Text style={styles.title}>{post.title}</Text>

          <View style={styles.postCard}>
            <View style={styles.authorRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>MB</Text>
              </View>

              <View>
                <Text style={styles.authorName}>Mikhail Balari</Text>
                <Text style={styles.authorRole}>Business Data Scientist</Text>
              </View>
            </View>

            <Text style={styles.body}>{post.fullText}</Text>

            <View style={styles.divider} />

            <View style={styles.evidenceWrap}>
              {post.evidence.map((item) => (
                <EvidenceChip key={item} label={item} />
              ))}
            </View>
          </View>

          {post.status === "published" ? (
            <View style={styles.impactCard}>
              <Text style={styles.impactTitle}>Post performance</Text>

              <View style={styles.impactRow}>
                <View style={styles.metricColumn}>
                  <Text style={styles.metricValue}>{clickRate}</Text>
                  <Text style={styles.metricLabel}>Click rate</Text>
                </View>

                <View style={styles.metricColumn}>
                  <Text style={styles.metricValue}>{leads}</Text>
                  <Text style={styles.metricLabel}>Leads</Text>
                </View>

                <View style={styles.metricColumn}>
                  <Text style={styles.metricValue}>{reach}</Text>
                  <Text style={styles.metricLabel}>Reach</Text>
                </View>
              </View>
            </View>
          ) : null}

          {post.status === "draft" ? (
            <Pressable
              onPress={handleEditDraft}
              style={({ pressed }) => [styles.editPublishButton, pressed && styles.pressed]}
            >
              <Text style={styles.editPublishText}>Edit & Publish</Text>
            </Pressable>
          ) : null}
        </ScrollView>
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
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerSpacer: {
    width: 22,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  date: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  postCard: {
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 18,
  },
  authorRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardSecondary,
    borderWidth: 1.5,
    borderColor: COLORS.accentOrange,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: COLORS.accentOrange,
    includeFontPadding: false,
  },
  authorName: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  authorRole: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textTertiary,
  },
  body: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 15,
    fontWeight: "400",
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardSecondary,
    marginVertical: 14,
  },
  evidenceWrap: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  impactCard: {
    marginTop: 14,
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
  },
  impactTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  impactRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    alignItems: "flex-start",
  },
  metricColumn: {
    alignItems: "center",
    paddingVertical: 8,
    minHeight: 60,
  },
  metricValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    color: COLORS.textPrimary,
    includeFontPadding: false,
  },
  metricLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textTertiary,
    marginTop: 4,
  },
  editPublishButton: {
    marginTop: 14,
    backgroundColor: COLORS.accentOrange,
    borderRadius: 16,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  editPublishText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.white,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  pressed: {
    opacity: 0.88,
  },
});
