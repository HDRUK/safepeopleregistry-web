import {
  PageGuidance,
  PageBodyContainer,
  PageColumns,
  PageColumnBody,
  PageColumnDetails,
} from "@/modules";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import {
  DetailsPageSubTabs,
  PageTabs,
  UserAdminPageSubTabs,
} from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  params: {
    tabId: PageTabs;
    subTabId: DetailsPageSubTabs | UserAdminPageSubTabs;
    id?: number;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

function SubPage({ params }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageBodyContainer heading={t(toCamelCase(`${params.tabId}Title`))}>
      <PageColumns>
        <PageColumnBody lg={8}>
          <SubTabsSections {...params} />
          <SubTabsContents {...params} />
        </PageColumnBody>
        <PageColumnDetails lg={4}>
          <PageGuidance
            profile="organisation"
            {...params}
            isCollapsible={false}
            infoWidth="100%"
          />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}

export default SubPage;
