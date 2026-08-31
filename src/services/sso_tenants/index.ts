import getSsoTenantsQuery from "@/services/sso_tenants/getSsoTenantsQuery";
import postSsoTenantQuery from "@/services/sso_tenants/postSsoTenantQuery";
import postSsoTenantApproveQuery from "@/services/sso_tenants/postSsoTenantApproveQuery";
import postSsoTenantRejectQuery from "@/services/sso_tenants/postSsoTenantRejectQuery";
import postSsoTenantEnableQuery from "@/services/sso_tenants/postSsoTenantEnableQuery";
import deleteSsoTenantQuery from "@/services/sso_tenants/deleteSsoTenantQuery";
import purgeSsoTenantQuery from "@/services/sso_tenants/purgeSsoTenantQuery";

export {
  getSsoTenantsQuery,
  postSsoTenantQuery,
  postSsoTenantApproveQuery,
  postSsoTenantRejectQuery,
  postSsoTenantEnableQuery,
  deleteSsoTenantQuery,
  purgeSsoTenantQuery,
};
