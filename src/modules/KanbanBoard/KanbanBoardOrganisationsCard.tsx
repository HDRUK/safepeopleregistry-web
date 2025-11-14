import WarningIcon from "@mui/icons-material/Warning";
import { Box, Card, CardProps, Tooltip, Typography } from "@mui/material";
import { ReactNode } from "react";
import Text from "../../components/Text";
import {
  CustodianProjectOrganisation,
  WithRoutes,
  WithTranslations,
} from "../../types/application";
import { renderLinkNameCell } from "../../utils/cells";

export type KanbanBoardOrganisationsCardProps = CardProps &
  WithTranslations<
    WithRoutes<{
      data: CustodianProjectOrganisation;
      actions?: ReactNode;
    }>
  >;

export default function KanbanBoardOrganisationsCard({
  data,
  actions,
  sx,
  routes,
  t,
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
        startIcon={
          !data.project_organisation.organisation.system_approved && (
            <Tooltip title={t("organisationUnapprovedTooltip")}>
              <WarningIcon color="warning" />
            </Tooltip>
          )
        }
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
      <Typography color="success.main">
        Number affiliated users: {organisation.affiliations_count || 0}
      </Typography>
      <Typography>
        {project.title} (id: {project.id})
      </Typography>
    </Card>
  );
}
