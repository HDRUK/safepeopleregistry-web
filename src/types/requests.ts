import {
  QueryFunctionContext,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

interface ResponseTranslation {
  message: string;
}

interface QueryOptions extends Partial<UseQueryOptions> {
  queryKeySuffix?: (string | number)[];
  responseOptions?: ResponseOptions;
}

interface MutationOptions extends Partial<UseMutationOptions> {
  mutationKeySuffix?: (string | number)[];
  responseOptions?: ResponseOptions;
}

type QueryFunctionContextDefault = QueryFunctionContext<[string, number]>;

interface ResponseOptions {
  "401"?: ResponseTranslation;
  "403"?: ResponseTranslation;
  "404"?: ResponseTranslation;
  "409"?: ResponseTranslation;
  "500"?: ResponseTranslation;
  error?: ResponseTranslation;
  suppressThrow?: boolean;
}

type ResponseJson<T> = Response & {
  data: T;
  message: string;
  status: number;
};

type MutateWithArgs<T, P> = {
  params?: T;
  payload?: P;
};

interface Paged<T> {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string;
  from: number;
  to: number;
  data: T;
}

type QueryPayload<T> = T | (() => BodyInit & T);

type GetWorkflowTransitions = Record<string, string[]>;

export type {
  Paged,
  ResponseJson,
  ResponseTranslation,
  ResponseOptions,
  QueryPayload,
  QueryOptions,
  MutationOptions,
  QueryFunctionContextDefault,
  MutateWithArgs,
  GetWorkflowTransitions,
};
