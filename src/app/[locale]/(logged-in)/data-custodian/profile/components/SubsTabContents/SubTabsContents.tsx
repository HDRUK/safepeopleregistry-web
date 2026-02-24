"use client";

import { useStore } from "@/data/store";
import { EntityType } from "@/types/api";
import { notFound } from "next/navigation";
import UserAffiliations from "@/organisms/UserAffiliations";
import UserHistory from "@/organisms/UserHistory";
import UserIdentity from "@/organisms/UserIdentity";
import UserTrainingAccreditations from "@/organisms/UserTrainingAccreditations";
import {
  ConfigurationSubTabs,
  getSubTabs,
  OrganisationsSubTabs,
  PageTabs,
  ProjectsSubTabs,
  UserSubTabs,
} from "../../consts/tabs";
import Integrations from "../Integrations";
import OrganisationsDataSecurityCompliance from "../OrganisationsDataSecurityCompliance";
import OrganisationsDigitalIdentifiers from "../OrganisationsDigitalIdentifiers";
import OrganisationsPeople from "../OrganisationsPeople";
import OrganisationsSectorWebsite from "../OrganisationsSectorWebsite";
import ProjectsSafeData from "../ProjectsSafeData";
import ProjectsSafeOutputs from "../ProjectsSafeOutputs";
import ProjectsSafeProject from "../ProjectsSafeProject";
import ProjectsSafeSettings from "../ProjectsSafeSettings";
import Rules from "../Rules";
import UserCustodianOrgInfo from "../UserCustodianOrgInfo";
import UserProjects from "../UserProjects";
import ValidationChecks from "../ValidationChecks";
import Webhooks from "../Webhooks";
import ProjectsSafePeople from "../ProjectsSafePeople";
import OrganisationsContactDetails from "../OrganisationsContactDetails";

interface TabsContentsProps {
  tabId: PageTabs;
  subTabId:
    | ConfigurationSubTabs
    | UserSubTabs
    | ProjectsSubTabs
    | OrganisationsSubTabs;
  id?: number;
}

export default function SubTabsContents({
  tabId,
  subTabId,
}: TabsContentsProps) {
  const [user, custodian] = useStore(state => [
    state.getUser(),
    state.getCustodian(),
  ]);

  const availableSubTabs = getSubTabs(tabId as PageTabs) || [];

  if (!user || !custodian || !availableSubTabs.includes(subTabId)) {
    notFound();
  }

  let content = null;

  switch (subTabId) {
    case ConfigurationSubTabs.RULES:
      content = <Rules />;
      break;
    case ConfigurationSubTabs.VALIDATION_CHECKS:
      content = <ValidationChecks />;
      break;
    case ConfigurationSubTabs.WEBHOOKS:
      content = <Webhooks />;
      break;
    case ConfigurationSubTabs.INTEGRATIONS:
      content = <Integrations />;
      break;
    case UserSubTabs.HISTORY:
      content = <UserHistory />;
      break;
    case UserSubTabs.IDENTITY:
      content = <UserIdentity />;
      break;
    case UserSubTabs.TRAINING_ACCREDITATIONS:
      content = <UserTrainingAccreditations variant={EntityType.CUSTODIAN} />;
      break;
    case UserSubTabs.PROJECTS:
      content = <UserProjects />;
      break;
    case UserSubTabs.CUSTODIAN_ORG_INFO:
      content = <UserCustodianOrgInfo />;
      break;
    case UserSubTabs.AFFILIATIONS:
      content = <UserAffiliations />;
      break;
    case ProjectsSubTabs.SAFE_PEOPLE:
      content = <ProjectsSafePeople />;
      break;
    case ProjectsSubTabs.SAFE_DATA:
      content = <ProjectsSafeData />;
      break;
    case ProjectsSubTabs.SAFE_PROJECT:
      content = <ProjectsSafeProject />;
      break;
    case ProjectsSubTabs.SAFE_SETTINGS:
      content = <ProjectsSafeSettings />;
      break;
    case ProjectsSubTabs.SAFE_OUTPUTS:
      content = <ProjectsSafeOutputs />;
      break;
    case OrganisationsSubTabs.PEOPLE:
      content = <OrganisationsPeople />;
      break;
    case OrganisationsSubTabs.CONTACT_DETAILS:
      content = <OrganisationsContactDetails />;
      break;
    case OrganisationsSubTabs.DIGITAL_IDENTIFIERS:
      content = <OrganisationsDigitalIdentifiers />;
      break;
    case OrganisationsSubTabs.SECTOR_WEBSITE:
      content = <OrganisationsSectorWebsite />;
      break;
    case OrganisationsSubTabs.DATA_SECURITY_COMPLIANCE:
      content = <OrganisationsDataSecurityCompliance />;
      break;
    default:
      content = null;
  }

  return content;
}
