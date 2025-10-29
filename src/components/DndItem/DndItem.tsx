import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import React, { ReactNode } from "react";

import { BoxProps } from "@mui/system";
import { motion } from "framer-motion";
import { StyledItem, StyledWrapper } from "./DndItem.styles";
import { errorVariants } from "./DndItem.animations";

export interface DndItemProps extends BoxProps {
  children: ReactNode;
  dragOverlay?: boolean;
  disabled?: boolean;
  dragging?: boolean;
  index?: number;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  transition?: string | null;
  isDroppable?: boolean;
  isError?: boolean;
}

const getAnimationProps = ({ isError }: Pick<DndItemProps, "isError">) => {
  if (isError) {
    return {
      animate: "error",
      variants: errorVariants,
      initial: "initial",
    };
  }

  return null;
};

const DndItem = React.forwardRef<HTMLLIElement, DndItemProps>(
  (
    {
      dragOverlay,
      dragging,
      disabled,
      index,
      listeners,
      transition,
      transform,
      children,
      isDroppable,
      isError,
      ...restProps
    },
    ref
  ) => {
    return (
      <StyledWrapper
        sx={{
          transition: [transition].filter(Boolean).join(", "),
          "--translate-x": transform
            ? `${Math.round(transform.x)}px`
            : undefined,
          "--translate-y": transform
            ? `${Math.round(transform.y)}px`
            : undefined,
          "--scale-x": transform?.scaleX ? `${transform.scaleX}` : undefined,
          "--scale-y": transform?.scaleY ? `${transform.scaleY}` : undefined,
          "--index": index,
          cursor: "grab",
          ...(dragOverlay &&
            isDroppable !== false && {
              cursor: " grabbing",
            }),
          ...(isDroppable === false && {
            cursor: "not-allowed",
          }),
        }}
        ref={ref}>
        <motion.div {...getAnimationProps({ isError })}>
          <StyledItem
            dragging={!!dragging}
            dragOverlay={!!dragOverlay}
            disabled={!!disabled}
            tabIndex={0}
            {...listeners}
            {...restProps}>
            {children}
          </StyledItem>
        </motion.div>
      </StyledWrapper>
    );
  }
);

export default DndItem;
