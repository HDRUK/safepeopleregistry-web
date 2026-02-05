"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { formatDisplayLongDate } from "@/utils/date";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/Table";
import useColumns from "../../hooks/useColumns";
import { PendingInvite } from "../../types/application";
import { ModuleTables } from "../../types/modules";
import { renderRegistered } from "../../utils/cells";
import { filterColumns } from "../../utils/table";

export type InvitesTableColumns = "name" | "email" | "inviteSentAt" | "status";

export type InvitesTableProps = ModuleTables<
  PendingInvite,
  InvitesTableColumns
>;

export default function InvitesTable({
  extraColumns,
  includeColumns = ["name", "email", "inviteSentAt", "status"],
  data,
  t,
  ...restProps
}: InvitesTableProps) {
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
      createDefaultColumn("inviteSentAt", {
        accessorKey: "invite_sent_at",
        cell: info => formatDisplayLongDate(info.getValue()),
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
