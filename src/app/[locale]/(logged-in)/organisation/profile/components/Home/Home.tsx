import SoursdCard from "@/components/SoursdCard";
import { useStore } from "@/data/store";
import { mockedOrganisationHomeIntro } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";
import ActionLogs from "@/organisms/ActionLogs";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

const Home = () => {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const organisation = useStore(state => state.getOrganisation());

  return (
    <PageBodyContainer heading={tProfile("homeTitle")}>
      <PageColumns>
        <PageColumnBody lg={8}>
          <PageBody>
            <PageSection>
              <ActionLogs
                variant="organisation"
                panelProps={{
                  heading: "Welcome to Safe People Registry!",
                  description: mockedOrganisationHomeIntro,
                }}
              />
            </PageSection>
          </PageBody>
        </PageColumnBody>
        <PageColumnDetails lg={4}>
          <SoursdCard
            name={organisation.organisation_name}
            status={organisation.model_state?.state.slug}
            identifier={organisation.organisation_unique_id}
            description={tProfile("uniqueIdentifierCaption")}
          />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
};

export default Home;
