"use client";

import ChipStatus from "@/components/ChipStatus";
import { Status } from "@/consts/application";
import { formatDisplayLongDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/Table";
import useColumns from "../../hooks/useColumns";
import { Email } from "../../types/application";
import { ModuleTables } from "../../types/modules";
import { filterColumns } from "../../utils/table";

export type EmailsTableColumns = "to" | "subject" | "dateTried" | "jobStatus";

export type EmailsTableProps = ModuleTables<Email, EmailsTableColumns>;

export default function EmailsTable({
  extraColumns,
  includeColumns = ["to", "subject", "dateTried", "jobStatus"],
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
      createDefaultColumn("jobStatus", {
        accessorKey: "job_status",
        cell: info => (
          <ChipStatus
            status={
              info.getValue() ? Status.EMAIL_SUCCESSFUL : Status.EMAIL_FAILED
            }
          />
        ),
      }),
    ];

    return filterColumns(initialColumns, includeColumns, extraColumns || []);
  }, [includeColumns, extraColumns]);

  console.log("columns", columns);

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
