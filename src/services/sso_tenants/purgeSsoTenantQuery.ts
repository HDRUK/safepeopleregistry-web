import purgeSsoTenant from "@/app/actions/sso_tenants/purgeSsoTenant";

export default function purgeSsoTenantQuery() {
  return {
    mutationKey: ["purgeSsoTenant"],
    mutationFn: (id: number) =>
      purgeSsoTenant(id, { error: { message: "purgeSsoTenantError" } }),
  };
}
