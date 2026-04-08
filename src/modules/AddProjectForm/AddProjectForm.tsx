import DateInput from "@/components/DateInput";
import Form from "@/components/Form";
import FormControlWrapper from "@/components/FormControlWrapper";
import FormModalActions from "@/components/FormModalActions";
import FormModalBody from "@/components/FormModalBody";
import FormModalHeader from "@/components/FormModalHeader";
import yup from "@/config/yup";
import { WithTranslations } from "@/types/application";
import { CustodianProjectFormFields } from "@/types/form";

import CheckIcon from "@mui/icons-material/Check";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export type AddProjectFormProps = WithTranslations<{
  onSubmit: (payload: CustodianProjectFormFields) => void;
  onClose: () => void;
}>;

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function AddProjectForm({
  onClose,
  onSubmit,
  t,
}: AddProjectFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const schema = useMemo(
    () =>
      yup.object().shape({
        title: yup.string().required(tForm("titleRequiredInvalid")),
        unique_id: yup
          .string()
          .required(tForm("uniqueIdRequiredInvalid"))
          .matches(/^[a-zA-Z0-9]+$/, tForm("uniqueIdMatchInvalid")),
        start_date: yup.string().required(tForm("startDateRequiredInvalid")),
        end_date: yup.string().nullable(),
      }),
    []
  );

  const formOptions = {
    defaultValues: {
      unique_id: "",
      title: "",
    },
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
            {t("title")}
          </Typography>
          <Typography>{t("description")}</Typography>
        </FormModalHeader>
        <FormModalBody>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlWrapper
                name="title"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlWrapper
                name="unique_id"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlWrapper
                name="start_date"
                renderField={fieldProps => <DateInput {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlWrapper
                name="end_date"
                renderField={fieldProps => <DateInput {...fieldProps} />}
              />
            </Grid>
          </Grid>
        </FormModalBody>

        <FormModalActions>
          <Button variant="outlined" onClick={onClose}>
            {t("cancelButton")}
          </Button>
          <Button type="submit" endIcon={<CheckIcon />}>
            {t("submitButton")}
          </Button>
        </FormModalActions>
      </>
    </Form>
  );
}
