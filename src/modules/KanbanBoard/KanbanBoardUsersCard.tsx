import { Box, Card, CardProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import ChipStatus from "@/components/ChipStatus";
import theme from "@/theme";
import Text from "../../components/Text";
import { CustodianProjectUser, WithRoutes } from "../../types/application";
import {
  renderProjectUserNameCell,
  renderUserOrganisationsNameCell,
} from "../../utils/cells";

export type KanbanBoardUsersCardProps = CardProps &
  WithRoutes<{
    data: CustodianProjectUser;
    actions?: ReactNode;
  }>;

export default function KanbanBoardUsersCard({
  data,
  actions,
  sx,
  routes,
  ...restProps
}: KanbanBoardUsersCardProps) {
  const {
    project_has_user,
    project_has_user: { affiliation, project },
  } = data;

  return (
    <Card
      sx={{
        p: 1,
        pr: 0.5,
        "> *": {
          fontSize: "0.875rem",
          whiteSpace: "normal",
        },
        ...sx,
      }}
      {...restProps}>
      <Text
        onMouseDown={e => e.stopPropagation()}
        endIcon={actions}
        variant="h6"
        sx={{
          color: "secondary.main",
          mb: 1.5,
          fontSize: "1rem",
        }}>
        <Box sx={{ flexGrow: 1 }}>
          {renderProjectUserNameCell(project_has_user, routes.name.path)}
        </Box>
      </Text>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: theme.palette[`neutral-500`].main,
        }}>
        <Typography>
          {renderUserOrganisationsNameCell(affiliation?.organisation)}
        </Typography>
        <ChipStatus
          status={affiliation?.model_state?.state.slug}
          variant="icon"
        />
        <Typography sx={{ mt: 1 }}>{project.title}</Typography>
      </Box>
    </Card>
  );
}
