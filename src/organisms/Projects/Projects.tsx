"use client";

import { StoreState, useStore } from "@/data/store";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import ChipStatus from "../../components/ChipStatus";
import Table from "../../components/Table";
import PageSection from "../../modules/PageSection";
import ProjectsFilters from "../../modules/ProjectsFilters";
import { ProjectEntities } from "../../services/projects/getEntityProjects";
import useEntityProjectsQuery from "../../services/projects/useEntityProjectsQuery";
import { ResearcherProject } from "../../types/application";
import {
  renderOrganisationsNameCell,
  renderProjectNameCell,
} from "../../utils/cells";
import { formatDisplayLongDate } from "../../utils/date";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";

type VariantConfig = {
  getId: (store: StoreState) => string | number | undefined;
};

const variantConfig: Record<ProjectEntities, VariantConfig> = {
  organisation: {
    getId: store => {
      const organisation = store.getOrganisation();
      return organisation?.id;
    },
  },
  custodian: {
    getId: store => {
      const custodian = store.getCustodian();
      return custodian?.id;
    },
  },
  user: {
    getId: store => {
      const user = store.getUser();
      return user?.id;
    },
  },
};

interface ProjectsProps {
  variant: ProjectEntities;
  entityId?: number;
}

export default function Projects({ variant, entityId }: ProjectsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const routes = useStore(state => state.getApplication().routes);

  const store = useStore();
  const { getId } = variantConfig[variant];
  const defaultEntityId = entityId || getId(store);

  const {
    data: projectsData,
    last_page,
    total,
    setPage,
    updateQueryParams,
    resetQueryParams,
    handleSortToggle,
    handleFieldToggle,
    queryParams,
    ...queryState
  } = useEntityProjectsQuery(defaultEntityId, {
    variant,
    queryKeyBase: ["getProjects"],
    enabled: !!defaultEntityId,
  });

  const columns: ColumnDef<ResearcherProject>[] = [
    {
      cell: info => {
        let route = null;

        switch (variant) {
          case "organisation":
            route = routes.profileOrganisationProjectsSafeProject;
            break;
          case "custodian":
            route = routes.profileCustodianProjectsSafeProject;
            break;
          case "user":
            route = routes.profileResearcherProjectsSafeProject;
            break;
          default:
            route = null;
        }
        return renderProjectNameCell(info, route.path);
      },
      accessorKey: "title",
      header: t("title"),
    },
    {
      accessorKey: "lay_summary",
      header: t("laySummary"),
    },
    {
      accessorKey: "start_date",
      header: t("startDate"),
      cell: info => formatDisplayLongDate(info.getValue() as string),
      minSize: 160,
    },
    {
      accessorKey: "end_date",
      header: t("endDate"),
      cell: info => formatDisplayLongDate(info.getValue() as string),
      minSize: 160,
    },
    {
      accessorKey: "project_users_count",
      header: t("users"),
      minSize: 50,
    },
    {
      accessorKey: "organisations",
      header: t("organisations"),
      cell: info => renderOrganisationsNameCell(info.getValue()),
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: info => (
        <ChipStatus status={info.row.original.model_state?.state.slug} />
      ),
    },
    ...(variant !== "user" && variant !== "custodian"
      ? [
          {
            accessorKey: "organisationStatus",
            header: t("organisationStatus"),
            cell: info => (
              <ChipStatus
                status={
                  info.row.original.custodian_has_project_organisation?.[0]
                    ?.model_state.state.slug
                }
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <PageSection>
        <ProjectsFilters
          queryParams={queryParams}
          updateQueryParams={updateQueryParams}
          resetQueryParams={resetQueryParams}
          handleSortToggle={handleSortToggle}
          handleFieldToggle={handleFieldToggle}
        />
      </PageSection>
      <PageSection>
        <Table
          total={total}
          last_page={last_page}
          setPage={setPage}
          data={projectsData}
          columns={columns}
          queryState={queryState}
          isPaginated
        />
      </PageSection>
    </>
  );
}
