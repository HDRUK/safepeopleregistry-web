import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import ChipStatus from "@/components/ChipStatus";
import useColumns from "@/hooks/useColumns";
import { ModuleTables } from "@/types/modules";
import { filterColumns } from "@/utils/table";
import { Box } from "@mui/system";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { formatShortDate } from "@/utils/date";
import Table from "../../components/Table";
import Text from "../../components/Text";
import { TrashIcon } from "../../consts/icons";
import { User, WithRoutes } from "../../types/application";
import { renderUserNameCell } from "../../utils/cells";

export type OrganisationUsersTableColumns =
  | "employeeName"
  | "emailAddress"
  | "affiliationStatus"
  | "inviteSent"
  | "actions";

export interface OrganisationUsersTableProps
  extends WithRoutes<ModuleTables<User, OrganisationUsersTableColumns>> {
  onRemove: (id: number) => void;
}

export default function OrganisationUsersTable({
  t,
  routes,
  includeColumns = [
    "employeeName",
    "emailAddress",
    "affiliationStatus",
    "inviteSent",
    "actions",
  ],
  extraColumns,
  onRemove,
  ...restProps
}: OrganisationUsersTableProps) {
  const { createDefaultColumn } = useColumns<User>({
    t,
  });

  const renderAffiliationStatus = (info: CellContext<User, unknown>) => (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ChipStatus
        status={
          info.row.original.registry.affiliations?.[0]?.model_state?.state.slug
        }
      />
    </Box>
  );

  const renderActions = (info: CellContext<User, unknown>) => (
    <ActionMenu>
      <ActionMenuItem
        onClick={() =>
          onRemove(info.row.original.registry.affiliations?.[0].id)
        }>
        <Text startIcon={<TrashIcon />}>{t("removeAffiliationButton")}</Text>
      </ActionMenuItem>
    </ActionMenu>
  );

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<User>[] = [
      createDefaultColumn("employeeName", {
        accessorKey: "name",
        cell: info =>
          renderUserNameCell(info.row.original, routes.name?.path, {
            userId: info.row.original.id,
          }),
      }),
      createDefaultColumn("emailAddress", {
        accessorKey: "email",
        cell: info => info.row.original.registry.affiliations?.[0]?.email,
      }),
      createDefaultColumn("affiliationStatus", {
        accessorKey: "registry.affiliations",
        cell: renderAffiliationStatus,
      }),
      createDefaultColumn("inviteSent", {
        accessorKey: "created_at",
        cell: info => formatShortDate(info.getValue() as string),
      }),
      createDefaultColumn("actions", {
        accessorKey: "actions",
        cell: renderActions,
      }),
    ];

    return filterColumns(initialColumns, includeColumns, extraColumns || []);
  }, [includeColumns, extraColumns, routes, t]);

  return <Table columns={columns} isPaginated {...restProps} />;
}
