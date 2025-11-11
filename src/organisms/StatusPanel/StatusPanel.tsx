import LoadingWrapper from "@/components/LoadingWrapper";
import { Message } from "@/components/Message";
import StatusList from "@/components/StatusList";
import { Status } from "@/consts/application";
import { useStore } from "@/data/store";
import { getCustodianStatusQuery } from "@/services/custodians";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION_ACTION_VALIDATION = "ActionValidationPanel";

function StatusPanel() {
  const t = useTranslations(NAMESPACE_TRANSLATION_ACTION_VALIDATION);

  const { custodianId, projectUser } = useStore(store => ({
    custodianId: store.getCustodian()?.id as number,
    organisationId: store.getCurrentOrganisation(),
    projectUser: store.getCurrentProjectUser(),
    projectOrganisation: store.getCurrentProjectOrganisation(),
  }));

  const projectUserId = projectUser?.id;
  const registryId = projectUser?.registry?.id;

  const { data: status, ...queryState } = useQuery({
    ...getCustodianStatusQuery(custodianId as number, projectUserId as number),
    enabled: !!registryId,
  });

  console.log("****** Has refetched", status);

  const projectStatus =
    status?.data?.project_status?.state?.slug || Status.NONE;
  const validationStatus =
    status?.data?.validation_state?.state?.slug || Status.NONE;
  const organisationStatus =
    status?.data?.organisation_status?.state?.slug || Status.NONE;
  const affiliationStatus =
    status?.data?.affiliation_status?.state?.slug || Status.NONE;

  return (
    <LoadingWrapper variant="basic" loading={queryState?.isLoading || false}>
      <StatusList
        projectStatus={projectStatus}
        validationStatus={validationStatus}
        organisationStatus={organisationStatus}
        affiliationStatus={affiliationStatus}
      />
      {queryState.isError && (
        <Message severity="error" sx={{ mb: 3 }}>
          {t(queryState.error)}
        </Message>
      )}
    </LoadingWrapper>
  );
}

export default StatusPanel;
