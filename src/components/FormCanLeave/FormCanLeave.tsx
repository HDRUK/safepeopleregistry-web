import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { useFormState, useWatch } from "react-hook-form";
import useRouteChange from "../../hooks/useRouteChange";

interface FormCanLeaveProps {
  children?: ReactNode;
  canLeave?: boolean;
}

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function FormCanLeave({
  children,
  canLeave,
}: FormCanLeaveProps) {
  const { showAlert, hideAlert } = useAlertModal();
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const { dirtyFields, isSubmitting } = useFormState();
  const isDirty = !!Object.keys(dirtyFields).length;

  useWatch();

  const { continueTo } = useRouteChange({
    canLeave: !isDirty || canLeave,
    isSubmitting,
    onBlocked: (pathname: string | null, isSubmitting: boolean) => {
      // 1) Submitting: block navigation
      if (isSubmitting) {
        showAlert({
          severity: "warning",
          title: t("savingAlertTitle"),
          text: t("savingAlertText"),
          onConfirm: async () => {
            hideAlert();
          },
        });

        return;
      }

      // 2) Dirty + not submitting: “unsaved changes” modal
      showAlert({
        severity: "warning",
        text: t("unsavedAlertText"),
        title: t("unsavedAlertTitle"),
        cancelButtonText: t("unsavedAlertCancelButton"),
        confirmButtonText: t("unsavedAlertConfirmButton"),
        onConfirm: async () => {
          if (pathname) continueTo(pathname);

          hideAlert();
        },
        onCancel: () => {
          hideAlert();
        },
      });
    },
  });

  return children;
}
