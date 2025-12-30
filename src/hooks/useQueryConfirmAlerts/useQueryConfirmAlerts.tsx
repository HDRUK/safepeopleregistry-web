import { ShowAlert, ShowAlertOptions } from "@/types/common";
import { MutationState, QueryState } from "@/types/form";
import { useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";
import { SweetAlertIcon } from "sweetalert2";
import { showAlert } from "../../utils/showAlert";
import useQueryAlerts, { QueryAlertOptions } from "../useQueryAlerts";

const NAMESPACE_TRANSALATIONS_APPLICATION = "Application";

export interface QueryAlertConfirmOptions
  extends Omit<QueryAlertOptions, "enabled"> {
  confirmAlertType?: SweetAlertIcon;
  confirmAlertProps?: ShowAlertOptions;
  successAlertType?: SweetAlertIcon;
  successAlertProps?: ShowAlertOptions;
  errorAlertType?: SweetAlertIcon;
  errorAlertProps?: ShowAlertOptions;
}

export default function useQueryConfirmAlerts<T>(
  query: QueryState | MutationState,
  alertOptions?: QueryAlertConfirmOptions
) {
  const t = useTranslations(NAMESPACE_TRANSALATIONS_APPLICATION);
  const ref = useRef<ShowAlert>();
  const refPayload = useRef<T | null | undefined>();
  const [hasClosed, setHasClosed] = useState(false);

  const mergedConfirmAlertProps = {
    text: t("alertDeleteDescription"),
    title: t("alertDeleteTitle"),
    confirmButtonText: t("alertDeleteConfirmButton"),
    cancelButtonText: t("alertDeleteCancelButton"),
    confirmButtonColor: "#DC3645",
    ...alertOptions?.confirmAlertProps,
    preConfirm: async () => {
      await alertOptions?.confirmAlertProps?.preConfirm<T>?.(
        refPayload.current
      );

      ref.current = null;
      refPayload.current = null;

      setHasClosed(true);
    },
    willClose: async () => {
      await alertOptions?.confirmAlertProps?.willClose<T>?.(refPayload.current);

      ref.current = null;
      refPayload.current = null;
    },
  };

  useQueryAlerts(query, { ...alertOptions, enabled: hasClosed }, ref);

  return useCallback((payload: T) => {
    if (!ref.current) {
      refPayload.current = payload;
      ref.current = showAlert(
        alertOptions?.confirmAlertType || "warning",
        mergedConfirmAlertProps
      );
    }
  }, []);
}
