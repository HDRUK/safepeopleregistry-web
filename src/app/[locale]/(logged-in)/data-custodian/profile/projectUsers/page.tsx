import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

export const metadata: Metadata = {
  title: `Project Users | ${SITE_NAME}`,
  description:
    "View and manage researchers associated with projects governed by your custodian on Safe People Registry.",
};

function ProjectUsersPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.USERS,
      }}
    />
  );
}

export default ProjectUsersPage;
