"use client";

import { useStore } from "@/data/store";
import useStorePaginatedQueryParams from "@/hooks/useStorePaginatedQueryParams";
import PageBody from "@/modules/PageBody";
import ProjectUsers from "@/organisms/ProjectUsers";
import { EntityType } from "@/types/api";
import { useTranslations } from "next-intl";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";

const NAMESPACE_TRANSLATION = "CustodianProfile.SafePeople";

export default function ProjectsSafePeople() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const { custodianId, projectId, route } = useStore(state => ({
    custodianId: state.getCustodian()?.id,
    projectId: state.getCurrentProject().id,
    route: state.getApplication().routes.profileCustodianUsersProjects,
  }));

  const paginatedQueryParams = useStorePaginatedQueryParams();

  return (
    <>
      <SubTabsSections
        tabId={PageTabs.PROJECTS}
        subTabId={ProjectsSubTabs.SAFE_PEOPLE}
        id={projectId}
      />
      <PageBody heading={t("heading")} description={t("description")}>
        <ProjectUsers
          variant={EntityType.CUSTODIAN}
          custodianId={custodianId}
          projectId={projectId}
          routes={{
            name: route,
          }}
          paginatedQueryParams={paginatedQueryParams}
        />
      </PageBody>
    </>
  );
}
