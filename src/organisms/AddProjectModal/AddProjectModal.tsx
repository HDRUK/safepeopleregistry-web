import FormModal, { FormModalProps } from "@/components/FormModal";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { postCustodianProjectQuery } from "@/services/custodians";
import { useStore } from "@/data/store";
import { injectParamsIntoPath } from "@/utils/application";
import { formatDBDateTime } from "@/utils/date";
import { PutProjectPayload } from "@/services/projects";
import { useRouter } from "next/navigation";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { Message } from "@/components/Message";
import AddProjectForm from "../../modules/AddProjectForm";

export interface AddProjectModalProps extends Omit<FormModalProps, "children"> {
  onClose: () => void;
}

const NAMESPACE_TRANSLATION_PROFILE_FORM = "CustodianProfile.AddProject";

export default function AddProjectModal({
  onClose,
  ...restProps
}: AddProjectModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE_FORM);
  const router = useRouter();

  const { custodianId, routes } = useStore(state => ({
    routes: state.getApplication().routes,
    custodianId: state.getCustodian()?.id,
  }));

  const { mutateAsync: mutateCreateProject, ...queryState } = useMutation(
    postCustodianProjectQuery()
  );

  const handleOnSubmit = useCallback(
    async (payload: PutProjectPayload) => {
      const { data: id } = await mutateCreateProject({
        params: {
          custodianId,
        },
        payload: {
          ...payload,
          start_date: formatDBDateTime(payload.start_date),
          end_date: payload.end_date && formatDBDateTime(payload.end_date),
        },
      });

      const path = injectParamsIntoPath(
        routes.profileCustodianProjectsSafeProject.path,
        {
          id,
        }
      );

      router.push(path);
    },
    [
      custodianId,
      mutateCreateProject,
      router,
      routes.profileCustodianProjectsSafeProject.path,
    ]
  );

  useQueryAlerts(queryState, {
    showOnlyError: true,
  });

  return (
    <FormModal
      aria-label="Add new project modal"
      variant="content"
      onClose={onClose}
      {...restProps}>
      {queryState.isError && (
        <Message severity="error">{t(queryState.error)}</Message>
      )}

      <AddProjectForm onClose={onClose} onSubmit={handleOnSubmit} t={t} />
    </FormModal>
  );
}
