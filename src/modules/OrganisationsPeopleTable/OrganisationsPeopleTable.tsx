import ChipStatus from "@/components/ChipStatus";
import Table from "@/components/Table";
import useColumns from "@/hooks/useColumns";
import { User } from "@/types/application";
import { ModuleTables } from "@/types/modules";
import { RouteConfig } from "@/types/router";
import { renderUserNameCell } from "@/utils/cells";
import { filterColumns } from "@/utils/table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export type OrganisationsPeopleTableColumns =
  | "name"
  | "affiliationEmail"
  | "affiliationStatus";

export interface OrganisationsPeopleTableProps extends ModuleTables<
  User,
  OrganisationsPeopleTableColumns
> {
  routes?: {
    name: RouteConfig;
  };
}

export default function OrganisationsPeopleTable({
  routes,
  t,
  extraColumns,
  includeColumns = ["name", "affiliationEmail", "affiliationStatus"],
  ...restProps
}: OrganisationsPeopleTableProps) {
  const { createDefaultColumn } = useColumns<User>({ t });

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<User>[] = [
      createDefaultColumn("name", {
        cell: info =>
          renderUserNameCell(info.row.original, routes?.name?.path, {
            userId: info.row.original.id,
          }),
      }),
      createDefaultColumn("affiliationEmail", {
        accessorKey: "registry.affiliations",
        cell: info => info.getValue()?.[0]?.email,
      }),
      createDefaultColumn("affiliationStatus", {
        accessorKey: "registry.affiliations",
        cell: info => (
          <ChipStatus status={info.getValue()?.[0]?.model_state?.state?.slug} />
        ),
      }),
    ];

    return filterColumns(initialColumns, includeColumns, extraColumns || []);
  }, [includeColumns, extraColumns, routes, t]);

  return <Table columns={columns} isPaginated {...restProps} />;
}
