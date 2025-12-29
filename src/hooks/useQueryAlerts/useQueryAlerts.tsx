import { ShowAlert, ShowAlertOptions } from "@/types/common";
import { MutationState, QueryState } from "@/types/form";
import { useTranslations } from "next-intl";
import { MutableRefObject, useRef } from "react";
import { SweetAlertIcon } from "sweetalert2";
import ErrorMessage from "@/components/ErrorMessage";
import { showAlert } from "../../utils/showAlert";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { AlertModalProps } from "@/components/AlertModal";

const NAMESPACE_TRANSALATIONS_APPLICATION = "Application";

export interface QueryAlertOptions {
  commonAlertProps?: AlertModalProps;
  confirmAlertProps?: AlertModalProps;
  successAlertProps?: AlertModalProps;
  errorAlertProps?: AlertModalProps;
  enabled?: boolean;
  showOnlyError?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useQueryAlerts(
  query: QueryState | MutationState,
  alertOptions?: QueryAlertOptions
) {
  const t = useTranslations(NAMESPACE_TRANSALATIONS_APPLICATION);
  const { showAlert, hideAlert } = useAlertModal();

  const isEnabled =
    alertOptions?.enabled === undefined || alertOptions?.enabled === true;

  if (isEnabled) {
    if (query?.isError) {
      showAlert({
        severity: "error",
        text: <ErrorMessage t={t} tKey="alertErrorDescription" />,
        title: t("alertErrorTitle"),
        confirmButtonText: t("alertErrorConfirmButton"),
        ...alertOptions?.commonAlertProps,
        ...alertOptions?.errorAlertProps,
        onClose: () => {
          alertOptions?.commonAlertProps?.onClose?.();
          alertOptions?.errorAlertProps?.onClose?.();

          hideAlert();
        },
      });
    } else if (query?.isSuccess) {
      showAlert({
        severity: "success",
        text: t("alertSuccessDescription"),
        title: t("alertSuccessTitle"),
        confirmButtonText: t("alertSuccessConfirmButton"),
        ...alertOptions?.commonAlertProps,
        ...alertOptions?.successAlertProps,
        onClose: () => {
          alertOptions?.commonAlertProps?.onClose?.();
          alertOptions?.successAlertProps?.onClose?.();

          hideAlert();
        },
      });

      query.reset?.();
    }
  }

  // const mergedSuccessAlertProps = {
  //   text: t("alertSuccessDescription"),
  //   title: t("alertSuccessTitle"),
  //   confirmButtonText: t("alertSuccessConfirmButton"),
  //   ...alertOptions?.commonAlertProps,
  //   ...alertOptions?.successAlertProps,
  //   willClose: () => {
  //     defaultRef.current = null;

  //     alertOptions?.commonAlertProps?.willClose?.();
  //     alertOptions?.successAlertProps?.willClose?.();
  //   },
  // };

  // const mergedErrorAlertProps = {
  //   text: <ErrorMessage t={t} tKey="alertErrorDescription" />,
  //   title: t("alertErrorTitle"),
  //   confirmButtonText: t("alertErrorConfirmButton"),
  //   ...alertOptions?.commonAlertProps,
  //   ...alertOptions?.errorAlertProps,
  //   willClose: () => {
  //     defaultRef.current = null;

  //     alertOptions?.commonAlertProps?.willClose?.();
  //     alertOptions?.errorAlertProps?.willClose?.();
  //   },
  // };

  // const isEnabled =
  //   alertOptions?.enabled === undefined || alertOptions?.enabled === true;

  // if (!defaultRef?.current && isEnabled) {
  //   const element = document.getElementsByClassName(".swal2-container")[0];

  //   if (element) {
  //     element.style.display = "hidden";
  //   }

  //   if (query.isError) {
  //     alertOptions?.onError?.();

  //     defaultRef.current = showAlert(
  //       alertOptions?.errorAlertType || "error",
  //       mergedErrorAlertProps
  //     );

  //     query.reset?.();
  //   } else if (query.isSuccess) {
  //     alertOptions?.onSuccess?.();

  //     if (!alertOptions?.showOnlyError) {
  //       defaultRef.current = showAlert(
  //         alertOptions?.successAlertType || "success",
  //         mergedSuccessAlertProps
  //       );
  //     }

  //     query.reset?.();
  //   }
  // }
}
