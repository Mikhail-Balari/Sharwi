import { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text as RNText,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Award, Bell, TrendingUp, Users, Zap, ArrowRight, Shield } from "lucide-react-native";

import { ShareModal } from "@/components/ShareModal";
import { EvidenceChip } from "@/components/ui/EvidenceChip";
import { StatusChip } from "@/components/ui/StatusChip";
import { Text } from "@/components/ui/Text";
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from "@/constants/theme";
import {
  SHARWI_NOTIFICATIONS,
  SHARWI_POSTS,
  SharwiNotification,
  SharwiPost,
} from "@/services/feed-posts";

type FeedFilter = "All" | "Published" | "Draft" | "Proof-backed";

const filters: FeedFilter[] = ["All", "Published", "Draft", "Proof-backed"];

const filterChipActiveStyles = {
  All: "allActive",
  Published: "publishedActive",
  Draft: "draftActive",
  "Proof-backed": "proofBackedActive",
} as const;

const filterTextActiveStyles = {
  All: "filterTextActiveLight",
  Published: "publishedTextActive",
  Draft: "draftTextActive",
  "Proof-backed": "proofBackedTextActive",
} as const;

const notificationIcon = {
  "trending-up": TrendingUp,
  users: Users,
  zap: Zap,
  award: Award,
} as const;

