"use server";

import { PageBodyContainer } from "@/modules";
import { Box, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import ContactCards from "../ContactCards";

const NAMESPACE = "ContactUs";

export default async function ContactContent() {
  const t = await getTranslations(NAMESPACE);

  return (
    <PageBodyContainer heading={t("infoTitle")} component="article">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
        <Typography>{t("intro1")}</Typography>
        <Typography>{t("intro2")}</Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <ContactCards />
      </Box>
    </PageBodyContainer>
  );
}
