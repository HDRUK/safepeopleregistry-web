import { SearchDirections } from "@/consts/search";
import { SearchParams } from "@/types/query";
import { getSearchSortOrder, getSearchSortParam } from "@/utils/query";
import { ReactNode, useMemo } from "react";

const SORT_DIRECTION_LABELS = {
  string: {
    [SearchDirections.ASC]: "A-Z",
    [SearchDirections.DESC]: "Z-A",
  },
  number: {
    [SearchDirections.ASC]: "0-9",
    [SearchDirections.DESC]: "9-0",
  },
  date: {
    [SearchDirections.ASC]: "Oldest first",
    [SearchDirections.DESC]: "Newest first",
  },
} as const satisfies Record<string, Record<SearchDirections, string>>;

type SortType = keyof typeof SORT_DIRECTION_LABELS;

interface UseSortProps {
  items: {
    label: ReactNode;
    key: string;
    sortDirection?: SearchDirections;
    type?: SortType;
  }[];
  queryParams: SearchParams;
  onSort: (key: string, direction: string) => void;
}

export default function useSort(options: UseSortProps) {
  const { items, onSort, queryParams } = options;
  const queryParamsSortDirection = getSearchSortOrder(queryParams);
  const queryParamsSortParam = getSearchSortParam(queryParams);

  const actions = useMemo(
    () =>
      items.map(
        ({
          label,
          key,
          sortDirection = SearchDirections.ASC,
          type = "string",
        }) => {
          let toggledSortDirection = sortDirection;

          if (queryParamsSortParam === key) {
            toggledSortDirection =
              queryParamsSortDirection === SearchDirections.ASC
                ? SearchDirections.DESC
                : SearchDirections.ASC;
          }

          return {
            label: `${label} (${SORT_DIRECTION_LABELS[type][toggledSortDirection]})`,
            onClick: () => {
              onSort(key, toggledSortDirection);
            },
          };
        }
      ),
    [queryParamsSortParam, queryParamsSortDirection, items]
  );

  return {
    actions,
  };
}
