"use client";

import { Status } from "@/consts/application";
import useFilter from "@/hooks/useFilter";
import useSort from "@/hooks/useSort";
import SortIcon from "@mui/icons-material/Sort";
import { useTranslations } from "next-intl";
import { FilterIcon } from "../../consts/icons";
import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import { ResearcherProject } from "../../types/application";
import SearchActionMenu from "../SearchActionMenu";
import SearchBar from "../SearchBar";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Projects.ProjectsFilters";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export enum ProjectsFiltersKeys {
  DATE = "date",
  STATUS = "status",
}

export interface ProjectsFiltersProps
  extends Pick<
    PaginatedQueryReturn<ResearcherProject>,
    | "updateQueryParams"
    | "resetQueryParams"
    | "handleSortToggle"
    | "handleFieldToggle"
    | "queryParams"
  > {
  includeFilters?: ProjectsFiltersKeys[];
}

export default function ProjectsFilters({
  handleSortToggle,
  handleFieldToggle,
  resetQueryParams,
  updateQueryParams,
  queryParams,
  includeFilters = [ProjectsFiltersKeys.DATE, ProjectsFiltersKeys.STATUS],
}: ProjectsFiltersProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);

  const hasFilter = (key: ProjectsFiltersKeys) => {
    return includeFilters.includes(key);
  };

  const { actions: sortActions } = useSort({
    queryParams,
    items: [
      {
        label: t("sortByProjectTitle"),
        key: "title",
      },
    ],
    onSort: (key: string, direction: string) =>
      handleSortToggle(key, direction),
  });

  const { actions: filterDateActions } = useFilter({
    queryParams,
    items: [
      {
        label: t("filterByPast"),
        key: "active",
        value: "0",
      },
      {
        label: t("filterByActive"),
        key: "active",
        value: "1",
      },
    ],
    onFilter: (key: string, value: string) =>
      handleFieldToggle(key, [value, undefined]),
  });

  const { actions: filterStatusActions } = useFilter({
    queryParams,
    items: [
      {
        label: t("filterByStatus_approved"),
        key: "filter",
        value: Status.PROJECT_APPROVED,
      },
      {
        label: t("filterByStatus_pending"),
        key: "filter",
        value: Status.PROJECT_PENDING,
      },
      {
        label: t("filterByStatus_completed"),
        key: "filter",
        value: Status.PROJECT_COMPLETED,
      },
      {
        label: t("filterByStatus_declined_approval"),
        key: "filter",
        value: Status.PROJECT_DECLINED_APPROVAL,
      },
      {
        label: t("filterByStatus_in_progress"),
        key: "filter",
        value: Status.PROJECT_IN_PROGRESS,
      },
    ],
    onFilter: (key: string, value: string) =>
      handleFieldToggle(key, [value, undefined], true),
  });

  return (
    <SearchBar
      onClear={resetQueryParams}
      onSearch={(text: string) => {
        updateQueryParams({
          "title[]": text,
        });
      }}
      placeholder={t("searchPlaceholder")}>
      <SearchActionMenu
        actions={sortActions}
        startIcon={<SortIcon />}
        renderedSelectedLabel={tApplication("sortedBy")}
        renderedDefaultLabel={tApplication("sortBy")}
        aria-label={tApplication("sortBy")}
      />
      {hasFilter(ProjectsFiltersKeys.DATE) && (
        <SearchActionMenu
          actions={filterDateActions}
          onClear={() => handleFieldToggle("active", [undefined, undefined])}
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={tApplication("filterByDate")}
          aria-label={tApplication("filterByDate")}
        />
      )}
      {hasFilter(ProjectsFiltersKeys.STATUS) && (
        <SearchActionMenu
          actions={filterStatusActions}
          multiple
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={tApplication("filterByProjectStatus")}
          aria-label={tApplication("filterByProjectStatus")}
        />
      )}
    </SearchBar>
  );
}
