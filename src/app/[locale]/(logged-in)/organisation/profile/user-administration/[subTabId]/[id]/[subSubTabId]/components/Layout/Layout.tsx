import { ReactNode } from "react";
import { getUser } from "@/services/users";
import { notFound } from "next/navigation";
import { UserSubTabs } from "../../../../../../consts/tabs";
import SubTabSections from "../SubTabSections";

interface LayoutProps {
  children: ReactNode;
  params: {
    id: number;
    subSubTabId: UserSubTabs;
  };
}

async function Layout({ children, params: { id, subSubTabId } }: LayoutProps) {
  const { data } = await getUser(id);

  if (!data) notFound();

  return (
    <>
      <SubTabSections userId={id} subTabId={subSubTabId} />
      {children}
    </>
  );
}

export default Layout;
