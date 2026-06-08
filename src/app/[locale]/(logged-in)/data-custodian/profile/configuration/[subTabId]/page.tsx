import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import SubPage from "../../components/SubPage";
import { ConfigurationSubTabs, PageTabs } from "../../consts/tabs";

export const metadata: Metadata = {
  title: `Configuration | ${SITE_NAME}`,
  description:
    "Manage your data custodian configuration and platform settings on Safe People Registry.",
};

interface ConfigurationPageProps {
  params: {
    subTabId: ConfigurationSubTabs;
  };
}

async function ConfigurationPage({ params }: ConfigurationPageProps) {
  const { subTabId } = await params;

  return (
    <SubPage
      params={{
        tabId: PageTabs.CONFIGURATION,
        subTabId,
      }}
    />
  );
}

export default ConfigurationPage;
