"use client";

import { OrganisationSroStatus, Status } from "@/consts/application";
import useFilter from "@/hooks/useFilter";
import useSort from "@/hooks/useSort";
import SortIcon from "@mui/icons-material/Sort";
import { useTranslations } from "next-intl";
import { FilterIcon } from "../../consts/icons";
import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import { Organisation } from "../../types/application";
import SearchActionMenu from "../SearchActionMenu";
import SearchBar from "../SearchBar";

const NAMESPACE_TRANSLATIONS_FILTERS = "Admin.OrganisationsFilters";
const NAMESPACE_TRANSLATIONS_ORGANISATIONS = "Organisations";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";

export enum OrganisationsFiltersKeys {
  ACCOUNT_STATUS = "account_status",
  SRO_STATUS = "sro_status",
  SYSTEM_APPROVED = "system_approved",
}

// The API validates system_approved as a boolean, which accepts 1/0 but not "true"/"false".
enum SystemApproved {
  APPROVED = "1",
  NOT_APPROVED = "0",
}

const ACCOUNT_STATUSES = [
  Status.ORGANISATION_ACCOUNT_CREATED,
  Status.ORGANISATION_INVITED_BY_ADMIN,
  Status.ORGANISATION_INVITED_BY_NONADMIN,
  Status.ORGANISATION_PLACEHOLDER,
];

export interface OrganisationsFiltersProps extends Pick<
  PaginatedQueryReturn<Organisation>,
  "updateQueryParams" | "handleSortToggle" | "handleFieldToggle" | "queryParams"
> {
  includeFilters?: OrganisationsFiltersKeys[];
}

export default function OrganisationsFilters({
  handleSortToggle,
  handleFieldToggle,
  updateQueryParams,
  queryParams,
  includeFilters = [
    OrganisationsFiltersKeys.ACCOUNT_STATUS,
    OrganisationsFiltersKeys.SRO_STATUS,
    OrganisationsFiltersKeys.SYSTEM_APPROVED,
  ],
}: OrganisationsFiltersProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_FILTERS);
  const tOrganisations = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATIONS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);

  const hasFilter = (key: OrganisationsFiltersKeys) => {
    return includeFilters.includes(key);
  };

  const onFilter = (key: string, value: string) =>
    handleFieldToggle(key, [value, undefined]);

  const clearFilter = (key: OrganisationsFiltersKeys) =>
    handleFieldToggle(key, [undefined, undefined]);

  const { actions: sortActions } = useSort({
    queryParams,
    items: [
      {
        label: tApplication("organisationName"),
        key: "organisation_name",
      },
    ],
    onSort: (key: string, direction: string) =>
      handleSortToggle(key, direction),
  });

  const { actions: filterAccountStatusActions } = useFilter({
    queryParams,
    items: ACCOUNT_STATUSES.map(status => ({
      label: tApplication(`Status.${status}`),
      key: OrganisationsFiltersKeys.ACCOUNT_STATUS,
      value: status,
    })),
    onFilter,
  });

  const { actions: filterSroStatusActions } = useFilter({
    queryParams,
    items: Object.values(OrganisationSroStatus).map(status => ({
      label: t(`filterBySroStatus_${status}`),
      key: OrganisationsFiltersKeys.SRO_STATUS,
      value: status,
    })),
    onFilter,
  });

  const { actions: filterSystemApprovedActions } = useFilter({
    queryParams,
    items: [
      {
        label: tApplication(`Status.${Status.ORGANISATION_VALIDATED}`),
        key: OrganisationsFiltersKeys.SYSTEM_APPROVED,
        value: SystemApproved.APPROVED,
      },
      {
        label: tApplication(`Status.${Status.ORGANISATION_NOT_VALIDATED}`),
        key: OrganisationsFiltersKeys.SYSTEM_APPROVED,
        value: SystemApproved.NOT_APPROVED,
      },
    ],
    onFilter,
  });

  return (
    <SearchBar
      onClear={() => {
        updateQueryParams({
          "organisation_name[]": undefined,
        });
      }}
      onSearch={(text: string) => {
        updateQueryParams({
          "organisation_name[]": text,
        });
      }}
      placeholder={tOrganisations("searchPlaceholder")}>
      <SearchActionMenu
        actions={sortActions}
        startIcon={<SortIcon />}
        renderedSelectedLabel={tApplication("sortedBy")}
        renderedDefaultLabel={tApplication("sortBy")}
        aria-label={tApplication("sortBy")}
      />
      {hasFilter(OrganisationsFiltersKeys.ACCOUNT_STATUS) && (
        <SearchActionMenu
          id="filterByAccountStatus"
          actions={filterAccountStatusActions}
          onClear={() => clearFilter(OrganisationsFiltersKeys.ACCOUNT_STATUS)}
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={t("filterByAccountStatus")}
          aria-label={t("filterByAccountStatus")}
        />
      )}
      {hasFilter(OrganisationsFiltersKeys.SRO_STATUS) && (
        <SearchActionMenu
          id="filterBySroStatus"
          actions={filterSroStatusActions}
          onClear={() => clearFilter(OrganisationsFiltersKeys.SRO_STATUS)}
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={t("filterBySroStatus")}
          aria-label={t("filterBySroStatus")}
        />
      )}
      {hasFilter(OrganisationsFiltersKeys.SYSTEM_APPROVED) && (
        <SearchActionMenu
          id="filterBySystemApproved"
          actions={filterSystemApprovedActions}
          onClear={() => clearFilter(OrganisationsFiltersKeys.SYSTEM_APPROVED)}
          startIcon={<FilterIcon />}
          renderedSelectedLabel={tApplication("filteredBy")}
          renderedDefaultLabel={t("filterByApproved")}
          aria-label={t("filterByApproved")}
        />
      )}
    </SearchBar>
  );
}
