import DateInput from "@/components/DateInput";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import SelectDepartments from "@/components/SelectDepartments";
import SelectInput from "@/components/SelectInput";
import yup from "@/config/yup";
import { AffiliationRelationship } from "@/consts/user";
import { getOrganisationQuery } from "@/services/organisations";

import { ResearcherAffiliation } from "@/types/application";
import { QueryState } from "@/types/form";
import WarningIcon from "@mui/icons-material/Warning";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { getDate } from "@/utils/date";
import { isAffiliationEndDateSetByOrganisation } from "@/utils/affiliations";
import SelectOrganisation from "@/components/SelectOrganisation";
import { EntityType } from "@/types/api";
import { useFeatures } from "@/components/FeatureProvider";

export interface AffiliationsFormProps {
  onSubmit: (affiliation: ResearcherAffiliation) => void;
  onClose: () => void;
  queryState: QueryState;
  // Without an id, these prefill a new affiliation, e.g. when re-joining an Organisation.
  initialValues?: Partial<ResearcherAffiliation>;
  entityId: number;
  entityType: EntityType;
}

const NAMESPACE_TRANSLATION = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function AffiliationsForm({
  onSubmit,
  onClose,
  queryState,
  initialValues,
  entityId,
  entityType,
}: AffiliationsFormProps) {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const { isSroRequirementEnabled } = useFeatures();
  const [selectedOrganisationId, setSelectedOrganisationId] = useState<
    number | null
  >();

  const [selectOrganisation, setSelectOrganisation] = useState<boolean>(true);
  const isEdit = !!initialValues?.id;
  const initialEndDate = isEdit ? initialValues?.to : null;
  const isEndDateSetByOrganisation =
    isAffiliationEndDateSetByOrganisation(initialValues);

  // keeping in some department code..
  // - this is not used, but incase we want to turn it on..
  const useDepartment = false;
  const { data: selectedOrganisation } = useQuery({
    ...getOrganisationQuery(selectedOrganisationId || 1),
    enabled: useDepartment && !!selectedOrganisationId,
  });

  const schema = useMemo(
    () =>
      yup.object().shape({
        member_id: yup.string().required(tForm("memberIdRequiredInvalid")),
        from: yup.date().required(tForm("fromRequiredInvalid")),
        // Affiliations cannot be added in the past; an end date is optional, as not everyone knows it.
        // An unchanged end date is left alone, so an existing one that has passed does not block other edits.
        to: isEndDateSetByOrganisation
          ? yup.date().nullable()
          : yup
              .date()
              .nullable()
              .test(
                "notInPast",
                tProfile("affiliationEndDateInPastInvalid"),
                value =>
                  !value ||
                  dayjs(value).isSame(initialEndDate, "day") ||
                  !dayjs(value).isBefore(dayjs(), "day")
              ),
        organisation_id: selectOrganisation
          ? yup.string().required(tForm("organisationRequiredInvalid"))
          : yup.string().notRequired(),
        organisation_name: selectOrganisation
          ? yup.string().notRequired()
          : yup.string().required(tForm("organisationNameRequired")),
        organisation_email: selectOrganisation
          ? yup.string().notRequired()
          : !isSroRequirementEnabled
            ? yup
                .string()
                .email(tForm("userSroEmailFormatInvalid"))
                .notRequired()
            : yup
                .string()
                .email(tForm("emailInvalid"))
                .required(tForm("organisationEmailRequired")),
        relationship: yup
          .string()
          .required(tForm("relationshipRequiredInvalid")),
        current_employer: yup.boolean(),
        role: yup.string().required(tForm("roleRequiredInvalid")),
        email: yup
          .string()
          .required(tForm("professionalEmailRequired"))
          .email(tForm("professionalEmailFormatInvalid")),
      }),
    [
      tForm,
      tProfile,
      selectOrganisation,
      isSroRequirementEnabled,
      isEndDateSetByOrganisation,
      initialEndDate,
    ]
  );

  const formOptions = useMemo(
    () => ({
      defaultValues: {
        member_id: initialValues?.member_id || "",
        organisation_id: initialValues?.organisation_id || undefined,
        // Users cannot add past affiliations, so every affiliation is current until it ends.
        current_employer: true,
        relationship: initialValues?.relationship || "",
        from: getDate(initialValues?.from) || null,
        to: getDate(initialValues?.to) || null,
        role: initialValues?.role || "",
        email: initialValues?.email || "",
        ror: "", // keeping this blank for now
        department: "", // keeping this blank for now
        organisation_name: undefined,
        organisation_email: undefined,
      },
    }),
    [initialValues]
  );

  useEffect(() => {
    if (initialValues?.organisation_id) {
      setSelectOrganisation(true);
    }
  }, [initialValues]);

  const relationshipOptions = [
    {
      label: tApplication("employee"),
      value: AffiliationRelationship.EMPLOYEE,
    },
    {
      label: tApplication("honoraryContract"),
      value: AffiliationRelationship.HONORARY_CONTRACT,
    },
    { label: tApplication("student"), value: AffiliationRelationship.STUDENT },
  ];

  const handleSubmit = useCallback(
    (fields: ResearcherAffiliation) => {
      const {
        organisation_id,
        organisation_name,
        organisation_email,
        ...rest
      } = fields;

      const payload = selectOrganisation
        ? {
            ...rest,
            organisation_id,
          }
        : {
            ...rest,
            organisation_name,
            organisation_email,
          };

      onSubmit({
        to: null,
        ...payload,
      });
    },
    [onSubmit, selectOrganisation]
  );

  return (
    <Form
      onSubmit={handleSubmit}
      schema={schema}
      {...formOptions}
      sx={{ mb: 3 }}>
      {() => {
        return (
          <>
            <Grid container rowSpacing={3}>
              {selectOrganisation ? (
                <Grid size={{ xs: 12 }}>
                  <FormControlWrapper
                    name="organisation_id"
                    renderField={({ onChange, ...fieldProps }) => (
                      <SelectOrganisation
                        entityId={entityId}
                        entityType={entityType}
                        organisationsIds={
                          initialValues?.organisation_id
                            ? [initialValues.organisation_id]
                            : []
                        }
                        {...fieldProps}
                        onChange={e => {
                          setSelectedOrganisationId(e.target.value as number);
                          onChange(e);
                        }}
                        showNotApprovedText
                      />
                    )}
                    description={
                      !!initialValues && !initialValues?.organisation_id ? (
                        <Box sx={{ display: "flex", color: "warning.main" }}>
                          <WarningIcon />
                          <Typography sx={{ color: "warning.main" }}>
                            {tProfile.rich(
                              "affiliationOrganisationWarningMessage",
                              {
                                link: chunks => (
                                  <Link
                                    component="button"
                                    onClick={() => setSelectOrganisation(false)}
                                    sx={{ pb: 0.4 }}>
                                    {chunks}
                                  </Link>
                                ),
                              }
                            )}
                          </Typography>
                        </Box>
                      ) : (
                        tProfile.rich("organisationNotListed", {
                          link: chunks => (
                            <Link
                              component="button"
                              onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectOrganisation(false);
                              }}
                              sx={{ pb: 0.25 }}>
                              {chunks}
                            </Link>
                          ),
                        })
                      )
                    }
                  />
                </Grid>
              ) : (
                <>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="organisation_name"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                      description={tProfile.rich("organisationListed", {
                        link: chunks => (
                          <Link
                            component="button"
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectOrganisation(true);
                            }}
                            sx={{ pb: 0.25 }}>
                            {chunks}
                          </Link>
                        ),
                      })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="organisation_email"
                      label={
                        !isSroRequirementEnabled
                          ? tForm("userSroEmail")
                          : undefined
                      }
                      renderField={fieldProps => <TextField {...fieldProps} />}
                      description={
                        !isSroRequirementEnabled ? (
                          tForm("userSroEmailDescription")
                        ) : (
                          <>
                            <Box mb={2}>
                              {tProfile("organisationNameSubtitle")}
                            </Box>
                            {!!initialValues && !initialValues?.email && (
                              <Box
                                sx={{ display: "flex", color: "warning.main" }}>
                                <WarningIcon />
                                <Typography>
                                  {tProfile("affiliationsEmailWarningMessage")}
                                </Typography>
                              </Box>
                            )}
                          </>
                        )
                      }
                    />
                  </Grid>
                </>
              )}

              {useDepartment && (
                <Grid size={{ xs: 12 }}>
                  <FormControlWrapper
                    name="department"
                    renderField={fieldProps => (
                      <SelectDepartments
                        organisation={selectedOrganisation?.data}
                        {...fieldProps}
                      />
                    )}
                  />
                </Grid>
              )}
              <Grid size={{ xs: 12 }}>
                <Grid container columnSpacing={3}>
                  <Grid size={{ xs: 6 }}>
                    <FormControlWrapper
                      name="from"
                      renderField={fieldProps => (
                        <DateInput {...fieldProps} disableFuture />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <FormControlWrapper
                      name="to"
                      label={tProfile("affiliationEndDateLabel")}
                      disabled={isEndDateSetByOrganisation}
                      description={tProfile(
                        isEndDateSetByOrganisation
                          ? "affiliationEndDateSetByOrganisation"
                          : "affiliationEndDateDescription"
                      )}
                      renderField={fieldProps => (
                        <DateInput {...fieldProps} disablePast />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControlWrapper
                  name="relationship"
                  renderField={fieldProps => (
                    <SelectInput
                      {...fieldProps}
                      options={relationshipOptions}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControlWrapper
                  name="role"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControlWrapper
                  description={tProfile("memberIdDescription")}
                  name="member_id"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControlWrapper
                  name="email"
                  label={tForm("emailAddressAtEmployer")}
                  renderField={fieldProps => <TextField {...fieldProps} />}
                  description={
                    <>
                      {tProfile("affiliationsEmailDescription")}
                      {isEdit && !initialValues?.email && (
                        <Box sx={{ display: "flex", color: "warning.main" }}>
                          <WarningIcon />
                          <Typography>
                            {tProfile("affiliationsEmailWarningMessage")}
                          </Typography>
                        </Box>
                      )}
                    </>
                  }
                  disabled={isEdit && !!initialValues?.email}
                />
              </Grid>
            </Grid>
            <FormActions>
              <Button variant="outlined" onClick={onClose}>
                {tApplication("cancel")}
              </Button>
              <LoadingButton loading={queryState.isLoading} type="submit">
                {tForm("save")}
              </LoadingButton>
            </FormActions>
          </>
        );
      }}
    </Form>
  );
}
