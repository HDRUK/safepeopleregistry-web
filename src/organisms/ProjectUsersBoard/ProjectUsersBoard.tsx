"use client";

import KanbanBoardUsersCard, {
  KanbanBoardUsersCardProps,
} from "@/modules/KanbanBoard/KanbanBoardUsersCard";
import { DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { STATUS_ORDER_MAP } from "@/consts/status";
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

      onMove(data.item.id, data.containerId as string);
    },
    []
  );

  function sortByStatus<T>(
    input: Record<string | string, T[]>
  ): Record<string, T[]> {
    return Object.fromEntries(
      Object.entries(input).sort(
        ([a], [b]) =>
          (STATUS_ORDER_MAP.get(a) ?? Number.MAX_SAFE_INTEGER) -
          (STATUS_ORDER_MAP.get(b) ?? Number.MAX_SAFE_INTEGER)
      )
    );
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
    />
  );
}
