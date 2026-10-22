"use client";

import useOrganisationStore from "@/queries/useOrganisationStore";
import { PageSection } from "@/modules";
import { useTranslations } from "next-intl";

import SroDeclarationUploader from "@/app/[locale]/(logged-in)/organisation/profile/components/Sro/SroDeclarationUploader";
import Link from "next/link";
import { Grid } from "@mui/material";
import { getOrganisationSroDeclarationDetailsQuery } from "@/services/organisations";
import { useQuery } from "@tanstack/react-query";

const NAMESPACE_TRANSLATION = "Organisations.SroDeclaration";
const SRO_DECLARATION_FILE = "/Registry_SRO_Declaration.pdf";

interface SroDeclarationProps {
  isDelegate: boolean;
}

export default function SroDeclaration({ isDelegate }: SroDeclarationProps) {
  const { organisation, refetch: refetchOrganisation } = useOrganisationStore();

  // The API hides an organisation's files, so ask for the latest declaration.
  const { data: sroDeclarationDetails, refetch: refetchSroDeclarationDetails } =
    useQuery(getOrganisationSroDeclarationDetailsQuery(organisation?.id));

  const t = useTranslations(NAMESPACE_TRANSLATION);

  // Uploading and scanning change the organisation's state and its latest
  // declaration, which other parts of the profile show.
  const reload = () => {
    refetchOrganisation();
    refetchSroDeclarationDetails();
  };

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
              value={sroDeclarationDetails?.data?.id}
              onChange={reload}
              onScanFinished={reload}
            />
          </Grid>
        )}
      </Grid>
    </PageSection>
  );
}
