import Link from "@mui/material/Link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import { putProjectUsersQuery } from "../../services/projects";
import { ProjectAllUser } from "../../types/application";
import { showAlert } from "../../utils/showAlert";
import FormModal, { FormModalProps } from "../FormModal";
import ProjectsAddUserForm from "../ProjectsAddUserForm";

import { useStore } from "@/data/store";
import InviteUserModal from "../InviteUserModal";

interface ProjectsAddUserModalProps extends Omit<FormModalProps, "children"> {
  request: boolean;
  projectId: number;
  custodianId: number;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION = "ProjectsAddUserModal";

export default function ProjectsAddUserModal({
  request = false,
  projectId,
  custodianId,
  onClose,
  ...restProps
}: ProjectsAddUserModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();
  const { mutateAsync, ...putProjectUsersMutationState } = useMutation(
    putProjectUsersQuery()
  );

  const projectUsers = useStore(state => state.getCurrentProjectUsers());

  const handleSave = async (projectUsers: ProjectAllUser[]) => {
    if (request) {
      // to be implemented - need a flow to requesting users are added to a project by an organisation
      showAlert("warning", {
        text: "This does nothing yet, this feature has not been implemented",
      });
    } else {
      await mutateAsync({
        params: {
          id: projectId,
        },
        payload: {
          users: projectUsers.filter(u => u.project_user_id || u.role),
        },
      });
    }
  };

  useQueryAlerts(putProjectUsersMutationState, {
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["getPaginatedCustodianProjectUsers", custodianId],
      });

      queryClient.refetchQueries({
        queryKey: ["getAllProjectUsers", projectId],
      });

      onClose?.();
    },
  });

  const handleRefreshUsers = () => {
    queryClient.refetchQueries({
      queryKey: ["getAllProjectUsers", projectId],
    });
  };

  const [openInviteUser, setOpenInviteUser] = useState(false);

  return (
    <>
      <FormModal
        variant="content"
        heading={request ? t("requestHeading") : t("heading")}
        description={
          request
            ? t("requestDescription")
            : t.rich("description", {
                button: chunks => (
                  <Link onClick={() => setOpenInviteUser(true)}>{chunks}</Link>
                ),
              })
        }
        onClose={onClose}
        sx={{
          minWidth: "60%",
        }}
        {...restProps}>
        <ProjectsAddUserForm
          projectId={projectId}
          mutationState={putProjectUsersMutationState}
          onSave={handleSave}
        />
      </FormModal>

      <InviteUserModal
        onSuccess={(user: ProjectAllUser) => {
          handleSave([user, ...projectUsers]);

          handleRefreshUsers();
          setOpenInviteUser(false);
        }}
        open={openInviteUser}
        onClose={() => setOpenInviteUser(false)}
      />
    </>
  );
}
