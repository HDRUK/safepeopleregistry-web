import Guidance from "@/components/Guidance";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import { ConfigurationSubTabs, PageTabs, UserSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  params: {
    tabId: PageTabs;
    subTabId: ConfigurationSubTabs | UserSubTabs;
    id?: number;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

function SubPage({ params }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageBodyContainer heading={t(toCamelCase(params.tabId))}>
      <PageColumns>
        <PageColumnBody lg={8}>
          <SubTabsSections {...params} />
          <SubTabsContents {...params} />
        </PageColumnBody>
        <PageColumnDetails lg={4}>
          <Guidance
            infoTitle={t(`guidance.${params.subTabId}.infoTitle`)}
            info={t(`guidance.${params.subTabId}.info`)}
            isCollapsible={false}
            infoWidth="100%"
          />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}

export default SubPage;
