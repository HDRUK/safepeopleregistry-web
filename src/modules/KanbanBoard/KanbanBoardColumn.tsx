import { Status } from "@/consts/application";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Typography } from "@mui/material";
import { Box, BoxProps, Theme, useTheme } from "@mui/system";
import { forwardRef, ReactNode } from "react";
import { getColorForStatus } from "@/utils/application";

export interface KanbanBoardColumnProps extends BoxProps {
  heading: ReactNode;
  dragOver: boolean;
  isDropAllowed?: boolean;
  disabled?: boolean;
  containerId: string;
}

const getColors = (indexColor: string, theme: Theme) => {
  let colors = {
    backgroundColor: theme.palette[`neutral-50`].main,
    backgroundHighlightColor: theme.palette[`neutral-100`].main,
    borderTopColor: theme.palette[`neutral-400`].main,
  };

  if (indexColor === "warning") {
    colors = {
      backgroundColor: theme.palette[`${indexColor}-100`].main,
      backgroundHighlightColor: theme.palette[`${indexColor}-200`].main,
      borderTopColor: theme.palette[`${indexColor}-500`].main,
    };
  } else if (indexColor === "success") {
    colors = {
      backgroundColor: theme.palette[`${indexColor}-100`].main,
      backgroundHighlightColor: theme.palette[`${indexColor}-200`].main,
      borderTopColor: theme.palette[`${indexColor}-700`].main,
    };
  } else if (indexColor === "error") {
    colors = {
      backgroundColor: theme.palette[`${indexColor}-100`].main,
      backgroundHighlightColor: theme.palette[`${indexColor}-200`].main,
      borderTopColor: theme.palette[`${indexColor}-500`].main,
    };
  }

  return colors;
};

const KanbanBoardColumn = forwardRef<HTMLDivElement, KanbanBoardColumnProps>(
  (
    {
      children,
      sx,
      heading,
      dragOver,
      isDropAllowed,
      disabled,
      containerId,
      ...restProps
    }: KanbanBoardColumnProps,
    ref
  ) => {
    const theme = useTheme();
    const indexColor = getColorForStatus(containerId as Status);
    const colors = getColors(indexColor, theme);

    return (
      <Box
        {...restProps}
        ref={ref}
        sx={{
          padding: 1,
          backgroundColor: colors.backgroundColor,
          position: "relative",
          "&:before": {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            borderTop: "2px solid",
            borderTopColor: colors.borderTopColor,
            content: '""',
            ...(((dragOver && isDropAllowed !== false) || disabled) && {
              borderTopColor: disabled ? "#000" : "primary.main",
            }),
          },
          ...(((dragOver && isDropAllowed !== false) || disabled) && {
            backgroundColor: colors.backgroundHighlightColor,
          }),
          ...(isDropAllowed === false && {
            opacity: 0.3,
          }),
          ...(disabled && {
            background: "#fff",
          }),
          ...sx,
        }}>
        <Typography
          variant="h6"
          component="p"
          sx={{
            px: 1,
            my: 1,
            minHeight: "3.6rem",
            display: "flex",
            ...(dragOver &&
              isDropAllowed !== false && {
                color: "#000",
              }),
          }}>
          <Box sx={{ flexGrow: 1 }}>{heading}</Box>
          {disabled && <LockOutlinedIcon />}
        </Typography>
        <Box
          {...restProps}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
          {children}
        </Box>
      </Box>
    );
  }
);

export default KanbanBoardColumn;
