import { WorkflowTransitions } from "@/services/custodian_approvals";
import { WithModelState } from "@/types/application";
import { DndItems } from "@/types/dnd";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useMemo } from "react";

interface UseProjectEntityBoardProps<T> {
  data: T[];
  stateWorkflow: WorkflowTransitions | undefined;
}

export default function useProjectEntityBoard<
  T extends WithModelState<{
    id: UniqueIdentifier;
  }>,
>({ data, stateWorkflow }: UseProjectEntityBoardProps<T>) {
  function isTransitionAllowed(
    status: UniqueIdentifier | undefined,
    transitionStatus: UniqueIdentifier | undefined
  ) {
    return process.env.NEXT_PUBLIC_FEATURE_PROJECT_USERS_WORKFLOW === "true"
      ? !!(
          stateWorkflow &&
          status &&
          transitionStatus &&
          (transitionStatus === status ||
            stateWorkflow[status].includes(transitionStatus))
        )
      : true;
  }

  function getItemsByTransitions<
    T extends WithModelState<{ id: UniqueIdentifier }>,
  >(
    stateWorkflow: WorkflowTransitions | undefined,
    data: T[] | undefined
  ): DndItems<T> | null {
    if (stateWorkflow && data?.length) {
      const items: DndItems<T> = {};

      Object.keys(stateWorkflow).forEach((key: string) => {
        items[key] = [];
      });

      data.forEach(item => {
        if (item.model_state?.state?.slug) {
          items[item.model_state.state.slug].push(item);
        }
      });

      return items;
    }

    return null;
  }

  const itemsByTransitions = useMemo(
    () => getItemsByTransitions(stateWorkflow, data),
    [stateWorkflow, data]
  );

  function getAllowedTransitions(status: UniqueIdentifier) {
    return itemsByTransitions
      ? Object.keys(itemsByTransitions).filter(key =>
          isTransitionAllowed(status, key)
        )
      : [];
  }

  return useMemo(
    () => ({
      itemsByTransitions,
      isTransitionAllowed,
      getAllowedTransitions,
    }),
    [stateWorkflow, data]
  );
}
