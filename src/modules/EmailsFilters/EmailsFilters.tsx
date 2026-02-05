"use client";

import DateInput from "@/components/DateInput";
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
  STATUS = "job_status",
  MESSAGE_STATUS = "message_status",
  DATE_TRIED = "updated_at[]__and",
}

export interface EmailsFiltersProps
  extends Pick<
    PaginatedQueryReturn<ResearcherProject>,
    | "updateQueryParams"
    | "handleSortToggle"
    | "handleFieldToggle"
    | "queryParams"
  > {
  includeFilters?: EmailsFiltersKeys[];
}

export default function EmailsFilters({
  handleSortToggle,
  handleFieldToggle,
  updateQueryParams,
  queryParams,
  includeFilters = [
    EmailsFiltersKeys.STATUS,
    EmailsFiltersKeys.MESSAGE_STATUS,
    EmailsFiltersKeys.DATE_TRIED,
  ],
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
        value: "0",
      },
      {
        label: t("filterByStatus_successful"),
        key: EmailsFiltersKeys.STATUS,
        value: "1",
      },
    ],
    onFilter: (key: string, value: string) =>
      handleFieldToggle(key, [value, undefined]),
  });

  const { actions: filterMessageStatusActions } = useFilter({
    queryParams,
    items: [
      {
        label: t("filterByMessageStatus_processed"),
        key: EmailsFiltersKeys.MESSAGE_STATUS,
        value: "processed",
      },
      {
        label: t("filterByMessageStatus_delivered"),
        key: EmailsFiltersKeys.MESSAGE_STATUS,
        value: "delivered",
      },
      {
        label: t("filterByMessageStatus_deferred"),
        key: EmailsFiltersKeys.MESSAGE_STATUS,
        value: "deferred",
      },
      {
        label: t("filterByMessageStatus_dropped"),
        key: EmailsFiltersKeys.MESSAGE_STATUS,
        value: "dropped",
      },
      {
        label: t("filterByMessageStatus_bounced"),
        key: EmailsFiltersKeys.MESSAGE_STATUS,
        value: "bounced",
      },
      {
        label: t("filterByMessageStatus_blocked"),
        key: EmailsFiltersKeys.MESSAGE_STATUS,
        value: "blocked",
      },
    ],
    onFilter: (key: string, value: string) =>
      handleFieldToggle(key, [value, undefined]),
  });

  return (
    <SearchBar
      onClear={() => {
        updateQueryParams({
          "to[]__and": undefined,
        });
      }}
      onSearch={(to: string) => {
        updateQueryParams({
          "to[]__and": to,
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
      {hasFilter(EmailsFiltersKeys.MESSAGE_STATUS) && (
        <SearchActionMenu
          id="filterByMessageStatus"
          actions={filterMessageStatusActions}
          onClear={() =>
            handleFieldToggle(EmailsFiltersKeys.MESSAGE_STATUS, [
              undefined,
              undefined,
            ])
          }
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={t("filterByMessageStatus")}
          aria-label={t("filterByMessageStatus")}
        />
      )}
      {hasFilter(EmailsFiltersKeys.DATE_TRIED) && (
        <DateInput
          value={dateSent}
          clearable
          onClear={() => {
            setDateSent(null);

            handleFieldToggle(EmailsFiltersKeys.DATE_TRIED, [
              undefined,
              undefined,
            ]);
          }}
          onChange={value => {
            setDateSent(value);
            handleFieldToggle(EmailsFiltersKeys.DATE_TRIED, [
              formatDBDate(value),
              undefined,
            ]);
          }}
        />
      )}
    </SearchBar>
  );
}
