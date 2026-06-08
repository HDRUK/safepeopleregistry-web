import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

export const metadata: Metadata = {
  title: `Training | ${SITE_NAME}`,
  description:
    "View and manage your training records and certifications on Safe People Registry.",
};

function TrainingPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.TRAINING,
      }}
    />
  );
}

export default TrainingPage;
