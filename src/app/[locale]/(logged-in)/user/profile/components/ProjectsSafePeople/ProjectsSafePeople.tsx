"use client";

import { useStore } from "@/data/store";
import useColumns from "@/hooks/useColumns";
import PageBody from "@/modules/PageBody";
import ProjectUsersList from "@/organisms/ProjectUsersList";
import { useGetProjectUsers } from "@/services/projects";
import { EntityType } from "@/types/api";
import { renderUserNameCell } from "@/utils/cells";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function ProjectsSafePeople() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const { createDefaultColumn } = useColumns({
    t,
  });

  const { registryId, projectId, route } = useStore(state => ({
    registryId: state.getUser()?.registry_id,
    projectId: state.getCurrentProject().id,
    route: state.getApplication().routes.profileOrganisationUsersIdentity,
  }));

  // filter to only display the current user via registry ID, if in this project
  // note - do we really want this?
  const { data, total, last_page, page, setPage } = useGetProjectUsers(
    projectId,
    {
      defaultQueryParams: { registry_id: registryId },
    }
  );

  const extraColumns = [
    createDefaultColumn("name", {
      accessorFn: row => row.registry.user,
      cell: info => renderUserNameCell(info.getValue()),
    }),
  ];

  return (
    <PageBody
      heading={t("safePeople")}
      description={t("safePeopleDescription")}>
      <ProjectUsersList
        data={data}
        total={total}
        last_page={last_page}
        page={page}
        setPage={setPage}
        isPaginated
        variant={EntityType.USER}
        includeColumns={["name", "projectRole", "organisationName"]}
        extraColumns={extraColumns}
        routes={{
          name: route,
        }}
      />
    </PageBody>
  );
}
