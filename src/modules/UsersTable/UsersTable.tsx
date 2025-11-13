"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/Table";
import useColumns from "../../hooks/useColumns";
import { PendingInvite, User } from "../../types/application";
import { ModuleTables } from "../../types/modules";
import { renderUserNameCell, renderRegistered } from "../../utils/cells";
import { filterColumns } from "../../utils/table";

export type UsersTableColumns = "name" | "email" | "status";

export type UsersTableProps = ModuleTables<PendingInvite, UsersTableColumns>;

export default function UsersTable({
  extraColumns,
  includeColumns = ["name", "email", "status"],
  data,
  t,
  ...restProps
}: UsersTableProps) {
  const { createDefaultColumn } = useColumns<PendingInvite>({
    t,
  });

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<PendingInvite>[] = [
      createDefaultColumn("name", {
        accessorKey: "user.name",
      }),
      createDefaultColumn("email", {
        accessorKey: "user.email",
      }),
      createDefaultColumn("status", {
        accessorKey: "user.unclaimed",
        cell: info => renderRegistered(info.getValue()),
      }),
    ];

    return filterColumns(initialColumns, includeColumns, extraColumns || []);
  }, [includeColumns, extraColumns]);

  return (
    <Table
      noResultsMessage={t("noResultsMessage")}
      errorMessage={<ErrorMessage t={t} tKey="errorMessage" />}
      data={data}
      columns={columns}
      isPaginated
      {...restProps}
    />
  );
}
