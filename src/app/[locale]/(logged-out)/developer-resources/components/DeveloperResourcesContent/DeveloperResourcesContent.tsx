"use server";

import { CONTACT_MAIL_ADDRESS } from "@/config/contacts";
import { PageBodyContainer } from "@/modules";
import { Box, Link, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import DeveloperResourcesCards from "../DeveloperResourcesCards";

const NAMESPACE_TRANSLATIONS = "DeveloperResources";

export default async function DeveloperResourcesContent() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <PageBodyContainer heading={t("infoTitle")} component="article">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
        <Typography>{t("intro1")}</Typography>
        <Typography>
          {t.rich("intro2", {
            emailLink: chunks => (
              <Link href={`mailto:${CONTACT_MAIL_ADDRESS}`}>{chunks}</Link>
            ),
          })}
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <DeveloperResourcesCards />
      </Box>
    </PageBodyContainer>
  );
}
