"use client";

import ChipStatus from "@/components/ChipStatus";
import { formatDisplayLongDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/Table";
import useColumns from "../../hooks/useColumns";
import { User } from "../../types/application";
import { ModuleTables } from "../../types/modules";
import { filterColumns } from "../../utils/table";

export type SuperAdminTableColumns = "name" | "email" | "status" | "createdAt";

export type SuperAdminTableProps = ModuleTables<User, SuperAdminTableColumns>;

export default function SuperAdminTable({
  extraColumns,
  includeColumns = ["name", "email", "status", "createdAt"],
  data,
  t,
  ...restProps
}: SuperAdminTableProps) {
  const { createDefaultColumn } = useColumns<User>({ t });

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<User>[] = [
      createDefaultColumn("name", {
        accessorKey: "name",
        cell: info =>
          `${info.row.original.first_name} ${info.row.original.last_name}`,
      }),
      createDefaultColumn("email", {
        accessorKey: "email",
      }),
      createDefaultColumn("status", {
        accessorKey: "status",
        cell: info => <ChipStatus status={info.row.original.status} />,
      }),
      createDefaultColumn("createdAt", {
        accessorKey: "created_at",
        cell: info => formatDisplayLongDate(info.getValue()),
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
