import { Chip, styled } from "@mui/material";

const StyledContainer = styled("div")`
  background: white;
`;

const StyledHeader = styled("nav")`
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const StyledAccountTypeChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.neutralPink.main,
  color: theme.palette.neutralPink.contrastText,
  "&:focus-visible": {
    outline: `${theme.spacing(0.5)} solid ${theme.palette.primary.main}`,
    outlineOffset: theme.spacing(0.5),
  },
}));

export { StyledAccountTypeChip, StyledContainer, StyledHeader };
