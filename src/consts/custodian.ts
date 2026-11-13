enum CustodianUserRoles {
  ADMINISTRATOR = "CUSTODIAN_ADMIN",
  APPROVER = "CUSTODIAN_APPROVER",
  // needs BE: a matching "CUSTODIAN_VIEWER" permission in the API.
  VIEWER = "CUSTODIAN_VIEWER",
}

enum DecisionModelTypes {
  DECISION_MODELS = "decision_models",
  USER_VALIDATION_RULES = "user_validation_rules",
  ORG_VALIDATION_RULES = "org_validation_rules",
}

export { CustodianUserRoles, DecisionModelTypes };
