import postSsoTenantEnable from "@/app/actions/sso_tenants/postSsoTenantEnable";

export default function postSsoTenantEnableQuery() {
  return {
    mutationKey: ["postSsoTenantEnable"],
    mutationFn: (id: number) =>
      postSsoTenantEnable(id, {
        error: { message: "postSsoTenantEnableError" },
      }),
  };
}
