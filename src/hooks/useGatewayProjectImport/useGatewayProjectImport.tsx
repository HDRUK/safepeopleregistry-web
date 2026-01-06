import { DataUse } from "@/types/gateway";
import { ResponseJson } from "@/types/requests";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { postProjectDetailsFromGatewayQuery } from "../../services/project_details";
import { createDataUseDefaultValues } from "../../utils/form";
import useQueryAlerts from "../useQueryAlerts";

const NAMESPACE_TRANSLATION = "Projects";

export default function useGatewayProjectImport() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const { mutateAsync, reset } = useMutation(
    postProjectDetailsFromGatewayQuery()
  );

  const defaultMutationState = {
    isError: false,
    isSuccess: false,
    isPending: false,
  };

  const [translatedMutationState, setTranslatedMutationState] = useState<{
    data?: ResponseJson<DataUse>;
    isError: boolean;
    isSuccess: boolean;
    isPending: boolean;
  }>(defaultMutationState);

  const translateResponse = (data: DataUse) => {
    const { id: _, ...restOfData } = createDataUseDefaultValues(data);

    restOfData.access_type = restOfData.access_type.toUpperCase();
    restOfData.title = data.project_title;
    restOfData.start_date = data.project_start_date;
    restOfData.end_date = data.project_end_date;

    return restOfData;
  };

  const handleImportData = useCallback(
    async (payload: { custodian_id: number; project_id: number }) => {
      const result = await mutateAsync(payload);

      setTranslatedMutationState({
        ...translatedMutationState,
        isPending: true,
      });

      if (result.data.length === 1) {
        setTranslatedMutationState({
          isError: false,
          isSuccess: true,
          isPending: false,
          data: {
            ...result,
            data: translateResponse(result.data[0]),
          },
        });
      } else {
        setTranslatedMutationState({
          isError: true,
          isSuccess: false,
          isPending: false,
        });
      }
    },
    []
  );

  useQueryAlerts(
    { ...translatedMutationState, reset },
    {
      commonAlertProps: {
        onConfirm: async () => {
          setTranslatedMutationState(defaultMutationState);
        },
      },
      successAlertProps: {
        text: t("gatewayImportSuccess"),
        confirmButtonText: t("okButton"),
      },
      errorAlertProps: {
        text: <ErrorMessage t={t} tKey="gatewayImportError" />,
      },
    }
  );

  return {
    ...translatedMutationState,
    handleImportData,
  };
}
