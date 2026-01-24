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

enum Status {
  EMAIL_SUCCESSFUL = "email_successful",
  EMAIL_FAILED = "email_failed",
  AFFILIATED = "affiliated",
  PENDING = "pending",
  INVITED = "invited",
  FORM_RECEIVED = "form_received",
  REGISTERED = "registered",
  ORGANISATION_REGISTERED = "organisation_registered",
  INVITE_SENT = "invite_sent",
  APPROVED = "approved",
  COMPLETED = "completed",
  PROJECT_APPROVED = "project_approved",
  PROJECT_COMPLETED = "project_completed",
  PROJECT_PENDING = "project_pending",
  PROJECT_IN_PROGRESS = "project_in_progress",
  PROJECT_DECLINED_APPROVAL = "project_declined_approval",
  AFFILIATION_EMAIL_VERIFY = "affiliation_email_verify",
  AFFILIATION_INVITED = "affiliation_invited",
  AFFILIATION_PENDING = "affiliation_pending",
  AFFILIATION_APPROVED = "affiliation_approved",
  AFFILIATION_REJECTED = "affiliation_rejected",
  AFFILIATION_LEFT = "affiliation_left",
  VALIDATION_IN_PROGRESS = "validation_in_progress",
  VALIDATION_COMPLETE = "validation_complete",
  VALIDATED = "validated",
  USER_VALIDATION_DECLINED = "user_validation_declined",
  MORE_USER_INFO_REQ = "more_user_info_req",
  MORE_USER_INFO_REQ_ESCALATION_MANAGER = "more_user_info_req_escalation_manager",
  MORE_USER_INFO_REQ_ESCALATION_COMITTEE = "more_user_info_req_escalation_committee",
  MORE_ORG_INFO_REQ = "more_org_info_req",
  MORE_ORG_INFO_REQ_ESCALATION_MANAGER = "more_org_info_req_escalation_manager",
  MORE_ORG_INFO_REQ_ESCALATION_COMMITTEE = "more_org_info_req_escalation_committee",
  ORG_VALIDATION_DECLINED = "org_validation_declined",
  USER_LEFT_PROJECT = "user_left_project",
  ORG_LEFT_PROJECT = "org_left_project_short",
  NONE = "none",
  ORGANISATION_NOT_VALIDATED = "organisation_not_validated",
  ORGANISATION_VALIDATED = "organisation_validated",
  SPONSORSHIP_PENDING = "sponsorship_pending",
  SPONSORSHIP_APPROVED = "sponsorship_approved",
  SPONSORSHIP_REJECTED = "sponsorship_rejected",
}

const PAGINATION_UPPER_LIMIT = 1000;

export {
  VALIDATION_SCHEMA_KEY,
  EMAIL_TEMPLATE,
  PendingInvite,
  Status,
  PAGINATION_UPPER_LIMIT,
};
