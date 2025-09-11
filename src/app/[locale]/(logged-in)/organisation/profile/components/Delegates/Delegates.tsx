"use client";

import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import FormSection from "@/components/FormSection";
import { useTranslations } from "next-intl";
import Markdown from "@/components/Markdown";
import DelegateTable from "../DelegateTable";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function Delegates() {
  const { user } = useStore(state => ({
    user: state.getUser(),
  }));

  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageBody>
      <PageSection>
        {user?.is_delegate === 0 ? (
          <FormSection
            heading={tProfile("delegatesAdminTitle")}
            description={
              <Markdown>{tProfile("delegateAdminDescription")}</Markdown>
            }>
            <DelegateTable />
          </FormSection>
        ) : (
          <FormSection>
            <Markdown>{tProfile("delegateAdminDescriptionDelegate")}</Markdown>
            <DelegateTable />
          </FormSection>
        )}
      </PageSection>
    </PageBody>
  );
}
