import { StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from "@/constants/theme";
import { type SharwiPostStatus } from "@/services/feed-posts";

type StatusChipProps = {
  status: SharwiPostStatus;
};

const appearance = {
  published: {
    label: "Published",
    backgroundColor: "rgba(46,204,113,0.12)",
    borderColor: "rgba(46,204,113,0.3)",
    color: COLORS.verifiedGreen,
  },
  draft: {
    label: "Draft",
    backgroundColor: "rgba(222,80,21,0.10)",
    borderColor: COLORS.accentOrangeDim,
    color: COLORS.accentOrange,
  },
  "proof-backed": {
    label: "Verified",
    backgroundColor: "rgba(46,204,113,0.10)",
    borderColor: "rgba(46,204,113,0.25)",
    color: COLORS.verifiedGreen,
  },
} as const;

export function StatusChip({ status }: StatusChipProps) {
  const tone = appearance[status];

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: tone.backgroundColor,
          borderColor: tone.borderColor,
        },
      ]}
    >
      <Text style={[styles.label, { color: tone.color }]}>{tone.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: "600",
  },
});
