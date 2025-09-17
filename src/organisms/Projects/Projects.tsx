"use client";

import { StoreState, useStore } from "@/data/store";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import ChipStatus from "../../components/ChipStatus";
import Table from "../../components/Table";
import useColumns from "../../hooks/useColumns";
import PageSection from "../../modules/PageSection";
import ProjectsFilters from "../../modules/ProjectsFilters";
import useEntityProjectsQuery from "../../services/projects/useEntityProjectsQuery";
import { EntityType } from "../../types/api";
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

const variantConfig: Record<EntityType, VariantConfig> = {
  [EntityType.ORGANISATION]: {
    getId: store => {
      const organisation = store.getOrganisation();
      return organisation?.id;
    },
  },
  [EntityType.CUSTODIAN]: {
    getId: store => {
      const custodian = store.getCustodian();
      return custodian?.id;
    },
  },
  [EntityType.USER]: {
    getId: store => {
      const user = store.getUser();
      return user?.id;
    },
  },
};

interface ProjectsProps {
  variant: EntityType;
  entityId?: number;
}

export default function Projects({ variant, entityId }: ProjectsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const routes = useStore(state => state.getApplication().routes);
  const { createDefaultColumn } = useColumns<ResearcherProject>({
    t,
  });

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
    createDefaultColumn("title", {
      cell: info => {
        let route = null;

        switch (variant) {
          case EntityType.ORGANISATION:
            route = routes.profileOrganisationProjectsSafeProject;
            break;
          case EntityType.CUSTODIAN:
            route = routes.profileCustodianProjectsSafeProject;
            break;
          case EntityType.USER:
            route = routes.profileResearcherProjectsSafeProject;
            break;
          default:
            route = null;
        }
        return renderProjectNameCell(info, route.path);
      },
    }),
    createDefaultColumn("laySummary", {
      accessorKey: "lay_summary",
    }),
    createDefaultColumn("startDate", {
      accessorKey: "start_date",
      cell: info => formatDisplayLongDate(info.getValue() as string),
      minSize: 160,
    }),
    createDefaultColumn("endDate", {
      accessorKey: "end_date",
      cell: info => formatDisplayLongDate(info.getValue() as string),
      minSize: 160,
    }),
    ...(variant === EntityType.CUSTODIAN
      ? [
          createDefaultColumn("users", {
            accessorKey: "project_users_count",
            minSize: 50,
          }),
        ]
      : []),
    createDefaultColumn("organisations", {
      cell: info => renderOrganisationsNameCell(info.getValue()),
    }),
    createDefaultColumn("status", {
      cell: info => (
        <ChipStatus status={info.row.original.model_state?.state.slug} />
      ),
    }),
    ...(variant === EntityType.ORGANISATION
      ? [
          createDefaultColumn("organisationStatus", {
            accessorKey: "custodian_has_project_organisation",
            cell: info => {
              const validationState = info.getValue();

              return (
                <ChipStatus
                  status={validationState?.[0]?.model_state.state.slug}
                />
              );
            },
          }),
        ]
      : []),
    ...(variant === EntityType.USER
      ? [
          {
            accessorKey: "custodian_has_project_user",
            header: t("validationStatus"),
            cell: info => {
              const validationState = info.getValue();

              return (
                <ChipStatus
                  status={validationState?.[0].model_state.state.slug}
                />
              );
            },
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
