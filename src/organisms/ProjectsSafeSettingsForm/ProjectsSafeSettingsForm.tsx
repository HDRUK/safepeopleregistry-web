import { useStore } from "@/data/store";
import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import Form, { FormProps } from "../../components/Form";
import FormActions from "../../components/FormActions";
import FormControlWrapper from "../../components/FormControlWrapper";
import ProfileNavigationFooter from "../../components/ProfileNavigationFooter";
import yup from "../../config/yup";
import { ProjectDetailsAccessType } from "../../consts/projects";
import { ProjectDetails } from "../../types/application";
import { MutationState } from "../../types/form";
import { injectParamsIntoPath } from "../../utils/application";

export interface ProjectsSafeSettingsFormProps extends Omit<
  FormProps<ProjectDetails>,
  "children"
> {
  projectId?: number;
  mutateState?: MutationState;
}

const NAMESPACE_TRANSLATION_FORM = "Form.SafeSettings";

export default function ProjectSafeSettingsForm({
  projectId,
  mutateState,
  ...restProps
}: ProjectsSafeSettingsFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const routes = useStore(state => state.getApplication().routes);

  const schema = useMemo(
    () =>
      yup.object().shape({
        access_type: yup.string(),
        data_privacy: yup.string(),
      }),
    []
  );

  const formOptions = {
    disabled: mutateState?.isPending || restProps.disabled,
    shouldResetKeep: true,
  };

  return (
    <Form
      aria-label="Safe settings"
      schema={schema}
      {...formOptions}
      {...restProps}
      autoComplete="off">
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <FormControlWrapper
            fullWidth
            name="access_type"
            t={tForm}
            renderField={fieldProps => (
              <RadioGroup
                value={fieldProps.access_type}
                name="access_type"
                {...fieldProps}>
                <FormControlLabel
                  value={ProjectDetailsAccessType.TRE}
                  control={<Radio />}
                  label={tForm("accessTypeSde")}
                  disabled={fieldProps.disabled}
                />
                <FormControlLabel
                  value={ProjectDetailsAccessType.RELEASE}
                  control={<Radio />}
                  label={tForm("accessTypeDataRelease")}
                  disabled={fieldProps.disabled}
                />
              </RadioGroup>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlWrapper
            name="data_privacy"
            t={tForm}
            renderField={fieldProps => (
              <TextField
                {...fieldProps}
                multiline
                style={{ width: "100%" }}
                minRows={6}
              />
            )}
          />
        </Grid>
      </Grid>
      {projectId && (
        <FormActions>
          <ProfileNavigationFooter
            previousHref={injectParamsIntoPath(
              routes.profileCustodianProjectsSafePeople.path,
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
