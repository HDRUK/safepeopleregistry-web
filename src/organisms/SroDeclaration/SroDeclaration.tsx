"use client";

import { useStore } from "@/data/store";
import { PageSection } from "@/modules";
import { useTranslations } from "next-intl";

import FormControlWrapper from "@/components/FormControlWrapper";
import SroDeclarationUploader from "@/app/[locale]/(logged-in)/organisation/profile/components/NameAndAddress/SroDeclarationUploader";
import Link from "next/link";
import { Grid } from "@mui/material";

const NAMESPACE_TRANSLATION = "Organisations.SroDeclaratation";
const SRO_DELCLARATION_FILE = "/Registry_SRO_Declaration.pdf";
const SRO_DELCLARATION_TYPE = "DECLARATION_SRO";

export default function SroDeclaration() {
  const organisation = useStore(state => state.config.organisation);
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const latestSroFile = organisation?.files
    ?.filter(
      file => file.status === "processed" && file.type === SRO_DELCLARATION_TYPE
    )
    ?.sort(
      (a, b) =>
        Date.parse(b.updated_at ?? b.created_at) -
        Date.parse(a.updated_at ?? a.created_at)
    )?.[0];

  return (
    <PageSection heading={t("heading")} description={t("intro")}>
      <Grid container rowSpacing={2}>
        <Link
          href={SRO_DELCLARATION_FILE}
          locale={false}
          prefetch={false}
          target="_blank">
          {t("downloadTemplate")}
        </Link>

        <FormControlWrapper
          name="sro_declaration"
          displayLabel={false}
          renderField={fieldProps => (
            <SroDeclarationUploader
              name="sro_declaration"
              value={latestSroFile?.id}
              onChange={fieldProps.onChange}
            />
          )}
        />
      </Grid>
    </PageSection>
  );
}
