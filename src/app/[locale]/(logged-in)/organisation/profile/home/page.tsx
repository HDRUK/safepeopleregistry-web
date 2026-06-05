import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

export const metadata: Metadata = {
  title: `Organisation Dashboard | ${SITE_NAME}`,
  description: "Your organisation's Safe People Registry dashboard.",
};

function UsersPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.HOME,
      }}
    />
  );
}

export default UsersPage;
