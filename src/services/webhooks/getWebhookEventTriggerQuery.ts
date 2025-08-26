import getWebhookEventTrigger from "./getWebhookEventTrigger";

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
