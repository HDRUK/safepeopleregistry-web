import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  getCustodianProjectUserStatesQuery,
  getCustodianProjectUserQuery,
  putCustodianProjectUserQuery,
  ChangeValidationStatusPayload,
} from "@/services/custodian_approvals";
import { CustodianProjectUser } from "@/types/application";
import { Option } from "@/types/common";
import { sortStatusArray } from "@/utils/application";
import { getCombinedQueryState } from "@/utils/query";
import useQueryAlerts from "../useQueryAlerts";

type CustodianParams = {
  custodianId: number;
  projectUserId: number;
  onStatusChange?: () => void;
};

export interface UseCustodianProjectUserResult {
  data: CustodianProjectUser;
  isLoading: boolean;
  isError: boolean;
  statusOptions: Option[];
  changeValidationStatus: (payload: ChangeValidationStatusPayload) => void;
  refetch: () => void;
}

const NAMESPACE_TRANSLATION = "Application";

export const useCustodianProjectUser = ({
  custodianId,
  projectUserId,
  onStatusChange,
}: CustodianParams): UseCustodianProjectUserResult => {
  const tApplication = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();

  const custodianProjectUserQuery = getCustodianProjectUserQuery(
    custodianId as number,
    projectUserId as number
  );
  const { data, ...getCustodianProjectUserQueryState } = useQuery(
    custodianProjectUserQuery
  );

  const { data: statusOptionsData } = useQuery(
    getCustodianProjectUserStatesQuery()
  );

  const statusOptions = useMemo(() => {
    const statuses = sortStatusArray(statusOptionsData?.data ?? []);

    return statuses.map(item => ({
      value: item,
      label: tApplication(`Status.${item}`),
    }));
  }, [statusOptionsData, tApplication]);

  const refetch = () => {
    queryClient.refetchQueries({
      queryKey: custodianProjectUserQuery.queryKey,
    });
  };

  const {
    mutateAsync: mutateCustodianProjectUser,
    ...updateCustodianProjectUserMutationState
  } = useMutation(putCustodianProjectUserQuery(custodianId));

  const changeValidationStatus = (payload: ChangeValidationStatusPayload) => {
    mutateCustodianProjectUser({ params: { projectUserId }, payload }).then(
      () => refetch()
    );
  };

  const queryState = getCombinedQueryState([
    getCustodianProjectUserQueryState,
    updateCustodianProjectUserMutationState,
  ]);

  useQueryAlerts(updateCustodianProjectUserMutationState, {
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
