import { Box, Button, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import {
  ActionMenuHelpers,
  ActionMenuItem,
  ActionMenuProps,
} from "../../components/ActionMenu";
import { Translations, WithTranslations } from "../../types/application";
import { KanbanBoardHelperProps } from "./KanbanBoard";

export type KanbanBoardActionsMenuItemsProps<T> = WithTranslations<
  Omit<ActionMenuProps, "children">
> &
  KanbanBoardHelperProps<unknown> &
  Pick<ActionMenuHelpers, "handleClose"> & {
    data: T;
  } & { tStatus: Translations };

export default function KanbanBoardActionsMenuItems<
  T extends {
    id: number;
  },
>({
  t,
  tStatus,
  allowedTransitions,
  onMoveClick,
  handleClose,
  data,
}: KanbanBoardActionsMenuItemsProps<T>) {
  const [status, setStatus] = useState<string>("");

  const handleStatusChange = e => {
    setStatus(e.target.value);
  };

  return (
    <ActionMenuItem
      collapseContent={
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}>
          <Select
            sx={{ minWidth: 200, maxWidth: 200 }}
            value={status}
            onChange={handleStatusChange}>
            {allowedTransitions.map(key => (
              <MenuItem value={key}>{tStatus(key)}</MenuItem>
            ))}
          </Select>
          <Button variant="outlined" onClick={handleClose}>
            {t("cancel")}
          </Button>
          <Button onClick={() => onMoveClick(data.id, status)}>Confirm</Button>
        </Box>
      }>
      {t("move")}
    </ActionMenuItem>
  );
}
