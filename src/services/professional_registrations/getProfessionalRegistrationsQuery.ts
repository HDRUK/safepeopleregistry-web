import getProfessionalRegistrations from "@/app/actions/professional_registrations/getProfessionalRegistrations";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getProfessionalRegistrationsQuery(
  registry_id: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getProfessionalRegistrations",
      registry_id,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getProfessionalRegistrations(queryKey[1] as number, {
        error: {
          message: "getProfessionalRegistrationsError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getProfessionalRegistrations>>
  >;
}
