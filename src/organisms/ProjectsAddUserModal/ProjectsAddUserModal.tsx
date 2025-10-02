import { useStore } from "@/data/store";
import Link from "@mui/material/Link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import FormModal, { FormModalProps } from "../../components/FormModal";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import ProjectsAddUserForm from "../../modules/ProjectsAddUserForm";
import {
  getProjectAllUserByUserId,
  putProjectUsersQuery,
  useGetProjectAllUsers,
} from "../../services/projects";
import { ProjectAllUser, Role } from "../../types/application";
import { showAlert } from "../../utils/showAlert";

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

  const [openInviteUser, setOpenInviteUser] = useState(false);

  const queryClient = useQueryClient();
  const { mutateAsync, ...putProjectUsersMutationState } = useMutation(
    putProjectUsersQuery()
  );

  const { projectUsers, projectRoles, setProjectUsers } = useStore(state => ({
    projectUsers: state.getCurrentProjectUsers(),
    projectRoles: state.getProjectRoles(),
    setProjectUsers: state.setCurrentProjectUsers,
  }));

  const {
    data: usersData,
    refetch,
    ...getUserQueryState
  } = useGetProjectAllUsers(projectId, {
    queryKeyBase: ["getAllProjectUsers", projectId],
    defaultQueryParams: { "user_group__and[]": "USERS" },
  });

  useEffect(() => {
    if (usersData) setProjectUsers(usersData);
  }, [usersData]);

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

      if (!openInviteUser) onClose?.();
    },
  });

  const handleSelectRole = (row: ProjectAllUser, roleId: number | null) => {
    const updatedRole = roleId
      ? (projectRoles.find(role => role?.id === +roleId) as Partial<Role>)
      : null;

    const exists = projectUsers.some(
      user => user.affiliation_id === row.affiliation_id
    );

    if (exists) {
      return projectUsers.map(user =>
        user.affiliation_id === row.affiliation_id
          ? { ...user, role: updatedRole }
          : user
      );
    }

    return [...projectUsers, { ...row, role: updatedRole }];
  };

  const handleInviteSuccess = async (id: number, roleId: number) => {
    const { data } = await getProjectAllUserByUserId(projectId, id);

    const updatedUsers = handleSelectRole(data[0], roleId);

    await handleSave([data[0], ...updatedUsers]);
    await refetch();

    setOpenInviteUser(false);
  };

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
          projectUsers={projectUsers}
          projectRoles={projectRoles}
          mutationState={putProjectUsersMutationState}
          onSave={handleSave}
          onRoleSelect={(row: ProjectAllUser, roleId: number | null) => {
            setProjectUsers(handleSelectRole(row, roleId));
          }}
          queryState={getUserQueryState}
        />
      </FormModal>

      <InviteUserModal
        projectRoles={projectRoles}
        onSuccess={handleInviteSuccess}
        open={openInviteUser}
        onClose={() => setOpenInviteUser(false)}
      />
    </>
  );
}
