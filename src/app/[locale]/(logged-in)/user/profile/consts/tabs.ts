enum PageTabs {
  EXPERIENCE = "experience",
  AFFILIATIONS = "affiliations",
  IDENTITY = "identity",
  TRAINING = "training",
  HOME = "home",
  PROJECTS = "projects",
}

enum ProjectsSubTabs {
  SAFE_PROJECT = "safe-project",
  SAFE_DATA = "safe-data",
  SAFE_PEOPLE = "safe-people",
  SAFE_SETTINGS = "safe-settings",
  SAFE_OUTPUTS = "safe-outputs",
}

enum AdminSubTabs {
  FEATURE_FLAGS = "feature-flags",
  DATA_CUSTODIAN_INVITATION = "data-custodian-invitation",
  EMAIL_LOGS = "email-logs",
  ORGANISATIONS = "organisations",
  SUPER_ADMIN_LIST = "super-admin-list",
  SSO_TENANTS = "sso-tenants",
}

enum AdminModalActions {
  INVITE_CUSTODIAN = "invite-custodian",
  INVITE_USER = "invite-user",
}

type TabStructure = {
  [key in PageTabs]?: ProjectsSubTabs[];
};

const tabHierarchy: TabStructure = {
  [PageTabs.PROJECTS]: Object.values(ProjectsSubTabs),
};

function getSubTabs(tab: PageTabs): ProjectsSubTabs[] | undefined {
  return tabHierarchy[tab];
}

export {
  PageTabs,
  ProjectsSubTabs,
  AdminSubTabs,
  AdminModalActions,
  getSubTabs,
};
