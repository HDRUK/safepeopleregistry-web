import { useStore } from "@/data/store";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { TranslationValues, useTranslations } from "next-intl";
import { getDaysSince } from "../../utils/date";
import { getInitials, getName } from "../../utils/application";
import MaskLabel from "../../components/MaskLabel";
import { getUserHistoryQuery } from "../../services/users";

const NAMESPACE_TRANSLATION = "UserHistory";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

function flattenObject(
  obj: Record<string, unknown>,
  prefix = ""
): Record<string, unknown> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const newKey = prefix ? `${prefix}_${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        Object.assign(
          acc,
          flattenObject(value as Record<string, unknown>, newKey)
        );
      } else {
        acc[newKey] = value;
      }
      return acc;
    },
    {} as Record<string, unknown>
  );
}

export default function UserHistory() {
  const user = useStore(store => store.getCurrentUser());
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const { data: userHistory } = useQuery(
    getUserHistoryQuery(user?.id as number)
  );

  return (
    <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
      {userHistory?.data?.map(history => {
        const { id, event, log_name, subject, causer, created_at, properties } =
          history;

        const logUser = causer || subject;
        const userName = getName(logUser);

        const subjectName = getName(subject);

        const changedAttributeString = Object.entries(
          properties?.attributes || {}
        )
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");

        const baseProperties = flattenObject(properties);

        const hydratedProperties = {
          ...baseProperties,
          ...(properties.old_status && {
            old_status: tApplication(`status_${properties.old_status}`),
          }),
          ...(properties.new_status && {
            new_status: tApplication(`status_${properties.new_status}`),
          }),
        };

        return (
          <Card
            key={id}
            sx={{
              boxShadow: 1,
              borderRadius: 1,
            }}>
            <CardContent>
              <Grid container gap={1}>
                <Grid item xs="auto">
                  <MaskLabel
                    initials={getInitials(userName)}
                    size="medium"
                    sx={{ justifyContent: "flex-start", mx: 1 }}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="h6">{userName}</Typography>
                  <Typography variant="body2">
                    {t(`${log_name}.${event}.title`, { name: subjectName })}
                  </Typography>

                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    {t(`${log_name}.${event}.description`, {
                      attributeKeys: changedAttributeString,
                      ...(hydratedProperties ?? {}),
                    } as unknown as TranslationValues)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t("daysSince", { days: getDaysSince(created_at) })}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
