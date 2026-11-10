"use client";

import { useStore } from "@/data/store";
import SubTabs from "@/modules/SubTabs";
import { Option } from "@/types/common";
import { injectParamsIntoPath } from "@/utils/application";
import { useTranslations } from "next-intl";
import { UserSubTabs } from "../../../../../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation.User";

export interface SubTabsMap {
  [key: string]: Option[];
}

interface SubTabsSectionsProps {
  userId: number;
  subTabId: UserSubTabs;
  affiliationId?: number;
}

export default function SubTabsSections({
  userId,
  subTabId,
  affiliationId,
}: SubTabsSectionsProps) {
  const routes = useStore(store => store.getApplication().routes);
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const subTabs = [
    {
      label: t("affiliations"),
      value: UserSubTabs.AFFILIATIONS,
      href: injectParamsIntoPath(
        routes.profileOrganisationUsersAffiliations.path,
        {
          userId,
        }
      ),
    },
    {
      label: t("projects"),
      value: UserSubTabs.PROJECTS,
      href: injectParamsIntoPath(routes.profileOrganisationUsersProjects.path, {
        userId,
      }),
    },
    {
      label: t("identity"),
      value: UserSubTabs.IDENTITY,
      href: injectParamsIntoPath(routes.profileOrganisationUsersIdentity.path, {
        userId,
      }),
    },
    {
      label: t("trainingAccreditations"),
      value: UserSubTabs.TRAINING_ACCREDITATIONS,
      href: injectParamsIntoPath(
        routes.profileOrganisationUsersTrainingAccreditations.path,
        {
          userId,
        }
      ),
    },
    // {
    //   label: t("history"),
    //   value: UserSubTabs.HISTORY,
    //   href: injectParamsIntoPath(routes.profileOrganisationUsersHistory.path, {
    //     userId,
    //   }),
    // },
  ];

  // Keep viewing the same affiliation when moving between tabs
  const affiliationQuery = affiliationId ? `?affiliation=${affiliationId}` : "";

  return (
    <SubTabs
      current={subTabId}
      tabs={subTabs.map(tab => ({
        ...tab,
        href: `${tab.href}${affiliationQuery}`,
      }))}
    />
  );
}
