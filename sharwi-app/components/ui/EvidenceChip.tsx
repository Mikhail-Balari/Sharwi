import { StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from "@/constants/theme";

type EvidenceChipProps = {
  label: string;
  small?: boolean;
};

export function EvidenceChip({ label, small = false }: EvidenceChipProps) {
  return (
    <View
      style={[
        styles.chip,
        small ? styles.smallChip : styles.defaultChip,
      ]}
    >
      <Text style={[styles.label, small && styles.smallLabel]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: COLORS.cardSecondary,
    borderRadius: BORDER_RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.cardAccentBorder,
  },
  defaultChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  smallChip: {
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textTertiary,
  },
  smallLabel: {
    fontSize: 10,
  },
});
