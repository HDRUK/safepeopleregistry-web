import { Card, CardContent, Grid, Typography } from "@mui/material";
import { TranslationValues, useTranslations } from "next-intl";
import { UserHistorys } from "@/services/users";
import MaskLabel from "../../components/MaskLabel";
import { getInitials, getName } from "../../utils/application";
import { formatDisplayTimeDate } from "../../utils/date";
import { toSentenceCase } from "../../utils/string";

const NAMESPACE_TRANSLATION = "OrganisationsHistory";
const NAMESPACE_TRANSLATION_APPLICATION = "Application.Status";

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

const OrganisationsHistoryCard = ({ history }: { history: UserHistorys }) => {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const {
    event,
    log_name,
    subject,
    causer,
    created_at,
    properties,
    description,
  } = history;

  console.log("**** history", history);

  const logUser = causer || subject;
  const organisationName = subject.organisation_name;
  const subjectName = getName(subject);

  const changedAttributeString = Object.entries(properties?.attributes || {})
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  const baseProperties = flattenObject(properties);

  const hydratedProperties = {
    ...baseProperties,
    ...(properties.old_status && {
      old_status: tApplication(properties.old_status),
    }),
    ...(properties.new_status && {
      new_status: tApplication(properties.new_status),
    }),
  };

  const showDescription = log_name !== "created";

  return (
    <Card sx={{ boxShadow: 1, borderRadius: 1 }}>
      <CardContent>
        <Grid container gap={1}>
          <Grid item xs="auto">
            <MaskLabel
              initials={getInitials(organisationName)}
              size="medium"
              sx={{ justifyContent: "flex-start", mx: 1 }}
            />
          </Grid>
          <Grid item xs={11} sx={{ color: "text.secondary" }}>
            <Typography variant="small">
              {formatDisplayTimeDate(created_at)}
            </Typography>
            <Typography fontWeight="bold">
              {organisationName} -{" "}
              {t(`${log_name}.${event}.title`, { name: subjectName })}
            </Typography>
            {showDescription && (
              <Typography variant="body2">
                <b>Description:</b>{" "}
                {t(`${log_name}.${event}.description`, {
                  attributeKeys: changedAttributeString,
                  ...(hydratedProperties ?? {}),
                } as unknown as TranslationValues)}
              </Typography>
            )}
            {description && (
              <Typography variant="body2">
                <b>Comment:</b> {toSentenceCase(description)}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrganisationsHistoryCard;
