"use client";

import useColumns from "@/hooks/useColumns";
import {
  renderFileDownloadLink,
  renderOrganisationValidatedCell,
} from "@/utils/cells";
import { filterColumns } from "@/utils/table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/Table";
import { Organisation } from "../../types/application";
import { ModuleTables } from "../../types/modules";
import { FileType } from "@/consts/files";

export type OrganisationsTableColumns =
  | "organisationName"
  | "systemApproved"
  | "sroDocument";

export type OrganisationsTableProps = ModuleTables<
  Organisation,
  OrganisationsTableColumns
>;

export default function OrganisationsTable({
  extraColumns,
  includeColumns = ["organisationName", "systemApproved", "sroDocument"],
  data,
  t,
  ...restProps
}: OrganisationsTableProps) {
  const { createDefaultColumn } = useColumns<Organisation>({
    t,
  });

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<Organisation>[] = [
      createDefaultColumn("organisationName", {
        accessorKey: "organisation_name",
      }),
      createDefaultColumn("sroDocument", {
        accessorKey: "files",
        cell: info =>
          renderFileDownloadLink(
            info.getValue(),
            FileType.DECLARATION_SRO_DECLARATION
          ),
      }),
      createDefaultColumn("systemApproved", {
        accessorKey: "system_approved",
        cell: renderOrganisationValidatedCell,
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
