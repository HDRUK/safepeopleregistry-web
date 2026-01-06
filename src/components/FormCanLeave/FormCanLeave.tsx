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
  const formState = useFormState();
  const isDirty = !!Object.keys(formState.dirtyFields).length;

  useWatch();

  const { continueTo } = useRouteChange({
    canLeave: !isDirty || canLeave,
    onBlocked: (pathname: string | null) => {
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
      });
    },
  });

  return children;
}
