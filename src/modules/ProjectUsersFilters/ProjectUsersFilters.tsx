"use client";

import SortIcon from "@mui/icons-material/Sort";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";
import useSort from "@/hooks/useSort";
import useFilter from "@/hooks/useFilter";
import { FilterIcon } from "../../consts/icons";
import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import { CustodianProjectUser } from "../../types/application";
import SearchActionMenu from "../SearchActionMenu";
import SearchBar from "../SearchBar";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export enum ProjectUsersFilterKeys {
  STATUS = "status",
  SORT = "sort",
}

export interface ProjectUsersFiltersProps extends PropsWithChildren<
  Pick<
    PaginatedQueryReturn<CustodianProjectUser>,
    | "updateQueryParams"
    | "resetQueryParams"
    | "handleSortToggle"
    | "handleFieldToggle"
    | "queryParams"
  >
> {
  statusList?: string[];
  includeFilters?: ProjectUsersFilterKeys[];
}

export default function ProjectUsersFilters({
  children,
  handleSortToggle,
  handleFieldToggle,
  resetQueryParams,
  updateQueryParams,
  queryParams,
  statusList,
  includeFilters = [ProjectUsersFilterKeys.STATUS, ProjectUsersFilterKeys.SORT],
}: ProjectUsersFiltersProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);

  const hasFilter = (key: ProjectUsersFilterKeys) => {
    return includeFilters.includes(key);
  };

  const { actions: sortActions } = useSort({
    queryParams,
    items: [
      {
        label: t("sortByProjectTitle"),
        key: "projects.title",
      },
    ],
    onSort: (key: string, direction: string) =>
      handleSortToggle(key, direction),
  });

  const { actions: filterStatusActions } = useFilter({
    queryParams,
    items: statusList?.map(status => ({
      label: tApplication(`Status.${status}`),
      value: status,
      key: "filter",
    })),
    onFilter: (key: string, value: string) =>
      handleFieldToggle(key, [value, ""], true),
  });

  return (
    <SearchBar
      onClear={resetQueryParams}
      onSearch={(text: string) => {
        updateQueryParams({
          "name[]": text,
        });
      }}
      placeholder={t("searchPlaceholder")}>
      {hasFilter(ProjectUsersFilterKeys.SORT) && (
        <SearchActionMenu
          actions={sortActions}
          startIcon={<SortIcon />}
          renderedSelectedLabel={tApplication("sortedBy")}
          renderedDefaultLabel={tApplication("sortBy")}
          aria-label={tApplication("sortBy")}
        />
      )}
      {hasFilter(ProjectUsersFilterKeys.STATUS) && (
        <SearchActionMenu
          actions={filterStatusActions}
          multiple
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={tApplication("filterByProjectStatus")}
          aria-label={tApplication("filterByProjectStatus")}
        />
      )}
      {children}
    </SearchBar>
  );
}
