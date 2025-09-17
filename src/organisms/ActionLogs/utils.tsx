import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import GroupIcon from "@mui/icons-material/Group";
import { ROUTES } from "../../consts/router";

type Route = Record<
  keyof typeof ROUTES,
  {
    path: string;
  }
>;

export interface ActionConfig {
  icon: React.ReactNode;
  path: string;
}

const generateActions = (routes: Route) => {
  return {
    profile_completed: {
      icon: <BadgeOutlinedIcon />,
      path: routes.profileResearcherIdentity.path,
    },
    affiliations_complete: {
      icon: <WorkOutlineIcon />,
      path: routes.profileResearcherAffiliations.path,
    },
    training_complete: {
      icon: <BadgeOutlinedIcon />,
      path: routes.profileResearcherTraining.path,
    },
    projects_review: {
      icon: <BadgeOutlinedIcon />,
      path: routes.profileResearcherProjects.path,
    },
    name_address_completed: {
      icon: <CorporateFareIcon />,
      path: routes.profileOrganisationDetailsNameAndAddress.path,
    },
    digital_identifiers_completed: {
      icon: <CorporateFareIcon />,
      path: routes.profileOrganisationDetailsDigitalIdentifiers.path,
    },
    sector_size_completed: {
      icon: <CorporateFareIcon />,
      path: routes.profileOrganisationDetailsSectorSizeAndWebsite.path,
    },
    add_subsidiary_completed: {
      icon: <CorporateFareIcon />,
      path: routes.profileOrganisationDetailsNameAndAddress.path,
    },
    data_security_completed: {
      icon: <CorporateFareIcon />,
      path: routes.profileOrganisationDetailsSecurityCompliance.path,
    },
    add_sro_completed: {
      icon: <ManageAccountsIcon />,
      path: routes.profileOrganisationTeamAdministration.path,
    },
    affiliateEmployeesCompleted: {
      icon: <ManageAccountsIcon />,
      path: routes.profileOrganisationUserAdministrationEmployeeStudent.path,
    },
    complete_configuration: {
      icon: <SettingsIcon />,
      path: `${routes.profileCustodianConfiguration.path}?markActionComplete={id}`,
    },
    add_contacts_completed: {
      icon: <ManageAccountsIcon />,
      path: routes.profileCustodianContacts.path,
    },
    add_users_completed: {
      icon: <GroupIcon />,
      path: routes.profileCustodianUsers.path,
    },
    add_projects_completed: {
      icon: <ContentPasteIcon />,
      path: routes.profileCustodianProjects.path,
    },
    approve_an_organisation_completed: {
      icon: <CorporateFareIcon />,
      path: routes.profileCustodianOrganisations.path,
    },
  } as Record<string, ActionConfig>;
};

export default generateActions;
