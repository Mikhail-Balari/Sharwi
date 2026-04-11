import { useQuery } from "@tanstack/react-query";

import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Text } from "@/components/ui/Text";
import { fetchNotifications } from "@/services/api/feed";

export function NotificationsScreen() {
  const notificationsQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  return (
    <Screen>
      <SectionHeader
        eyebrow="Notifications"
        title="What changed"
        description="Stay on top of reviews, verification activity, and discovery events."
      />
      {notificationsQuery.data?.map((notification) => (
        <Card key={notification.id}>
          <Text variant="subtitle">{notification.title}</Text>
          <Text>{notification.body}</Text>
          <Text variant="caption">{notification.createdAtLabel}</Text>
        </Card>
      ))}
    </Screen>
  );
}
