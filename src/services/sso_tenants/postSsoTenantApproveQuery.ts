import postSsoTenantApprove from "@/app/actions/sso_tenants/postSsoTenantApprove";

export default function postSsoTenantApproveQuery() {
  return {
    mutationKey: ["postSsoTenantApprove"],
    mutationFn: (id: number) =>
      postSsoTenantApprove(id, {
        error: { message: "postSsoTenantApproveError" },
      }),
  };
}
