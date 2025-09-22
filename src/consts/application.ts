const VALIDATION_SCHEMA_KEY = "VALIDATION_SCHEMA";

enum EMAIL_TEMPLATE {
  DELEGATE_SPONSOR = "delegate_sponsor",
  USER_INVITE = "researcher_invite",
  CUSTODIAN_INVITE = "custodian_invite",
  CUSTODIAN_USER_INVITE = "custodian_user_invite",
  ORGANISATION_INVITE = "organisation_invite",
  DELEGATE_INVITE = "delegate_invite",
}

enum PendingInvite {
  COMPLETE = "COMPLETE",
  PENDING = "PENDING",
}

export { VALIDATION_SCHEMA_KEY, EMAIL_TEMPLATE, PendingInvite };
