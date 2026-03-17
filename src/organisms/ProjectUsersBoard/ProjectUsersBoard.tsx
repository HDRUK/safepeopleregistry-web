"use client";

import { useCallback, useMemo } from "react";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import KanbanBoardUsersCard, {
  KanbanBoardUsersCardProps,
} from "@/modules/KanbanBoard/KanbanBoardUsersCard";
import { DISABLED_USER_STATUS } from "@/consts/projects";
import { sortStatusArray } from "@/utils/application";
import KanbanBoard, {
  KanbanBoardEntityProps,
  KanbanBoardHelperProps,
} from "../../modules/KanbanBoard";
import { CustodianProjectUser } from "../../types/application";

const NAMESPACE_TRANSLATION = "Application.Status";

type ProjectUsersProps<T = CustodianProjectUser> = KanbanBoardEntityProps<T>;

export default function ProjectUsers({
  itemsByTransitions,
  onMove,
  routes,
  updateQueryState,
  options,
  actions,
  rollbackVersion,
}: ProjectUsersProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const cardComponent = useCallback((props: KanbanBoardUsersCardProps) => {
    return <KanbanBoardUsersCard {...props} routes={routes} />;
  }, []);

  const cardActionsComponent = useCallback(
    (props: KanbanBoardHelperProps<CustodianProjectUser>) => {
      return props.data && actions && actions(props);
    },
    []
  );

  const handleMove = useCallback(
    (_: DragUpdateEvent, data: DragUpdateEventArgs<CustodianProjectUser>) => {
      if (!data.item || !data.containerId) return;
      if (data.initial?.containerId === data.containerId) return;

      onMove(data.item.id, data.containerId as string);
    },
    [onMove]
  );

  function sortByStatus<T>(input: Record<string, T[]>): Record<string, T[]> {
    const sortedKeys = sortStatusArray(Object.keys(input));

    return Object.fromEntries(sortedKeys.map(key => [key, input[key]]));
  }

  const orderedItems = useMemo(
    () => sortByStatus(itemsByTransitions),
    [itemsByTransitions]
  );

  return (
    <KanbanBoard<CustodianProjectUser>
      t={t}
      cardActionsComponent={cardActionsComponent}
      cardComponent={cardComponent}
      initialData={orderedItems}
      strategy={rectSortingStrategy}
      onDragEnd={handleMove}
      onMove={handleMove}
      options={options}
      queryState={updateQueryState}
      disabledContainers={DISABLED_USER_STATUS}
      rollbackVersion={rollbackVersion}
    />
  );
}
