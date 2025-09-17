"use client";

import useColumns from "@/hooks/useColumns";
import { formatShortDate } from "@/utils/date";
import { filterColumns } from "@/utils/table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/Table";
import { ResearcherAffiliation } from "../../types/application";
import { ModuleTables } from "../../types/modules";
import {
  renderAffiliationDateRangeCell,
  renderAffiliationRelationship,
  renderOrganisationsNameCell,
  renderStatusCell,
} from "../../utils/cells";

export type AffiliationsTableColumns =
  | "warning"
  | "date"
  | "relationship"
  | "organisationName"
  | "memberId"
  | "affiliationStatus"
  | "affiliationStatusChangedDate";

export type AffiliationsTableProps = ModuleTables<
  ResearcherAffiliation,
  AffiliationsTableColumns
>;

export default function AffiliationsTable({
  extraColumns,
  includeColumns = [
    "warning",
    "date",
    "relationship",
    "organisationName",
    "memberId",
    "affiliationStatus",
    "affiliationStatusChangedDate",
  ],
  data,
  t,
  ...restProps
}: AffiliationsTableProps) {
  const { createDefaultColumn } = useColumns<ResearcherAffiliation>({
    t,
  });

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<ResearcherAffiliation>[] = [
      createDefaultColumn("date", {
        cell: renderAffiliationDateRangeCell,
      }),
      createDefaultColumn("organisationName", {
        accessorKey: "organisation",
        cell: info => renderOrganisationsNameCell(info.getValue()),
      }),
      createDefaultColumn("relationship", {
        cell: info => renderAffiliationRelationship(info, t),
      }),
      createDefaultColumn("memberId", {
        accessorKey: "member_id",
      }),
      createDefaultColumn("affiliationStatus", {
        accessorKey: "model_state.state.slug",
        cell: renderStatusCell,
      }),
      createDefaultColumn("affiliationStatusChangedDate", {
        accessorKey: "model_state.state.updated_at",
        cell: info => formatShortDate(info.getValue()),
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
