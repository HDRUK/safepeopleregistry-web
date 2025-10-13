import { useStore } from "@/data/store";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import ActionsPanel from "../../components/ActionsPanel";
import LoadingWrapper from "../../components/LoadingWrapper";
import { Message } from "../../components/Message";
import useCustodianProjectOrganisation from "../../hooks/useCustodianProjectOrganisation";
import useCustodianProjectUser from "../../hooks/useCustodianProjectUser";
import ActionValidationStatus from "../../modules/ActionValidationStatus";
import { QueryState } from "../../types/form";
import { ValidationLog } from "../../types/logs";
import ActionsPanelValidationCheck from "../ActionsPanelValidationCheck";

const NAMESPACE_TRANSLATION_ACTION_VALIDATION = "ActionValidationPanel";

export const ActionValidationVariants = {
  ProjectUser: "ProjectUser",
  Organisation: "Organisation",
} as const;

interface ActionValidationPanelProps {
  variant: keyof typeof ActionValidationVariants;
  logs: ValidationLog[];
  queryState: QueryState;
}

interface CustodianParams {
  custodianId: number;
  projectUserId: number;
}

interface OrganisationParams {
  custodianId: number;
  projectOrganisationId: number;
}

function ActionValidationPanel({
  variant,
  logs,
  queryState = { isLoading: false, isError: false },
}: ActionValidationPanelProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_ACTION_VALIDATION);

  const { custodianId, projectUser, projectOrganisation } = useStore(store => ({
    custodianId: store.getCustodian()?.id as number,
    organisationId: store.getCurrentOrganisation(),
    projectUser: store.getCurrentProjectUser(),
    projectOrganisation: store.getCurrentProjectOrganisation(),
  }));

  const projectUserId = projectUser?.id;
  const registryId = projectUser?.registry?.id;

  const projectOrganisationId = projectOrganisation?.id;
  const organisationId = projectOrganisation?.organisation_id;

  const projectId = projectUser?.project_id || projectOrganisation?.project_id;

  const queryClient = useQueryClient();

  const projectUserHookParams = useMemo(
    () => ({ custodianId, projectUserId }),
    [custodianId, projectUserId]
  );

  const organisationHookParams = useMemo(
    () => ({ custodianId, projectOrganisationId }),
    [custodianId, projectOrganisationId]
  );

  let actionValidationStatus;
  let onAction = () => {};
  switch (variant) {
    case ActionValidationVariants.ProjectUser: {
      actionValidationStatus = (
        <ActionValidationStatus<CustodianParams>
          useApprovalHook={useCustodianProjectUser}
          hookParams={projectUserHookParams}
        />
      );

      onAction = () => {
        queryClient.refetchQueries({
          queryKey: [
            "getCustodianProjectUserValidationLogs",
            custodianId,
            projectId,
            registryId,
          ],
        });
      };

      break;
    }
    case ActionValidationVariants.Organisation: {
      // need to reimplement this in another ticket

      actionValidationStatus = (
        <ActionValidationStatus<OrganisationParams>
          useApprovalHook={useCustodianProjectOrganisation}
          hookParams={organisationHookParams}
          disabled={!projectOrganisation?.organisation.system_approved}
        />
      );

      onAction = () => {
        queryClient.refetchQueries({
          queryKey: [
            "getCustodianOrganisationValidationLogs",
            custodianId,
            organisationId,
          ],
        });
      };

      break;
    }
    default:
      break;
  }

  return (
    <LoadingWrapper variant="basic" loading={queryState?.isLoading || false}>
      <ActionsPanel heading={t("title")}>
        {logs
          .filter(log => log.validation_check.enabled) // move to BE?
          .map(log => (
            <ActionsPanelValidationCheck
              key={log.id}
              log={log}
              onAction={onAction}
              disabled={
                ActionValidationVariants.Organisation === variant &&
                !projectOrganisation?.organisation.system_approved
              }
            />
          ))}
        {actionValidationStatus}
      </ActionsPanel>
      {queryState.isError && (
        <Message severity="error" sx={{ mb: 3 }}>
          {t(queryState.error)}
        </Message>
      )}
    </LoadingWrapper>
  );
}

export default ActionValidationPanel;
