interface QueryState<T = unknown> {
  isError?: boolean;
  error?: unknown | string | null;
  isSuccess?: boolean;
  isFetched?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  reset?: () => void;
  status?: string;
  data?: T;
}
interface MutationState<T = unknown> {
  fetchStatus?: string;
  isError?: boolean;
  error?: unknown | string | null;
  isSuccess?: boolean;
  isPending?: boolean;
  reset?: () => void;
  data?: T;
}

type WithMutationState<T> = T & {
  mutateState: MutationState;
};

type WithQueryState<T> = T & {
  queryState: QueryState;
};

export type { QueryState, MutationState, WithQueryState, WithMutationState };
