import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

export const metadata: Metadata = {
  title: `Experience | ${SITE_NAME}`,
  description:
    "Manage your research experience and professional history on Safe People Registry.",
};

function ExperiencePage() {
  return (
    <Page
      params={{
        tabId: PageTabs.EXPERIENCE,
      }}
    />
  );
}

export default ExperiencePage;
