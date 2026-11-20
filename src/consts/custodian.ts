enum CustodianUserRoles {
  ADMINISTRATOR = "CUSTODIAN_ADMIN",
  APPROVER = "CUSTODIAN_APPROVER",
  VIEWER = "CUSTODIAN_READ_ONLY",
}

enum DecisionModelTypes {
  DECISION_MODELS = "decision_models",
  USER_VALIDATION_RULES = "user_validation_rules",
  ORG_VALIDATION_RULES = "org_validation_rules",
}

export { CustodianUserRoles, DecisionModelTypes };
