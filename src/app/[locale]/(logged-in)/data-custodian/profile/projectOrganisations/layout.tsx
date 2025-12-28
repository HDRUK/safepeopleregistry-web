import { PropsWithChildren } from "react";
import Layout from "../components/Layout";
import { PageTabs } from "../consts/tabs";

function UsersLayout({ children }: PropsWithChildren) {
  return (
    <Layout
      params={Promise.resolve({
        tabId: PageTabs.ORGANISATIONS,
      })}>
      {children}
    </Layout>
  );
}

export default UsersLayout;
