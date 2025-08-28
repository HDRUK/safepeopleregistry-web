"use client";

import { useStore } from "@/data/store";
import useColumns from "@/hooks/useColumns";
import PageBody from "@/modules/PageBody";
import ProjectUsersList from "@/organisms/ProjectUsersList";
import { useGetProjectUsers } from "@/services/projects";
import { EntityType } from "@/types/api";
import { ProjectUser } from "@/types/application";
import { renderStatusCell } from "@/utils/cells";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export default function ProjectsSafePeople() {
  const t = useTranslations("Projects.Users");
  const { organisationName, projectId, route } = useStore(state => ({
    organisationName: state.getOrganisation()?.organisation_name,
    projectId: state.getCurrentProject().id,
    route: state.getApplication().routes.profileOrganisationUsersIdentity,
  }));

  const { data, total, last_page, page, setPage } = useGetProjectUsers(
    projectId,
    {
      defaultQueryParams: { organisation_name: organisationName },
    }
  );

  const { createDefaultColumn } = useColumns<ProjectUser>({ t });

  const extraColumns = useMemo(
    () => [
      createDefaultColumn("affiliationStatus", {
        accessorFn: row =>
          (row as ProjectUser)?.affiliation?.model_state?.state?.slug,
        cell: renderStatusCell,
      }),
      createDefaultColumn("status", {
        accessorFn: row =>
          (row as ProjectUser)?.custodian_has_project_user?.[0]?.model_state
            ?.state?.slug,
        cell: renderStatusCell,
      }),
    ],
    []
  );

  return (
    <PageBody>
      <ProjectUsersList
        data={data}
        total={total}
        last_page={last_page}
        page={page}
        setPage={setPage}
        isPaginated
        variant={EntityType.ORGANISATION}
        includeColumns={["name", "projectRole", "organisationName"]}
        extraColumns={extraColumns}
        routes={{
          name: route,
        }}
      />
    </PageBody>
  );
}
