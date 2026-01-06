enum PageTabs {
  HOME = "home",
  CONTACTS = "contacts",
  USERS = "users",
  CONFIGURATION = "configuration",
  ORGANISATIONS = "organisations",
  PROJECTS = "projects",
}

enum ConfigurationSubTabs {
  INTEGRATIONS = "integrations",
  WEBHOOKS = "webhooks",
  RULES = "rules",
  VALIDATION_CHECKS = "validation-checks",
}

enum ProjectsSubTabs {
  SAFE_PROJECT = "safe-project",
  SAFE_DATA = "safe-data",
  SAFE_PEOPLE = "safe-people",
  SAFE_SETTINGS = "safe-settings",
  SAFE_OUTPUTS = "safe-outputs",
}

enum UserSubTabs {
  AFFILIATIONS = "affiliations",
  PROJECTS = "projects",
  IDENTITY = "identity",
  TRAINING_ACCREDITATIONS = "training_accreditations",
  CUSTODIAN_ORG_INFO = "custodian_org_info",
  HISTORY = "history",
}

enum OrganisationsSubTabs {
  PEOPLE = "people",
  NAME_ADDRESS = "name_address",
  DIGITAL_IDENTIFIERS = "digital_identifiers",
  SECTOR_WEBSITE = "sector_website",
  DATA_SECURITY_COMPLIANCE = "data_security_compliance",
  AUTOMATED_FLAGS = "automated_flags",
  HISTORY = "history",
}

type TabStructure = {
  [key in PageTabs]?:
    | ConfigurationSubTabs[]
    | UserSubTabs[]
    | ProjectsSubTabs[]
    | OrganisationsSubTabs[];
};

const tabHierarchy: TabStructure = {
  [PageTabs.CONFIGURATION]: Object.values(ConfigurationSubTabs),
  [PageTabs.USERS]: Object.values(UserSubTabs),
  [PageTabs.PROJECTS]: Object.values(ProjectsSubTabs),
  [PageTabs.ORGANISATIONS]: Object.values(OrganisationsSubTabs),
};

function getSubTabs(
  tab: PageTabs
):
  | ConfigurationSubTabs[]
  | UserSubTabs[]
  | ProjectsSubTabs[]
  | OrganisationsSubTabs[]
  | undefined {
  return tabHierarchy[tab];
}

export {
  UserSubTabs,
  PageTabs,
  ConfigurationSubTabs,
  ProjectsSubTabs,
  OrganisationsSubTabs,
  getSubTabs,
};
