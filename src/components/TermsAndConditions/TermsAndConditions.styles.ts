import { FormControlLabel, Radio, styled } from "@mui/material";

export const StyledListItemButton = styled(FormControlLabel)(({ theme }) => ({
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
