import { AlertModalProps } from "@/components/AlertModal";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { MutationState, QueryState } from "@/types/form";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import useQueryAlerts, { QueryAlertOptions } from "../useQueryAlerts";

const NAMESPACE_TRANSALATIONS_APPLICATION = "Application";

export interface QueryAlertConfirmOptions
  extends Omit<QueryAlertOptions, "enabled"> {
  confirmAlertProps?: AlertModalProps;
  successAlertProps?: AlertModalProps;
  errorAlertProps?: AlertModalProps;
}

export default function useQueryConfirmAlerts<T>(
  query: QueryState | MutationState,
  alertOptions?: QueryAlertConfirmOptions
) {
  const t = useTranslations(NAMESPACE_TRANSALATIONS_APPLICATION);
  const [hasClosed, setHasClosed] = useState(false);
  const { showAlert, hideAlert } = useAlertModal();

  const mergedConfirmAlertProps = {
    text: t("alertDeleteDescription"),
    title: t("alertDeleteTitle"),
    confirmButtonText: t("alertDeleteConfirmButton"),
    cancelButtonText: t("alertDeleteCancelButton"),
    ...alertOptions?.confirmAlertProps,
    onConfirm: async (payload: unknown) => {
      await alertOptions?.confirmAlertProps?.onConfirm?.(payload);

      setHasClosed(true);
      hideAlert();
    },
    onClose: async (payload: unknown) => {
      await alertOptions?.confirmAlertProps?.onClose?.(payload);
    },
  };

  useQueryAlerts(query, { ...alertOptions, enabled: hasClosed });

  return useCallback((payload: unknown) => {
    showAlert({
      data: payload,
      ...mergedConfirmAlertProps,
    });
  }, []);
}
