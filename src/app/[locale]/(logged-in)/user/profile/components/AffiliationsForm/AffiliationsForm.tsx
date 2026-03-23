import DateInput from "@/components/DateInput";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlCheckbox from "@/components/FormControlCheckbox";
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
import { getDate } from "@/utils/date";
import SelectOrganisation from "@/components/SelectOrganisation";
import { EntityType } from "@/types/api";
import { UseFormSetValue } from "react-hook-form";

export interface AffiliationsFormProps {
  onSubmit: (affiliation: ResearcherAffiliation) => void;
  onClose: () => void;
  queryState: QueryState;
  initialValues?: ResearcherAffiliation;
  entityId: number;
  entityType: EntityType;
}

const NAMESPACE_TRANSLATION = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";
function FormSyncEffects({
  fromDate,
  isCurrent,
  toDate,
  setValue,
}: {
  fromDate?: string | null;
  isCurrent: boolean;
  toDate?: string | null;
  setValue: UseFormSetValue<ResearcherAffiliation>;
}) {
  useEffect(() => {
    if (!toDate) return;

    const today = new Date();
    const selectedTo = new Date(toDate);

    const selectedFrom = fromDate ? new Date(fromDate) : null;

    if (Number.isNaN(selectedTo.getTime())) return;

    const isToInFuture = selectedTo > today;
    const isFromInFuture = selectedFrom ? selectedFrom > today : false;

    if (isToInFuture && !isFromInFuture && isCurrent !== true) {
      setValue("current_employer", true, {
        shouldValidate: true,
      });
    }
  }, [toDate, isCurrent, setValue, fromDate]);

  return null;
}
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
  const [selectedOrganisationId, setSelectedOrganisationId] = useState<
    number | null
  >();

  const [selectOrganisation, setSelectOrganisation] = useState<boolean>(true);

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
        to: yup
          .date()
          .when("current_employer", {
            is: (value: boolean) => !!value,
            otherwise: schema => schema.required(tForm("toRequiredInvalid")),
            then: schema => schema.notRequired(),
          })
          .nullable(),
        organisation_id: selectOrganisation
          ? yup.string().required(tForm("organisationRequiredInvalid"))
          : yup.string().notRequired(),
        organisation_name: selectOrganisation
          ? yup.string().notRequired()
          : yup.string().required(tForm("organisationNameRequired")),
        organisation_email: selectOrganisation
          ? yup.string().notRequired()
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
          .email(tForm("professionalEmailFormatInvalid"))
          .when("current_employer", {
            is: (value: boolean) => !!value,
            otherwise: schema => schema.notRequired(),
          }),
      }),
    [tForm, selectOrganisation]
  );

  const formOptions = useMemo(
    () => ({
      defaultValues: {
        member_id: initialValues?.member_id || "",
        organisation_id: initialValues?.organisation_id || undefined,
        current_employer:
          (!!initialValues?.from && !initialValues?.to) || false,
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

  const handleSubmit = useCallback((fields: ResearcherAffiliation) => {
    onSubmit({
      to: null,
      ...fields,
    });
  }, []);

  return (
    <Form
      onSubmit={handleSubmit}
      schema={schema}
      {...formOptions}
      sx={{ mb: 3 }}>
      {({ watch, setValue }) => {
        const isCurrent = watch("current_employer");
        const toDate = watch("to");
        const fromDate = watch("from");

        return (
          <>
            <FormSyncEffects
              isCurrent={isCurrent}
              toDate={toDate}
              fromDate={fromDate}
              setValue={setValue}
            />
            <Grid container rowSpacing={3}>
              {selectOrganisation ? (
                <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <FormControlWrapper
                      name="organisation_email"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                      description={
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
                      }
                    />
                  </Grid>
                </>
              )}

              {useDepartment && (
                <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Grid container columnSpacing={3}>
                  <Grid item xs={6}>
                    <FormControlWrapper
                      name="from"
                      renderField={fieldProps => <DateInput {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlWrapper
                      name="to"
                      renderField={fieldProps => <DateInput {...fieldProps} />}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControlCheckbox
                  name="current_employer"
                  label={tForm("currentEmployer")}
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <FormControlWrapper
                  name="role"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlWrapper
                  description={tProfile("memberIdDescription")}
                  name="member_id"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
              {isCurrent && (
                <Grid item xs={12}>
                  <FormControlWrapper
                    name="email"
                    label={tForm("emailAddressAtEmployer")}
                    renderField={fieldProps => <TextField {...fieldProps} />}
                    description={
                      !!initialValues &&
                      !initialValues?.email && (
                        <Box sx={{ display: "flex", color: "warning.main" }}>
                          <WarningIcon />
                          <Typography>
                            {tProfile("affiliationsEmailWarningMessage")}
                          </Typography>
                        </Box>
                      )
                    }
                  />
                </Grid>
              )}
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
