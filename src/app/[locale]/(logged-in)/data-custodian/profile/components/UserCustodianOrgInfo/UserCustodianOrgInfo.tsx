import { useStore } from "@/data/store";
import { PageBody, PageBodyContainer, PageSection } from "@/modules";
import RulesCheck from "@/modules/RulesCheck";

export default function UserCustodianOrgInfo() {
  const user = useStore(state => state.getCurrentUser());

  return (
    <PageBodyContainer>
      <PageBody>
        <PageSection heading="Automated flags">
          <RulesCheck rules={user.rules || []} />
        </PageSection>
      </PageBody>
    </PageBodyContainer>
  );
}
