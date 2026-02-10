import { Status } from "@/consts/application";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Typography } from "@mui/material";
import { Box, BoxProps, useTheme } from "@mui/system";
import { forwardRef, ReactNode } from "react";
import { getColorForStatus } from "@/utils/application";
import { colorToRgba } from "@/utils/theme";

export interface KanbanBoardColumnProps extends BoxProps {
  heading: ReactNode;
  dragOver: boolean;
  isDropAllowed?: boolean;
  disabled?: boolean;
  containerId: string;
}

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
    const backgroudColor =
      theme.palette[getColorForStatus(containerId as Status)].main;

    return (
      <Box
        {...restProps}
        ref={ref}
        sx={{
          padding: 1,
          backgroundColor: colorToRgba(backgroudColor, 0.1),
          position: "relative",
          "&:before": {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            borderTop: "2px solid",
            borderTopColor: backgroudColor,
            content: '""',
            ...(((dragOver && isDropAllowed !== false) || disabled) && {
              borderTopColor: disabled ? "#000" : "primary.main",
            }),
          },
          ...(((dragOver && isDropAllowed !== false) || disabled) && {
            backgroundColor: colorToRgba(backgroudColor, 0.2),
          }),
          ...(isDropAllowed === false && {
            opacity: 0.6,
          }),
          ...(disabled && {
            background: "#fff",
          }),
          ...sx,
        }}>
        <Typography
          variant="h6"
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
