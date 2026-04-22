import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
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
  SHARWI_POSTS,
  SharwiPost,
} from "@/services/feed-posts";
import { getUserPosts } from "@/services/api/posts";
import { isDemoMode } from "@/services/demo-mode";

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
  TrendingUp,
  Users,
  Zap,
  Award,
} as const;

const NOTIFICATIONS = [
  {
    id: "1",
    icon: "TrendingUp",
    text: "Your last post reached 1.2K views",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "2",
    icon: "Users",
    text: "3 new leads influenced by your content this week",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "3",
    icon: "Zap",
    text: "New work moment ready to turn into a post",
    time: "2 days ago",
    unread: false,
  },
  {
    id: "4",
    icon: "Award",
    text: "Your reputation score increased to 87",
    time: "1 week ago",
    unread: false,
  },
] as const;

export function WorkerFeedScreen() {
  const insets = useSafeAreaInsets();
  const demoMode = isDemoMode();
  const pulseOpacity = useRef(new Animated.Value(0.4)).current;
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("All");
  const [readNotifs, setReadNotifs] = useState<Set<string>>(new Set());
  const [showNotifications, setShowNotifications] = useState(false);
  const [sharePost, setSharePost] = useState<SharwiPost | null>(null);
  const [posts, setPosts] = useState<SharwiPost[]>(SHARWI_POSTS);
  const [isLoading, setIsLoading] = useState(!demoMode);

  const unreadCount = NOTIFICATIONS.filter(
    (notification) => notification.unread && !readNotifs.has(notification.id),
  ).length;

  const loadPosts = async () => {
    if (demoMode) {
      setPosts(SHARWI_POSTS);
      setIsLoading(false);
      return;
    }

    try {
      const realPosts = await getUserPosts();

      if (realPosts && realPosts.length > 0) {
        const mapped = realPosts.map((p: any): SharwiPost => ({
          id: String(p.id),
          status: p.status,
          featured: false,
          title: String(p.workInput ?? p.generatedText ?? "Work moment").substring(0, 50),
          excerpt: String(p.generatedText ?? "").substring(0, 120),
          fullText: String(p.generatedText ?? ""),
          evidence: p.evidenceChips ?? [],
          date: p.createdAt
            ? new Date(p.createdAt).toLocaleDateString("en", {
                month: "short",
                day: "numeric",
              })
            : "Today",
          ctr: p.clickRate ? `${p.clickRate}%` : undefined,
          leads: p.leadsInfluenced ?? undefined,
          reach: p.reach ?? undefined,
        }));

        if (mapped.length > 0 && mapped[0].status === "published") {
          mapped[0].featured = true;
        }

        setPosts(mapped.length > 0 ? mapped : SHARWI_POSTS);
      } else {
        setPosts(SHARWI_POSTS);
      }
    } catch {
      setPosts(SHARWI_POSTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, []);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseOpacity, {
          toValue: 0.7,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseOpacity, {
          toValue: 0.4,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );

    if (isLoading) {
      animation.start();
    }

    return () => animation.stop();
  }, [isLoading, pulseOpacity]);

  useEffect(() => {
    if (!showNotifications) {
      return;
    }

    const timer = setTimeout(() => {
      setReadNotifs(new Set(NOTIFICATIONS.map((notification) => notification.id)));
    }, 2000);

    return () => clearTimeout(timer);
  }, [showNotifications]);

  const filteredPosts = useMemo(() => {
    return activeFilter === "All"
      ? posts
      : posts.filter((post) => {
          if (activeFilter === "Published") return post.status === "published";
          if (activeFilter === "Draft") return post.status === "draft";
          if (activeFilter === "Proof-backed") return post.status === "proof-backed";
          return true;
        });
  }, [activeFilter, posts]);

  const featuredPost = filteredPosts.find((post) => post.featured) ?? null;
  const visiblePosts = filteredPosts.filter((post) => post.id !== featuredPost?.id);

  const openPost = (post: SharwiPost) => {
    router.push({
      pathname: "/post-detail",
      params: { post: JSON.stringify(post) },
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

  const renderSkeleton = () => (
    <View style={styles.skeletonList}>
      {[0, 1, 2].map((item) => (
        <Animated.View
          key={item}
          style={[styles.skeletonCard, { opacity: pulseOpacity }]}
        >
          <View style={styles.skeletonPill} />
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonLine} />
          <View style={styles.skeletonLineShort} />
        </Animated.View>
      ))}
    </View>
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
              {unreadCount > 0 ? (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {unreadCount >= 10 ? "9+" : unreadCount}
                  </Text>
                </View>
              ) : null}
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

        {isLoading ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.listContent, { paddingBottom: 100 + insets.bottom }]}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => {
                  setIsLoading(true);
                  void loadPosts();
                }}
                colors={[COLORS.accentOrange]}
                tintColor={COLORS.accentOrange}
              />
            }
          >
            {renderSkeleton()}
          </ScrollView>
        ) : (
          <FlatList
            data={visiblePosts}
            keyExtractor={(item) => item.id}
            renderItem={renderCompactCard}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              featuredPost ? <View>{renderFeaturedCard()}</View> : null
            }
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => {
                  setIsLoading(true);
                  void loadPosts();
                }}
                colors={[COLORS.accentOrange]}
                tintColor={COLORS.accentOrange}
              />
            }
            contentContainerStyle={[styles.listContent, { paddingBottom: 100 + insets.bottom }]}
          />
        )}

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
              <View style={styles.sheetHeader}>
                <View>
                  <Text style={styles.sheetTitle}>Notifications</Text>
                  <Text
                    style={[
                      styles.sheetStatus,
                      unreadCount > 0 && styles.sheetStatusUnread,
                    ]}
                  >
                    {unreadCount > 0 ? `${unreadCount} new` : "All caught up"}
                  </Text>
                </View>

                {unreadCount > 0 ? (
                  <Pressable
                    onPress={() =>
                      setReadNotifs(new Set(NOTIFICATIONS.map((notification) => notification.id)))
                    }
                    style={({ pressed }) => pressed && styles.pressed}
                  >
                    <Text style={styles.markAllText}>Mark all as read</Text>
                  </Pressable>
                ) : null}
              </View>

              <View style={styles.notificationsList}>
                {NOTIFICATIONS.map((notification) => {
                  const Icon = notificationIcon[notification.icon];
                  const unread = notification.unread && !readNotifs.has(notification.id);

                  return (
                    <View key={notification.id} style={styles.notificationRow}>
                      {unread ? <View style={styles.notificationUnreadDot} /> : null}

                      <View style={styles.notificationAvatar}>
                        <Icon color={COLORS.accentOrange} size={18} />
                      </View>

                      <View style={styles.notificationCopy}>
                        <Text style={styles.notificationTitle}>{notification.text}</Text>
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
  notificationBadge: {
    position: "absolute",
    top: -6,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.accentOrange,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    lineHeight: 11,
    fontWeight: "700",
    color: COLORS.white,
    includeFontPadding: false,
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
  skeletonList: {
    gap: 10,
  },
  skeletonCard: {
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
    marginBottom: 10,
  },
  skeletonPill: {
    width: 82,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.cardSecondary,
    marginBottom: 18,
  },
  skeletonTitle: {
    width: "72%",
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.cardSecondary,
    marginBottom: 12,
  },
  skeletonLine: {
    width: "100%",
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.cardSecondary,
    marginBottom: 8,
  },
  skeletonLineShort: {
    width: "58%",
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.cardSecondary,
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
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    gap: 16,
  },
  sheetTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  sheetStatus: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textMuted,
    marginTop: 4,
  },
  sheetStatusUnread: {
    color: COLORS.accentOrange,
  },
  markAllText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.accentOrange,
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
    alignItems: "center",
  },
  notificationUnreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accentOrange,
    marginRight: -4,
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
