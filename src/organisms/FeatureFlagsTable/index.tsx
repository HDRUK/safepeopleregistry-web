"use client";

import useColumns from "@/hooks/useColumns";

import { filterColumns } from "@/utils/table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/Table";
import { FeatureFlags } from "../../types/features";
import { ModuleTables } from "../../types/modules";
import { formatDisplayLongDate } from "@/utils/date";

export type FeatureFlagTableColumns =
  | "name"
  | "description"
  | "scope"
  | "value"
  | "updated"
  | "created";

export type FeatureFlagTableProps = ModuleTables<
  FeatureFlags,
  FeatureFlagTableColumns
>;

export default function FeatureFlagTable({
  extraColumns,
  includeColumns = [
    "name",
    "description",
    "scope",
    "value",
    "updated",
    "created",
  ],
  data,
  t,
  ...restProps
}: FeatureFlagTableProps) {
  const { createDefaultColumn } = useColumns<FeatureFlags>({
    t,
  });

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<FeatureFlags>[] = [
      createDefaultColumn("name", {
        accessorKey: "name",
      }),
      createDefaultColumn("description", {
        accessorKey: "description",
      }),
      createDefaultColumn("scope", {
        accessorKey: "scope",
      }),
      createDefaultColumn("value", {
        accessorKey: "value",
      }),
      createDefaultColumn("updated", {
        accessorKey: "updated_at",
        cell: info => formatDisplayLongDate(info.getValue()),

      }),
      createDefaultColumn("created", {
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
