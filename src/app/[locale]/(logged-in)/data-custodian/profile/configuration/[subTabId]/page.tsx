import SubPage from "../../components/SubPage";
import { ConfigurationSubTabs, PageTabs } from "../../consts/tabs";

interface ConfigurationPageProps {
  params: Promise<{
    subTabId: ConfigurationSubTabs;
  }>;
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
