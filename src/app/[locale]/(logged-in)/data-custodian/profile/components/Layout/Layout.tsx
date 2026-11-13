import { ReactNode } from "react";
import { PageTabs } from "../../consts/tabs";
import CustodianViewerAccess from "../CustodianViewerAccess";
import TabsSections from "../TabsSections";

interface LayoutProps {
  children: ReactNode;
  params: {
    tabId: PageTabs;
  };
}

async function Layout({ children, params }: LayoutProps) {
  const { tabId } = await params;

  return (
    <CustodianViewerAccess>
      <TabsSections tabId={tabId} />
      {children}
    </CustodianViewerAccess>
  );
}

export default Layout;
