"use client";

import ContactLink from "@/components/ContactLink";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { useRouter } from "@/i18n/routing";
import { handleLogin, handleLogout, handleRegister } from "@/utils/keycloak";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ReactDOMServer from "react-dom/server";

const Error = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showAlert, hideAlert } = useAlertModal();
  const type = searchParams?.get("type");
  const t = useTranslations(`Error.${type}`);

  const getButtonAction = (type: string) => {
    switch (type) {
      case "login":
        return () => handleLogin();
      case "register":
        return () => handleRegister();
      case "logout":
        return () => handleLogout();
      default:
        return undefined;
    }
  };

  useEffect(() => {
    if (type) {
      const title = t("title");
      const navigateButton = t("navigateButton");
      const hasNavigateButton =
        navigateButton !== `Error.${type}.navigateButton`;

      const errorMessage = ReactDOMServer.renderToString(
        t.rich("message", { contact: ContactLink }) ?? t("message")
      );

      showAlert({
        severity: "error",
        text: errorMessage,
        title,
        onConfirm: async () => {
          getButtonAction(type);

          hideAlert();
        },
        confirmButtonText: t("primaryButton"),
        cancelButtonText: hasNavigateButton ? navigateButton : undefined,
        onCancel: () => {
          if (hasNavigateButton) router.push(t("navigatePath"));

          hideAlert();
        },
      });
    }
  }, [type, t, router]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    />
  );
};

export default Error;
