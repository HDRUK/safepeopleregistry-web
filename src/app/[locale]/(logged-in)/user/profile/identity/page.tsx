import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

export const metadata: Metadata = {
  title: `Identity | ${SITE_NAME}`,
  description: "Manage your identity details on Safe People Registry.",
};

function IdentityPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.IDENTITY,
      }}
    />
  );
}

export default IdentityPage;
