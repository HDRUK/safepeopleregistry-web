import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getUserById from "@/app/actions/users/getUserById";

export default function getUserByIdQuery(
  digiIdent: string,
  options?: QueryOptions
) {
  return {
    queryKey: ["getUserById", digiIdent, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      getUserById(queryKey[1] as string, {
        error: {
          message: "getByIdUserError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getUserById>>>;
}
