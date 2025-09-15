import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box } from "@mui/material";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/Table";
import useColumns from "../../hooks/useColumns";
import { User } from "../../types/application";
import { ModuleTables } from "../../types/modules";
import { renderUserNameCell } from "../../utils/cells";
import { formatShortDate } from "../../utils/date";
import { filterColumns } from "../../utils/table";

export type DelegatesTableColumns =
  | "name"
  | "department"
  | "invitedOn"
  | "accountCreated";

export type DelegatesTableProps = ModuleTables<User, DelegatesTableColumns>;

const DelegatesTable = ({
  t,
  includeColumns = ["name", "department", "invitedOn", "accountCreated"],
  extraColumns,
  ...restProps
}: DelegatesTableProps) => {
  const { createDefaultColumn } = useColumns<User>({
    t,
  });

  const renderAccountCreated = (info: CellContext<User, unknown>) =>
    info.getValue() ? null : (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TaskAltIcon color="success" />
      </Box>
    );

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<User>[] = [
      createDefaultColumn("name", {
        cell: info => renderUserNameCell(info.row.original),
      }),
      createDefaultColumn("department", {
        cell: info => info.row.original.departments?.[0]?.name,
      }),
      createDefaultColumn("invitedOn", {
        accessorKey: "created_at",
        cell: info => formatShortDate(info.getValue() as string),
      }),
      createDefaultColumn("accountCreated", {
        accessorKey: "unclaimed",
        cell: renderAccountCreated,
      }),
    ];

    return filterColumns(initialColumns, includeColumns, extraColumns || []);
  }, [includeColumns, extraColumns]);

  return (
    <Table
      noResultsMessage={t("noResultsMessage")}
      errorMessage={<ErrorMessage t={t} tKey="errorMessage" />}
      columns={columns}
      isPaginated
      {...restProps}
    />
  );
};

export default DelegatesTable;
