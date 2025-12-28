import { PageBodyContainer } from "@/modules";
import { PageTabs } from "../../consts/tabs";
import TabsContents from "../TabsContents";
import { PropsWithChildren } from "react";
import { WithParams } from "@/types/application";

type PageProps = PropsWithChildren<
  WithParams<{
    tabId: PageTabs;
  }>
>;

async function Page({ params }: PageProps) {
  const tabId = (await params).tabId;

  return (
    <PageBodyContainer>
      <TabsContents tabId={tabId} />
    </PageBodyContainer>
  );
}

export default Page;
