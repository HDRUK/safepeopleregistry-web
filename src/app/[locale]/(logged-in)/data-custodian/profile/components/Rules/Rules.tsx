import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PageSection } from "@/modules";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import CheckboxList from "@/components/CheckboxList";
import { mockedConfigurationRulesDescription } from "@/mocks/data/cms";
import { showAlert } from "@/utils/showAlert";
import { EntityModelTypes } from "@/consts/custodian";
import {
  getCustodianEntityModelQuery,
  GetCustodianEntityModelResponse,
  putCustodianActiveEntityModelQuery,
} from "@/services/custodians";
import { Rule } from "@/types/rules";
import { useStore } from "@/data/store";
import ButtonSave from "@/components/ButtonSave";
import ErrorMessage from "@/components/ErrorMessage";
import { DEFAULT_STALE_TIME } from "@/consts/requests";

const NAMESPACE_TRANSLATION_CUSTODIAN_PROFILE = "CustodianProfile";

export default function Rules() {
  const t = useTranslations(NAMESPACE_TRANSLATION_CUSTODIAN_PROFILE);
  const queryClient = useQueryClient();

  const [userRules, setUserRules] = useState<boolean[]>([]);
  const [orgRules, setOrgRules] = useState<boolean[]>([]);
  const custodian = useStore(state => state.getCustodian());

  const { data: userRulesData, isLoading: isLoadingUserRules } = useQuery(
    getCustodianEntityModelQuery(
      custodian?.id,
      EntityModelTypes.USER_VALIDATION_RULES,
      {
        staleTime: DEFAULT_STALE_TIME,
      }
    )
  );

  const { data: orgRulesData, isLoading: isLoadingOrgRules } = useQuery(
    getCustodianEntityModelQuery(
      custodian?.id,
      EntityModelTypes.ORG_VALIDATION_RULES,
      { staleTime: DEFAULT_STALE_TIME }
    )
  );

  const { mutateAsync, isPending } = useMutation({
    ...putCustodianActiveEntityModelQuery(custodian?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCustodianEntityModel", custodian?.id],
      });
    },
  });

  const formatRules = (rulesData): Rule[] => {
    return (
      rulesData?.data?.map(rule => {
        return {
          id: rule.id,
          label: rule.name || rule.id,
          text: rule.description || "",
          active: rule.active === true || rule.active === 1,
        };
      }) || []
    );
  };

  const formattedUserRules: Rule[] = useMemo(
    () => formatRules(userRulesData),
    [userRulesData]
  );
  const formattedOrgRules: Rule[] = useMemo(
    () => formatRules(orgRulesData),
    [orgRulesData]
  );

  useEffect(() => {
    if (userRulesData) {
      const newUserRules = formattedUserRules.map(rule => rule.active);
      setUserRules(newUserRules);
    }
    if (orgRulesData) {
      const newOrgRules = formattedOrgRules.map(rule => rule.active);
      setOrgRules(newOrgRules);
    }
  }, [userRulesData, orgRulesData, formattedUserRules, formattedOrgRules]);

  const handleSubmit = async () => {
    const createRulePayload = (
      rulesData:
        | (Response & {
            data: GetCustodianEntityModelResponse[];
            message: string;
            status: number;
          })
        | undefined,
      checkedState: boolean[]
    ) =>
      rulesData?.data?.map((rule: { id: number }, index: number) => ({
        entity_model_id: rule.id,
        active: checkedState[index],
      })) || [];

    const payload = {
      configs: [
        ...createRulePayload(userRulesData, userRules),
        ...createRulePayload(orgRulesData, orgRules),
      ],
    };

    try {
      await mutateAsync(payload);
      showAlert("success", {
        text: t("updateRulesSuccess"),
        confirmButtonText: t("successButton"),
      });
    } catch (_) {
      showAlert("error", {
        text: <ErrorMessage t={t} tKey="updateRulesError" />,
        confirmButtonText: t("errorButton"),
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <PageSection
        heading={t("configurationRulesTitle")}
        description={mockedConfigurationRulesDescription}>
        <CheckboxList
          isLoading={isLoadingUserRules}
          items={formattedUserRules}
          title={t("userRulesTitle")}
          checked={userRules}
          setChecked={setUserRules}
        />
        <CheckboxList
          isLoading={isLoadingOrgRules}
          items={formattedOrgRules}
          title={t("organisationRulesTitle")}
          checked={orgRules}
          setChecked={setOrgRules}
        />
      </PageSection>
      <FormActions sx={{ justifyContent: "flex-end" }}>
        <ButtonSave isLoading={isPending} />
      </FormActions>
    </Form>
  );
}
