import { AlertModalProps } from "@/components/AlertModal";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { MutationState, QueryState } from "@/types/form";
import { useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";
import useQueryAlerts, { QueryAlertOptions } from "../useQueryAlerts";

const NAMESPACE_TRANSALATIONS_APPLICATION = "Application";

export interface QueryAlertConfirmOptions
  extends Omit<QueryAlertOptions, "enabled"> {
  confirmAlertProps?: Omit<AlertModalProps, "open">;
  successAlertProps?: Omit<AlertModalProps, "open">;
  errorAlertProps?: Omit<AlertModalProps, "open">;
}

export default function useQueryConfirmAlerts<T = unknown>(
  query: QueryState | MutationState,
  alertOptions?: QueryAlertConfirmOptions
) {
  const t = useTranslations(NAMESPACE_TRANSALATIONS_APPLICATION);
  const refPayload = useRef<T | null | undefined>();
  const [confirmed, setConfirmed] = useState(false);
  const { showAlert, hideAlert } = useAlertModal();

  const mergedConfirmAlertProps = {
    severity: "warning",
    text: t("alertDeleteDescription"),
    title: t("alertDeleteTitle"),
    confirmButtonText: t("alertDeleteConfirmButton"),
    cancelButtonText: t("alertDeleteCancelButton"),
    confirmButtonColor: "error",
    ...alertOptions?.confirmAlertProps,
    onConfirm: async (data: T) => {
      setConfirmed(true);
      await alertOptions?.confirmAlertProps?.onConfirm?.(data);

      refPayload.current = null;
    },
    onClose: async (data: T) => {
      hideAlert();

      await alertOptions?.confirmAlertProps?.onClose?.(data);

      refPayload.current = null;
    },
  };

  useQueryAlerts(query, { ...alertOptions, enabled: confirmed });

  return useCallback((data: T) => {
    showAlert({
      ...mergedConfirmAlertProps,
      data,
    });
  }, []);
}
