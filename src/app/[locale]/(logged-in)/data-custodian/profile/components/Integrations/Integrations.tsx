import FormActions from "@/components/FormActions";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { ROUTES } from "@/consts/router";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import CustodianIntegrationsForm from "@/modules/CustodianIntegrationsForm";
import { putCustodianQuery } from "@/services/custodians";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const NAMESPACE_TRANSLATION = "CustodianProfile.Integrations";

interface IntegrationsFormValues {
  gateway_app_id: string;
  gateway_client_id: string;
}

export default function Integrations() {
  const { hideAlert, showAlert } = useAlertModal();
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const { custodian } = useStore(state => ({
    custodian: state.getCustodian(),
  }));

  const { mutateAsync: updateCustodian, ...restMutationState } = useMutation(
    putCustodianQuery(custodian?.id)
  );

  const defaultValues = useMemo(
    () => ({
      gateway_app_id: custodian?.gateway_app_id || "",
      gateway_client_id: custodian?.gateway_client_id || "",
    }),
    [custodian]
  );

  const handleSubmit = async (fields: IntegrationsFormValues) => {
    updateCustodian(fields).then(() => {
      showAlert({
        severity: "success",
        text: t("saveSuccess"),
        confirmButtonText: t("okButton"),
        onConfirm: async () => {
          hideAlert();
        },
      });
    });
  };

  return (
    <PageBody>
      <PageSection heading={t("configurationIntegrations")}>
        <CustodianIntegrationsForm
          t={t}
          mutateState={restMutationState}
          custodian={custodian}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}>
          <FormActions>
            <ProfileNavigationFooter
              previousHref={ROUTES.profileCustodianConfigurationWebhooks.path}
              isLoading={restMutationState.isPending}
            />
          </FormActions>
        </CustodianIntegrationsForm>
      </PageSection>
    </PageBody>
  );
}
