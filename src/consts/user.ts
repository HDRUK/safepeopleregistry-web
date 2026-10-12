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
};
