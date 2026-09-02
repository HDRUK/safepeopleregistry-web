import postSsoTenant from "@/app/actions/sso_tenants/postSsoTenant";
import { PostSsoTenantPayload } from "./types";

export default function postSsoTenantQuery() {
  return {
    mutationKey: ["postSsoTenant"],
    mutationFn: (payload: PostSsoTenantPayload) =>
      postSsoTenant(payload, { error: { message: "postSsoTenantError" } }),
  };
}
