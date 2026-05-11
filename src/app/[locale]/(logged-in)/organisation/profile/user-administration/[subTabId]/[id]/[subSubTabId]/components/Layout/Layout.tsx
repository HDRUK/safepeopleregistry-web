import { ReactNode } from "react";
import { UserSubTabs } from "../../../../../../consts/tabs";
import SubTabSections from "../SubTabSections";

interface LayoutProps {
  children: ReactNode;
  params: {
    id: number;
    subSubTabId: UserSubTabs;
  };
}

async function Layout({ children, params }: LayoutProps) {
  const { id, subSubTabId } = await params;

  return (
    <>
      <SubTabSections userId={id} subTabId={subSubTabId} />
      {children}
    </>
  );
}

export default Layout;
