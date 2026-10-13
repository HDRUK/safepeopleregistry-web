"use client";

import { OrganisationRole } from "@/consts/user";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import { SsoTenantsSubmission } from "@/organisms";
import { useFeatures } from "@/components/FeatureProvider";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { getOrganisationRole } from "@/utils/organisationRole";

const NAMESPACE_TRANSLATION = "ProfileOrganisation";

export default function SsoTenants() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const user = useStore(state => state.getUser());
  const isSro = !!user && getOrganisationRole(user) === OrganisationRole.SRO;
  const { isEnterpriseSamlSsoEnabled } = useFeatures();

  if (!isEnterpriseSamlSsoEnabled) {
    notFound();
  }

  return (
    <PageBody>
      <PageSection heading={t("detailsSso")}>
        {isSro ? (
          <SsoTenantsSubmission />
        ) : (
          <Typography>{t("detailsSsoDelegateNotice")}</Typography>
        )}
      </PageSection>
    </PageBody>
  );
}
