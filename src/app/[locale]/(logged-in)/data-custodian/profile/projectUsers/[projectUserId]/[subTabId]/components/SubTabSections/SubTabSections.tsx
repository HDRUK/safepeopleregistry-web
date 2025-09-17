"use client";

import { useStore } from "@/data/store";
import SubTabs from "@/modules/SubTabs";
import { Option } from "@/types/common";
import { injectParamsIntoPath } from "@/utils/application";
import { useTranslations } from "next-intl";
import { UserSubTabs } from "../../../../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile.User";

export interface SubTabsMap {
  [key: string]: Option[];
}

interface SubTabsSectionsProps {
  projectUserId: number;
  subTabId: UserSubTabs;
}

export default function SubTabsSections({
  projectUserId,
  subTabId,
}: SubTabsSectionsProps) {
  const routes = useStore(store => store.getApplication().routes);
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const subTabs = [
    {
      label: t("affiliations"),
      value: UserSubTabs.AFFILIATIONS,
      href: injectParamsIntoPath(
        routes.profileCustodianUsersAffiliations.path,
        {
          projectUserId,
        }
      ),
    },
    {
      label: t("projects"),
      value: UserSubTabs.PROJECTS,
      href: injectParamsIntoPath(routes.profileCustodianUsersProjects.path, {
        projectUserId,
      }),
    },
    {
      label: t("identity"),
      value: UserSubTabs.IDENTITY,
      href: injectParamsIntoPath(routes.profileCustodianUsersIdentity.path, {
        projectUserId,
      }),
    },
    {
      label: t("trainingAccreditations"),
      value: UserSubTabs.TRAINING_ACCREDITATIONS,
      href: injectParamsIntoPath(
        routes.profileCustodianUsersTrainingAccreditations.path,
        {
          projectUserId,
        }
      ),
    },
    {
      label: t("custodianOrgInfo"),
      value: UserSubTabs.CUSTODIAN_ORG_INFO,
      href: injectParamsIntoPath(
        routes.profileCustodianUsersCustodianOrgInfo.path,
        {
          projectUserId,
        }
      ),
    },
    {
      label: t("history"),
      value: UserSubTabs.HISTORY,
      href: injectParamsIntoPath(routes.profileCustodianUsersHistory.path, {
        projectUserId,
      }),
    },
  ];

  return <SubTabs current={subTabId} tabs={subTabs} />;
}
