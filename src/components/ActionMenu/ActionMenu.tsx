import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, Box, BoxProps } from "@mui/material";
import { ReactNode, useRef, useState } from "react";

export interface ActionMenuHelpers {
  handleClose: () => void;
  handleOpen: () => void;
}

export interface ActionMenuProps extends BoxProps {
  children:
    | ReactNode
    | (({ handleClose, handleOpen }: ActionMenuHelpers) => ReactNode);
  onOpen?(): void;
  onClose?(): void;
  trigger?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export default function ActionMenu({
  children,
  onOpen,
  onClose,
  trigger,
  disabled,
  icon = <MoreVertIcon />,
  sx,
  ...restProps
}: ActionMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const triggerRef = useRef();

  const { ["aria-label"]: ariaLabel, ...additionalProps } = restProps;

  const handleOpen = ({ currentTarget }: React.UIEvent<HTMLElement>) => {
    setAnchorEl(currentTarget);
    onOpen?.();
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose?.();
  };

  return (
    <Box component="span" {...additionalProps} data-cy="action-menu">
      {!trigger && (
        <IconButton
          ref={triggerRef}
          size="small"
          onClick={handleOpen}
          aria-label={ariaLabel ?? "Actions"}
          disabled={disabled}>
          {icon}
        </IconButton>
      )}

      {trigger && (
        <span
          onClick={handleOpen}
          onKeyDown={handleOpen}
          role="button"
          tabIndex={0}
          aria-label={ariaLabel}>
          {trigger}
        </span>
      )}
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        sx={sx}
        MenuListProps={{
          sx: {
            p: "0",
          },
        }}>
        {typeof children === "function"
          ? children({
              handleClose,
              handleOpen: () =>
                handleOpen({ currentTarget: triggerRef.current }),
            })
          : children}
      </Menu>
    </Box>
  );
}
