import { PageBodyContainer } from "@/modules";
import { PageTabs } from "../../consts/tabs";
import TabsContents from "../TabsContents";

interface PageProps {
  params: {
    tabId: PageTabs;
  };
}

async function Page({ params }: PageProps) {
  const { tabId } = await params;

  return (
    <PageBodyContainer>
      <TabsContents tabId={tabId} />
    </PageBodyContainer>
  );
}

export default Page;
