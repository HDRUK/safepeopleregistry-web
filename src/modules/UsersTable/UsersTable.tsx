"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/Table";
import useColumns from "../../hooks/useColumns";
import { User } from "../../types/application";
import { ModuleTables } from "../../types/modules";
import { renderUserNameCell, renderRegistered } from "../../utils/cells";
import { filterColumns } from "../../utils/table";

export type UsersTableColumns = "name" | "email" | "status";

export type UsersTableProps = ModuleTables<User, UsersTableColumns>;

export default function UsersTable({
  extraColumns,
  includeColumns = ["name", "email", "status"],
  data,
  t,
  ...restProps
}: UsersTableProps) {
  const { createDefaultColumn } = useColumns<User>({
    t,
  });

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<User>[] = [
      createDefaultColumn("name", {
        cell: info => renderUserNameCell(info.row.original),
      }),
      createDefaultColumn("email", {
        accessorKey: "email",
      }),
      createDefaultColumn("status", {
        accessorKey: "unclaimed",
        cell: info => renderRegistered(info),
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
