import { DragEndEvent, DragOverEvent, UniqueIdentifier } from "@dnd-kit/core";

export type DndData<T> = T & {
  id: UniqueIdentifier;
  isDroppable?: boolean;
  isError?: boolean;
};

export type DndItems<T> = Record<UniqueIdentifier, DndData<T>[]>;

export type DragUpdateEvent = DragEndEvent | DragOverEvent;

export type DragUpdateEventArgsInitial<T> = {
  containerId: UniqueIdentifier;
  item: T | undefined;
  itemIndex: number;
};

export type DragUpdateEventArgs<T> = {
  containerId?: UniqueIdentifier;
  item?: T | undefined;
  itemIndex?: number;
  state?: DndItems<T>;
  initial: DragUpdateEventArgsInitial<T> | undefined;
};
