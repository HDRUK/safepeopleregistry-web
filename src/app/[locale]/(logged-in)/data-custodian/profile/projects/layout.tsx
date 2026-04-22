import { PropsWithChildren } from "react";
import Layout from "../components/Layout";
import { PageTabs } from "../consts/tabs";

async function UsersLayout({ children, params }: PropsWithChildren) {
  const { id, subTabId, tabId } = await params;

  return (
    <Layout params={{ tabId: tabId ?? PageTabs.PROJECTS }}>{children}</Layout>
  );
}

export default UsersLayout;
