import { useStore } from "@/data/store";
import { PageSection } from "@/modules";
import RulesCheck from "@/modules/RulesCheck";

export default function OrganisationsAutomatedFlags() {
  const organisation = useStore(state => state.getCurrentOrganisation());

  return (
    <PageSection>
      <RulesCheck rules={organisation.rules || []} />
    </PageSection>
  );
}
