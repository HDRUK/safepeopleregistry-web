"use client";

import { usePagedSponsoredProjectsQuery } from "@/services/organisations";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Typography } from "@mui/material";
import { useFeatures } from "../../components/FeatureProvider";
import { StoreState, useStore } from "../../data/store";
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
  includeSponsorship?: boolean;
}

export default function Projects({
  variant,
  entityId,
  includeSponsorship,
}: ProjectsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const routes = useStore(state => state.getApplication().routes);
  const { createDefaultColumn } = useColumns<ResearcherProject>({
    t,
  });

  const { isSponsorship } = useFeatures();
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

  const showSponsorship =
    variant === EntityType.ORGANISATION && includeSponsorship;

  const sponsorshipQuery = usePagedSponsoredProjectsQuery(defaultEntityId, {
    queryKeyBase: ["getSponsoredProjects"],
    enabled: includeSponsorship,
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
          updateQueryParams={newParams => {
            updateQueryParams(newParams);
            if (showSponsorship) sponsorshipQuery.updateQueryParams(newParams);
          }}
          resetQueryParams={overideParams => {
            resetQueryParams(overideParams);
            if (showSponsorship)
              sponsorshipQuery.resetQueryParams(overideParams);
          }}
          handleSortToggle={(field, direction) => {
            handleSortToggle(field, direction);
            if (showSponsorship)
              sponsorshipQuery.handleSortToggle(field, direction);
          }}
          handleFieldToggle={(field, options, isMultiple) => {
            handleFieldToggle(field, options, isMultiple);
            if (showSponsorship)
              sponsorshipQuery.handleFieldToggle(field, options, isMultiple);
          }}
        />
      </PageSection>
      {showSponsorship && isSponsorship && (
        <PageSection data-cy="projects-sponsorship">
          <Typography variant="h6" mb={2}>
            Sponsored Projects
          </Typography>
          <ProjectsTable
            total={sponsorshipQuery.total}
            last_page={sponsorshipQuery.last_page}
            setPage={sponsorshipQuery.setPage}
            data={sponsorshipQuery.data}
            queryState={sponsorshipQuery}
            isPaginated
            extraColumns={extraColumns}
            t={t}
            variant={variant}
            includeColumns={[
              "title",
              "laySummary",
              "startDate",
              "endDate",
              "users",
              "status",
              "sponsorStatus",
              "validationStatus",
              "uniqueId",
              "statusChanged",
            ]}
          />
        </PageSection>
      )}
      <PageSection data-cy="projects">
        {showSponsorship && isSponsorship && (
          <Typography variant="h6" mb={2}>
            Projects directly associated with Users
          </Typography>
        )}
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
          includeColumns={[
            "title",
            "laySummary",
            "startDate",
            "endDate",
            "users",
            "status",
            "organisationStatus",
            "validationStatus",
            "uniqueId",
            "statusChanged",
          ]}
        />
      </PageSection>
    </>
  );
}
