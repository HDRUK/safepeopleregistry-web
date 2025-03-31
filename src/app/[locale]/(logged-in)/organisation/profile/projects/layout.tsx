import { PropsWithChildren } from "react";
import Layout from "../components/Layout";
import { PageTabs } from "../consts/tabs";

function UsersLayout({ children }: PropsWithChildren) {
  return <Layout params={{ tabId: PageTabs.PROJECTS }}>{children}</Layout>;
}

export default UsersLayout;
