"use client";

import { LoadingButton } from "@mui/lab";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import ErrorMessage from "../../components/ErrorMessage";
import FormActions from "../../components/FormActions";
import FormModalBody from "../../components/FormModalBody";
import Table from "../../components/Table";
import { PaginatedQueryReturn } from "../../hooks/usePaginatedQuery";
import { ProjectAllUsersResponse } from "../../services/projects";
import { ProjectAllUser, Role } from "../../types/application";
import { MutationState } from "../../types/form";
import { renderSelectRoleCell, renderUserNameCell } from "../../utils/cells";
import SearchBar from "../SearchBar";

const NAMESPACE_TRANSLATION = "CustodianProfile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export type RowUserState = {
  user_digital_ident: string;
  project_role_id: number;
  affiliation_id: number;
}[];

interface ProjectsAddUserFormProps {
  projectUsers: ProjectAllUser[];
  projectRoles: Partial<Role>[];
  mutationState: MutationState;
  onSave: (projectUsers: ProjectAllUser[]) => void;
  onRoleSelect: (row: ProjectAllUser, roleId: number | null) => void;
  queryState: Omit<
    PaginatedQueryReturn<ProjectAllUsersResponse>,
    "data" | "refetch"
  >;
}

export default function ProjectsAddUserForm({
  projectUsers,
  projectRoles,
  onSave,
  onRoleSelect,
  mutationState,
  ...restProps
}: ProjectsAddUserFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const {
    page,
    setPage,
    total,
    last_page,
    updateQueryParams,
    resetQueryParams,
    ...restQueryParams
  } = restProps.queryState;

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
      cell: info =>
        renderSelectRoleCell(info, { roles: projectRoles, onRoleSelect }),
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
          queryState={restQueryParams}
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
