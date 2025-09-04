"use client";

import { useStore } from "@/data/store";
import SubTabs from "@/modules/SubTabs";
import { Option } from "@/types/common";
import { injectParamsIntoPath } from "@/utils/application";
import { useTranslations } from "next-intl";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export interface SubTabsMap {
  [key: string]: Option[];
}

interface SubTabsSectionsProps {
  tabId: PageTabs;
  subTabId: ProjectsSubTabs;
  id?: number;
}

export default function SubTabsSections({
  tabId,
  subTabId,
  id,
}: SubTabsSectionsProps) {
  const routes = useStore(store => store.getApplication().routes);
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const subTabs: SubTabsMap = {
    [PageTabs.PROJECTS]: [
      {
        label: t("safeProject"),
        value: ProjectsSubTabs.SAFE_PROJECT,
        href: injectParamsIntoPath(
          routes.profileResearcherProjectsSafeProject.path,
          {
            id,
          }
        ),
      },
      {
        label: t("safeData"),
        value: ProjectsSubTabs.SAFE_DATA,
        href: injectParamsIntoPath(
          routes.profileResearcherProjectsSafeData.path,
          {
            id,
          }
        ),
      },
      {
        label: t("safePeople"),
        value: ProjectsSubTabs.SAFE_PEOPLE,
        href: injectParamsIntoPath(
          routes.profileResearcherProjectsSafePeople.path,
          {
            id,
          }
        ),
      },
      {
        label: t("safeSettings"),
        value: ProjectsSubTabs.SAFE_SETTINGS,
        href: injectParamsIntoPath(
          routes.profileResearcherProjectsSafeSettings.path,
          {
            id,
          }
        ),
      },
      {
        label: t("safeOutputs"),
        value: ProjectsSubTabs.SAFE_OUTPUTS,
        href: injectParamsIntoPath(
          routes.profileResearcherProjectsSafeOutputs.path,
          {
            id,
          }
        ),
      },
    ],
  };

  const selectedTabs = subTabs[tabId];

  if (!selectedTabs || !tabId) {
    return null;
  }

  return <SubTabs current={subTabId} tabs={selectedTabs} />;
}
