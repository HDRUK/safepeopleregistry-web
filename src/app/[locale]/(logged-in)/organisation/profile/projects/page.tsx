import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

export const metadata: Metadata = {
  title: `Projects | ${SITE_NAME}`,
  description:
    "View research projects associated with your organisation on Safe People Registry.",
};

function ProjectsPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.PROJECTS,
      }}
    />
  );
}

export default ProjectsPage;
