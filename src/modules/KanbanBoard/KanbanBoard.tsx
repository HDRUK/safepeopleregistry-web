import {
  CancelDrop,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  MeasuringStrategy,
  Modifiers,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import {
  SortableContext,
  SortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ComponentType, useEffect, useRef, useState } from "react";
import { createPortal, unstable_batchedUpdates } from "react-dom";
import { useDebouncedCallback } from "use-debounce";

import DndItem from "../../components/DndItem";
import useDroppableSortItems, {
  UseDroppableSortItemsFnOptions,
  UseDroppableSortItemsProps,
} from "../../hooks/useDroppableSortItems";
import {
  WithRoutes,
  WithStateWorkflow,
  WithTranslations,
} from "../../types/application";

import DndDroppableContainer from "../../components/DndDroppableContainer";
import DndSortableItem from "../../components/DndSortableItem";
import { dndDragRotate } from "../../consts/styles";
import { DndItems, DragUpdateEventArgsInitial } from "../../types/dnd";
import { QueryState, WithQueryState } from "../../types/form";
import {
  filterDuplicates,
  findDroppables,
  findItem,
  findItemIndex,
} from "../../utils/dnd";
import KanbanBoardColumn from "./KanbanBoardColumn";
import KanbanBoardColumns from "./KanbanBoardColumns";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export type KanbanBoardEntityProps<T> = WithRoutes<{
  itemsByTransitions: DndItems<T>;
  onMove: (id: number, status: string) => void;
  onDragEnd: (id: number, status: string) => void;
  updateQueryState: QueryState;
  actions?: (props: KanbanBoardHelperProps<T>) => React.ReactNode;
  options?: Partial<UseDroppableSortItemsFnOptions<T>>;
}>;

export interface KanbanBoardProps<T>
  extends WithQueryState<
    WithStateWorkflow<WithTranslations<UseDroppableSortItemsProps<T>>>
  > {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  initialData: DndItems<T>;
  cardComponent: ComponentType<T>;
  cardActionsComponent?: ComponentType<KanbanBoardHelperProps<T>>;
  options: Partial<UseDroppableSortItemsFnOptions<T>> | undefined;
  isDisabledItem?: (data: T) => boolean;
  isDroppableItem?: (data: T) => boolean;
}

export interface KanbanBoardHelperProps<T> {
  data?: T;
  allowedTransitions: string[];
  onMoveClick: (id: number, status: string) => void;
}

export default function KanbanBoard<T>({
  adjustScale = false,
  cancelDrop,
  initialData,
  modifiers,
  queryState,
  strategy = verticalListSortingStrategy,
  onDragEnd,
  onDragOver,
  onDragUpdate,
  onMove,
  t,
  options,
  isDisabledItem,
  isDroppableItem,
  ...restProps
}: KanbanBoardProps<T>) {
  const { handleDragSort, handleDragSortEnd, handleDragSortStart, handleMove } =
    useDroppableSortItems<T>({
      onDragEnd,
      onDragOver,
      onDragUpdate,
      onMove,
    });
  const [items, setItems] = useState<DndItems<T>>(initialData);
  const [containers] = useState(Object.keys(items) as UniqueIdentifier[]);
  const [activeData, setActiveData] =
    useState<DragUpdateEventArgsInitial<T> | null>(null);
  const initialArgs = useRef<DragUpdateEventArgsInitial<T> | null>();
  const { isError } = queryState;

  const activeId = activeData?.item.id;

  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  const [clonedItems, setClonedItems] = useState<DndItems<T> | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const renderSortableItemDragOverlay = (id: UniqueIdentifier) => {
    const data = findItem(id, items);

    return (
      data && (
        <DndItem
          dragOverlay
          isDroppable={data.isDroppable || isDroppableItem?.(data)}>
          <restProps.cardComponent
            data={data}
            sx={{
              width: "220px",
              backgroundColor: "neutralPink.main",
              ...dndDragRotate,
            }}
          />
        </DndItem>
      )
    );
  };

  const handleDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems);
    }

    setActiveData(null);
    setClonedItems(null);
  };

  const getAllowedColumns = (containerId: UniqueIdentifier) => {
    return Object.keys(items).filter(key =>
      options?.isTransitionAllowed?.(key, containerId)
    );
  };

  const handleDragEnd = (e: DragEndEvent) => {
    unstable_batchedUpdates(() => {
      handleDragSortEnd(e, items, {
        ...options,
        setState: (state: DndItems<T>) => {
          setItems(items => {
            return filterDuplicates({
              ...items,
              ...state,
            });
          });
        },
      });

      setActiveData(null);
    });
  };

  const handleDragOver = (e: DragOverEvent) => {
    handleDragSort(e, items, {
      ...options,
      setState: (state: DndItems<T>) => {
        setItems(prevState => {
          return filterDuplicates({
            ...prevState,
            ...state,
          });
        });

        recentlyMovedToNewContainer.current = true;
      },
    });
  };

  const handleMoveClick = (
    item: T,
    moveToId: UniqueIdentifier,
    isError?: boolean
  ) => {
    handleMove({
      containerId: moveToId,
      item,
      items,
      isError,
      setState: (state: DndItems<T>) => {
        setItems(prevState => {
          return {
            ...prevState,
            ...state,
          };
        });
      },
    });
  };

  const handleDragStart = (e: DragOverEvent) => {
    const data = handleDragSortStart(e, items);

    initialArgs.current = data;

    setActiveData(data);
    setClonedItems(items);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  useEffect(() => {
    if (isError && initialArgs.current) {
      handleMoveClick(
        initialArgs.current.item,
        initialArgs.current.containerId,
        isError
      );

      queryState.reset?.();
    }
  }, [isError]);

  useEffect(() => {
    setItems(initialData);
  }, [initialData]);

  const throttledDragOver = useDebouncedCallback(handleDragOver, 100);

  return (
    <DndContext
      sensors={sensors}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={handleDragStart}
      onDragOver={(e: DragOverEvent) => {
        throttledDragOver(e);
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      cancelDrop={cancelDrop}
      modifiers={modifiers}>
      <KanbanBoardColumns sx={{ maxHeight: "90vh" }}>
        {containers.map(containerId => (
          <DndDroppableContainer key={containerId} id={containerId}>
            <SortableContext items={items[containerId]} strategy={strategy}>
              <KanbanBoardColumn
                dragOver={
                  activeId && findItemIndex(containerId, activeId, items) > -1
                }
                isDropAllowed={
                  !activeId ||
                  options?.isTransitionAllowed?.(
                    activeData?.containerId,
                    containerId
                  )
                }
                heading={`${t(containerId)} (${findDroppables(containerId, items).length})`}
                sx={{
                  height: "100%",
                  width: "236px",
                }}>
                {items[containerId].map(data => {
                  return (
                    <DndSortableItem
                      disabled={isSortingContainer || isDisabledItem?.(data)}
                      isDroppable={data?.isDroppable || isDroppableItem?.(data)}
                      isError={data.isError}
                      key={`${containerId}${data.id}`}
                      id={data.id}
                      index={findItemIndex(containerId, data.id, items)}>
                      <restProps.cardComponent
                        data={data}
                        sx={{
                          width: "220px",
                        }}
                        actions={
                          <restProps.cardActionsComponent
                            data={data}
                            allowedColumns={getAllowedColumns(containerId)}
                            onMoveClick={(
                              _: DragEvent,
                              moveToId: UniqueIdentifier
                            ) => handleMoveClick(data, moveToId)}
                          />
                        }
                      />
                    </DndSortableItem>
                  );
                })}
              </KanbanBoardColumn>
            </SortableContext>
          </DndDroppableContainer>
        ))}
      </KanbanBoardColumns>
      {createPortal(
        <DragOverlay
          adjustScale={adjustScale}
          dropAnimation={dropAnimation}
          modifiers={[restrictToFirstScrollableAncestor]}>
          {activeId &&
            !containers.includes(activeId) &&
            renderSortableItemDragOverlay(activeId)}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
