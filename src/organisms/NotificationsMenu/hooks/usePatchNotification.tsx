import { useMutation } from "@tanstack/react-query";
import { patchNotificationQuery } from "@/services/notifications/";
const usePatchNotification = (userId: number) =>
  useMutation(patchNotificationQuery(userId));

export default usePatchNotification;
