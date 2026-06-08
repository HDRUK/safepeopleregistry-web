import { PageSection } from "@/modules";
import { Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import ExternalLink from "@/components/ExternalLink";
import links from "@/consts/links";

const NAMESPACE_TRANSLATIONS = "About";

const KEY_REFERENCES_HEADING_ID = "about-key-references-heading";

export default async function KeyReferences() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <PageSection
      component="section"
      aria-labelledby={KEY_REFERENCES_HEADING_ID}
      sx={{ my: 2, width: "100%" }}>
      <Typography variant="h2" id={KEY_REFERENCES_HEADING_ID} gutterBottom>
        {t("keyReferencesTitle")}
      </Typography>
      <Stack
        component="ul"
        spacing={0.5}
        alignItems="flex-start"
        sx={{ pl: 2 }}>
        {(Object.entries(links.about) as [string, string][])
          .filter(([key]) => key.startsWith("keyReference"))
          .map(([key, href]) => (
            <Typography component="li" key={key}>
              <ExternalLink href={href} sx={{ color: "primary.main" }}>
                {t(key)}
              </ExternalLink>
            </Typography>
          ))}
      </Stack>
    </PageSection>
  );
}
