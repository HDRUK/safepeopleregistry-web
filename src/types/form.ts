import { CustodianUserRoles } from "@/consts/custodian";

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

interface InviteUserFormValues {
  first_name: string;
  last_name: string;
  email: string;
  role?: number;
  organisation_id?: number;
  organisation_name?: string;
  organisation_email?: string;
}

interface KeyContactFormValues {
  first_name: string;
  last_name: string;
  department: number;
  email: string;
  job_title: string;
}

interface CustodianEditContactFormFields {
  first_name: string;
  last_name: string;
  email: string;
  permissions: CustodianUserRoles;
}

export type {
  QueryState,
  MutationState,
  WithQueryState,
  WithMutationState,
  InviteUserFormValues,
  KeyContactFormValues,
  CustodianEditContactFormFields,
};
