"use client";

import SortIcon from "@mui/icons-material/Sort";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";
import useSort from "@/hooks/useSort/useSort";
import useFilter from "@/hooks/useFilter";
import { FilterIcon } from "../../consts/icons";
import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import { CustodianProjectOrganisation } from "../../types/application";
import SearchActionMenu from "../SearchActionMenu";
import SearchBar from "../SearchBar";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";
const NAMESPACE_TRANSLATIONS_ORGANISATIONS = "Organisations";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export enum ProjectOrganisationsFilterKeys {
  STATUS = "status",
  SORT = "sort",
}

export interface ProjectOrganisationsFilterProps extends PropsWithChildren<
  Pick<
    PaginatedQueryReturn<CustodianProjectOrganisation>,
    | "updateQueryParams"
    | "resetQueryParams"
    | "handleSortToggle"
    | "handleFieldToggle"
    | "queryParams"
  >
> {
  statusList?: string[];
  includeFilters?: ProjectOrganisationsFilterKeys[];
}

export default function ProjectOrganisationsFilters({
  children,
  handleSortToggle,
  handleFieldToggle,
  resetQueryParams,
  updateQueryParams,
  queryParams,
  statusList,
  includeFilters = [
    ProjectOrganisationsFilterKeys.STATUS,
    ProjectOrganisationsFilterKeys.SORT,
  ],
}: ProjectOrganisationsFilterProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);
  const tOrganisation = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATIONS);

  const hasFilter = (key: ProjectOrganisationsFilterKeys) => {
    return includeFilters.includes(key);
  };

  const { actions: sortActions } = useSort({
    queryParams,
    items: [
      {
        label: t("sortByOrganisationName"),
        key: "organisations.organisation_name",
      },
    ],
    onSort: (key: string, direction: string) =>
      handleSortToggle(key, direction),
  });

  const { actions: filterStatusActions } = useFilter({
    queryParams,
    items:
      statusList?.map(status => ({
        label: tApplication(`Status.${status}`),
        value: status,
        key: "filter",
      })) || [],
    onFilter: (key: string, value: string) =>
      handleFieldToggle(key, [value, ""], true),
  });

  return (
    <SearchBar
      onClear={resetQueryParams}
      onSearch={(text: string) => {
        updateQueryParams({
          name: text,
        });
      }}
      placeholder={tOrganisation("searchPlaceholder")}>
      {hasFilter(ProjectOrganisationsFilterKeys.SORT) && (
        <SearchActionMenu
          actions={sortActions}
          startIcon={<SortIcon />}
          renderedSelectedLabel={tApplication("sortedBy")}
          renderedDefaultLabel={tApplication("sortBy")}
          aria-label={tApplication("sortBy")}
        />
      )}
      {hasFilter(ProjectOrganisationsFilterKeys.STATUS) && (
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
