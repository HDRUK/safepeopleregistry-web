import useColumns from "@/hooks/useColumns";
import { ModuleTables } from "@/types/modules";
import { formatDisplayLongDate } from "@/utils/date";
import { filterColumns } from "@/utils/table";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import ChipStatus from "../../components/ChipStatus";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/Table";
import { EntityType } from "../../types/api";
import { ResearcherProject } from "../../types/application";
import {
  renderOrganisationsNameCell,
  renderProjectNameCell,
} from "../../utils/cells";

export type ProjectsTableColumns =
  | "title"
  | "laySummary"
  | "startDate"
  | "endDate"
  | "users"
  | "organisations"
  | "status"
  | "organisationStatus"
  | "validationStatus";

export type ProjectsTableProps = ModuleTables<
  ResearcherProject,
  ProjectsTableColumns
> & {
  variant: EntityType;
};

export default function ProjectsTable({
  t,
  variant,
  includeColumns = [
    "title",
    "laySummary",
    "startDate",
    "endDate",
    "users",
    "organisations",
    "status",
    "organisationStatus",
    "validationStatus",
  ],
  extraColumns,
  ...restProps
}: ProjectsTableProps) {
  const { createDefaultColumn } = useColumns<ResearcherProject>({
    t,
  });

  const renderStatus = (info: CellContext<ResearcherProject, unknown>) => {
    const validationState = info.getValue();

    return <ChipStatus status={validationState?.[0]?.model_state.state.slug} />;
  };

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<ResearcherProject>[] = [
      createDefaultColumn("title", {
        cell: info => {
          return renderProjectNameCell(info);
        },
      }),
      createDefaultColumn("laySummary", {
        accessorKey: "lay_summary",
      }),
      createDefaultColumn("startDate", {
        accessorKey: "start_date",
        cell: info => formatDisplayLongDate(info.getValue() as string),
        minSize: 160,
      }),
      createDefaultColumn("endDate", {
        accessorKey: "end_date",
        cell: info => formatDisplayLongDate(info.getValue() as string),
        minSize: 160,
      }),
      ...(variant === EntityType.CUSTODIAN
        ? [
            createDefaultColumn("users", {
              accessorKey: "project_users_count",
              minSize: 50,
            }),
          ]
        : []),
      createDefaultColumn("organisations", {
        cell: info => renderOrganisationsNameCell(info.getValue()),
      }),
      createDefaultColumn("status", {
        cell: info => (
          <ChipStatus status={info.row.original.model_state?.state.slug} />
        ),
      }),
      ...(variant === EntityType.ORGANISATION
        ? [
            createDefaultColumn("organisationStatus", {
              accessorKey: "custodian_has_project_organisation",
              cell: renderStatus,
            }),
          ]
        : []),
      ...(variant === EntityType.USER
        ? [
            {
              accessorKey: "custodian_has_project_user",
              header: t("validationStatus"),
              cell: renderStatus,
            },
          ]
        : []),
    ];

    return filterColumns(initialColumns, includeColumns, extraColumns || []);
  }, [includeColumns, extraColumns, t, variant]);

  return (
    <Table
      noResultsMessage={t("noResultsProjects")}
      errorMessage={<ErrorMessage t={t} tKey="errorResultsProjects" />}
      columns={columns}
      isPaginated
      {...restProps}
    />
  );
}
