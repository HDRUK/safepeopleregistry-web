"use client";

import { QueryParams } from "@/types/query";
import { useSearchParams } from "@/i18n/routing";
import { Paged, ResponseJson } from "@/types/requests";
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const API_SORT_KEY = "sort";

export interface PaginatedQueryHelpers {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  updateQueryParams: (newParams: QueryParams) => void;
  resetQueryParams: (overideParams?: QueryParams) => void;
  handleSortToggle: (field: string, direction: string) => void;
  handleFieldToggle: (
    field: string,
    options: [string | undefined, string | undefined],
    isMultiple?: boolean
  ) => void;
  queryParams: QueryParams;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>;
}

export type PaginatedQueryProps<T> = {
  queryKeyBase: unknown[];
  queryFn: (queryParams: QueryParams) => Promise<ResponseJson<Paged<T>>>;
  initialPage?: number;
  enabled?: boolean;
  refetchInterval?: number;
  defaultQueryParams?: QueryParams;
  shouldUpdateQuerystring?: boolean;
};

export type PaginatedQueryReturn<T> = UseQueryResult<ResponseJson<Paged<T>>> &
  Paged<T> &
  PaginatedQueryHelpers;

const usePaginatedQuery = <T,>({
  queryKeyBase,
  queryFn,
  initialPage = 1,
  defaultQueryParams = {},
  enabled = true,
  refetchInterval,
  shouldUpdateQuerystring,
}: PaginatedQueryProps<T>): PaginatedQueryReturn<T> => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialSearchParams = searchParams
    ? Object.fromEntries(searchParams.entries())
    : {};
  const [page, setPage] = useState<number>(
    (searchParams?.get("page") as unknown as number) || initialPage
  );

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page,
    ...defaultQueryParams,
    ...initialSearchParams,
  });

  useEffect(() => {
    if (shouldUpdateQuerystring) {
      // change the router URL depending on the queryParams
      const params = new URLSearchParams();

      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.set(key, String(value));
        }
      });

      window.history.replaceState(
        window.history.state,
        "",
        `${pathname}?${params.toString()}`
      );
    }
  }, [queryParams, pathname, shouldUpdateQuerystring]);

  useEffect(() => {
    if (queryParams.page === page) return;

    setQueryParams(
      (prevParams: QueryParams) =>
        ({
          ...prevParams,
          page,
        }) as QueryParams
    );
  }, [page]);

  const updateQueryParams = (newParams: QueryParams) => {
    setPage(() => {
      setQueryParams(
        (prevParams: QueryParams) =>
          ({
            page: initialPage,
            ...prevParams,
            ...newParams,
          }) as QueryParams
      );
      return initialPage;
    });
  };

  const resetQueryParams = (overideParams?: QueryParams) => {
    setQueryParams({
      page: initialPage,
      ...defaultQueryParams,
      ...overideParams,
    });
  };

  const queryResult = useQuery({
    queryKey: [...queryKeyBase, queryParams],
    queryFn: () => queryFn(queryParams),
    placeholderData: keepPreviousData,
    enabled,
    refetchInterval,
  });

  const { data: queryData, ...restQueryResult } = queryResult;

  const pagedData = queryData?.data || {};

  const handleSortToggle = useCallback(
    (field: string, direction: string) => {
      const currentSort =
        typeof queryParams[API_SORT_KEY] === "string"
          ? queryParams[API_SORT_KEY]
          : "";

      const [currentField, currentDirection] = currentSort
        ? currentSort.split(":")
        : [null, null];

      const newDirection =
        currentField === field && currentDirection === direction
          ? ""
          : direction;

      const updatedQueryParams = { ...queryParams };

      if (newDirection) {
        updatedQueryParams[API_SORT_KEY] = `${field}:${newDirection}`;
      } else {
        delete updatedQueryParams[API_SORT_KEY];
      }

      setQueryParams(updatedQueryParams);
    },
    [queryParams]
  );

  const handleFieldToggle = useCallback(
    (field: string, options: [string, string], isMultiple = false) => {
      const currentValue = queryParams[field];

      if (isMultiple) {
        const item = options[0];
        const currentArray = Array.isArray(currentValue) ? currentValue : [];

        const newArray = currentArray.includes(item)
          ? currentArray.filter(v => v !== item)
          : [...currentArray, item];

        setQueryParams({
          ...queryParams,
          [field]: newArray.length > 0 ? newArray : undefined,
        });
      } else {
        const newValue = currentValue === options[0] ? options[1] : options[0];

        setQueryParams({
          ...queryParams,
          [field]: newValue,
        });
      }
    },
    [queryParams]
  );

  return {
    ...restQueryResult,
    ...pagedData,
    queryParams,
    setQueryParams,
    page,
    setPage,
    updateQueryParams,
    resetQueryParams,
    handleSortToggle,
    handleFieldToggle,
  } as PaginatedQueryReturn<T>;
};

export default usePaginatedQuery;
