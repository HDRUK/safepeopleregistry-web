import { useStore } from "@/data/store";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import Form, { FormProps } from "../../components/Form";
import FormActions from "../../components/FormActions";
import FormControlWrapper from "../../components/FormControlWrapper";
import FormFieldArray from "../../components/FormFieldArray";
import ProfileNavigationFooter from "../../components/ProfileNavigationFooter";
import yup from "../../config/yup";
import { VALIDATION_URL } from "../../consts/form";
import { ProjectDetails } from "../../types/application";
import { MutationState } from "../../types/form";
import { injectParamsIntoPath } from "../../utils/application";

export interface ProjectsSafeOutputsFormFieldValues {
  data_assets: string;
  research_outputs: string[];
}

export interface ProjectsSafeOutputsFormProps extends Omit<
  FormProps<ProjectDetails>,
  "children"
> {
  projectId?: number;
  mutateState?: MutationState;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";
const NAMESPACE_TRANSLATION_FORM = "Form.SafeOutputs";

export default function ProjectsSafeOutputsForm({
  projectId,
  mutateState,
  ...restProps
}: ProjectsSafeOutputsFormProps) {
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const routes = useStore(state => state.getApplication().routes);

  const schema = useMemo(
    () =>
      yup.object().shape({
        data_assets: yup.string(),
        research_outputs: yup
          .array()
          .of(yup.string().matches(VALIDATION_URL, tForm("urlFormatInvalid"))),
      }),
    []
  );

  const formOptions = {
    disabled: mutateState?.isPending || restProps.disabled,
    shouldResetKeep: true,
  };

  return (
    <Form schema={schema} {...formOptions} {...restProps} autoComplete="off">
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <FormFieldArray
            tKey={NAMESPACE_TRANSLATION_FORM}
            name="research_outputs"
            addButtonLabel={tApplication("addLink")}
            createNewRow={() => ""}
            renderField={(_, index, removeButton) => (
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <FormControlWrapper
                    displayLabel={false}
                    name={`research_outputs.${index}`}
                    placeholder={tApplication("link")}
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={1}>
                  {removeButton}
                </Grid>
              </Grid>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlWrapper
            name="data_assets"
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
              routes.profileCustodianProjectsSafeSettings.path,
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
