"use client";

import { useStore } from "@/data/store";
import OrganisationUsers from "@/organisms/OrganisationUsers";
import { notFound } from "next/navigation";
import {
  DetailsPageSubTabs,
  getSubTabs,
  PageSubTabs,
  PageTabs,
  ProjectsSubTabs,
  UserAdminPageSubTabs,
} from "../../consts/tabs";
import DigitalIdentifiers from "../DigitalIdentifiers";
import ProjectsSafeData from "../ProjectsSafeData";
import ProjectsSafeOutputs from "../ProjectsSafeOutputs";
import ProjectsSafePeople from "../ProjectsSafePeople";
import ProjectsSafeProject from "../ProjectsSafeProject";
import ProjectsSafeSettings from "../ProjectsSafeSettings";
import SecurityCompliance from "../SecurityCompliance";
import Address from "../Address";
import NameAndSRO from "../NameAndSRO";
import OrganisationDetails from "../OrganisationDetails";

interface TabsContentsProps {
  tabId: string;
  subTabId: string;
  id?: number;
}

export default function SubTabsContents({
  tabId,
  subTabId,
  id,
}: TabsContentsProps) {
  const [user, organisation] = useStore(state => [
    state.getUser(),
    state.getOrganisation(),
  ]);

  const availableSubTabs = getSubTabs(tabId as PageTabs) || [];

  if (
    !user ||
    !organisation ||
    !availableSubTabs.includes(subTabId as PageSubTabs)
  )
    notFound();

  let content = null;

  switch (subTabId) {
    case DetailsPageSubTabs.NAME_AND_SRO:
      content = <NameAndSRO />;
      break;
    case DetailsPageSubTabs.ADDRESS:
      content = <Address />;
      break;
    case DetailsPageSubTabs.ORGANISATION_DETAILS:
      content = <OrganisationDetails />;
      break;
    case DetailsPageSubTabs.DIGITAL_IDENTIFIERS:
      content = <DigitalIdentifiers />;
      break;
    case DetailsPageSubTabs.SECURITY_COMPLIANCE:
      content = <SecurityCompliance />;
      break;
    case UserAdminPageSubTabs.EMPLOYEE_STUDENT_ADMINISTRATION:
      content = <OrganisationUsers />;
      break;
    case ProjectsSubTabs.SAFE_PEOPLE:
      content = <ProjectsSafePeople />;
      break;
    case ProjectsSubTabs.SAFE_DATA:
      content = <ProjectsSafeData id={id} />;
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
    default:
      content = null;
  }

  return content;
}
