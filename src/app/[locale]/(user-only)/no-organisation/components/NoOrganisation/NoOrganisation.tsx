"use client";

import ContactLink from "@/components/ContactLink";
import { handleLogout } from "@/utils/keycloak";
import { Box, Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "NoOrganisation";

export default function NoOrganisation() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

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
      <Typography>{t("description")}</Typography>
      <Typography>{t.rich("help", { contactLink: ContactLink })}</Typography>
      <Button variant="contained" onClick={() => handleLogout()}>
        {t("signOut")}
      </Button>
    </Box>
  );
}
