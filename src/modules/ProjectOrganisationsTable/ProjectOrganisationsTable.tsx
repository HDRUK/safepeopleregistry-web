import useColumns from "@/hooks/useColumns";
import { ModuleTables } from "@/types/modules";
import { filterColumns } from "@/utils/table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Table from "../../components/Table";
import {
  CustodianProjectOrganisation,
  WithRoutes,
} from "../../types/application";
import { renderLinkNameCell, renderStatusCell } from "../../utils/cells";

export type ProjectOrganisationsTableColumns =
  | "organisationName"
  | "projectName"
  | "organisationSroOfficer"
  | "status";

export type ProjectOrganisationsTableProps = WithRoutes<
  ModuleTables<CustodianProjectOrganisation, ProjectOrganisationsTableColumns>
>;

export default function ProjectOrganisationsTable({
  t,
  routes,
  includeColumns = [
    "organisationName",
    "projectName",
    "organisationSroOfficer",
    "status",
  ],
  extraColumns,
  ...restProps
}: ProjectOrganisationsTableProps) {
  const { createDefaultColumn } = useColumns<CustodianProjectOrganisation>({
    t,
  });

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<CustodianProjectOrganisation>[] = [
      createDefaultColumn("organisationName", {
        accessorKey: "project_organisation",
        cell: info =>
          renderLinkNameCell(
            info.getValue().organisation.organisation_name,
            routes?.name?.path,
            {
              projectOrganisationId:
                info.row.original.project_has_organisation_id,
            }
          ),
      }),
      createDefaultColumn("projectName", {
        accessorKey: "project_organisation.project.title",
      }),
      createDefaultColumn("organisationSroOfficer", {
        accessorKey: "project_organisation.organisation.sro_officer.name",
      }),
      createDefaultColumn("status", {
        accessorKey: "model_state.state.slug",
        cell: renderStatusCell,
      }),
    ];

    return filterColumns(initialColumns, includeColumns, extraColumns || []);
  }, [includeColumns, extraColumns, routes, t]);

  return <Table columns={columns} isPaginated {...restProps} />;
}
