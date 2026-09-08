import { useStore } from "@/data/store";
import { PageSection } from "@/modules";
import RulesCheck from "@/modules/RulesCheck";
import { RuleName } from "@/types/rules";

export default function UserCustodianOrgInfo() {
  const user = useStore(state => state.getCurrentUser());

  return (
    <PageSection>
      <RulesCheck
        rules={
          user.rules?.filter(
            r =>
              // TEMPORARILY FILTER ANY TRAINING RULES
              r.rule !== RuleName.TRAINING &&
              r.failed_rules?.rule !== RuleName.TRAINING &&
              // TEMPORARILY FILTER THE SANCTIONS RULE
              r.rule !== RuleName.UK_DATA_PROTECTION &&
              r.failed_rules?.rule !== RuleName.UK_DATA_PROTECTION
          ) || []
        }
      />
    </PageSection>
  );
}
