import getWebhookEventTrigger from "@/app/actions/webhooks/getWebhookEventTrigger";
import { QueryOptions } from "@/types/requests";

export default function getWebhookEventTriggerQuery(options?: QueryOptions) {
  return {
    queryKey: ["getWebhookEventTrigger"],
    queryFn: () =>
      getWebhookEventTrigger({
        error: {
          message: "getWebhookEventTriggerError",
        },
      }),
    ...options,
  };
}
