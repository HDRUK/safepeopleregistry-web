"use client";

import DateInput from "@/components/DateInput";
import { Status } from "@/consts/application";
import { UserGroup } from "@/consts/user";
import useFilter from "@/hooks/useFilter";
import useSort from "@/hooks/useSort";
import { formatDBDateTime } from "@/utils/date";
import SortIcon from "@mui/icons-material/Sort";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FilterIcon } from "../../consts/icons";
import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import { ResearcherProject } from "../../types/application";
import SearchActionMenu from "../SearchActionMenu";
import SearchBar from "../SearchBar";

const NAMESPACE_TRANSLATIONS_INVITES = "Admin.InvitesFilters";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export enum InvitesFiltersKeys {
  USER_GROUP = "user_group",
  STATUS = "status",
  DATE_SENT = "invite_sent_at",
}

export interface InvitesFiltersProps
  extends Pick<
    PaginatedQueryReturn<ResearcherProject>,
    | "updateQueryParams"
    | "resetQueryParams"
    | "handleSortToggle"
    | "handleFieldToggle"
    | "queryParams"
  > {
  includeFilters?: InvitesFiltersKeys[];
}

export default function InvitesFilters({
  handleSortToggle,
  handleFieldToggle,
  resetQueryParams,
  updateQueryParams,
  queryParams,
  includeFilters = [
    InvitesFiltersKeys.USER_GROUP,
    InvitesFiltersKeys.STATUS,
    InvitesFiltersKeys.DATE_SENT,
  ],
}: InvitesFiltersProps) {
  const [dateSent, setDateSent] = useState<Date | string | null>(null);
  const t = useTranslations(NAMESPACE_TRANSLATIONS_INVITES);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);

  const hasFilter = (key: InvitesFiltersKeys) => {
    return includeFilters.includes(key);
  };

  const { actions: sortActions } = useSort({
    queryParams,
    items: [
      {
        label: t("sortByInviteSentAt"),
        key: "invite_sent_at",
      },
    ],
    onSort: (key: string, direction: string) =>
      handleSortToggle(key, direction),
  });

  const { actions: filterUserGroupActions } = useFilter({
    queryParams,
    items: [
      {
        label: t("filterByUserGroup_custodians"),
        key: "user_group",
        value: UserGroup.CUSTODIANS,
      },
      {
        label: t("filterByUserGroup_organisations"),
        key: "user_group",
        value: UserGroup.ORGANISATIONS,
      },
      {
        label: t("filterByUserGroup_users"),
        key: "user_group",
        value: UserGroup.USERS,
      },
    ],
    onFilter: (key: string, value: string) =>
      handleFieldToggle(key, [value, undefined]),
  });

  const { actions: filterStatusActions } = useFilter({
    queryParams,
    items: [
      {
        label: t("filterByStatus_invited"),
        key: "status",
        value: Status.PENDING,
      },
      {
        label: t("filterByStatus_registered"),
        key: "status",
        value: Status.COMPLETED,
      },
    ],
    onFilter: (key: string, value: string) =>
      handleFieldToggle(key, [value, undefined]),
  });

  return (
    <SearchBar
      onClear={resetQueryParams}
      onSearch={(text: string) => {
        updateQueryParams({
          "invite_sent_at[]": text,
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
      {hasFilter(InvitesFiltersKeys.STATUS) && (
        <SearchActionMenu
          actions={filterStatusActions}
          onClear={() => handleFieldToggle("status", [undefined, undefined])}
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={t("filterByStatus")}
          aria-label={t("filterByStatus")}
        />
      )}
      {hasFilter(InvitesFiltersKeys.USER_GROUP) && (
        <SearchActionMenu
          actions={filterUserGroupActions}
          onClear={() =>
            handleFieldToggle("user_group", [undefined, undefined])
          }
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={t("filterByUserGroup")}
          aria-label={t("filterByUserGroup")}
        />
      )}

      {hasFilter(InvitesFiltersKeys.DATE_SENT) && (
        <DateInput
          value={dateSent}
          onChange={value => {
            setDateSent(value);
            handleFieldToggle("invite_sent_at", [
              formatDBDateTime(value),
              undefined,
            ]);
          }}
        />
      )}
    </SearchBar>
  );
}
