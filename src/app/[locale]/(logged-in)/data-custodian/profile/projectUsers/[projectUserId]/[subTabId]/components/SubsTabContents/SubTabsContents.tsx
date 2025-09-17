"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import UserAffiliations from "@/organisms/UserAffiliations";
import UserHistory from "@/organisms/UserHistory";
import UserIdentity from "@/organisms/UserIdentity";
import UserTrainingAccreditations from "@/organisms/UserTrainingAccreditations";
import { EntityType } from "@/types/api";
import UserCustodianOrgInfo from "../../../../../components/UserCustodianOrgInfo";
import UserProjects from "../../../../../components/UserProjects";
import { UserSubTabs } from "../../../../../consts/tabs";

interface TabsContentsProps {
  subTabId: UserSubTabs;
  registryId: number;
}

export default function SubTabsContents({
  registryId,
  subTabId,
}: TabsContentsProps) {
  const custodian = useStore(state => state.getCustodian());

  const availableSubTabs = Object.values(UserSubTabs) || [];

  if (!custodian || !availableSubTabs.includes(subTabId)) {
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
      content = <UserTrainingAccreditations variant={EntityType.CUSTODIAN} />;
      break;
    case UserSubTabs.PROJECTS:
      content = <UserProjects />;
      break;
    case UserSubTabs.CUSTODIAN_ORG_INFO:
      content = <UserCustodianOrgInfo />;
      break;
    case UserSubTabs.AFFILIATIONS:
      content = (
        <UserAffiliations
          registryId={registryId}
          variant={EntityType.CUSTODIAN}
        />
      );
      break;
    default:
      content = null;
  }

  return content;
}
