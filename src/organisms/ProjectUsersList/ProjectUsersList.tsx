"use client";

import { PaginatedQueryHelpers } from "@/hooks/usePaginatedQuery";
import { KanbanBoardEntityProps } from "@/modules/KanbanBoard";
import ProjectUsersTable from "@/modules/ProjectUsersTable";
import { EntityType } from "@/types/api";
import {
  CustodianProjectUser,
  ProjectUser,
  WithRoutes,
} from "@/types/application";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_PROJECT_USERS = "Projects.Users";

type ProjectUsersListProps<T = CustodianProjectUser | ProjectUser> = WithRoutes<
  {
    variant: EntityType;
  } & PaginatedQueryHelpers & {
      data: CustodianProjectUser[] | ProjectUser[];
    } & KanbanBoardEntityProps<T>
>;

export default function ProjectUsersList({
  variant,
  data,
  actions,
  ...restProps
}: ProjectUsersListProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_USERS);

  const renderActionMenuCell = (
    info: CellContext<CustodianProjectUser, unknown>
  ) => {
    return actions?.({ data: info.row.original });
  };

  const extraColumns: ColumnDef<CustodianProjectUser>[] =
    variant === EntityType.CUSTODIAN && actions
      ? [
          {
            header: t("actions"),
            cell: renderActionMenuCell,
          },
        ]
      : [];

  return (
    <ProjectUsersTable
      data={data}
      {...restProps}
      extraColumns={[...(restProps?.extraColumns || []), ...extraColumns]}
      t={t}
    />
  );
}
