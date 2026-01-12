import {
  postCustodianInviteUserQuery,
  postOrganisationInviteUserQuery,
} from "@/services/organisations";
import { TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ReactNode, useMemo, useState } from "react";
import Form from "../../components/Form";
import FormControlWrapper from "../../components/FormControlWrapper";
import yup from "../../config/yup";
import { MAX_FORM_WIDTH } from "../../consts/form";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import useOrganisationInvite from "../../queries/useOrganisationInvite";
import { getUsers } from "../../services/users";
import {
  EmailChangeFormValues,
  InviteUserFormValues,
  QueryState,
} from "../../types/form";
import { checkEmailExists, getCombinedQueryState } from "../../utils/query";
import { t } from "framer-motion/dist/types.d-B_QPEvFK";
import { WithTranslations } from "@/types/application";
import FormActions from "@/components/FormActions";
import { LoadingButton } from "@mui/lab";
import ButtonSave from "@/components/ButtonSave";

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_ORGANISATION = "Users.InviteUser";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export type EmailChangeFormProps = WithTranslations<{
  onSubmit?: (fields: EmailChangeFormValues) => void;
  actions: ReactNode;
  validateEmail?: (email: string) => Promise<boolean>;
  queryState: QueryState;
}>;

export default function EmailChangeForm({
  actions,
  onSubmit,
  validateEmail,
  queryState,
  t,
}: EmailChangeFormProps) {
  const schema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email(t("emailFormatInvalid"))
          .required(t("emailRequiredInvalid"))
          .test(
            "email-exists",
            t("emailAlreadyExists"),
            async function (value) {
              return !!validateEmail?.(value);
            }
          ),
      }),
    [t]
  );

  const formOptions = {
    defaultValues: {
      email: "",
    },
  };

  return (
    <Form
      data-cy="email-change"
      onSubmit={onSubmit}
      schema={schema}
      {...formOptions}
      sx={{ maxWidth: MAX_FORM_WIDTH }}>
      <FormControlWrapper
        name="email"
        renderField={fieldProps => <TextField {...fieldProps} />}
      />
      <FormActions>
        {actions}
        <ButtonSave loading={queryState.isLoading}>
          {t(`updateButton`)}
        </ButtonSave>
      </FormActions>
    </Form>
  );
}
