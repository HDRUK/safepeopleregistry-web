interface LinkedIdentity {
  id: number;
  user_id: number;
  provider: string;
  provider_user_id: string;
  provider_username: string | null;
  claims: Record<string, unknown> | null;
  linked_at: string | null;
  created_at: string;
  updated_at: string;
}

type IdentityProviderStatus = "active" | "coming_soon";

interface IdentityProviderCatalogEntry {
  key: string;
  label: string;
  description: string;
  status: IdentityProviderStatus;
  linked: boolean;
}

interface GetLinkedIdentitiesResponse {
  linked: LinkedIdentity[];
  providers: IdentityProviderCatalogEntry[];
}

export type {
  LinkedIdentity,
  IdentityProviderStatus,
  IdentityProviderCatalogEntry,
  GetLinkedIdentitiesResponse,
};
