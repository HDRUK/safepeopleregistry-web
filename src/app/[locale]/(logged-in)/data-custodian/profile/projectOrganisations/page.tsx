import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

export const metadata: Metadata = {
  title: `Project Organisations | ${SITE_NAME}`,
  description:
    "View and manage organisations associated with projects governed by your custodian on Safe People Registry.",
};

function ProjectOrganisationsPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.ORGANISATIONS,
      }}
    />
  );
}

export default ProjectOrganisationsPage;
