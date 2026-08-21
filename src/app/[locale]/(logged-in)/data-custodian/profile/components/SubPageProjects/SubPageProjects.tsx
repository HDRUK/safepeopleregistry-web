import { useStore } from "@/data/store";
import { PageBodyContainer } from "@/modules";
import { ResearcherProject } from "@/types/application";
import { useEffect } from "react";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsContents from "../SubsTabContents";
import { useTranslations } from "next-intl";
import BackToResultsButton from "../BackToResultsButton";

interface PageProps {
  projectData: ResearcherProject;
  params: {
    subTabId: ProjectsSubTabs;
    id: number;
  };
}
const NAMESPACE_TRANSLATION_CUSTODIAN_PROJECT = "CustodianProfile.Project";

export default function SubPageProjects({ params, projectData }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_CUSTODIAN_PROJECT);
  const { subTabId, id } = params;
  const tabId = PageTabs.PROJECTS;

  const [project, setProject] = useStore(state => [
    state.getCurrentProject(),
    state.setCurrentProject,
  ]);

  useEffect(() => {
    if (projectData) {
      setProject(projectData);
    }
  }, [projectData]);

  return (
    project?.id === Number(id) && (
      <>
        <BackToResultsButton
          label={t("backToProjects")}
          fixedHref="/data-custodian/profile/projects"
        />
        <PageBodyContainer heading={project.title}>
          <SubTabsContents tabId={tabId} subTabId={subTabId} id={id} />
        </PageBodyContainer>
      </>
    )
  );
}
