import { ConfigProps, withConfig } from "@/components/Config";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageBodyContainer, PageGuidance } from "@/modules";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import { ConfigurationSubTabs, PageTabs, UserSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  params: {
    tabId: PageTabs;
    subTabId: ConfigurationSubTabs | UserSubTabs;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

function SubPage({ params }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageBodyContainer heading={t(toCamelCase(params.tabId))}>
      <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
        <SubTabsSections {...params} />
        <SubTabsContents {...params} />
      </PageGuidance>
    </PageBodyContainer>
  );
}

export default SubPage;
