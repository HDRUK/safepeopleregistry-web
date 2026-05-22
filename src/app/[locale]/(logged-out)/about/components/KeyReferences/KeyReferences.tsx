import { PageSection } from "@/modules";
import { Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import ExternalLink from "@/components/ExternalLink";

const NAMESPACE_TRANSLATIONS = "About";

const KEY_REFERENCES_HEADING_ID = "about-key-references-heading";

const KEY_REFERENCES = [
  { key: "keyReference1", href: "https://zenodo.org/records/15114755" },
  {
    key: "keyReference2",
    href: "https://zenodo.org/records/5902743#.ZDgTHcrMKUn",
  },
  { key: "keyReference3", href: "https://zenodo.org/records/10009169" },
  { key: "keyReference4", href: "https://zenodo.org/records/5946892" },
  { key: "keyReference5", href: "https://zenodo.org/records/8262453" },
] as const;

export default async function KeyReferences() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <PageSection
      component="section"
      aria-labelledby={KEY_REFERENCES_HEADING_ID}
      sx={{ my: 6, width: "100%" }}>
      <Typography variant="h2" id={KEY_REFERENCES_HEADING_ID} gutterBottom>
        {t("keyReferencesTitle")}
      </Typography>
      <Stack
        component="ul"
        spacing={0.5}
        alignItems="flex-start"
        sx={{ pl: 2 }}>
        {KEY_REFERENCES.map(({ key, href }) => (
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
