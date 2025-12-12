import { Status } from "@/consts/application";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import ChipStatus from "../../components/ChipStatus";
import DateInput from "../../components/DateInput";
import Form, { FormProps } from "../../components/Form";
import FormActions from "../../components/FormActions";
import FormControlWrapper from "../../components/FormControlWrapper";
import FormFieldArray from "../../components/FormFieldArray";
import ProfileNavigationFooter from "../../components/ProfileNavigationFooter";
import yup from "../../config/yup";
import { ResearcherProject } from "../../types/application";
import { MutationState } from "../../types/form";
import SelectOrganisation from "@/components/SelectOrganisation";
import InviteUserModal from "@/organisms/InviteUserModal";
import InviteOrganisationModal from "@/organisms/InviteOrganisationModal";
import { useQueryClient } from "@tanstack/react-query";

export interface ProjectsSafeProjectFormProps
  extends FormProps<ResearcherProject> {
  mutateState: MutationState;
}

const NAMESPACE_TRANSLATION_FORM = "Form.SafeProject";

export default function ProjectsSafeProjectForm({
  mutateState,
  ...restProps
}: ProjectsSafeProjectFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const queryClient = useQueryClient();
  const [showInviteModal, setShowInviteModel] = useState(false);

  const schema = useMemo(
    () =>
      yup.object().shape({
        unique_id: yup.string().required(tForm("uniqueIdRequiredInvalid")),
        title: yup.string().required(tForm("titleRequiredInvalid")),
        request_category_type: yup.string().optional(),
        sponsor_id: yup.string().optional(),
        start_date: yup.string().required(tForm("startDateRequiredInvalid")),
        end_date: yup.string().nullable(),
        lay_summary: yup.string().optional(),
        public_benefit: yup.string().optional(),
        technical_summary: yup.string().optional(),
        status: yup.string().required(tForm("statusRequiredInvalid")),
      }),
    []
  );

  const handleInviteSuccess = (id: number) => {
    console.log("id", id);
    setShowInviteModel(false);

    queryClient.refetchQueries({
      queryKey: ["getOrganisations"],
    });
  };

  const formOptions = {
    disabled: mutateState.isPending,
    shouldResetKeep: true,
  };

  return (
    <Form
      aria-label="Safe project"
      schema={schema}
      {...formOptions}
      {...restProps}
      autoComplete="off">
      <Grid container columnSpacing={8}>
        <Grid
          item
          md={8}
          xs={12}
          order={{
            md: 1,
            xs: 2,
          }}>
          <Grid container rowSpacing={3} mb={5}>
            <Grid item xs={12}>
              <FormControlWrapper
                name="unique_id"
                t={tForm}
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlWrapper
                name="title"
                t={tForm}
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlWrapper
                name="sponsor_id"
                renderField={({ ...fieldProps }) => (
                  <SelectOrganisation {...fieldProps} />
                )}
                sx={{ mb: 1 }}
              />
              <Button
                color="primary"
                variant="outlined"
                onClick={() => setShowInviteModel(true)}>
                Invite sponsor to join
              </Button>
              <InviteOrganisationModal
                open={showInviteModal}
                onClose={() => setShowInviteModel(false)}
                onSuccess={handleInviteSuccess}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlWrapper
                name="request_category_type"
                t={tForm}
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container columnSpacing={3}>
                <Grid item xs={6}>
                  <FormControlWrapper
                    t={tForm}
                    name="start_date"
                    renderField={fieldProps => <DateInput {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlWrapper
                    t={tForm}
                    name="end_date"
                    renderField={fieldProps => <DateInput {...fieldProps} />}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControlWrapper
                name="lay_summary"
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
            <Grid item xs={12}>
              <FormControlWrapper
                name="public_benefit"
                t={tForm}
                renderField={fieldProps => (
                  <TextField
                    {...fieldProps}
                    style={{ width: "100%" }}
                    multiline
                    minRows={6}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlWrapper
                name="technical_summary"
                t={tForm}
                renderField={fieldProps => (
                  <TextField
                    {...fieldProps}
                    style={{ width: "100%" }}
                    multiline
                    minRows={6}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormFieldArray
                tKey={NAMESPACE_TRANSLATION_FORM}
                name="other_approval_committees"
                addButtonLabel={tForm("add")}
                createNewRow={() => ""}
                renderField={(_, index, removeButton) => (
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <FormControlWrapper
                        displayLabel={false}
                        placeholder={tForm(
                          "otherApprovalCommitteesPlaceholder"
                        )}
                        name={`other_approval_committees.${index}`}
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
          </Grid>
          <FormActions>
            <ProfileNavigationFooter isLoading={mutateState.isPending} />
          </FormActions>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          order={{
            md: 2,
            xs: 1,
          }}>
          <Paper
            elevation={0}
            sx={{ backgroundColor: "neutralGrey.main", p: 3 }}>
            <FormControlWrapper
              fullWidth
              name="status"
              t={tForm}
              renderField={fieldProps => (
                <RadioGroup
                  value={fieldProps.status}
                  name="status"
                  {...fieldProps}>
                  <FormControlLabel
                    value={Status.PROJECT_PENDING}
                    control={<Radio />}
                    label={<ChipStatus status={Status.PROJECT_PENDING} />}
                  />
                  <FormControlLabel
                    value={Status.PROJECT_APPROVED}
                    control={<Radio />}
                    label={<ChipStatus status={Status.PROJECT_APPROVED} />}
                  />
                  <FormControlLabel
                    value={Status.PROJECT_IN_PROGRESS}
                    control={<Radio />}
                    label={<ChipStatus status={Status.PROJECT_IN_PROGRESS} />}
                  />
                  <FormControlLabel
                    value={Status.PROJECT_COMPLETED}
                    control={<Radio />}
                    label={<ChipStatus status={Status.PROJECT_COMPLETED} />}
                  />
                  <FormControlLabel
                    value={Status.PROJECT_DECLINED_APPROVAL}
                    control={<Radio />}
                    label={
                      <ChipStatus status={Status.PROJECT_DECLINED_APPROVAL} />
                    }
                  />
                </RadioGroup>
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    </Form>
  );
}
