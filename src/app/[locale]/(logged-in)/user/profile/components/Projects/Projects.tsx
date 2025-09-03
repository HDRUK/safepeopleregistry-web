import { PageBody, PageBodyContainer } from "@/modules";
import ProjectsList from "@/organisms/Projects";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "Profile.Projects";

export default function Projects() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <PageBodyContainer heading={t("heading")} description={t("description")}>
      <PageBody>
        <ProjectsList variant="user" />
      </PageBody>
    </PageBodyContainer>
  );
}
