"use client";

import { FileType } from "@/consts/files";
import useColumns from "@/hooks/useColumns";
import {
  renderFileDownloadLink,
  renderOrganisationValidatedCell,
  renderUserNameCell,
} from "@/utils/cells";
import { formatDisplayLongDate } from "@/utils/date";
import { filterColumns } from "@/utils/table";
import { Link } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/Table";
import { Organisation } from "../../types/application";
import { ModuleTables } from "../../types/modules";

export type OrganisationsTableColumns =
  | "organisationName"
  | "systemApproved"
  | "systemApprovedAt"
  | "sroProfileLink"
  | "email"
  | "role"
  | "sroDocument";

export type OrganisationsTableProps = ModuleTables<
  Organisation,
  OrganisationsTableColumns
>;

export default function OrganisationsTable({
  extraColumns,
  includeColumns = [
    "organisationName",
    "systemApproved",
    "systemApprovedAt",
    "sroDocument",
    "sroProfileLink",
    "role",
    "email",
  ],
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
      createDefaultColumn("sroProfileLink", {
        cell: info => (
          <Link href={info.row.original.sro_profile_uri} target="_blank">
            {renderUserNameCell(info.row.original.sro_officer)}
          </Link>
        ),
      }),
      createDefaultColumn("email", {
        accessorKey: "sro_officer.email",
      }),
      createDefaultColumn("role", {
        accessorKey: "sro_officer.role",
      }),
      createDefaultColumn("sroDocument", {
        accessorKey: "files",
        cell: info =>
          renderFileDownloadLink(info.getValue(), FileType.DECLARATION_SRO),
      }),
      createDefaultColumn("systemApproved", {
        accessorKey: "system_approved",
        cell: renderOrganisationValidatedCell,
      }),
      createDefaultColumn("systemApprovedAt", {
        accessorKey: "system_approved_at",
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
