import { Link as MuiLink } from "@mui/material";
import { Link } from "@/i18n/routing";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Charity } from "../../types/application";
import Table from "../../components/Table";

export interface CharitiesTableProps {
  charitiesData: Charity[];
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Charities";

const renderWebsiteCell = (href: string) => (
  <MuiLink component={Link} href={href} target="_blank">
    {href}
  </MuiLink>
);

export default function CharitiesTable({
  charitiesData = [],
  tKey = NAMESPACE_TRANSLATION,
}: CharitiesTableProps) {
  const t = useTranslations(tKey);

  const columns: ColumnDef<Charity>[] = useMemo(
    () => [
      {
        accessorKey: "registration_id",
        header: t("registrationId"),
      },
      {
        accessorKey: "name",
        header: t("name"),
      },
      {
        accessorKey: "website",
        header: t("website"),
        cell: info => {
          const href = info.getValue() as string;
          if (!href) return "-";

          return renderWebsiteCell(href);
        },
      },
    ],
    [t]
  );

  return (
    <Table
      total={charitiesData.length}
      data={charitiesData}
      columns={columns}
      queryState={{}}
    />
  );
}
