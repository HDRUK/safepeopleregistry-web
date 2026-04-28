import { DndItems, DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMemo, useRef } from "react";
import {
  findContainer,
  findItem,
  findItemIndex,
  pruneItem,
} from "../../utils/dnd";

export interface UseDroppableSortItemsProps<T> {
  onDragStart?: (e: DragStartEvent, data: DragUpdateEventArgs<T>) => void;
  onDragEnd?: (e: DragEndEvent, data: DragUpdateEventArgs<T>) => void;
  onDragOver?: (e: DragOverEvent, data: DragUpdateEventArgs<T>) => void;
  onDragUpdate?: (e: DragUpdateEvent, data: DragUpdateEventArgs<T>) => void;
  onMove?: (e: DragUpdateEvent, data: DragUpdateEventArgs<T>) => void;
}

export interface UseDroppableSortItemsFnOptions<T> {
  setState: (state: DndItems<T>) => void;
  isTransitionAllowed?: (
    status: UniqueIdentifier | undefined,
    transitionStatus: UniqueIdentifier | undefined
  ) => boolean;
}

export interface UseDroppableSortItemsMoveOptions<
  T,
> extends UseDroppableSortItemsFnOptions<T> {
  containerId: UniqueIdentifier;
  item: T;
  items: DndItems<T>;
  isError?: boolean;
}

export default function useDroppableSortItems<T>({
  onDragEnd,
  onDragOver,
  onDragUpdate,
  onDragStart,
  onMove,
}: UseDroppableSortItemsProps<T>) {
  const initialArgs = useRef<{
    item: T;
    itemIndex: number;
    containerId: UniqueIdentifier;
  }>();

  const getInitialState = (items: DndItems<T>) => {
    const state = pruneItem(initialArgs.current?.item.id, items) as DndItems<T>;

    const initialContainerItems = [
      ...items[initialArgs.current?.containerId],
      initialArgs.current?.item,
    ];

    return {
      ...state,
      [initialArgs.current?.containerId]: arrayMove(
        initialContainerItems,
        initialContainerItems.length - 1,
        initialArgs.current?.itemIndex
      ),
    };
  };

  const handleDragSortEnd = (
    e: DragEndEvent,
    items: DndItems<T>,
    options: UseDroppableSortItemsFnOptions<T>
  ) => {
    const { over, active, collisions } = e;
    const { setState, isTransitionAllowed } = options;

    if (!collisions?.length) {
      const state = getInitialState(items);

      setState(state);
      onDragEnd?.(e, {
        initial: initialArgs.current,
        state,
      });
    }

    if (!over?.id) return;

    const overContainer = findContainer(over.id, items);
    const activeContainer = findContainer(active.id, items);

    if (overContainer && activeContainer && over?.id) {
      const activeIndex = findItemIndex(activeContainer, active.id, items);
      const activeItem = findItem(active.id, items);
      const overIndex = findItemIndex(overContainer, over.id, items);

      if (
        isTransitionAllowed?.(initialArgs.current?.containerId, overContainer)
      ) {
        const state = {
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        } as DndItems<T>;

        setState(state);

        const eventArgs = {
          containerId: overContainer,
          item: activeItem,
          itemIndex: overIndex,
          state,
          initial: initialArgs.current,
        };

        onDragUpdate?.(e, eventArgs);
        onDragEnd?.(e, eventArgs);
      } else {
        const state = getInitialState(items);

        setState(state);
        onDragEnd?.(e, {
          initial: initialArgs.current,
          state,
        });
      }
    }
  };

  const handleMove = (options: UseDroppableSortItemsMoveOptions<T>) => {
    const { containerId, item, items, isError, setState } = options;

    const prunedState = pruneItem(item.id, items) as DndItems<T>;

    const state = {
      ...prunedState,
      [containerId]: [
        ...prunedState[containerId],
        {
          ...item,
          isError,
        },
      ],
    } as DndItems<T>;

    setState(state);

    const eventArgs = {
      containerId,
      item,
      itemIndex: prunedState[containerId].length,
      state,
    };

    onMove?.({}, eventArgs);
  };

  const handleDragSort = (
    e: DragEndEvent,
    items: DndItems<T>,
    options: UseDroppableSortItemsFnOptions<T>
  ) => {
    const { over, active } = e;
    const overId = over?.id;
    const { setState, isTransitionAllowed } = options;

    if (overId == null || active.id in items) {
      return;
    }

    const overContainer = findContainer(overId, items);
    const activeContainer = findContainer(active.id, items);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      const activeItems = items[activeContainer];
      const overItems = items[overContainer];
      const overIndex = overItems.findIndex(({ id }) => id === overId);
      const activeIndex = activeItems.findIndex(({ id }) => id === active.id);
      const activeItem = findItem(active.id, items);

      let newIndex: number;

      if (overId in items) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      const state = {
        ...items,
        [activeContainer]: items[activeContainer].filter(
          item => item.id !== active.id
        ),
        [overContainer]: [
          ...items[overContainer].slice(0, newIndex),
          {
            ...items[activeContainer][activeIndex],
            isDroppable: isTransitionAllowed?.(
              initialArgs.current?.containerId,
              overContainer
            ),
          },
          ...items[overContainer].slice(newIndex, items[overContainer].length),
        ],
      } as DndItems<T>;

      setState(state);

      const eventArgs = {
        containerId: overContainer,
        item: activeItem,
        itemIndex: newIndex,
        state,
        initial: initialArgs.current,
      };

      onDragOver?.(e, eventArgs);
      // onDragUpdate?.(e, eventArgs);
    }
  };

  const handleDragSortStart = (e: DragStartEvent, items: DndItems<T>) => {
    const activeContainer = findContainer(e.active.id, items);
    const activeItem = findItem(e.active.id, items);
    const activeItemIndex = findItemIndex(activeContainer, e.active.id, items);

    initialArgs.current = {
      containerId: activeContainer,
      item: activeItem,
      itemIndex: activeItemIndex,
    };

    onDragStart?.(e, {
      initial: initialArgs.current,
    });

    return initialArgs.current;
  };

  return useMemo(
    () => ({
      handleDragSortEnd,
      handleDragSort,
      handleDragSortStart,
      handleMove,
    }),
    [onDragEnd, onDragOver]
  );
}
