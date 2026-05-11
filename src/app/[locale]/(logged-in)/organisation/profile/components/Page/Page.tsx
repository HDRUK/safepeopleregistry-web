import { PageBodyContainer } from "@/modules";
import { PageTabs } from "../../consts/tabs";
import TabsContents from "../TabsContents";

interface PageProps {
  params: {
    tabId: PageTabs;
  };
  pageTitle?: string;
}

async function Page({ params, pageTitle }: PageProps) {
  const { tabId } = await params;

  return (
    <PageBodyContainer heading={pageTitle ?? ""}>
      <TabsContents tabId={tabId} />
    </PageBodyContainer>
  );
}

export default Page;
