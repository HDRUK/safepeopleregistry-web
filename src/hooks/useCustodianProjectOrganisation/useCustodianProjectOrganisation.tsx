import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  getCustodianProjectOrganisationStatesQuery,
  getCustodianProjectOrganisationQuery,
  putCustodianProjectOrganisationQuery,
  ChangeValidationStatusPayload,
} from "@/services/custodian_approvals";
import { CustodianProjectOrganisation } from "@/types/application";
import { Option } from "@/types/common";
import { getCombinedQueryState } from "@/utils/query";
import { STATUS_ORDER_MAP } from "@/consts/status";
import { DEFAULT_STALE_TIME } from "@/consts/requests";
import useQueryAlerts from "../useQueryAlerts";

type CustodianParams = {
  custodianId: number;
  projectOrganisationId: number;
  onStatusChange?: () => {};
};

export interface UseCustodianProjectOrganisationResult {
  data: CustodianProjectOrganisation;
  isLoading: boolean;
  isError: boolean;
  statusOptions: Option[];
  changeValidationStatus: (payload: ChangeValidationStatusPayload) => void;
  refetch: () => void;
}

const NAMESPACE_TRANSLATION = "Application.Status";

export const useCustodianProjectOrganisation = ({
  custodianId,
  projectOrganisationId,
  onStatusChange,
}: CustodianParams): UseCustodianProjectOrganisationResult => {
  const tStatus = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();

  const custodianProjectOrganisationQuery =
    getCustodianProjectOrganisationQuery(
      custodianId as number,
      projectOrganisationId as number
    );

  const { data, ...getCustodianProjectOrganisationQueryState } = useQuery(
    custodianProjectOrganisationQuery
  );

  const { data: statusOptionsData } = useQuery(
    getCustodianProjectOrganisationStatesQuery({
      staleTime: DEFAULT_STALE_TIME,
    })
  );

  const statusOptions = useMemo(
    () =>
      statusOptionsData?.data
        ?.map(item => ({
          value: item,
          label: tStatus(item),
        }))
        .sort(
          (a, b) =>
            (STATUS_ORDER_MAP.get(a.value) ?? Number.MAX_SAFE_INTEGER) -
            (STATUS_ORDER_MAP.get(b.value) ?? Number.MAX_SAFE_INTEGER)
        ) || [],
    [statusOptionsData, tStatus]
  );

  const refetch = () => {
    queryClient.refetchQueries({
      queryKey: custodianProjectOrganisationQuery.queryKey,
    });
  };

  const {
    mutateAsync: mutateCustodianProjectOrganisation,
    ...updateCustodianOrganisationMutationState
  } = useMutation(putCustodianProjectOrganisationQuery(custodianId));

  const changeValidationStatus = (payload: ChangeValidationStatusPayload) => {
    mutateCustodianProjectOrganisation({
      params: { projectOrganisationId },
      payload,
    });
  };

  const queryState = getCombinedQueryState([
    getCustodianProjectOrganisationQueryState,
    updateCustodianOrganisationMutationState,
  ]);

  useQueryAlerts(updateCustodianOrganisationMutationState, {
    onSuccess: () => {
      refetch();
    },
    successAlertProps: {
      onConfirm: async () => {
        onStatusChange?.();
      },
    },
  });

  return {
    data: data?.data,
    isLoading: queryState.isLoading,
    isError: queryState.isError,
    statusOptions,
    changeValidationStatus,
    refetch,
  };
};
