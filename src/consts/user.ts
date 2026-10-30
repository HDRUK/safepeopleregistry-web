enum UserGroup {
  USERS = "USERS",
  ORGANISATIONS = "ORGANISATIONS",
  CUSTODIANS = "CUSTODIANS",
  ADMINS = "ADMINS",
}

enum UserProvider {
  SIT = "sit",
  KEYCLOAK = "keycloak",
}

enum UserProfileCompletionCategories {
  IDENTITY = "identity",
  AFFILIATIONS = "affiliations",
  EXPERIENCE = "experience",
  TRAINING = "training",
}

enum UserFeedSource {
  ORG = "ORG",
}

enum UserHistoryLog {
  CREATED = "created",
  UPDATED = "updated",
  DELETED = "deleted",
  USER_REMOVED_FROM_PROJECT = "user_removed_from_project",
  USER_ADDED_TO_PROJECT = "user_added_to_project",
}

enum AffiliationRelationship {
  EMPLOYEE = "employee",
  STUDENT = "student",
  HONORARY_CONTRACT = "honoraryContract",
}

// Who recorded an affiliation's end date. The Organisation's date wins.
enum AffiliationEndDateSource {
  USER = "user",
  ORGANISATION = "organisation",
}

// How far ahead of an affiliation's end date its user is warned.
const AFFILIATION_END_WARNING_DAYS = 30;

// Mirrors the API's App\Enums\OrganisationRole.
enum OrganisationRole {
  SRO = "SRO",
  DELEGATE = "DELEGATE",
}

export {
  OrganisationRole,
  UserGroup,
  UserProvider,
  UserProfileCompletionCategories,
  UserFeedSource,
  UserHistoryLog,
  AffiliationRelationship,
  AffiliationEndDateSource,
  AFFILIATION_END_WARNING_DAYS,
};
