import { PageBody, PageSection } from "@/modules";
import { SsoTenantsSubmission } from "@/organisms";
import { useFeatures } from "@/components/FeatureProvider";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function SsoTenants() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const { isEnterpriseSamlSsoEnabled } = useFeatures();

  if (!isEnterpriseSamlSsoEnabled) {
    notFound();
  }

  return (
    <PageBody>
      <PageSection heading={t("configurationSso")}>
        <SsoTenantsSubmission />
      </PageSection>
    </PageBody>
  );
}
