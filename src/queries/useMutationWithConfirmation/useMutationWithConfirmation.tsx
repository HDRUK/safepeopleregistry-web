import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import useQueryConfirmAlerts, {
  QueryAlertConfirmOptions,
} from "../../hooks/useQueryConfirmAlerts";

const useMutationWithConfirmation = <
  T extends UseMutationOptions<unknown, Error, void, unknown>,
>(
  mutation: T,
  options?: QueryAlertConfirmOptions,
  tKey?: string
) => {
  const t = useTranslations(`Mutations.${tKey || "WithConfirmation"}`);

  const { mutateAsync, ...mutationState } = useMutation(mutation);

  const showConfirm = useQueryConfirmAlerts(mutationState, {
    ...options,
    confirmAlertProps: {
      text: t("confirmAlertText"),
      title: t("confirmAlertTitle"),
      confirmButtonText: t("confirmAlertConfirmButton"),
      cancelButtonText: t("confirmAlertCancelButton"),
      ...options?.confirmAlertProps,
      onConfirm: async payload => {
        await mutateAsync(payload);

        options?.confirmAlertProps?.onConfirm?.(payload);
      },
    },
    successAlertProps: {
      text: t("successAlertText"),
      title: t("successAlertTitle"),
      ...options?.successAlertProps,
    },
    errorAlertProps: {
      text: <ErrorMessage t={t} tKey="errorAlertText" />,
      title: t("errorAlertTitle"),
      ...options?.errorAlertProps,
    },
  });

  return useMemo(() => ({ showConfirm, ...mutationState }), [mutationState]);
};

export default useMutationWithConfirmation;
