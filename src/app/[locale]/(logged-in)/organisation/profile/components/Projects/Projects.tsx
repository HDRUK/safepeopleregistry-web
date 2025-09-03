import { PageBody, PageBodyContainer } from "@/modules";
import ProjectsList from "@/organisms/Projects";
import { useTranslations } from "next-intl";
import Markdown from "react-markdown";

const NAMESPACE_TRANSLATION = "Projects";

export default function Projects() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <PageBodyContainer heading={t("projects")}>
      <PageBody>
        <Markdown>{t("projectsListDescription")}</Markdown>
        <ProjectsList variant="organisation" />
      </PageBody>
    </PageBodyContainer>
  );
}
