import { UseQueryOptions } from "@tanstack/react-query";
import { QueryOptions } from "../../types/requests";
import getProject from "./getProject";

export default function getProjectQuery(id: number, options?: QueryOptions) {
  return {
    queryKey: ["getProject", id, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      getProject(queryKey[1] as number, {
        error: { message: "getProjectError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getProject>>>;
}
