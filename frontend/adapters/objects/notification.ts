import type { NotificationModalProps } from "@/features/NotificationModal/NotificationModal.types";
import type { GetNotificationQueryResult } from "@/sanity.types";

export const notificationAdapter = (data: GetNotificationQueryResult) => {
  if (!data) return null;

  const heroData: NotificationModalProps = {
    title: data.heading,
    description: data.description,
  };

  return heroData;
};
