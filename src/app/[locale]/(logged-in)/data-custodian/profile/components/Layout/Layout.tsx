import { ReactNode } from "react";
import useApplicationRedirects from "@/hooks/useApplicationRedirects";
import { PageTabs } from "../../consts/tabs";
import TabsSections from "../TabsSections";

interface LayoutProps {
  children: ReactNode;
  params: {
    tabId: PageTabs;
  };
}

async function Layout({ children, params: { tabId } }: LayoutProps) {
  await useApplicationRedirects();

  return (
    <>
      <TabsSections tabId={tabId} />
      {children}
    </>
  );
}

export default Layout;
