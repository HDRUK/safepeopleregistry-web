import SubPage from "../../components/SubPage";
import { DetailsPageSubTabs, PageTabs } from "../../consts/tabs";

interface DetailsPageProps {
  params: Promise<{
    subTabId: DetailsPageSubTabs;
  }>;
}

async function DetailsPage({ params }: DetailsPageProps) {
  const { subTabId } = await params;

  return (
    <SubPage
      params={{
        tabId: PageTabs.DETAILS,
        subTabId,
      }}
    />
  );
}

export default DetailsPage;
