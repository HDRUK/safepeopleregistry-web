import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";
import useFilter from "@/hooks/useFilter";
import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import SearchBar from "../SearchBar";
import { User } from "../../types/application";
import SearchActionMenu from "../SearchActionMenu";
import { FilterIcon } from "../../consts/icons";

const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";
const NAMESPACE_TRANSLATIONS = "Organisations.OrganisationUsersFilters";

enum OrganisationUsersFilterKeys {
  STATUS = "status",
}

export interface OrganisationUsersFiltersProps extends PropsWithChildren<
  Pick<
    PaginatedQueryReturn<User>,
    | "updateQueryParams"
    | "resetQueryParams"
    | "handleFieldToggle"
    | "queryParams"
  >
> {
  statusList?: string[];
  includeFilters?: OrganisationUsersFilterKeys[];
}

export default function OrganisationUsersFilters({
  updateQueryParams,
  resetQueryParams,
  handleFieldToggle,
  queryParams,
  statusList,
  includeFilters = [OrganisationUsersFilterKeys.STATUS],
}: OrganisationUsersFiltersProps) {
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  const hasFilter = (key: OrganisationUsersFilterKeys) => {
    return includeFilters.includes(key);
  };

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
    <Box component="form" role="search" sx={{ display: "flex" }}>
      <SearchBar
        placeholder={t("searchPlaceholder")}
        onClear={() => resetQueryParams({ filter: "" })}
        onSearch={(text: string) => {
          updateQueryParams({
            "name[]": text,
            "email[]": text,
          });
        }}>
        {hasFilter(OrganisationUsersFilterKeys.STATUS) &&
          !!statusList?.length && (
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
    </Box>
  );
}
