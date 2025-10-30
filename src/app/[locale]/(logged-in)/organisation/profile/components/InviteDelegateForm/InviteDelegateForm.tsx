"use client";

import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import FormSection from "@/components/FormSection";
import yup from "@/config/yup";
import { useStore } from "@/data/store";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import Form from "@/components/Form";
import {
  PostOrganisationInviteUserPayload,
  postOrganisationInviteUser,
} from "@/services/organisations";
import { EMAIL_TEMPLATE } from "@/consts/application";
import SelectDepartments from "@/components/SelectDepartments";
import { UserGroup } from "@/consts/user";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { DelegatesFormValues } from "@/types/form";

export interface InvitedDelegatesFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NAMESPACE_TRANSLATION_DELEGATES = "Form";
export default function InviteDelegateForm({
  onSuccess,
  onCancel,
}: InvitedDelegatesFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_DELEGATES);
  const organisation = useStore(state => state.config.organisation);

  const { mutateAsync, ...restPostState } = useMutation({
    mutationKey: ["inviteUser", organisation?.id],
    mutationFn: (payload: PostOrganisationInviteUserPayload) => {
      return postOrganisationInviteUser(organisation?.id, payload, {
        409: {
          message: "inviteUserConflict",
        },
        error: {
          message: "postDelegatesError",
        },
      });
    },
  });

  const handleDetailsSubmit = useCallback(
    async (fields: DelegatesFormValues) => {
      const payload: PostOrganisationInviteUserPayload = {
        email: fields.delegate_email,
        department_id: Number(fields.department_name) ?? null,
        first_name: fields.delegate_first_name,
        last_name: fields.delegate_last_name,
        role: fields.delegate_job_title,
        user_group: UserGroup.ORGANISATIONS,
        is_delegate: 1,
        identifier: EMAIL_TEMPLATE.DELEGATE_INVITE,
      };

      await mutateAsync(payload);
    },
    [mutateAsync, onSuccess, t]
  );

  useQueryAlerts(restPostState, {
    onSuccess,
    successAlertProps: {
      text: t("postDelegatesSuccess"),
      confirmButtonText: t("closeButton"),
    },
    errorAlertProps: {
      text: t("postDelegatesError"),
      confirmButtonText: t("errorButton"),
    },
  });

  const schema = useMemo(
    () =>
      yup.object().shape({
        department_name: yup.string(),
        delegate_first_name: yup
          .string()
          .required(t("delegateFirstNameRequiredInvalid")),
        delegate_last_name: yup
          .string()
          .required(t("delegateLastNameRequiredInvalid")),
        delegate_job_title: yup
          .string()
          .required(t("delegateJobTitleRequiredInvalid")),
        delegate_email: yup
          .string()
          .email(t("delegateEmailInvalid"))
          .required(t("delegateEmailRequiredInvalid")),
      }),
    [t]
  );

  const formOptions = {
    defaultValues: {
      department_name: "",
      delegate_first_name: "",
      delegate_last_name: "",
      delegate_job_title: "",
      delegate_email: "",
    },
  };

  return (
    <Form
      sx={{ mt: 1 }}
      schema={schema}
      onSubmit={handleDetailsSubmit}
      {...formOptions}>
      <>
        <FormSection>
          <Grid
            container
            rowSpacing={3}
            sx={{ width: "70%", justifyContent: "flex-start" }}>
            <Grid item xs={12}>
              <FormControlWrapper
                name="delegate_first_name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlWrapper
                name="delegate_last_name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlWrapper
                name="department_name"
                renderField={fieldProps => (
                  <SelectDepartments
                    organisation={organisation}
                    {...fieldProps}
                    inputProps={{
                      "aria-label": t("departmentNameAriaLabel"),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlWrapper
                name="delegate_job_title"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlWrapper
                name="delegate_email"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
          </Grid>
        </FormSection>
        <FormActions>
          <Button variant="outlined" onClick={onCancel}>
            {t("cancelButton")}
          </Button>
          <LoadingButton loading={restPostState.isPending} type="submit">
            {t("inviteButton")}
          </LoadingButton>
        </FormActions>
      </>
    </Form>
  );
}
