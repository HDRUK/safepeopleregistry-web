import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

export const metadata: Metadata = {
  title: `Dashboard | ${SITE_NAME}`,
  description: "Your Safe People Registry researcher dashboard.",
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
