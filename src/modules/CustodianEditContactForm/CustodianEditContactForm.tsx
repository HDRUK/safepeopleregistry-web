import Form from "@/components/Form";
import FormControlWrapper from "@/components/FormControlWrapper";
import FormModalActions from "@/components/FormModalActions";
import FormModalBody from "@/components/FormModalBody";
import FormModalHeader from "@/components/FormModalHeader";
import yup from "@/config/yup";
import { CustodianUserRoles } from "@/consts/custodian";
import { useStore } from "@/data/store";
import { CustodianUser, WithTranslations } from "@/types/application";
import { CustodianEditContactFormFields, QueryState } from "@/types/form";
import {
  isCustodianAdministrator,
  isCustodianApprover,
} from "@/utils/custodian";
import CheckIcon from "@mui/icons-material/Check";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export type CustodianEditContactFormProps = WithTranslations<{
  user: Partial<CustodianUser>;
  queryState: QueryState;
  onSubmit: (payload: CustodianEditContactFormFields) => void;
  onClose: () => void;
}>;

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function CustodianEditContactForm({
  onClose,
  user,
  queryState,
  onSubmit,
  t,
}: CustodianEditContactFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const permissions = useStore(state => state.config.permissions);

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(tForm("firstNameRequiredInvalid")),
        last_name: yup.string().required(tForm("lastNameRequiredInvalid")),
        email: yup
          .string()
          .email(tForm("emailFormatInvalid"))
          .required(tForm("emailRequiredInvalid")),
        permissions: yup.string().required(tForm("permissionsRequiredInvalid")),
      }),
    []
  );

  const formOptions = {
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      permissions:
        (isCustodianAdministrator(user, permissions) &&
          CustodianUserRoles.ADMINISTRATOR) ||
        (isCustodianApprover(user, permissions) &&
          CustodianUserRoles.APPROVER) ||
        null,
    },
    disabled: queryState.isLoading,
  };

  return (
    <Form
      schema={schema}
      {...formOptions}
      onSubmit={onSubmit}
      shouldReset
      autoComplete="off">
      <>
        <FormModalHeader>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {user?.id ? t("updateUserTitle") : t("createUserTitle")}
          </Typography>
          <Typography>
            {user?.id ? t("updateUserDescription") : t("createUserDescription")}
          </Typography>
        </FormModalHeader>
        <FormModalBody>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <FormControlWrapper
                name="first_name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlWrapper
                name="last_name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlWrapper
                name="email"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
          </Grid>
        </FormModalBody>
        <FormModalHeader>
          <Typography variant="h4">Permissions</Typography>
        </FormModalHeader>

        <FormModalBody sx={{ mt: -1 }}>
          <FormControlWrapper
            name="permissions"
            t={t}
            displayLabel={false}
            renderField={fieldProps => (
              <RadioGroup
                value={fieldProps.permissions}
                name="permissions"
                sx={{ gap: 2 }}
                {...fieldProps}>
                <FormControlLabel
                  value={CustodianUserRoles.ADMINISTRATOR}
                  control={<Radio />}
                  label={
                    <Grid>
                      <Grid item>{t("roleAdministrator")}</Grid>
                      <Grid item>
                        <Typography
                          variant="small"
                          sx={{ color: "textSecondary.main" }}>
                          {t("roleAdministratorDescription")}
                        </Typography>
                      </Grid>
                    </Grid>
                  }
                />
                <FormControlLabel
                  value={CustodianUserRoles.APPROVER}
                  control={<Radio />}
                  label={
                    <Grid>
                      <Grid item>{t("roleApprover")} </Grid>
                      <Grid item>
                        <Typography
                          variant="small"
                          sx={{ color: "textSecondary.main" }}>
                          {t("roleApproverDescription")}
                        </Typography>
                      </Grid>
                    </Grid>
                  }
                />
              </RadioGroup>
            )}
          />
        </FormModalBody>

        <FormModalActions>
          <Button variant="outlined" onClick={onClose}>
            {t("cancelButton")}
          </Button>
          <LoadingButton
            type="submit"
            endIcon={<CheckIcon />}
            loading={queryState.isLoading}>
            {t("submitButton")}
          </LoadingButton>
        </FormModalActions>
      </>
    </Form>
  );
}
