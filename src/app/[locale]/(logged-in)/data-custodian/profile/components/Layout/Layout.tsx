import { PropsWithChildren, ReactNode } from "react";
import useApplicationRedirects from "@/hooks/useApplicationRedirects";
import { PageTabs } from "../../consts/tabs";
import TabsSections from "../TabsSections";
import { WithParams } from "@/types/application";

type LayoutProps = PropsWithChildren<
  WithParams<{
    tabId: PageTabs;
  }>
>;

async function Layout({ children, params }: LayoutProps) {
  await useApplicationRedirects();

  const tabId = (await params).tabId;

  return (
    <>
      <TabsSections tabId={tabId} />
      {children}
    </>
  );
}

export default Layout;
