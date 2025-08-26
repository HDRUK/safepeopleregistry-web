"use client";

import KanbanBoardOrganisationsCard, {
  KanbanBoardOrganisationsCardProps,
} from "@/modules/KanbanBoard/KanbanBoardOrganisationsCard";
import { DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { STATUS_ORDER_MAP } from "@/consts/status";
import KanbanBoard, {
  KanbanBoardEntityProps,
  KanbanBoardHelperProps,
} from "../../modules/KanbanBoard";
import { CustodianProjectOrganisation } from "../../types/application";

const NAMESPACE_TRANSLATION = "Application.Status";

type ProjectOrganisationsBoardProps<T = CustodianProjectOrganisation> =
  KanbanBoardEntityProps<T>;

export default function ProjectOrganisationsBoard({
  itemsByTransitions,
  onMove,
  routes,
  updateQueryState,
  options,
  actions,
}: ProjectOrganisationsBoardProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const cardComponent = useCallback(
    (props: KanbanBoardOrganisationsCardProps) => {
      return <KanbanBoardOrganisationsCard {...props} routes={routes} />;
    },
    []
  );

  const cardActionsComponent = useCallback(
    (props: KanbanBoardHelperProps<CustodianProjectOrganisation>) => {
      return props.data && actions && actions(props);
    },
    []
  );

  const handleMove = useCallback(
    (
      _: DragUpdateEvent,
      data: DragUpdateEventArgs<CustodianProjectOrganisation>
    ) => {
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
    <KanbanBoard<CustodianProjectOrganisation>
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
