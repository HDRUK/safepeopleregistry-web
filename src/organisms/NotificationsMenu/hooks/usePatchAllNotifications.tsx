import { useMutation } from "@tanstack/react-query";
import { patchAllNotificationsQuery } from "@/services/notifications";

const usePatchAllNotification = (userId: number) =>
  useMutation(patchAllNotificationsQuery(userId));

export default usePatchAllNotification;
