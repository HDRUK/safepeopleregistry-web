import postSsoTenantReject from "@/app/actions/sso_tenants/postSsoTenantReject";

interface RejectSsoTenantPayload {
  id: number;
  reason?: string;
}

export default function postSsoTenantRejectQuery() {
  return {
    mutationKey: ["postSsoTenantReject"],
    mutationFn: ({ id, reason }: RejectSsoTenantPayload) =>
      postSsoTenantReject(id, reason, {
        error: { message: "postSsoTenantRejectError" },
      }),
  };
}
