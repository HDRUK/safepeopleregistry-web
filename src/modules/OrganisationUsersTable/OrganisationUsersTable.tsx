import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import ChipStatus from "@/components/ChipStatus";
import useColumns from "@/hooks/useColumns";
import { ModuleTables } from "@/types/modules";
import { canRecordAffiliationEndDate } from "@/utils/affiliations";
import { formatShortDate } from "@/utils/date";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import { filterColumns } from "@/utils/table";
import { Box } from "@mui/system";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Table from "../../components/Table";
import Text from "../../components/Text";
import {
  ResearcherAffiliation,
  User,
  WithRoutes,
} from "../../types/application";
import { renderUserNameCell } from "../../utils/cells";

export type OrganisationUsersTableColumns =
  | "employeeName"
  | "emailAddress"
  | "affiliationStatus"
  | "endDate"
  | "inviteSent"
  | "actions";

export interface OrganisationUsersTableProps extends WithRoutes<
  ModuleTables<User, OrganisationUsersTableColumns>
> {
  onRecordLeaver: (user: User, affiliation: ResearcherAffiliation) => void;
}

export default function OrganisationUsersTable({
  t,
  routes,
  includeColumns = [
    "employeeName",
    "emailAddress",
    "affiliationStatus",
    "endDate",
    "inviteSent",
    "actions",
  ],
  extraColumns,
  onRecordLeaver,
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

  // The API returns each user with their latest affiliation to this Organisation.
  const renderActions = (info: CellContext<User, unknown>) => {
    const affiliation = info.row.original.registry.affiliations?.[0];

    if (!affiliation || !canRecordAffiliationEndDate(affiliation)) return null;

    return (
      <ActionMenu>
        <ActionMenuItem
          onClick={() => onRecordLeaver(info.row.original, affiliation)}>
          <Text startIcon={<EventBusyOutlinedIcon />}>
            {t("recordLeaverButton")}
          </Text>
        </ActionMenuItem>
      </ActionMenu>
    );
  };

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
      createDefaultColumn("endDate", {
        accessorKey: "registry.affiliations",
        cell: info =>
          formatShortDate(info.row.original.registry.affiliations?.[0]?.to),
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
