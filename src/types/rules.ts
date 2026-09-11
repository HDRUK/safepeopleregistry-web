export interface Rule {
  label?: string;
  text: string;
  active: boolean;
  id: number;
}

export enum RuleName {
  DATA_SECURITY_COMPLIANCE = "DataSecurityCompliance",
  TRAINING = "Training",
  IDENTITY_VERIFICATION = "IdentityVerification",
  UK_DATA_PROTECTION = "UKDataProtection",
  AFFILIATED_ORGANISATION = "AffiliatedOrganisation",
  SANCTIONS_CHECK = "SanctionsCheck",
}

export interface RuleState {
  passed?: boolean;
  status?: boolean;
  rule?: RuleName;
  failed_rules?: {
    rule: RuleName;
    status: string;
  };
}
