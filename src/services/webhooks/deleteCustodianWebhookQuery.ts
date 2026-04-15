import deleteCustodianWebhook from "@/app/actions/webhooks/deleteCustodianWebhook";

export default function deleteCustodianWebhookQuery(custodianId: number) {
  return {
    mutationKey: ["deleteCustodianWebhook"],
    mutationFn: (payload: { id: number }) =>
      deleteCustodianWebhook(payload, custodianId, {
        error: {
          message: "submitError",
        },
      }),
  };
}
