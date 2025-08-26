"use client";

import { DEFAULT_STALE_TIME } from "@/consts/requests";
import useProjectEntityBoard from "@/hooks/useProjectEntityBoard";
import {
  getCustodianProjectOrganisationWorkflowTransitionsQuery,
  getCustodianProjectUserWorkflowTransitionsQuery,
  usePaginatedCustodianProjectOrganisations,
  usePaginatedCustodianProjectUsers,
} from "@/services/custodian_approvals";
import { EntityType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

type UseProjectEntityProps = {
  usePaginatedQuery: () => ReturnType<
    | typeof usePaginatedCustodianProjectUsers
    | typeof usePaginatedCustodianProjectOrganisations
  >;
  variant: EntityType;
};

export default function useProjectEntity({
  usePaginatedQuery,
  variant,
}: UseProjectEntityProps) {
  const queryReturn = usePaginatedQuery();

  const { data: stateWorkflow } = useQuery(
    variant === EntityType.ORGANISATION
      ? getCustodianProjectOrganisationWorkflowTransitionsQuery({
          staleTime: DEFAULT_STALE_TIME,
        })
      : getCustodianProjectUserWorkflowTransitionsQuery({
          staleTime: DEFAULT_STALE_TIME,
        })
  );

  const helpers = useProjectEntityBoard({
    data: queryReturn.data,
    stateWorkflow: stateWorkflow?.data,
  });

  return useMemo(
    () => ({
      helpers,
      query: queryReturn,
      states: Object.keys(stateWorkflow?.data || {}),
    }),
    [stateWorkflow?.data, queryReturn]
  );
}
