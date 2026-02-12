import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { ReactNode } from "react";
import DndItem from "../DndItem";

export interface DndSortableItemProps {
  children: ReactNode;
  id: UniqueIdentifier;
  index: number;
  disabled?: boolean;
  isDroppable?: boolean;
  isError?: boolean;
}

function DndSortableItem({
  disabled,
  isDroppable,
  isError,
  id,
  index,
  children,
}: DndSortableItemProps) {
  const { setNodeRef, listeners, isDragging, transform, transition } =
    useSortable({
      id,
    });

  return (
    <DndItem
      ref={disabled ? undefined : setNodeRef}
      dragging={isDragging}
      index={index}
      transition={transition}
      transform={transform}
      listeners={listeners}
      isDroppable={isDroppable !== false}
      isError={isError}
      disabled={disabled}>
      {children}
    </DndItem>
  );
}

export default DndSortableItem;
