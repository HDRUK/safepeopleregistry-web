"use client";

import DateInput from "@/components/DateInput";
import { Status } from "@/consts/application";
import useFilter from "@/hooks/useFilter";
import useSort from "@/hooks/useSort";
import { formatDBDate } from "@/utils/date";
import SortIcon from "@mui/icons-material/Sort";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FilterIcon } from "../../consts/icons";
import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import { ResearcherProject } from "../../types/application";
import SearchActionMenu from "../SearchActionMenu";
import SearchBar from "../SearchBar";

const NAMESPACE_TRANSLATIONS_EMAILS = "Admin.EmailsFilters";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export enum EmailsFiltersKeys {
  USER_GROUP = "user_group",
  STATUS = "status",
  DATE_TRIED = "updated_at",
}

export interface EmailsFiltersProps
  extends Pick<
    PaginatedQueryReturn<ResearcherProject>,
    | "updateQueryParams"
    | "resetQueryParams"
    | "handleSortToggle"
    | "handleFieldToggle"
    | "queryParams"
  > {
  includeFilters?: EmailsFiltersKeys[];
}

export default function EmailsFilters({
  handleSortToggle,
  handleFieldToggle,
  resetQueryParams,
  updateQueryParams,
  queryParams,
  includeFilters = [EmailsFiltersKeys.STATUS, EmailsFiltersKeys.DATE_TRIED],
}: EmailsFiltersProps) {
  const [dateSent, setDateSent] = useState<Date | string | null>(null);
  const t = useTranslations(NAMESPACE_TRANSLATIONS_EMAILS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);

  const hasFilter = (key: EmailsFiltersKeys) => {
    return includeFilters.includes(key);
  };

  const { actions: sortActions } = useSort({
    queryParams,
    items: [
      {
        label: t("sortByDateTried"),
        key: "updated_at",
      },
    ],
    onSort: (key: string, direction: string) =>
      handleSortToggle(key, direction),
  });

  const { actions: filterStatusActions } = useFilter({
    queryParams,
    items: [
      {
        label: t("filterByStatus_failed"),
        key: EmailsFiltersKeys.STATUS,
        value: Status.EMAIL_FAILED,
      },
      {
        label: t("filterByStatus_successful"),
        key: EmailsFiltersKeys.STATUS,
        value: Status.EMAIL_SUCCESSFUL,
      },
    ],
    onFilter: (key: string, value: string) =>
      handleFieldToggle(key, [value, undefined]),
  });

  return (
    <SearchBar
      onClear={resetQueryParams}
      onSearch={(email: string) => {
        updateQueryParams({
          email,
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
      {hasFilter(EmailsFiltersKeys.STATUS) && (
        <SearchActionMenu
          id="filterByStatus"
          actions={filterStatusActions}
          onClear={() =>
            handleFieldToggle(EmailsFiltersKeys.STATUS, [undefined, undefined])
          }
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={t("filterByStatus")}
          aria-label={t("filterByStatus")}
        />
      )}
      {hasFilter(EmailsFiltersKeys.DATE_TRIED) && (
        <DateInput
          value={dateSent}
          clearable
          onClear={() => {
            setDateSent(null);

            handleFieldToggle("updated_at", [undefined, undefined]);
          }}
          onChange={value => {
            setDateSent(value);
            handleFieldToggle("updated_at", [formatDBDate(value), undefined]);
          }}
        />
      )}
    </SearchBar>
  );
}
