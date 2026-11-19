import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

export const metadata: Metadata = {
  title: `Digital identifiers | ${SITE_NAME}`,
  description:
    "Manage your linked digital identifiers on Safe People Registry.",
};

function DigitalIdentifiersPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.DIGITAL_IDENTIFIERS,
      }}
    />
  );
}

export default DigitalIdentifiersPage;
