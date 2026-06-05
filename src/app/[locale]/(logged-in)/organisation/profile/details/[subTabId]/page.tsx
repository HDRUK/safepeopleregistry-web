import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import SubPage from "../../components/SubPage";
import { DetailsPageSubTabs, PageTabs } from "../../consts/tabs";

export const metadata: Metadata = {
  title: `Organisation Details | ${SITE_NAME}`,
  description:
    "View your organisation's profile details on Safe People Registry.",
};

interface DetailsPageProps {
  params: {
    subTabId: DetailsPageSubTabs;
  };
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
