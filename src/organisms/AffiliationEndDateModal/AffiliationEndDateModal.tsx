import DateInput from "@/components/DateInput";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import FormModal, { FormModalProps } from "@/components/FormModal";
import yup from "@/config/yup";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { putAffiliationEndDateQuery } from "@/services/affiliations";
import { EntityType } from "@/types/api";
import { ResearcherAffiliation } from "@/types/application";
import { isAffiliationEndDateSetByOrganisation } from "@/utils/affiliations";
import { formatDBDate, getDate, isInFuture } from "@/utils/date";
import ErrorMessage from "@/components/ErrorMessage";
import { LoadingButton } from "@mui/lab";
import { Alert, Button, Grid, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const NAMESPACE_TRANSLATION = "AffiliationEndDateModal";

interface AffiliationEndDateFormValues {
  to: Date | null;
}

export interface AffiliationEndDateModalProps extends Omit<
  FormModalProps,
  "children" | "heading" | "onClose"
> {
  affiliation?: ResearcherAffiliation;
  // Who is recording the end date. The Organisation's date wins.
  entityType: EntityType.USER | EntityType.ORGANISATION;
  userName?: string;
  onSuccess?: () => void;
  onClose: () => void;
}

export default function AffiliationEndDateModal({
  affiliation,
  entityType,
  userName = "",
  onSuccess,
  onClose,
  ...restProps
}: AffiliationEndDateModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const isUser = entityType === EntityType.USER;
  const organisationName = affiliation?.organisation?.organisation_name ?? "";
  const isLockedForUser =
    isUser && isAffiliationEndDateSetByOrganisation(affiliation);
  const hasFutureEndDate = isInFuture(affiliation?.to);

  const { mutateAsync: putEndDate, ...mutationState } = useMutation(
    putAffiliationEndDateQuery()
  );

  useQueryAlerts(mutationState, {
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
    successAlertProps: {
      text: t(
        mutationState.variables?.payload?.to
          ? "successDescription"
          : "removedSuccessDescription"
      ),
    },
    errorAlertProps: {
      text: <ErrorMessage t={t} tKey="errorDescription" />,
    },
  });

  const schema = useMemo(
    () =>
      yup.object().shape({
        to: yup
          .date()
          .nullable()
          .required(t("toRequiredInvalid"))
          .min(
            getDate(affiliation?.from) || new Date(0),
            t("toBeforeFromInvalid")
          ),
      }),
    [t, affiliation?.from]
  );

  const formOptions = useMemo(
    () => ({
      defaultValues: {
        to: getDate(affiliation?.to) || null,
      },
    }),
    [affiliation?.to]
  );

  const saveEndDate = async (to: Date | null) => {
    if (!affiliation) return;

    await putEndDate({
      params: { affiliationId: affiliation.id },
      payload: { to: to ? (formatDBDate(to) as string) : null },
    });
  };

  return (
    <FormModal
      heading={t(isUser ? "headingUser" : "headingOrganisation")}
      description={
        isUser
          ? t("descriptionUser", { organisationName })
          : t("descriptionOrganisation", { organisationName, userName })
      }
      variant="content"
      isDismissable
      onClose={onClose}
      {...restProps}>
      {isLockedForUser ? (
        <>
          <Typography>{t("lockedForUser", { organisationName })}</Typography>
          <FormActions>
            <Button variant="outlined" onClick={onClose}>
              {t("closeButton")}
            </Button>
          </FormActions>
        </>
      ) : (
        <Form<AffiliationEndDateFormValues>
          schema={schema}
          onSubmit={({ to }) => saveEndDate(to)}
          {...formOptions}>
          <Grid container rowSpacing={3}>
            <Grid size={{ xs: 12 }}>
              <FormControlWrapper
                name="to"
                label={t(isUser ? "toLabelUser" : "toLabelOrganisation")}
                renderField={fieldProps => (
                  <DateInput
                    {...fieldProps}
                    minDate={getDate(affiliation?.from) || undefined}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Alert severity="info">
                {t(isUser ? "consequencesUser" : "consequencesOrganisation")}
              </Alert>
            </Grid>
            {!isUser && (
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2">{t("organisationWins")}</Typography>
              </Grid>
            )}
          </Grid>
          <FormActions>
            <Button variant="outlined" onClick={onClose}>
              {t("cancelButton")}
            </Button>
            {hasFutureEndDate && (
              <LoadingButton
                variant="outlined"
                color="error"
                loading={
                  mutationState.isPending &&
                  !mutationState.variables?.payload?.to
                }
                onClick={() => saveEndDate(null)}>
                {t("removeButton")}
              </LoadingButton>
            )}
            <LoadingButton
              type="submit"
              loading={
                mutationState.isPending &&
                !!mutationState.variables?.payload?.to
              }>
              {t("saveButton")}
            </LoadingButton>
          </FormActions>
        </Form>
      )}
    </FormModal>
  );
}
