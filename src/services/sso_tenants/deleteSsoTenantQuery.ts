import deleteSsoTenant from "@/app/actions/sso_tenants/deleteSsoTenant";

export default function deleteSsoTenantQuery() {
  return {
    mutationKey: ["deleteSsoTenant"],
    mutationFn: (id: number) =>
      deleteSsoTenant(id, { error: { message: "deleteSsoTenantError" } }),
  };
}
