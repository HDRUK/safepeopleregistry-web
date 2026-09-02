interface SsoTenantDomain {
  id: number;
  sso_tenant_id: number;
  domain: string;
}

type SsoTenantStatus = "pending" | "approved" | "rejected";

interface SsoTenant {
  id: number;
  name: string;
  idp_alias: string | null;
  metadata_url: string | null;
  entity_id: string | null;
  metadata_imported_at: string | null;
  enabled: boolean;
  status: SsoTenantStatus;
  submitted_by_user_id: number | null;
  rejected_reason: string | null;
  domains: SsoTenantDomain[];
  // Null until approved - the customer's IdP admin needs these to register
  // Keycloak as a trusted Service Provider on their end.
  sp_entity_id: string | null;
  sp_acs_url: string | null;
  sp_metadata_url: string | null;
}

interface PostSsoTenantPayload {
  name: string;
  metadata_url?: string;
  metadata_xml?: string;
  domains: string[];
}

interface PutSsoTenantPayload {
  name?: string;
  domains?: string[];
}

interface ReimportSsoTenantPayload {
  metadata_url?: string;
  metadata_xml?: string;
}

interface LookupSsoDomainResponse {
  matched: boolean;
  idp_alias?: string;
}

export type {
  SsoTenant,
  SsoTenantStatus,
  SsoTenantDomain,
  PostSsoTenantPayload,
  PutSsoTenantPayload,
  ReimportSsoTenantPayload,
  LookupSsoDomainResponse,
};
