import { useStore } from "@/data/store";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { useTranslations } from "next-intl";
import ActionLogs from "@/organisms/ActionLogs";
import SoursdCard from "@/components/SoursdCard";
import { mockedUserHomeIntro } from "@/mocks/data/cms";
import { getName } from "@/utils/application";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Home() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { user } = useStore(state => ({
    routes: state.getApplication().routes,
    user: state.getUser(),
  }));

  return (
    <PageBodyContainer heading={tProfile("homeTitle")}>
      <PageColumns>
        <PageColumnBody lg={8}>
          <ActionLogs
            variant="user"
            panelProps={{
              heading: "Welcome to Safe People Registry",
              description: mockedUserHomeIntro,
            }}
          />
        </PageColumnBody>
        <PageColumnDetails lg={4}>
          <SoursdCard
            name={getName(user)}
            status={user?.model_state?.state.slug}
            identifier={user?.registry.digi_ident}
            description={tProfile("uniqueIdentifierCaption")}
          />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}
