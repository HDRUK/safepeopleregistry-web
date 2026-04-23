import ButtonSave from "@/components/ButtonSave";
import Form, { FormProps } from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import yup from "@/config/yup";
import { VALIDATION_INTEGRATION_ID } from "@/consts/form";
import { Custodian, WithTranslations } from "@/types/application";
import { WithMutationState } from "@/types/form";
import { Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { PropsWithChildren } from "react";

export interface CustodianIntegrationsFormsValues {
  gateway_app_id: string;
  gateway_client_id: string;
}

export type CustodianIntegrationsFormProps = PropsWithChildren<
  WithMutationState<
    WithTranslations<{
      custodian: Custodian;
    }>
  >
> &
  FormProps<CustodianIntegrationsFormsValues>;

export default function CustodianIntegrationsForms({
  custodian,
  t,
  mutateState,
  children,
  ...restProps
}: CustodianIntegrationsFormProps) {
  const schema = yup.object<CustodianIntegrationsFormsValues>().shape({
    gateway_app_id: yup
      .string()
      .matches(VALIDATION_INTEGRATION_ID, t("integrationIdFormatInvalid"))
      .required(),
    gateway_client_id: yup
      .string()
      .matches(VALIDATION_INTEGRATION_ID, t("integrationIdFormatInvalid"))
      .required(),
  });

  return (
    <Form<CustodianIntegrationsFormsValues>
      aria-label="Integrations"
      schema={schema}
      key={`${custodian?.id}-integrations`}
      {...restProps}>
      <>
        <Grid container spacing={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 6 }}>
              <Image
                src="/images/logos/gateway-main.svg"
                width={228}
                height={122}
                alt={t("dsitLogoAlt")}
              />
              <Typography sx={{ my: 1 }}>
                {t("integrationsDescription")}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} size={{ xs: 12 }}>
            <Grid size={{ xs: 6 }}>
              <FormControlWrapper
                t={t}
                name="gateway_app_id"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} size={{ xs: 12 }}>
            <Grid size={{ xs: 6 }}>
              <FormControlWrapper
                t={t}
                name="gateway_client_id"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
          </Grid>
        </Grid>
        {children || (
          <FormActions>
            <ButtonSave isLoading={mutateState.isPending} />
          </FormActions>
        )}
      </>
    </Form>
  );
}
