"use client";

import { formatDisplayLongDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/Table";
import useColumns from "../../hooks/useColumns";
import { Email, PendingInvite } from "../../types/application";
import { ModuleTables } from "../../types/modules";
import { renderRegistered } from "../../utils/cells";
import { filterColumns } from "../../utils/table";

export type EmailsTableColumns = "to" | "subject" | "dateTried" | "status";

export type EmailsTableProps = ModuleTables<Email, EmailsTableColumns>;

export default function EmailsTable({
  extraColumns,
  includeColumns = ["to", "subject", "dateTried", "status"],
  data,
  t,
  ...restProps
}: EmailsTableProps) {
  const { createDefaultColumn } = useColumns<Email>({
    t,
  });

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<Email>[] = [
      createDefaultColumn("to", {
        accessorKey: "to",
      }),
      createDefaultColumn("subject", {
        accessorKey: "subject",
      }),
      createDefaultColumn("dateTried", {
        accessorKey: "updated_at",
        cell: info => formatDisplayLongDate(info.getValue()),
      }),
      createDefaultColumn("status", {
        accessorKey: "status",
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
