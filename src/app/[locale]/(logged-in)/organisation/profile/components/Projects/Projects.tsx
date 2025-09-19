import { PageBody, PageBodyContainer } from "@/modules";
import ProjectsList from "@/organisms/Projects";
import { EntityType } from "@/types/api";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "Projects";

export default function Projects() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <PageBodyContainer
      heading={t("projects")}
      description={t("projectsListDescription")}>
      <PageBody>
        <ProjectsList variant={EntityType.ORGANISATION} />
      </PageBody>
    </PageBodyContainer>
  );
}
