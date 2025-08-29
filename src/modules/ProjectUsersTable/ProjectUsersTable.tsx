import useColumns from "@/hooks/useColumns";
import { ModuleTables } from "@/types/modules";
import { filterColumns } from "@/utils/table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Table from "../../components/Table";
import {
  CustodianProjectUser,
  ProjectUser,
  WithRoutes,
} from "../../types/application";
import {
  renderOrganisationsNameCell,
  renderProjectUserNameCell,
  renderStatusCell,
} from "../../utils/cells";

export type ProjectUsersTableColumns =
  | "name"
  | "projectRole"
  | "projectName"
  | "organisationName"
  | "status"
  | "affiliationStatus";

export type ProjectUsersTableProps = WithRoutes<
  ModuleTables<CustodianProjectUser | ProjectUser, ProjectUsersTableColumns>
>;

function getProjectUser(row: CustodianProjectUser | ProjectUser): ProjectUser {
  return (row as CustodianProjectUser).project_has_user ?? (row as ProjectUser);
}

export default function ProjectUsersTable({
  t,
  routes,
  includeColumns = [
    "name",
    "projectRole",
    "projectName",
    "organisationName",
    "status",
    "affiliationStatus",
  ],
  extraColumns,
  ...restProps
}: ProjectUsersTableProps) {
  const { createDefaultColumn } = useColumns<
    CustodianProjectUser | ProjectUser
  >({ t });

  const namePath = useMemo(() => routes?.name?.path, [routes]);

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<CustodianProjectUser | ProjectUser>[] = [
      createDefaultColumn("name", {
        accessorFn: row => getProjectUser(row),
        cell: info =>
          renderProjectUserNameCell(
            getProjectUser(info.row.original),
            namePath
          ),
      }),
      createDefaultColumn("projectRole", {
        accessorFn: row => getProjectUser(row).role?.name,
      }),
      createDefaultColumn("projectName", {
        accessorFn: row => getProjectUser(row).project?.title,
      }),
      createDefaultColumn("organisationName", {
        accessorFn: row => getProjectUser(row).affiliation.organisation,
        cell: info =>
          renderOrganisationsNameCell(
            getProjectUser(info.row.original).affiliation.organisation
          ),
      }),
      createDefaultColumn("affiliationStatus", {
        accessorFn: row =>
          (row as CustodianProjectUser)?.project_has_user?.affiliation
            ?.model_state?.state?.slug,
        cell: renderStatusCell,
      }),
      createDefaultColumn("status", {
        accessorFn: row =>
          (row as CustodianProjectUser)?.model_state?.state?.slug,
        cell: renderStatusCell,
      }),
    ];

    return filterColumns(initialColumns, includeColumns, extraColumns || []);
  }, [includeColumns, extraColumns, namePath, createDefaultColumn]);

  return <Table columns={columns} isPaginated {...restProps} />;
}
