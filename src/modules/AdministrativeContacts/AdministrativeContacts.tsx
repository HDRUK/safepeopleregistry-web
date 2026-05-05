import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Table, { TableProps } from "../../components/Table";
import { CustodianUser } from "../../types/application";
import { renderUserNameCell } from "../../utils/cells";
import { formatDisplayLongDate } from "../../utils/date";
import { toCamelCase } from "../../utils/string";
import ChipStatus from "@/components/ChipStatus";

interface AdministrativeContactsProps extends TableProps<CustodianUser> {
  tKey?: string;
  additionalColumns?: ColumnDef<CustodianUser>[];
}

const NAMESPACE_TRANSLATION = "AdministrativeContacts";

export default function AdministrativeContacts({
  tKey = NAMESPACE_TRANSLATION,
  columns,
  additionalColumns = [],
  ...restProps
}: AdministrativeContactsProps) {
  const t = useTranslations(tKey);

  const defaultColumns: ColumnDef<CustodianUser>[] = [
    {
      accessorKey: "name",
      header: t("name"),
      cell: info => renderUserNameCell(info.row.original),
    },
    {
      accessorKey: "email",
      header: t("email"),
    },
    {
      accessorKey: "user_permissions",
      header: t("role"),
      cell: info => {
        return t(toCamelCase(info.getValue()?.[0]?.permission?.name));
      },
    },
    {
      accessorKey: "invite_status",
      header: t("accountStatus"),
      cell: info => (
        <ChipStatus status={(info.getValue() as string)?.toLowerCase()} />
      ),
    },
    {
      accessorKey: "created_at",
      header: t("createdAt"),
      cell: info => formatDisplayLongDate(info.getValue() as string),
      minSize: 160,
    },
    ...additionalColumns,
  ];

  return <Table columns={columns || defaultColumns} {...restProps} />;
}