export function WorkerFeedScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("All");
  const [showNotifications, setShowNotifications] = useState(false);
  const [sharePost, setSharePost] = useState<SharwiPost | null>(null);

  const filteredPosts = useMemo(() => {
    return activeFilter === "All"
      ? SHARWI_POSTS
      : SHARWI_POSTS.filter((post) => {
          if (activeFilter === "Published") return post.status === "published";
          if (activeFilter === "Draft") return post.status === "draft";
          if (activeFilter === "Proof-backed") return post.status === "proof-backed";
          return true;
        });
  }, [activeFilter]);

  const featuredPost = filteredPosts.find((post) => post.featured) ?? null;
  const visiblePosts = filteredPosts.filter((post) => post.id !== featuredPost?.id);

  const openPost = (post: SharwiPost) => {
    router.push({
      pathname: "/post-detail",
      params: { postId: post.id },
    });
  };

  const navigateToEditDraft = (post: SharwiPost) => {
    router.push({
      pathname: "/(tabs)/create",
      params: {
        prefillText: post.fullText,
        prefillEvidence: JSON.stringify(post.evidence),
      },
    });
  };

  const renderFeaturedCard = () => {
    if (!featuredPost) {
      return null;
    }

    return (
      <TouchableOpacity activeOpacity={0.88} onPress={() => openPost(featuredPost)} style={styles.featuredCard}>
      <View style={styles.featuredTopRow}>
        <View style={styles.authorBlock}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>MB</Text>
          </View>

          <View>
            <Text style={styles.authorName}>Mikhail Balari</Text>
            <Text style={styles.timestamp}>{featuredPost.date}</Text>
          </View>
        </View>

        <StatusChip status={featuredPost.status} />
      </View>

      <Text style={styles.featuredTitle}>{featuredPost.title}</Text>
      <RNText numberOfLines={3} style={styles.featuredExcerpt}>
        {featuredPost.excerpt}
      </RNText>

      <View style={styles.featuredEvidenceRow}>
        {featuredPost.evidence.map((item) => (
          <EvidenceChip key={item} label={item} />
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.impactRow}>
        <View style={styles.impactMetrics}>
          <View>
            <Text style={styles.impactLabel}>Click rate</Text>
            <Text style={styles.impactValue}>{featuredPost.ctr}</Text>
          </View>
          <View>
            <Text style={styles.impactLabel}>Leads</Text>
            <Text style={styles.impactValue}>{featuredPost.leads}</Text>
          </View>
          <View>
            <Text style={styles.impactLabel}>Reach</Text>
            <Text style={styles.impactValue}>{featuredPost.reach}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => openPost(featuredPost)}
          style={({ pressed }) => [styles.viewPostButton, pressed && styles.pressed]}
        >
          <Text style={styles.viewPostText}>View post</Text>
        </Pressable>
      </View>
    </TouchableOpacity>
    );
  };

  const renderCompactCard = ({ item }: { item: SharwiPost }) => (
    <TouchableOpacity activeOpacity={0.88} onPress={() => openPost(item)} style={styles.compactCard}>
      <View style={styles.compactHeader}>
        <View style={styles.compactMeta}>
          <StatusChip status={item.status} />
          <Text style={styles.timestamp}>{item.date}</Text>
        </View>
      </View>

      <Text style={styles.compactTitle}>{item.title}</Text>
      <RNText numberOfLines={2} style={styles.compactExcerpt}>
        {item.excerpt}
      </RNText>

      <View style={styles.compactFooter}>
        <View style={styles.compactEvidenceRow}>
          {item.evidence.slice(0, 2).map((evidence) => (
            <EvidenceChip key={evidence} label={evidence} small />
          ))}
        </View>

        {item.status === "published" ? (
          <View style={styles.footerAction}>
            <TrendingUp color={COLORS.verifiedGreen} size={12} />
            <Text style={styles.footerMetric}>{item.ctr} click rate</Text>
          </View>
        ) : null}

        {item.status === "draft" ? (
          <Pressable
            onPress={() => navigateToEditDraft(item)}
            style={({ pressed }) => [styles.footerAction, pressed && styles.pressed]}
          >
            <Text style={styles.editDraftText}>Edit draft</Text>
            <ArrowRight color={COLORS.accentOrange} size={12} />
          </Pressable>
        ) : null}

        {item.status === "proof-backed" ? (
          <View style={styles.footerAction}>
            <Shield color={COLORS.verifiedGreen} size={12} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        ) : null}
      </View>

      {item.status === "draft" ? (
        <Pressable
          onPress={() => setSharePost(item)}
          style={({ pressed }) => [styles.publishGhostRow, pressed && styles.pressed]}
        >
          <Text style={styles.publishGhostText}>{"Publish ->"}</Text>
        </Pressable>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning, Mikhail</Text>
            <Text style={styles.subheading}>Your visibility stream</Text>
          </View>

          <Pressable onPress={() => setShowNotifications(true)} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.bellWrap}>
              <Bell color={COLORS.textTertiary} size={20} />
              <View style={styles.notificationDot} />
            </View>
          </Pressable>
        </View>

        <View style={styles.filtersWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {filters.map((filter) => {
              const active = activeFilter === filter;

              return (
                <Pressable
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  style={({ pressed }) => [
                    styles.filterChip,
                    active && styles[filterChipActiveStyles[filter]],
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      active && styles[filterTextActiveStyles[filter]],
                    ]}
                  >
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <FlatList
          data={visiblePosts}
          keyExtractor={(item) => item.id}
          renderItem={renderCompactCard}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            featuredPost ? <View>{renderFeaturedCard()}</View> : null
          }
          contentContainerStyle={[styles.listContent, { paddingBottom: 100 + insets.bottom }]}
        />

        <Modal
          visible={showNotifications}
          animationType="slide"
          presentationStyle="pageSheet"
          transparent
          onRequestClose={() => setShowNotifications(false)}
        >
          <View style={styles.sheetOverlay}>
            <View style={styles.notificationsSheet}>
              <View style={styles.handle} />
              <Text style={styles.sheetTitle}>Notifications</Text>

              <View style={styles.notificationsList}>
                {SHARWI_NOTIFICATIONS.map((notification) => {
                  const Icon = notificationIcon[notification.icon];

                  return (
                    <View key={notification.id} style={styles.notificationRow}>
                      <View style={styles.notificationAvatar}>
                        <Icon color={COLORS.accentOrange} size={18} />
                      </View>

                      <View style={styles.notificationCopy}>
                        <Text style={styles.notificationTitle}>{notification.title}</Text>
                        <Text style={styles.notificationTime}>{notification.time}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>

              <Pressable onPress={() => setShowNotifications(false)} style={({ pressed }) => pressed && styles.pressed}>
                <Text style={styles.sheetClose}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <ShareModal
          visible={!!sharePost}
          onClose={() => setSharePost(null)}
          mode="post"
          shareText={sharePost?.fullText}
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
    paddingBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  subheading: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  bellWrap: {
    position: "relative",
    padding: 4,
  },
  notificationDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accentOrange,
  },
  filtersWrap: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 14,
  },
  filterRow: {
    gap: 8,
    paddingRight: 4,
  },
  filterChip: {
    backgroundColor: COLORS.cardPrimary,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.pill,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  allActive: {
    backgroundColor: COLORS.accentOrange,
    borderColor: COLORS.accentOrange,
  },
  publishedActive: {
    backgroundColor: "rgba(46,204,113,0.15)",
    borderColor: "rgba(46,204,113,0.4)",
  },
  draftActive: {
    backgroundColor: "rgba(222,80,21,0.12)",
    borderColor: COLORS.accentOrangeDim,
  },
  proofBackedActive: {
    backgroundColor: "rgba(46,204,113,0.10)",
    borderColor: "rgba(46,204,113,0.25)",
  },
  filterText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textTertiary,
  },
  filterTextActiveLight: {
    color: COLORS.white,
    fontWeight: "700",
  },
  publishedTextActive: {
    color: COLORS.verifiedGreen,
    fontWeight: "700",
  },
  draftTextActive: {
    color: COLORS.accentOrange,
    fontWeight: "700",
  },
  proofBackedTextActive: {
    color: COLORS.verifiedGreen,
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: 20,
  },
  featuredCard: {
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.cardAccentBorder,
    padding: 18,
    marginBottom: 14,
    shadowColor: COLORS.accentOrange,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  },
  featuredTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    gap: 12,
  },
  authorBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  avatarLarge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.cardSecondary,
    borderWidth: 1.5,
    borderColor: COLORS.accentOrange,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLargeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
    color: COLORS.accentOrange,
    includeFontPadding: false,
  },
  authorName: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  timestamp: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textMuted,
  },
  featuredTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  featuredExcerpt: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "400",
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  featuredEvidenceRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginBottom: 14,
  },
  impactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  impactMetrics: {
    flexDirection: "row",
    gap: 20,
    flex: 1,
  },
  impactLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: "400",
    color: COLORS.textTertiary,
    letterSpacing: 0.5,
  },
  impactValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  viewPostButton: {
    backgroundColor: COLORS.cardSecondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardAccentBorder,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  viewPostText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.accentOrange,
  },
  compactCard: {
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
    marginBottom: 10,
  },
  compactHeader: {
    marginBottom: 10,
  },
  compactMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  compactTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
    marginBottom: 6,
  },
  compactExcerpt: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "400",
    color: COLORS.textTertiary,
    marginBottom: 12,
  },
  compactFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  compactEvidenceRow: {
    flexDirection: "row",
    gap: 6,
    flex: 1,
  },
  footerAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerMetric: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textSecondary,
  },
  editDraftText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.accentOrange,
  },
  verifiedText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.verifiedGreen,
  },
  publishGhostRow: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  publishGhostText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.accentOrange,
  },
  sheetOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  notificationsSheet: {
    backgroundColor: COLORS.backgroundSurface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
  },
  handle: {
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
    marginBottom: 20,
  },
  notificationsList: {
    marginBottom: 16,
  },
  notificationRow: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardPrimary,
  },
  notificationAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationCopy: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
  notificationTime: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textMuted,
    marginTop: 3,
  },
  sheetClose: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textTertiary,
    textAlign: "center",
    marginTop: 16,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
});
