import { useStore } from "@/data/store";
import { PageSection } from "@/modules";
import RulesCheck from "@/modules/RulesCheck";

export default function UserCustodianOrgInfo() {
  const user = useStore(state => state.getCurrentUser());

  return (
    <PageSection>
      <RulesCheck rules={user.rules || []} />
    </PageSection>
  );
}
