"use client";

import { Status } from "@/consts/application";
import { PaginatedQueryHelpers } from "@/hooks/usePaginatedQuery";
import { KanbanBoardEntityProps } from "@/modules/KanbanBoard";
import ProjectOrganisationsTable from "@/modules/ProjectOrganisationsTable";
import { EntityType } from "@/types/api";
import { CustodianProjectOrganisation, WithRoutes } from "@/types/application";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_PROJECT_USERS = "Projects.Organisations";

type ProjectOrganisationsListProps<T = CustodianProjectOrganisation> =
  WithRoutes<
    KanbanBoardEntityProps<T> & {
      variant: EntityType;
    } & PaginatedQueryHelpers & {
        data: CustodianProjectOrganisation[];
      }
  >;

export default function ProjectOrganisationsList({
  variant,
  data,
  actions,
  ...restProps
}: ProjectOrganisationsListProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_USERS);

  const renderActionMenuCell = (
    info: CellContext<CustodianProjectOrganisation, unknown>
  ) => {
    return actions?.({
      data: info.row.original,
      disabled: [Status.INVITED].includes(
        info.row.original.model_state?.state.slug
      ),
    });
  };

  const extraColumns: ColumnDef<CustodianProjectOrganisation>[] =
    variant === EntityType.CUSTODIAN && actions
      ? [
          {
            header: t("actions"),
            cell: renderActionMenuCell,
          },
        ]
      : [];

  return (
    <ProjectOrganisationsTable
      {...restProps}
      data={data}
      extraColumns={extraColumns}
      t={t}
    />
  );
}
