export type SearchParams = Record<
  string,
  string | number | string[] | undefined
>;

export type QueryParams = SearchParams;

export interface QueryFns {
  onSuccess?: () => void;
  onError?: () => void;
}

export type WithQueryFns<T> = T & QueryFns;

export interface ResponseEmptyError {
  ok: boolean;
  status: number;
  json: () => Promise<{
    message: string;
    data: null;
  }>;
}
