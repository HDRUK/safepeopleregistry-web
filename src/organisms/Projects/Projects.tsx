"use client";

import { StoreState, useStore } from "@/data/store";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import useColumns from "../../hooks/useColumns";
import PageSection from "../../modules/PageSection";
import ProjectsFilters from "../../modules/ProjectsFilters";
import ProjectsTable from "../../modules/ProjectsTable";
import useEntityProjectsQuery from "../../services/projects/useEntityProjectsQuery";
import { EntityType } from "../../types/api";
import { ResearcherProject } from "../../types/application";
import { renderProjectNameCell } from "../../utils/cells";

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

  const extraColumns: ColumnDef<ResearcherProject>[] = useMemo(
    () => [
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
    ],
    [variant]
  );

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
        <ProjectsTable
          total={total}
          last_page={last_page}
          setPage={setPage}
          data={projectsData}
          queryState={queryState}
          isPaginated
          extraColumns={extraColumns}
          t={t}
          variant={variant}
        />
      </PageSection>
    </>
  );
}
