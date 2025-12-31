"use client";

import useSort from "@/hooks/useSort";
import SortIcon from "@mui/icons-material/Sort";
import { useTranslations } from "next-intl";
import useFilter from "@/hooks/useFilter";
import { Status } from "@/consts/application";
import { FilterIcon } from "../../consts/icons";
import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import { Organisation } from "../../types/application";
import SearchActionMenu from "../SearchActionMenu";
import SearchBar from "../SearchBar";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Organisations";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export enum OrganisationsFilterKeys {
  STATUS = "status",
}

export interface OrganisationsFilterProps extends Pick<
  PaginatedQueryReturn<Organisation>,
  | "updateQueryParams"
  | "resetQueryParams"
  | "handleSortToggle"
  | "handleFieldToggle"
  | "queryParams"
> {
  includeFilters?: OrganisationsFilterKeys[];
}

export default function OrganisationsFilters({
  handleSortToggle,
  handleFieldToggle,
  resetQueryParams,
  updateQueryParams,
  queryParams,
  includeFilters = [OrganisationsFilterKeys.STATUS],
}: OrganisationsFilterProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);

  const hasFilter = (key: OrganisationsFilterKeys) => {
    return includeFilters.includes(key);
  };

  const { actions: sortActions } = useSort({
    queryParams,
    items: [
      {
        label: t("sortByOrganisationName"),
        key: "organisation_name",
      },
    ],
    onSort: (key: string, direction: string) =>
      handleSortToggle(key, direction),
  });

  const { actions: filterStatusActions } = useFilter({
    queryParams,
    items: [
      {
        label: t("Status.approved"),
        key: "filter",
        value: Status.PROJECT_APPROVED,
      },
      {
        label: t("Status.pending"),
        key: "filter",
        value: Status.PROJECT_PENDING,
      },
      {
        label: t("Status.completed"),
        key: "filter",
        value: Status.PROJECT_COMPLETED,
      },
    ],
    onFilter: (key: string, value: string) =>
      handleFieldToggle(key, [value, ""]),
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
      <SearchActionMenu
        actions={sortActions}
        startIcon={<SortIcon />}
        renderedSelectedLabel={tApplication("sortedBy")}
        renderedDefaultLabel={tApplication("sortBy")}
        aria-label={tApplication("sortBy")}
      />
      {hasFilter(OrganisationsFilterKeys.STATUS) && (
        <SearchActionMenu
          actions={filterStatusActions}
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={t("Search.filterByProjectStatus")}
          aria-label={t("Search.filterByProjectStatus")}
        />
      )}
    </SearchBar>
  );
}
