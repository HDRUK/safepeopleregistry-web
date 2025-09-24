"use client";

import { useStore } from "@/data/store";
import { LoadingButton } from "@mui/lab";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import FormActions from "../FormActions";
import FormModalBody from "../FormModalBody";
import SelectInput from "../SelectInput";
import Table from "../Table";
import SearchBar from "../../modules/SearchBar";
import { useGetProjectAllUsers } from "../../services/projects";
import { ProjectAllUser, Role } from "../../types/application";
import { MutationState } from "../../types/form";
import { renderUserNameCell } from "../../utils/cells";
import ErrorMessage from "../ErrorMessage";

const NAMESPACE_TRANSLATION = "CustodianProfile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export type RowUserState = {
  user_digital_ident: string;
  project_role_id: number;
  affiliation_id: number;
}[];

interface ProjectsAddUserFormProps {
  projectId: number;
  mutationState: MutationState;
  onSave: (projectUsers: ProjectAllUser[]) => void;
}

export default function ProjectsAddUserForm({
  projectId,
  onSave,
  mutationState,
}: ProjectsAddUserFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const {
    data: usersData,
    total,
    last_page,
    page,
    setPage,
    updateQueryParams,
    resetQueryParams,
    ...getUserQueryState
  } = useGetProjectAllUsers(projectId, {
    queryKeyBase: ["getAllProjectUsers", projectId],
    defaultQueryParams: { "user_group__and[]": "USERS" },
  });

  const { projectUsers, setProjectUsers } = useStore(state => ({
    projectUsers: state.getCurrentProjectUsers(),
    setProjectUsers: state.setCurrentProjectUsers,
  }));

  useEffect(() => {
    if (usersData) setProjectUsers(usersData);
  }, [usersData]);

  const projectRoles = useStore(state => state.getProjectRoles());

  const handleSelectRole = (row: ProjectAllUser, roleId: number | null) => {
    const updatedRole = roleId
      ? (projectRoles.find(role => role?.id === roleId) as Partial<Role>)
      : null;

    setProjectUsers(prevUsers => {
      const exists = prevUsers.some(user => user.id === row.id);
      if (exists) {
        return prevUsers.map(user =>
          user.id === row.id ? { ...user, role: updatedRole } : user
        );
      }
      return [...prevUsers, { ...row, role: updatedRole }];
    });
  };

  const renderRoleSelectorCell = (
    info: CellContext<ProjectAllUser, unknown>
  ) => {
    const roleId = info.row.original.role?.id ?? "";

    return (
      <SelectInput
        variant="standard"
        value={roleId}
        size="small"
        options={[
          { label: "-", value: "" },
          ...projectRoles.map(({ id, name }) => ({
            label: name,
            value: id,
          })),
        ]}
        onChange={({ target: { value } }) => {
          const parsedValue = value === "" ? null : Number(value);
          handleSelectRole(info.row.original, parsedValue);
        }}
      />
    );
  };

  const columns: ColumnDef<ProjectAllUser>[] = [
    {
      accessorKey: "name",
      header: tApplication("name"),
      cell: (info: CellContext<ProjectAllUser, unknown>) =>
        renderUserNameCell(info.row.original),
    },
    {
      accessorKey: "email",
      header: tApplication("email"),
      cell: info => info.row.original?.professional_email,
    },
    {
      accessorKey: "organisation_name",
      header: tApplication("organisation"),
    },
    {
      accessorKey: "role.id",
      header: tApplication("role"),
      cell: renderRoleSelectorCell,
      minSize: 250,
    },
  ];

  return (
    <>
      <FormModalBody>
        <SearchBar
          onClear={resetQueryParams}
          onSearch={(text: string) => {
            updateQueryParams({
              "name[]": text,
            });
          }}
          placeholder={t("searchPlaceholder")}
        />
        <Table
          isPaginated
          columns={columns}
          data={projectUsers}
          queryState={getUserQueryState}
          noResultsMessage={t("noResultsMessage")}
          errorMessage={
            <ErrorMessage t={t} tKey="professionalRegsitrationsErrorMessage" />
          }
          total={total}
          page={page}
          setPage={setPage}
          last_page={last_page}
        />
      </FormModalBody>
      <FormActions>
        <div />
        <LoadingButton
          loading={mutationState.isPending}
          onClick={() => onSave(projectUsers)}>
          {tApplication("saveButton")}
        </LoadingButton>
      </FormActions>
    </>
  );
}
