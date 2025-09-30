import { UserGroup } from "@/consts/user";
import { RoleConfig } from "./roles";

interface RouteParams<T> {
  params: T;
}

interface RoutePermissions extends RoleConfig {
  path: string;
}

interface RouteConfig {
  path: string;
  permissions?: UserGroup[];
}

interface Routes {
  invite: RouteConfig;
  register: RouteConfig;
  homepage: RouteConfig;
  about: RouteConfig;
  usersCustodian: RouteConfig;
  profileCustodian: RouteConfig;
  profileCustodianUserById: RouteConfig;
  profileCustodianHome: RouteConfig;
  profileCustodianContacts: RouteConfig;
  profileCustodianProjects: RouteConfig;
  profileCustodianProjectsSafeProject: RouteConfig;
  profileCustodianProjectsSafeData: RouteConfig;
  profileCustodianProjectsSafePeople: RouteConfig;
  profileCustodianProjectsSafeSettings: RouteConfig;
  profileCustodianProjectsSafeOutputs: RouteConfig;
  profileCustodianOrganisations: RouteConfig;
  profileCustodianOrganisationsPeople: RouteConfig;
  profileCustodianOrganisationsNameAddress: RouteConfig;
  profileCustodianOrganisationsDigitalIdentifiers: RouteConfig;
  profileCustodianOrganisationsSectorWebsite: RouteConfig;
  profileCustodianOrganisationsDataSecurityCompliance: RouteConfig;
  profileCustodianOrganisationsAutomatedFlags: RouteConfig;
  profileCustodianConfiguration: RouteConfig;
  profileCustodianConfigurationWebhooks: RouteConfig;
  profileCustodianConfigurationIntegrations: RouteConfig;
  profileCustodianConfigurationRules: RouteConfig;
  profileCustodianConfigurationValidationChecks: RouteConfig;
  profileCustodianKeycards: RouteConfig;
  profileCustodianUsers: RouteConfig;
  profileCustodianUsersProjects: RouteConfig;
  profileCustodianUsersHistory: RouteConfig;
  profileCustodianUsersTrainingAccreditations: RouteConfig;
  profileCustodianUsersCustodianOrgInfo: RouteConfig;
  profileCustodianUsersIdentity: RouteConfig;
  profileCustodianUsersAffiliations: RouteConfig;
  permissionsOrganisationCustodian: RouteConfig;
  permissionsResearcherCustodian: RouteConfig;
  profileOrganisationHome: RouteConfig;
  profileResearcher: RouteConfig;
  profileResearcherCompletion: RouteConfig;
  profileResearcherTraining: RouteConfig;
  profileResearcherExperience: RouteConfig;
  profileResearcherIdentity: RouteConfig;
  profileResearcherAffiliations: RouteConfig;
  profileResearcherHome: RouteConfig;
  profileResearcherProjects: RouteConfig;
  profileResearcherProjectsSafeProject: RouteConfig;
  profileResearcherProjectsSafeData: RouteConfig;
  profileResearcherProjectsSafePeople: RouteConfig;
  profileResearcherProjectsSafeSettings: RouteConfig;
  profileResearcherProjectsSafeOutputs: RouteConfig;
  profileOrganisation: RouteConfig;
  profileOrganisationActions: RouteConfig;
  profileOrganisationDetails: RouteConfig;
  profileOrganisationDetailsNameAndAddress: RouteConfig;
  profileOrganisationDetailsDigitalIdentifiers: RouteConfig;
  profileOrganisationDetailsSectorSizeAndWebsite: RouteConfig;
  profileOrganisationDetailsSecurityCompliance: RouteConfig;
  profileOrganisationUserAdministration: RouteConfig;
  profileOrganisationTeamAdministration: RouteConfig;
  profileOrganisationUserAdministrationDelegates: RouteConfig;
  profileOrganisationUserAdministrationEmployeeStudent: RouteConfig;
  profileOrganisationUsersHistory: RouteConfig;
  profileOrganisationUsersIdentity: RouteConfig;
  profileOrganisationUsersTrainingAccreditations: RouteConfig;
  profileOrganisationUsersProjects: RouteConfig;
  profileOrganisationUsersAffiliations: RouteConfig;
  profileOrganisationProjects: RouteConfig;
  profileOrganisationProjectsSafeProject: RouteConfig;
  profileOrganisationProjectsSafeData: RouteConfig;
  profileOrganisationProjectsSafePeople: RouteConfig;
  profileOrganisationProjectsSafeSettings: RouteConfig;
  profileOrganisationProjectsSafeOutputs: RouteConfig;
  profileAdmin: RouteConfig;
}

export type { RoutePermissions, RouteConfig, Routes, RouteParams };
