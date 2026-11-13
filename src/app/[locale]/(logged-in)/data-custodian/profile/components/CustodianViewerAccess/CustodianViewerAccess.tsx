"use client";

import ContactLink from "@/components/ContactLink";
import LoadingWrapper from "@/components/LoadingWrapper";
import { ROUTES } from "@/consts/router";
import useCustodianViewerAccess from "@/hooks/useCustodianViewerAccess";
import { usePathname, useRouter } from "@/i18n/routing";
import { handleLogout } from "@/utils/keycloak";
import { Box, Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { PropsWithChildren, useEffect } from "react";

const NAMESPACE_TRANSLATIONS = "CustodianViewerDisabled";

export default function CustodianViewerAccess({ children }: PropsWithChildren) {
  const { isLoading, isViewOnly, isViewerDisabled } =
    useCustodianViewerAccess();
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginLanding =
    isViewOnly && pathname === ROUTES.profileCustodian.path;

  useEffect(() => {
    if (isLoginLanding) {
      router.replace(ROUTES.profileCustodianProjects.path);
    }
  }, [isLoginLanding]);

  if (isLoading || isLoginLanding) {
    return <LoadingWrapper variant="basic" loading />;
  }

  if (isViewerDisabled) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          maxWidth: 600,
          mx: "auto",
          py: 6,
          textAlign: "center",
        }}>
        <Typography variant="h2">{t("title")}</Typography>
        <Typography>
          {t.rich("description", { contactLink: ContactLink })}
        </Typography>
        <Button variant="contained" onClick={() => handleLogout()}>
          {t("signOut")}
        </Button>
      </Box>
    );
  }

  return children;
}
