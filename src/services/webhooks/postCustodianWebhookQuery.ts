import postCustodianWebhook from "@/app/actions/webhooks/postCustodianWebhook";
import { PostCustodianWebhookPayload } from "./types";

export default function postCustodianWebhookQuery() {
  return {
    mutationKey: ["postCustodianWebhook"],
    mutationFn: (payload: PostCustodianWebhookPayload) =>
      postCustodianWebhook(payload, {
        error: {
          message: "submitError",
        },
      }),
  };
}
