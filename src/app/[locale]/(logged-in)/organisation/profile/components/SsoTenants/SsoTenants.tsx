"use client";

import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import { SsoTenantsSubmission } from "@/organisms";
import { useFeatures } from "@/components/FeatureProvider";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

const NAMESPACE_TRANSLATION = "ProfileOrganisation";

export default function SsoTenants() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const user = useStore(state => state.getUser());
  const { isEnterpriseSamlSsoEnabled } = useFeatures();

  if (!isEnterpriseSamlSsoEnabled) {
    notFound();
  }

  return (
    <PageBody>
      <PageSection heading={t("detailsSso")}>
        {user?.is_delegate ? (
          <Typography>{t("detailsSsoDelegateNotice")}</Typography>
        ) : (
          <SsoTenantsSubmission />
        )}
      </PageSection>
    </PageBody>
  );
}
