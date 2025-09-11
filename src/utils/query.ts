import { MutationState, QueryState } from "../types/form";
import { SearchParams } from "../types/query";

function isQueriesLoading<T extends MutationState & QueryState>(queries: T[]) {
  return queries.some(
    query => query.isLoading || query.isPending || query.isFetching
  );
}

function isQueriesError<T extends MutationState & QueryState>(queries: T[]) {
  return queries.some(query => query.isError);
}

function isQueriesFetched<T extends MutationState & QueryState>(queries: T[]) {
  return (
    queries.filter(query => query.isFetched || query.isSuccess || query.isError)
      .length === queries.length
  );
}

function isAllQueriesSuccess<T extends MutationState & QueryState>(
  queries: T[]
) {
  return queries.filter(query => query.isSuccess).length === queries.length;
}

function isAnyQuerySuccess<T extends MutationState & QueryState>(queries: T[]) {
  return queries.some(query => query.isSuccess);
}

function getSearchQuerystring(searchParams: SearchParams) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach(item => {
        params.append(`${key}[]`, String(item));
      });
    } else {
      params.append(key, String(value));
    }
  });

  return params ? `?${params.toString()}` : "";
}

function getSearchSortOrder(queryParams: SearchParams) {
  return (
    typeof queryParams?.sort === "string" && queryParams?.sort.split(":")[1]
  );
}

function getSearchSortParam(queryParams: SearchParams) {
  return (
    typeof queryParams?.sort === "string" && queryParams?.sort.split(":")[0]
  );
}

function getQueriesError<T extends MutationState & QueryState>(queries: T[]) {
  let errors: Error[] = [];

  queries.forEach(({ error }) => {
    if (error) {
      if (Array.isArray(error)) {
        errors = errors.concat(error);
      } else {
        errors.push(error);
      }
    }
  });

  return errors.filter(error => {
    return !!error;
  });
}

function getCombinedQueryState<T extends MutationState & QueryState>(
  queries: T[],
  allSuccess: boolean = true
) {
  const activeQueries = queries.filter(query => query?.fetchStatus !== "idle");

  return {
    isLoading: isQueriesLoading(activeQueries),
    isError: isQueriesError(activeQueries),
    error: getQueriesError(activeQueries),
    isFetched: isQueriesFetched(activeQueries),
    isSuccess: allSuccess
      ? isAllQueriesSuccess(activeQueries)
      : isAnyQuerySuccess(activeQueries),
  };
}

export {
  getCombinedQueryState,
  getQueriesError,
  isQueriesError,
  isQueriesFetched,
  isQueriesLoading,
  isAnyQuerySuccess,
  isAllQueriesSuccess,
  getSearchQuerystring,
  getSearchSortOrder,
  getSearchSortParam,
};
