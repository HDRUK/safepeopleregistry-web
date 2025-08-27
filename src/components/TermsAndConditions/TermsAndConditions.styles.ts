import { ListItemButton, ListItemText, Radio, styled } from "@mui/material";

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1),
  "&.Mui-selected": {
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

export const StyledRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.action.active,
  "&.Mui-checked": {
    color: theme.palette.primary,
  },
}));

export const StyledListItemText = styled(ListItemText)<{ isSelected: boolean }>(
  ({ isSelected }) => ({
    "& .MuiListItemText-primary": {
      fontSize: "0.875rem",
      fontWeight: isSelected ? 500 : 400,
    },
  })
);
