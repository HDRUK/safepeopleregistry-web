import { AlertModalProps } from "@/components/AlertModal";
import ErrorMessage from "@/components/ErrorMessage";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { MutationState, QueryState } from "@/types/form";
import { on } from "events";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSALATIONS_APPLICATION = "Application";

export interface QueryAlertOptions {
  commonAlertProps?: Omit<AlertModalProps, "open">;
  confirmAlertProps?: Omit<AlertModalProps, "open">;
  successAlertProps?: Omit<AlertModalProps, "open">;
  errorAlertProps?: Omit<AlertModalProps, "open">;
  enabled?: boolean;
  showOnlyError?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useQueryAlerts(
  query: QueryState | MutationState,
  alertOptions?: QueryAlertOptions
) {
  const { showAlert, hideAlert } = useAlertModal();
  const t = useTranslations(NAMESPACE_TRANSALATIONS_APPLICATION);

  const mergedSuccessAlertProps = {
    severity: "success",
    text: t("alertSuccessDescription"),
    title: t("alertSuccessTitle"),
    confirmButtonText: t("alertSuccessConfirmButton"),
    ...alertOptions?.commonAlertProps,
    ...alertOptions?.successAlertProps,
    onClose: async () => {
      hideAlert();

      await alertOptions?.commonAlertProps?.onClose?.();
      await alertOptions?.successAlertProps?.onClose?.();
    },
    onConfirm: async () => {
      hideAlert();

      await alertOptions?.commonAlertProps?.onConfirm?.();
      await alertOptions?.successAlertProps?.onConfirm?.();
    },
  };

  const mergedErrorAlertProps = {
    severity: "error",
    text: <ErrorMessage t={t} tKey="alertErrorDescription" />,
    title: t("alertErrorTitle"),
    confirmButtonText: t("alertErrorConfirmButton"),
    ...alertOptions?.commonAlertProps,
    ...alertOptions?.errorAlertProps,
    onClose: async () => {
      hideAlert();

      await alertOptions?.commonAlertProps?.onClose?.();
      await alertOptions?.errorAlertProps?.onClose?.();
    },
    onConfirm: async () => {
      hideAlert();

      await alertOptions?.commonAlertProps?.onConfirm?.();
      await alertOptions?.errorAlertProps?.onConfirm?.();
    },
  };

  const isEnabled =
    alertOptions?.enabled === undefined || alertOptions?.enabled === true;

  if (isEnabled) {
    if (query.isError) {
      alertOptions?.onError?.();

      showAlert(mergedErrorAlertProps);

      query.reset?.();
    } else if (query.isSuccess) {
      alertOptions?.onSuccess?.();

      if (!alertOptions?.showOnlyError) {
        showAlert(mergedSuccessAlertProps);
      }

      query.reset?.();
    }
  }
}
