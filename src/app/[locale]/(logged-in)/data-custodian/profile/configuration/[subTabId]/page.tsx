import { WithParams } from "@/types/application";
import SubPage from "../../components/SubPage";
import { ConfigurationSubTabs, PageTabs } from "../../consts/tabs";

type ConfigurationPageProps = WithParams<{
  subTabId: ConfigurationSubTabs;
}>;

async function ConfigurationPage({ params }: ConfigurationPageProps) {
  const subTabId = (await params).subTabId;

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
