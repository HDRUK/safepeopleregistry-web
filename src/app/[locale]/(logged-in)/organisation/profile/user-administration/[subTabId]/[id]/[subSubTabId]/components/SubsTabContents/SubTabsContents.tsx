"use client";

import { notFound } from "next/navigation";
import UserAffiliations from "@/organisms/UserAffiliations";
import UserHistory from "@/organisms/UserHistory";
import UserIdentity from "@/organisms/UserIdentity";
import UserTrainingAccreditations from "@/organisms/UserTrainingAccreditations";
import { EntityType } from "@/types/api";
import UserProjects from "../../../../../../components/UserProjects";
import { UserSubTabs } from "../../../../../../consts/tabs";

interface TabsContentsProps {
  registryId: number;
  subTabId: UserSubTabs;
}

export default function SubTabsContents({
  registryId,
  subTabId,
}: TabsContentsProps) {
  const availableSubTabs = Object.values(UserSubTabs) || [];

  if (!availableSubTabs.includes(subTabId)) {
    notFound();
  }

  let content = null;

  switch (subTabId) {
    case UserSubTabs.HISTORY:
      content = <UserHistory />;
      break;
    case UserSubTabs.IDENTITY:
      content = <UserIdentity />;
      break;
    case UserSubTabs.TRAINING_ACCREDITATIONS:
      content = (
        <UserTrainingAccreditations variant={EntityType.ORGANISATION} />
      );
      break;
    case UserSubTabs.PROJECTS:
      content = <UserProjects />;
      break;
    case UserSubTabs.AFFILIATIONS:
      content = (
        <UserAffiliations
          registryId={registryId}
          variant={EntityType.ORGANISATION}
        />
      );
      break;
    default:
      content = null;
  }

  return content;
}
