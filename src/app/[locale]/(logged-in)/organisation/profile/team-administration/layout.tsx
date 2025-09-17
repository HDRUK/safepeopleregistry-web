import { PropsWithChildren } from "react";
import Layout from "../components/Layout";
import { PageTabs } from "../consts/tabs";

function TeamLayout({ children }: PropsWithChildren) {
  return (
    <Layout params={{ tabId: PageTabs.TEAM_ADMINISTRATION }}>{children}</Layout>
  );
}

export default TeamLayout;
