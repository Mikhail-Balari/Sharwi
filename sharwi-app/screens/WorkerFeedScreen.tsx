import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@/components/ui/Text";

type Worker = {
  id: string;
  fullName: string;
  headline: string;
  reputationScore: number;
};

export function WorkerFeedScreen() {
  const [workers, setWorkers] = useState<Worker[]>([]);

  useEffect(() => {
    fetch("http://192.168.0.181:4000/api/workers")
      .then((res) => res.json())
      .then((data) => {
        const uniqueWorkers = data.filter(
          (worker: Worker, index: number, self: Worker[]) =>
            index === self.findIndex((w) => w.id === worker.id)
        );

        setWorkers(uniqueWorkers);
      })
      .catch((err) => console.log("ERROR FETCH WORKERS:", err));
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "U";

    const parts = name.split(" ");
    const initials = parts
      .map((p) => p[0])
      .join("")
      .slice(0, 2);

    return initials.toUpperCase();
  };

  const renderItem = ({ item }: { item: Worker }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(item.fullName)}
          </Text>
        </View>

        <View style={styles.headerText}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.headline}>{item.headline}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.reputation}>
          ⭐ Reputation: {item.reputationScore}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sharwi Feed</Text>

      <FlatList
        data={workers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  card: {
    backgroundColor: "#15151C",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#262633",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF6A00",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "white",
    fontWeight: "700",
  },

  headerText: {
    flex: 1,
  },

  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  headline: {
    color: "#A1A1AA",
    fontSize: 13,
    marginTop: 2,
  },

  footer: {
    marginTop: 12,
  },

  reputation: {
    color: "#FF6A00",
    fontWeight: "600",
  },
});