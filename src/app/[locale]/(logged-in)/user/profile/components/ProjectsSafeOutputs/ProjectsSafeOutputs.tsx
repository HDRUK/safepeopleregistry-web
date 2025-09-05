"use client";

import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import ProjectsSafeOutputsDetails from "@/modules/ProjectsSafeOutputsDetails";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function ProjectsSafeData() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const project = useStore(state => state.getCurrentProject());

  return (
    <PageBody heading={t("safeOutputs")}>
      <PageSection>
        <ProjectsSafeOutputsDetails
          projectDetailsData={project.project_detail}
        />
      </PageSection>
    </PageBody>
  );
}
