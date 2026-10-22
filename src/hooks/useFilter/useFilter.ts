import { SearchParams } from "@/types/query";
import { useMemo } from "react";

interface UseFilterProps {
  items: {
    // A string, as SearchActionMenu uses it as the option's value and aria-label.
    label: string;
    key: string;
    value: string;
  }[];
  queryParams: SearchParams;
  onFilter: (key: string, value: string) => void;
}

export default function useFilter(options: UseFilterProps) {
  const { items, onFilter, queryParams } = options;

  const actions = useMemo(
    () =>
      items.map(({ label, key, value }) => {
        return {
          label,
          checked: queryParams[key] === value,
          onClick: () => {
            onFilter(key, value);
          },
        };
      }),
    [items]
  );

  return {
    actions,
  };
}
