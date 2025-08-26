import { useStore } from "@/data/store";
import { Link } from "@/i18n/routing";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, List, ListItem, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Box } from "@mui/system";
import { injectParamsIntoPath } from "@/utils/application";
import { DEFAULT_STALE_TIME } from "@/consts/requests";
import ActionsPanel, { ActionsPanelProps } from "../../components/ActionsPanel";
import ActionsPanelItem from "../../components/ActionsPanelItem";
import { PageBody } from "../../modules";
import { getActionLogsQuery } from "../../services/action_logs";
import { ActionLogEntity } from "../../types/logs";
import { toCamelCase } from "../../utils/string";
import generateActions, { ActionConfig } from "./utils";

const NAMESPACE_TRANSLATION_PROFILE = "ActionLogs";

interface ActionLogProps {
  variant: ActionLogEntity;
  panelProps: Omit<ActionsPanelProps, "children">;
  hiddenActions?: string[];
}

export default function ActionLogs({
  variant,
  panelProps,
  hiddenActions = ["add_users_completed"],
}: ActionLogProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { routes, user } = useStore(state => ({
    routes: state.getApplication().routes,
    user: state.getUser(),
  }));

  const { id: entityId } = useStore(state => {
    switch (variant) {
      case "user":
        return { id: state.getUser()?.id || 1 };
      case "organisation":
        return { id: state.getOrganisation()?.id || 1 };
      case "custodian":
        return { id: state.getCustodian()?.id || 1 };
      default:
        return { id: 1 };
    }
  });
  const { data: actionLogData } = useQuery(
    getActionLogsQuery(entityId, variant, { staleTime: DEFAULT_STALE_TIME })
  );

  const allActions =
    actionLogData?.data.filter(
      action => !hiddenActions.includes(action.action)
    ) || [];

  const completedActions =
    allActions.filter(action => !!action.completed_at) || [];

  const inCompletedActions =
    allActions.filter(action => !action.completed_at) || [];

  const actions: Record<string, ActionConfig> = generateActions(routes);

  const hydratedInCompletedActions = inCompletedActions?.map(({ action }) => {
    const { icon, path } = actions[action as keyof typeof actions] ?? {};
    const { id } = allActions.find(a => a.action === action) || {};

    const hydratedPath = id && path ? injectParamsIntoPath(path, { id }) : path;

    const name = toCamelCase(action);
    return {
      heading: t(`${name}.title`),
      description: t(`${name}.description`),
      icon,
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={hydratedPath}
          sx={{ whiteSpace: "nowrap" }}>
          {t(`${name}.buttonText`)}
        </Button>
      ),
    };
  });

  const isDelegate = user?.is_delegate;

  if (isDelegate) return <> </>;

  return (
    <>
      {!!hydratedInCompletedActions.length && (
        <PageBody>
          <ActionsPanel variant="plain" {...panelProps}>
            {hydratedInCompletedActions.map(action => (
              <ActionsPanelItem {...action} />
            ))}
          </ActionsPanel>
        </PageBody>
      )}
      <PageBody>
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            border: 0,
          }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}>
              <Typography variant="h3">{t("completedActions")}</Typography>{" "}
              {!!completedActions.length && (
                <Typography>{t("completedActionsDescription")}</Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding>
              {completedActions.map(({ id, action, completed_at }) => (
                <ListItem key={id} disableGutters>
                  {!!completed_at && (
                    <CheckIcon
                      sx={{
                        mx: 1,
                        color: completed_at ? "success.main" : "gray",
                      }}
                    />
                  )}
                  <Typography
                    sx={{
                      color: completed_at ? "success.main" : "inherit",
                      textDecoration: completed_at ? "line-through" : "none",
                    }}>
                    {t(toCamelCase(`${action}.title`))}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </PageBody>
    </>
  );
}
