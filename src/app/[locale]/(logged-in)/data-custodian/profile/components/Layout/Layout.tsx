import { ReactNode } from "react";
import { redirectApplication } from "@/utils/headers";
import { PageTabs } from "../../consts/tabs";
import TabsSections from "../TabsSections";

interface LayoutProps {
  children: ReactNode;
  params: {
    tabId: PageTabs;
  };
}

async function Layout({ children, params: { tabId } }: LayoutProps) {
  await redirectApplication();

  return (
    <>
      <TabsSections tabId={tabId} />
      {children}
    </>
  );
}

export default Layout;
