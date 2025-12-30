"use client";

import { usePagedSponsoredProjectsQuery } from "@/services/organisations";
import { Typography } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useFeatures } from "../../components/FeatureProvider";
import { StoreState, useStore } from "../../data/store";
import useColumns from "../../hooks/useColumns";
import PageSection from "../../modules/PageSection";
import ProjectsFilters from "../../modules/ProjectsFilters";
import ProjectsTable from "../../modules/ProjectsTable";
import useEntityProjectsQuery from "../../services/projects/useEntityProjectsQuery";
import { EntityType } from "../../types/api";
import {
  Custodian,
  Organisation,
  ResearcherProject,
  User,
} from "../../types/application";
import { renderProjectNameCell } from "../../utils/cells";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";

type VariantConfig = {
  getEntity: (store: StoreState) => Custodian | Organisation | User | undefined;
};

const variantConfig: Record<EntityType, VariantConfig> = {
  [EntityType.ORGANISATION]: {
    getEntity: store => store.getOrganisation(),
  },
  [EntityType.CUSTODIAN]: {
    getEntity: store => store.getCustodian(),
  },
  [EntityType.USER]: {
    getEntity: store => store.getUser(),
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
  const entity = variantConfig[variant]?.getEntity(store);
  const defaultEntityId = entityId || entity?.id;

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
          <Typography variant="h6" component="h2" mb={2}>
            {t("sponsoredProjectsTitle")}
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
              "validationStatus",
            ]}
            paginationProps={{
              "aria-label": "Sponsored projects table pagination",
            }}
          />
        </PageSection>
      )}
      <PageSection data-cy="projects">
        {showSponsorship && isSponsorship && (
          <Typography variant="h6" component="h2" mb={2}>
            {t("ownProjectsTitle")}
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
          ]}
          paginationProps={{ "aria-label": "Projects table pagination" }}
        />
      </PageSection>
    </>
  );
}
