import { Routes } from "@/types/router";
import { UserGroup } from "./user";

const ROUTES: Routes = {
  invite: {
    path: "/invite",
  },
  register: {
    path: "/register",
  },
  homepage: {
    path: "/",
  },
  about: {
    path: "/about",
  },
  profileCustodian: {
    path: "/data-custodian/profile",
    permissions: [UserGroup.CUSTODIANS],
  },
  usersCustodian: {
    path: "/data-custodian/users",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianHome: {
    path: "/data-custodian/profile/home",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianContacts: {
    path: "/data-custodian/profile/contacts",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianProjects: {
    path: "/data-custodian/profile/projects",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianOrganisations: {
    path: "/data-custodian/profile/projectOrganisations",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianOrganisationsPeople: {
    path: "/data-custodian/profile/projectOrganisations/{projectOrganisationId}/people",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianOrganisationsNameAddress: {
    path: "/data-custodian/profile/projectOrganisations/{projectOrganisationId}/name_address",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianOrganisationsDigitalIdentifiers: {
    path: "/data-custodian/profile/projectOrganisations/{projectOrganisationId}/digital_identifiers",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianOrganisationsSectorWebsite: {
    path: "/data-custodian/profile/projectOrganisations/{projectOrganisationId}/sector_website",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianOrganisationsDataSecurityCompliance: {
    path: "/data-custodian/profile/projectOrganisations/{projectOrganisationId}/data_security_compliance",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianOrganisationsAutomatedFlags: {
    path: "/data-custodian/profile/projectOrganisations/{projectOrganisationId}/automated_flags",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianOrganisationsHistory: {
    path: "/data-custodian/profile/projectOrganisations/{projectOrganisationId}/history",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianConfiguration: {
    path: "/data-custodian/profile/configuration",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianConfigurationWebhooks: {
    path: "/data-custodian/profile/configuration/webhooks",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianConfigurationIntegrations: {
    path: "/data-custodian/profile/configuration/integrations",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianConfigurationRules: {
    path: "/data-custodian/profile/configuration/rules",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianConfigurationValidationChecks: {
    path: "/data-custodian/profile/configuration/validation-checks",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsers: {
    path: "/data-custodian/profile/projectUsers",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianKeycards: {
    path: "/data-custodian/profile/keycards",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUserById: {
    path: "/data-custodian/profile/projectUsers/{id}",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianProjectsSafeProject: {
    path: "/data-custodian/profile/projects/{id}/safe-project",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianProjectsSafeData: {
    path: "/data-custodian/profile/projects/{id}/safe-data",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianProjectsSafePeople: {
    path: "/data-custodian/profile/projects/{id}/safe-people",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianProjectsSafeSettings: {
    path: "/data-custodian/profile/projects/{id}/safe-settings",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianProjectsSafeOutputs: {
    path: "/data-custodian/profile/projects/{id}/safe-outputs",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsersHistory: {
    path: "/data-custodian/profile/projectUsers/{projectUserId}/history",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsersTrainingAccreditations: {
    path: "/data-custodian/profile/projectUsers/{projectUserId}/training_accreditations",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsersIdentity: {
    path: "/data-custodian/profile/projectUsers/{projectUserId}/identity",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsersProjects: {
    path: "/data-custodian/profile/projectUsers/{projectUserId}/projects",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsersCustodianOrgInfo: {
    path: "/data-custodian/profile/projectUsers/{projectUserId}/custodian_org_info",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsersAffiliations: {
    path: "/data-custodian/profile/projectUsers/{projectUserId}/affiliations",
    permissions: [UserGroup.CUSTODIANS],
  },
  permissionsResearcherCustodian: {
    path: "/data-custodian/permissions/user",
    permissions: [UserGroup.CUSTODIANS],
  },
  permissionsOrganisationCustodian: {
    path: "/data-custodian/permissions/organisation",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileResearcherExperience: {
    path: "/user/profile/experience",
    permissions: [UserGroup.USERS],
  },
  profileResearcherHome: {
    path: "/user/profile/home",
    permissions: [UserGroup.USERS],
  },
  profileResearcherCompletion: {
    path: "/user/profile/completion",
    permissions: [UserGroup.USERS],
  },
  profileResearcherIdentity: {
    path: "/user/profile/identity",
    permissions: [UserGroup.USERS],
  },
  profileResearcherTraining: {
    path: "/user/profile/training",
    permissions: [UserGroup.USERS],
  },
  profileResearcherAffiliations: {
    path: "/user/profile/affiliations",
    permissions: [UserGroup.USERS],
  },
  profileResearcherProjects: {
    path: "/user/profile/projects",
    permissions: [UserGroup.USERS],
  },
  profileResearcherProjectsSafeProject: {
    path: "/user/profile/projects/{id}/safe-project",
    permissions: [UserGroup.USERS],
  },
  profileResearcherProjectsSafeData: {
    path: "/user/profile/projects/{id}/safe-data",
    permissions: [UserGroup.USERS],
  },
  profileResearcherProjectsSafePeople: {
    path: "/user/profile/projects/{id}/safe-people",
    permissions: [UserGroup.USERS],
  },
  profileResearcherProjectsSafeSettings: {
    path: "/user/profile/projects/{id}/safe-settings",
    permissions: [UserGroup.USERS],
  },
  profileResearcherProjectsSafeOutputs: {
    path: "/user/profile/projects/{id}/safe-outputs",
    permissions: [UserGroup.USERS],
  },
  profileResearcher: {
    path: "/user/profile",
    permissions: [UserGroup.USERS],
  },
  profileOrganisation: {
    path: "/organisation/profile",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationActions: {
    path: "/organisation/profile/actions",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetails: {
    path: "/organisation/profile/details",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationHome: {
    path: "/organisation/profile/home",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetailsNameAndAddress: {
    path: "/organisation/profile/details/name-and-address",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetailsDigitalIdentifiers: {
    path: "/organisation/profile/details/digital-identifiers",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetailsSectorSizeAndWebsite: {
    path: "/organisation/profile/details/sector-size-and-website",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetailsSecurityCompliance: {
    path: "/organisation/profile/details/security-compliance",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationUserAdministration: {
    path: "/organisation/profile/user-administration",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationTeamAdministration: {
    path: "/organisation/profile/team-administration",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationUserAdministrationEmployeeStudent: {
    path: "/organisation/profile/user-administration/employees-and-students",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationUsersHistory: {
    path: "/organisation/profile/user-administration/employees-and-students/{userId}/history",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationUsersIdentity: {
    path: "/organisation/profile/user-administration/employees-and-students/{userId}/identity",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationUsersTrainingAccreditations: {
    path: "/organisation/profile/user-administration/employees-and-students/{userId}/training_accreditations",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationUsersProjects: {
    path: "/organisation/profile/user-administration/employees-and-students/{userId}/projects",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationUsersAffiliations: {
    path: "/organisation/profile/user-administration/employees-and-students/{userId}/affiliations",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationProjects: {
    path: "/organisation/profile/projects",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationProjectsSafeProject: {
    path: "/organisation/profile/projects/{id}/safe-project",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationProjectsSafeData: {
    path: "/organisation/profile/projects/{id}/safe-data",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationProjectsSafePeople: {
    path: "/organisation/profile/projects/{id}/safe-people",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationProjectsSafeSettings: {
    path: "/organisation/profile/projects/{id}/safe-settings",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationProjectsSafeOutputs: {
    path: "/organisation/profile/projects/{id}/safe-outputs",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileAdmin: {
    path: "/admin",
    permissions: [UserGroup.ADMINS],
  },
};

const EXCLUDE_REDIRECT_URLS: string[] = [ROUTES.invite.path];

export { EXCLUDE_REDIRECT_URLS, ROUTES };
