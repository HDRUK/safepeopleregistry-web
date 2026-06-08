import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { PageBody, PageBodyContainer, PageSection } from "@/modules";
import { redirectProfile } from "@/utils/router";
import { getTranslations } from "next-intl/server";
import Sections from "./components/Sections/Sections";

export const metadata: Metadata = {
  title: `Admin | ${SITE_NAME}`,
  description: "Safe People Registry administration.",
};

const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

async function Page() {
  await redirectProfile();

  const t = await getTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);

  return (
    <PageBodyContainer heading={t("title")} sx={{ mt: 3 }}>
      <PageBody>
        <PageSection>
          <Sections />
        </PageSection>
      </PageBody>
    </PageBodyContainer>
  );
}

export default Page;
