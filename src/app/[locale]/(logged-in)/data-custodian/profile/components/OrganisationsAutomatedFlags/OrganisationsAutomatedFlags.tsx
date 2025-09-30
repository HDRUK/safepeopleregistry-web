import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import RulesCheck from "@/modules/RulesCheck";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function OrganisationsAutomatedFlags() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const organisation = useStore(state => state.getCurrentOrganisation());

  return (
    <PageBody heading={t("organisationsAutomatedFlags")}>
      <RulesCheck rules={organisation.rules || []} />
    </PageBody>
  );
}
