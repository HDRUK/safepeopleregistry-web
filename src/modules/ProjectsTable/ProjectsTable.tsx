import useColumns from "@/hooks/useColumns";
import { ModuleTables } from "@/types/modules";
import { getSponsorshipStatus } from "@/utils/application";
import { formatDisplayLongDate } from "@/utils/date";
import { filterColumns } from "@/utils/table";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import ChipStatus from "../../components/ChipStatus";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/Table";
import { EntityType } from "../../types/api";
import {
  Custodian,
  Organisation,
  ResearcherProject,
  User,
} from "../../types/application";
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
  | "sponsorshipStatus"
  | "validationStatus"
  | "uniqueId"
  | "statusChanged";

export type ProjectsTableProps = ModuleTables<
  ResearcherProject,
  ProjectsTableColumns
> & {
  variant: EntityType;
  entity?: Custodian | Organisation | User;
};

export default function ProjectsTable({
  t,
  variant,
  includeColumns = [
    "uniqueId",
    "title",
    "laySummary",
    "startDate",
    "endDate",
    "users",
    "organisations",
    "status",
    "organisationStatus",
    "sponsorshipStatus",
    "validationStatus",
    "statusChanged",
  ],
  extraColumns,
  entity,
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
      createDefaultColumn("uniqueId", {
        accessorKey: "unique_id",
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
            createDefaultColumn("organisations", {
              cell: info => renderOrganisationsNameCell(info.getValue()),
            }),
          ]
        : []),
      ...(variant === EntityType.ORGANISATION
        ? [
            createDefaultColumn("organisationStatus", {
              accessorKey: "custodian_has_project_organisation",
              cell: renderStatus,
            }),
            createDefaultColumn("sponsorshipStatus", {
              accessorKey: "custodian_has_project_sponsorships",
              cell: info => {
                return (
                  <ChipStatus
                    status={getSponsorshipStatus(
                      entity as Organisation,
                      info.row.original
                    )}
                  />
                );
              },
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
      createDefaultColumn("status", {
        cell: info => (
          <ChipStatus status={info.row.original.model_state?.state.slug} />
        ),
      }),
      createDefaultColumn("statusChanged", {
        cell: info =>
          formatDisplayLongDate(info.row.original.model_state?.updated_at),
      }),
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
