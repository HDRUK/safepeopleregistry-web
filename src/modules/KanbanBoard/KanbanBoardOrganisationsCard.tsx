import { Box, Card, CardProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import Text from "../../components/Text";
import {
  CustodianProjectOrganisation,
  WithRoutes,
} from "../../types/application";
import { renderLinkNameCell } from "../../utils/cells";

export type KanbanBoardOrganisationsCardProps = CardProps &
  WithRoutes<{
    data: CustodianProjectOrganisation;
    actions?: ReactNode;
  }>;

export default function KanbanBoardOrganisationsCard({
  data,
  actions,
  sx,
  routes,
  ...restProps
}: KanbanBoardOrganisationsCardProps) {
  const {
    project_organisation: { project, id, organisation },
  } = data;

  return (
    <Card
      sx={{
        p: 2,
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
          mb: 1,
          fontSize: "1rem",
        }}>
        <Box sx={{ flexGrow: 1 }}>
          {renderLinkNameCell(
            organisation.organisation_name,
            routes.name.path,
            {
              projectOrganisationId: id,
            }
          )}
        </Box>
      </Text>
      <Typography color="success.main">Number affiliated users</Typography>
      <Typography>
        {project.title} (id: {project.id})
      </Typography>
    </Card>
  );
}
