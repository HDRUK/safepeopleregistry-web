import { useStore } from "@/data/store";
import {
  Box,
  FormControlLabel,
  Grid,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import DateInput from "../../components/DateInput";
import Form, { FormProps } from "../../components/Form";
import FormActions from "../../components/FormActions";
import FormControlCheckbox from "../../components/FormControlCheckbox";
import FormControlWrapper from "../../components/FormControlWrapper";
import FormFieldArray from "../../components/FormFieldArray";
import ProfileNavigationFooter from "../../components/ProfileNavigationFooter";
import yup from "../../config/yup";
import { RequestFrequency } from "../../consts/projects";
import { ProjectDetails } from "../../types/application";
import { MutationState } from "../../types/form";
import { injectParamsIntoPath } from "../../utils/application";

export interface ProjectsSafeDataFormProps extends Omit<
  FormProps<ProjectDetails>,
  "children"
> {
  projectId?: number;
  mutateState?: MutationState;
}

const NAMESPACE_TRANSLATION = "Form.SafeData";

export default function ProjectsSafeDataForm({
  projectId,
  mutateState,
  ...restProps
}: ProjectsSafeDataFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const routes = useStore(state => state.getApplication().routes);

  const formOptions = {
    disabled: mutateState?.isPending || restProps.disabled,
    shouldResetKeep: true,
  };

  const schema = useMemo(
    () =>
      yup.object().shape({
        datasets: yup.array().of(
          yup.object().shape({
            value: yup.string(),
          })
        ),
        data_sensitivity_level: yup.string(),
        legal_basis_for_data_article6: yup.string(),
        duty_of_confidentiality: yup.boolean(),
        national_data_optout: yup.boolean(),
        request_frequency: yup.string(),
        dataset_linkage_description: yup.string(),
        data_minimisation: yup.string(),
        data_use_description: yup.string(),
        access_date: yup.date().nullable(),
      }),
    [t]
  );

  return (
    <Form
      aria-label="Safe data"
      schema={schema}
      {...formOptions}
      {...restProps}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormFieldArray<FormData>
            name="datasets"
            initialRowCount={1}
            minimumRows={1}
            createNewRow={() => ({ value: "" })}
            tKey={NAMESPACE_TRANSLATION}
            renderField={(_, index, removeButton) => (
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <FormControlWrapper
                    displayLabel={false}
                    labelMd={0}
                    contentMd={12}
                    name={`datasets.${index}.value`}
                    placeholder={t("datasetsPlaceholder")}
                    renderField={fieldProps => (
                      <Box sx={{ display: "flex" }}>
                        <TextField {...fieldProps} fullWidth />
                        {removeButton}
                      </Box>
                    )}
                  />
                </Grid>
              </Grid>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlWrapper
            name="data_sensitivity_level"
            t={t}
            sx={{ maxWidth: "33%" }}
            renderField={props => (
              <Select {...props} fullWidth>
                <MenuItem value="De-Personalised">
                  {t("dePersonalised")}
                </MenuItem>
                <MenuItem value="Personally Identifiable">
                  {t("personallyIdentifiable")}
                </MenuItem>
                <MenuItem value="Anonymous">{t("anonymous")}</MenuItem>
              </Select>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlWrapper
            name="legal_basis_for_data_article6"
            t={t}
            label={t.rich("legalBasisForDataArticle6", {
              link: chunks => (
                <Link href="https://gdpr-info.eu/art-6-gdpr/" target="_blank">
                  {chunks}
                </Link>
              ),
            })}
            sx={{ maxWidth: "50%" }}
            renderField={props => <TextField {...props} fullWidth />}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlCheckbox
            name="duty_of_confidentiality"
            t={t}
            label={t.rich("lawfulBasisConfirmation", {
              link: chunks => (
                <Link
                  href="https://www.gov.uk/government/publications/accessing-ukhsa-protected-data/approval-standards-and-guidelines-confidential-patient-information"
                  target="_blank">
                  {chunks}
                </Link>
              ),
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlCheckbox
            name="national_data_optout"
            label={t("nationalDataOptOut")}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlWrapper
            name="request_frequency"
            t={t}
            placeholder=""
            renderField={props => (
              <RadioGroup {...props} row>
                <FormControlLabel
                  value={RequestFrequency.ONE_OFF}
                  control={<Radio />}
                  label={t("oneOffRequest")}
                  disabled={props.disabled}
                />
                <FormControlLabel
                  value={RequestFrequency.RECURRING}
                  control={<Radio />}
                  label={t("recurringDataset")}
                  disabled={props.disabled}
                />
              </RadioGroup>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlWrapper
            name="dataset_linkage_description"
            t={t}
            sx={{ maxWidth: "50%" }}
            renderField={props => (
              <TextField {...props} fullWidth multiline rows={4} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlWrapper
            name="data_minimisation"
            t={t}
            sx={{ maxWidth: "50%" }}
            renderField={props => (
              <TextField {...props} fullWidth multiline rows={4} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlWrapper
            name="data_use_description"
            t={t}
            sx={{ maxWidth: "50%" }}
            renderField={props => (
              <TextField {...props} fullWidth multiline rows={4} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlWrapper
            name="access_date"
            label={t("releaseDate")}
            description={t("releaseDateDescription")}
            placeholder=""
            sx={{ maxWidth: "40%" }}
            renderField={props => <DateInput {...props} />}
          />
        </Grid>
      </Grid>
      {projectId && (
        <FormActions>
          <ProfileNavigationFooter
            previousHref={injectParamsIntoPath(
              routes.profileCustodianProjectsSafeProject.path,
              {
                id: projectId,
              }
            )}
            isLoading={mutateState?.isPending}
          />
        </FormActions>
      )}
    </Form>
  );
}
