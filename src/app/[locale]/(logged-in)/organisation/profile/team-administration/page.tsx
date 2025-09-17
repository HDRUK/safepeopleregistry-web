import {
  PageBodyContainer,
  PageColumns,
  PageColumnBody,
  PageColumnDetails,
  PageGuidance,
} from "@/modules";
import { useTranslations } from "next-intl";
import Delegates from "../components/Delegates";
import { PageTabs, TeamAdminPageSubTabs } from "../consts/tabs";

const NAMESPACE_TRANSLATION = "ProfileOrganisation";

function TeamPage() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  return (
    <PageBodyContainer heading={t("teamAdminTitle")}>
      <PageColumns>
        <PageColumnBody lg={8}>
          <Delegates />
        </PageColumnBody>
        <PageColumnDetails lg={4}>
          <PageGuidance
            profile="organisation"
            tabId={PageTabs.TEAM_ADMINISTRATION}
            subTabId={TeamAdminPageSubTabs.DELEGATE_ADMINISTRATION}
            isCollapsible={false}
            infoWidth="100%"
          />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}

export default TeamPage;
