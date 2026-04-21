import React from "react";
import {
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import QRCode from "react-native-qrcode-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/Text";
import { COLORS, TYPOGRAPHY } from "@/constants/theme";

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  onShared?: () => void;
  mode: "post" | "badge" | "profile";
  postText?: string;
  shareText?: string;
}

const PROFILE_URL = "https://sharwi.com/profile/mikhail-balari";

export function ShareModal({
  visible,
  onClose,
  onShared,
  mode,
  postText,
  shareText,
}: ShareModalProps) {
  const insets = useSafeAreaInsets();
  const [copyDone, setCopyDone] = React.useState(false);

  const config = {
    post: {
      title: "Publish your post",
      subtitle: "Choose where to share",
      shareText: postText || shareText || "",
      showQR: false,
      qrCaption: "",
    },
    badge: {
      title: "Share your badge",
      subtitle: "Let others see your verified score",
      shareText: `My Sharwi verified score: 87/100 - ${PROFILE_URL}`,
      showQR: true,
      qrCaption: "Scan to view Mikhail's Sharwi profile",
    },
    profile: {
      title: "Share your profile",
      subtitle: "Let others discover your verified work",
      shareText: `Check my Sharwi profile: ${PROFILE_URL}`,
      showQR: true,
      qrCaption: "Scan to view full Sharwi profile",
    },
  } as const;

  const current = config[mode];

  const handleCopy = async () => {
    await Clipboard.setStringAsync(current.shareText);
    setCopyDone(true);
    setTimeout(() => {
      setCopyDone(false);
      onShared?.();
      onClose();
    }, 1500);
  };

  const handleOpen = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        onShared?.();
        onClose();
        return;
      }
    } catch {
      // Fall back to copy-only flow if the target app/url is unavailable.
    }

    await Clipboard.setStringAsync(current.shareText);
    onShared?.();
    onClose();
  };

  const handleWhatsApp = async () => {
    const appUrl = `whatsapp://send?text=${encodeURIComponent(current.shareText)}`;
    const webUrl = `https://wa.me/?text=${encodeURIComponent(current.shareText)}`;

    try {
      const supported = await Linking.canOpenURL(appUrl);
      if (supported) {
        await Linking.openURL(appUrl);
        onShared?.();
        onClose();
        return;
      }
    } catch {
      // Fall through to web fallback.
    }

    try {
      await Linking.openURL(webUrl);
      onShared?.();
      onClose();
      return;
    } catch {
      await Clipboard.setStringAsync(current.shareText);
      onShared?.();
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.handle} />

        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.subtitle}>{current.subtitle}</Text>

        {current.showQR ? (
          <View style={styles.qrSection}>
            <View style={styles.qrCard}>
              <QRCode
                value={PROFILE_URL}
                size={160}
                color="#000000"
                backgroundColor="#FFFFFF"
              />
            </View>
            <Text style={styles.qrCaption}>{current.qrCaption}</Text>
          </View>
        ) : null}

        <Text style={styles.shareVia}>SHARE VIA</Text>

        <View style={styles.grid}>
          <Pressable
            onPress={() => handleOpen("https://www.linkedin.com/in/mikhail-balari/")}
            style={({ pressed }) => [styles.optionCard, pressed && styles.optionPressed]}
          >
            <View style={[styles.brandOrb, styles.linkedinOrb]}>
              <MaterialCommunityIcons name="linkedin" size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.optionTitle}>LinkedIn</Text>
          </Pressable>

          <Pressable
            onPress={handleWhatsApp}
            style={({ pressed }) => [styles.optionCard, pressed && styles.optionPressed]}
          >
            <View style={[styles.brandOrb, styles.whatsAppOrb]}>
              <MaterialCommunityIcons name="whatsapp" size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.optionTitle}>WhatsApp</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              handleOpen(
                `https://twitter.com/intent/tweet?text=${
                  encodeURIComponent(current.shareText.substring(0, 280))
                }`,
              )
            }
            style={({ pressed }) => [styles.optionCard, pressed && styles.optionPressed]}
          >
            <View style={[styles.brandOrb, styles.twitterOrb]}>
              <MaterialCommunityIcons name="twitter" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.optionTitle}>X (Twitter)</Text>
          </Pressable>

          <Pressable
            onPress={handleCopy}
            style={({ pressed }) => [
              styles.optionCard,
              copyDone && styles.copyCardDone,
              pressed && styles.optionPressed,
            ]}
          >
            <View style={styles.copyOrb}>
              <Text style={[styles.copyGlyph, copyDone && styles.copyGlyphDone]}>
                {copyDone ? "✓" : "⎘"}
              </Text>
            </View>
            <Text style={[styles.optionTitle, copyDone && styles.copyTitleDone]}>
              {copyDone ? "Copied!" : "Copy link"}
            </Text>
          </Pressable>
        </View>

        <Pressable onPress={onClose} style={({ pressed }) => pressed && styles.cancelPressed}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSurface,
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
  title: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.textTertiary,
    textAlign: "center",
    marginBottom: 24,
  },
  qrSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  qrCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
  },
  qrCaption: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textTertiary,
    marginTop: 10,
    textAlign: "center",
  },
  shareVia: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textTertiary,
    marginBottom: 14,
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  optionCard: {
    width: "47%",
    backgroundColor: COLORS.cardPrimary,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 18,
    alignItems: "center",
    gap: 10,
  },
  optionPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
  brandOrb: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  linkedinOrb: {
    backgroundColor: "#0A66C2",
  },
  whatsAppOrb: {
    backgroundColor: "#25D366",
  },
  twitterOrb: {
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: COLORS.cardAccentBorder,
  },
  copyOrb: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.cardSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  copyGlyph: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.accentOrange,
  },
  copyGlyphDone: {
    color: COLORS.verifiedGreen,
  },
  optionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  copyCardDone: {
    borderColor: "rgba(46,204,113,0.3)",
  },
  copyTitleDone: {
    color: COLORS.verifiedGreen,
  },
  cancel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textTertiary,
    textAlign: "center",
    marginTop: 24,
  },
  cancelPressed: {
    opacity: 0.8,
  },
});
