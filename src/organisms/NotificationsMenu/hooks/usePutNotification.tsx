import { useMutation } from "@tanstack/react-query";
import { putNotificationQuery } from "@/services/notifications";

const usePutNotification = (userId: number) =>
  useMutation(putNotificationQuery(userId));

export default usePutNotification;
