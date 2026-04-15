import { useMutation } from "@tanstack/react-query";
import putReadRequestNotificationQuery from "@/services/notifications/putReadRequestNotificationQuery";

const usePutReadRequest = () => {
  return useMutation({
    mutationFn: ({
      requestId,
      status,
    }: {
      requestId: number;
      status: number;
    }) => {
      return putReadRequestNotificationQuery(requestId, status, {});
    },
  });
};

export default usePutReadRequest;
