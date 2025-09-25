interface QueryState {
  isError: boolean;
  error?: unknown | string | null;
  isSuccess?: boolean;
  isFetched?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  reset?: () => void;
  status?: string;
}
interface MutationState {
  fetchStatus?: string;
  isError: boolean;
  error?: unknown | string | null;
  isSuccess?: boolean;
  isPending?: boolean;
  reset?: () => void;
}

type WithMutationState<T> = T & {
  mutateState: MutationState;
};

type WithQueryState<T> = T & {
  queryState: QueryState;
};

interface InviteUserFormValues {
  first_name: string;
  last_name: string;
  email: string;
  role?: number;
  organisation_id?: number;
  organisation_name?: string;
  organisation_email?: string;
}

export type {
  QueryState,
  MutationState,
  WithQueryState,
  WithMutationState,
  InviteUserFormValues,
};
