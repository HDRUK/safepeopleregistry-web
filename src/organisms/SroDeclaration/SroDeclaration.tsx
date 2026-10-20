"use client";

import { useStore } from "@/data/store";
import { PageSection } from "@/modules";
import { useTranslations } from "next-intl";

import SroDeclarationUploader from "@/app/[locale]/(logged-in)/organisation/profile/components/Sro/SroDeclarationUploader";
import Link from "next/link";
import { Grid } from "@mui/material";
import { getLatestSRODeclaration } from "@/utils/file";

const NAMESPACE_TRANSLATION = "Organisations.SroDeclaration";
const SRO_DECLARATION_FILE = "/Registry_SRO_Declaration.pdf";

interface SroDeclarationProps {
  isDelegate: boolean;
}

export default function SroDeclaration({ isDelegate }: SroDeclarationProps) {
  const organisation = useStore(state => state.config.organisation);

  const t = useTranslations(NAMESPACE_TRANSLATION);

  const latestSroFile = getLatestSRODeclaration(organisation?.files);

  return (
    <PageSection heading={t("heading")} description={t("intro")}>
      <Grid container rowSpacing={2}>
        <Grid size={{ xs: 12 }}>
          <Link
            href={SRO_DECLARATION_FILE}
            locale={false}
            prefetch={false}
            target="_blank">
            {t("downloadTemplate")}
          </Link>
        </Grid>
        {!isDelegate && (
          <Grid size={{ xs: 12 }}>
            <SroDeclarationUploader
              name="sro_declaration"
              value={latestSroFile?.id}
            />
          </Grid>
        )}
      </Grid>
    </PageSection>
  );
}
