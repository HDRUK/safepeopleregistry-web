import { useTranslations } from "next-intl";
import { Grid, Box } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { LoadingButton } from "@mui/lab";
import { useMemo } from "react";
import { UseCustodianProjectUserResult } from "@/hooks/useCustodianProjectUser/useCustodianProjectUser";
import { UseCustodianProjectOrganisationResult } from "@/hooks/useCustodianProjectOrganisation/useCustodianProjectOrganisation";
import FormControl from "../../components/FormControlWrapper";
import Form from "../../components/Form";
import yup from "../../config/yup";
import SelectValidationActionStatus from "../../components/SelectValidationActionStatus";

const NAMESPACE_TRANSLATION_ACTION_VALIDATION = "ActionValidationPanel";

export interface ActionValidationStatusFormValues {
  status: string;
  comment: string;
}

export type UseApprovalHook<TParams> = (
  params: TParams
) => UseCustodianProjectUserResult | UseCustodianProjectOrganisationResult;

interface ActionValidationStatusProps<TParams> {
  useApprovalHook: UseApprovalHook<TParams>;
  hookParams: TParams;
  disabled?: boolean;
}

const ActionValidationStatus = <TParams,>({
  useApprovalHook,
  hookParams,
  disabled,
}: ActionValidationStatusProps<TParams>) => {
  const t = useTranslations(NAMESPACE_TRANSLATION_ACTION_VALIDATION);
  const { data, statusOptions, changeValidationStatus, isLoading } =
    useApprovalHook(hookParams);

  const schema = yup.object().shape({
    status: yup.string().required(),
    comment: yup.string(),
  });

  const statusSlug = data?.model_state?.state?.slug;

  const formOptions = useMemo(
    () => ({
      defaultValues: {
        status: statusSlug,
        comment: "",
      },
    }),
    [statusSlug]
  );

  const handleSubmit = (formData: ActionValidationStatusFormValues) => {
    const { status, comment } = formData;
    changeValidationStatus({ status, comment });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Form
        key={statusSlug ?? "no-status"}
        schema={schema}
        onSubmit={handleSubmit}
        {...formOptions}>
        <Grid item xs={12}>
          <FormControl
            disabled={disabled}
            name="status"
            renderField={fieldProps => (
              <SelectValidationActionStatus
                options={statusOptions || []}
                isLoading={isLoading}
                {...fieldProps}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            name="comment"
            renderField={fieldProps => (
              <TextareaAutosize
                disabled={disabled}
                id="comment"
                value={fieldProps.value}
                onChange={fieldProps.onChange}
                placeholder={fieldProps?.placeholder}
                style={{ width: "100%" }}
                minRows={8}
              />
            )}
          />
        </Grid>
        {/* note: to be implemented in the future to upload some sort of evidence?
        <Grid container item spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={4}>
            <FileLink
              fileButtonText={file?.name || "Select files"}
              fileNameText={file?.name}
              {...uploadRest}
              includeStatus
            />
          </Grid>
        </Grid>
        */}
        <Grid item xs={12}>
          <LoadingButton
            disabled={disabled}
            loading={isLoading}
            type="submit"
            sx={{ display: "flex", justifySelf: "end" }}>
            {t("updateStatusButton")}
          </LoadingButton>
        </Grid>
      </Form>
    </Box>
  );
};

export default ActionValidationStatus;
