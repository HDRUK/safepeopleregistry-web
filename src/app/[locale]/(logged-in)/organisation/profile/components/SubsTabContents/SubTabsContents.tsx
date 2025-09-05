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
import Delegates from "../Delegates";
import DigitalIdentifiers from "../DigitalIdentifiers";
import NameAndAddress from "../NameAndAddress";
import ProjectsSafeData from "../ProjectsSafeData";
import ProjectsSafeOutputs from "../ProjectsSafeOutputs";
import ProjectsSafePeople from "../ProjectsSafePeople";
import ProjectsSafeProject from "../ProjectsSafeProject";
import ProjectsSafeSettings from "../ProjectsSafeSettings";
import SectorSizeAndWebsite from "../SectorSizeAndWebsite";
import SecurityCompliance from "../SecurityCompliance";

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
    case DetailsPageSubTabs.NAME_AND_ADDRESS:
      content = <NameAndAddress />;
      break;
    case DetailsPageSubTabs.DIGITAL_IDENTIFIERS:
      content = <DigitalIdentifiers />;
      break;
    case DetailsPageSubTabs.SECTOR_SIZE_AND_WEBSITE:
      content = <SectorSizeAndWebsite />;
      break;
    case DetailsPageSubTabs.SECURITY_COMPLIANCE:
      content = <SecurityCompliance />;
      break;
    case UserAdminPageSubTabs.DELEGATE_ADMINISTRATION:
      content = <Delegates />;
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
