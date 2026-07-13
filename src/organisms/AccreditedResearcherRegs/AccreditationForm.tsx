import ButtonSave from "@/components/ButtonSave";
import DateInput from "@/components/DateInput/DateInput";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions/FormActions";
import FormControl from "../../components/FormControlWrapper";
import yup from "@/config/yup";
import { useStore } from "@/data/store";
import { PostAccreditationsPayload } from "@/services/accreditations/types";
import { ResearcherAccreditation, Accreditation } from "@/types/application";
import { formatDBDateTime } from "@/utils/date";
import { Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import Grid from "node_modules/@mui/material/esm/Grid/Grid";
import { useMemo } from "react";

interface AccreditationFormValues {
  associated_organisation_name: string | null;
  id_string: string;
  issue_date: string;
  expiry_date: string;
}

interface AccreditationFormProps {
  onSubmit: (values: PostAccreditationsPayload) => void;
  isPending: boolean;
  onCancel: () => void;
  initialValues?: Accreditation;
}

export default function AccreditationForm({
  onSubmit,
  isPending,
  onCancel,
  initialValues,
}: AccreditationFormProps) {
  const [user, setUser] = useStore(store => [store.config.user, store.setUser]);

  const schema = useMemo(
    () =>
      yup.object().shape({
        associated_organisation_name: yup
          .string()
          .required("Associated organisation name is required"),
        id_string: yup.string().required("ID string is required"),
        issue_date: yup
          .string()
          .required("Issue date is required")
          .test("is-past", "Issue date must be in the past", value => {
            return (
              dayjs(value).isBefore(dayjs()) ||
              dayjs(value).isSame(dayjs(), "day")
            );
          }),
        expiry_date: yup
          .string()
          .required("Expiry date is required")
          .test(
            "after-awarded",
            "Expiry date must be after issue date",
            (value, context) => {
              const { issue_date } = context.parent;
              return dayjs(value).isAfter(dayjs(issue_date));
            }
          )
          .test("is-future", "Expiry date must be in the future", value => {
            return dayjs(value).isAfter(dayjs());
          }),
      }),
    []
  );

  const formOptions = {
    defaultValues: {
      associated_organisation_name:
        initialValues?.associated_organisation_name || "",
      id_string: initialValues?.id_string || "",
      issue_date: initialValues?.issue_date || "",
      expiry_date: initialValues?.expiry_date || "",
    },
  };

  const handleSubmit = (fields: AccreditationFormValues) => {
    const formattedFields = {
      ...fields,
      associated_organisation_name: fields.associated_organisation_name || null,
      id_string: fields.id_string,
      issue_date: formatDBDateTime(fields.issue_date),
      expiry_date: formatDBDateTime(fields.expiry_date),
    };
    onSubmit(formattedFields);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      schema={schema}
      {...formOptions}
      key={user?.id}>
      <Grid container rowSpacing={3}>
        <Grid size={{ xs: 12 }} key="associated_organisation_name">
          <FormControl
            name="associated_organisation_name"
            label={"Associated Organisation Name"}
            renderField={props => <TextField {...props} />}
          />
        </Grid>
        <Grid size={{ xs: 12 }} key="id_string">
          <FormControl
            name="id_string"
            label={"ID"}
            renderField={props => <TextField {...props} />}
          />
        </Grid>
        <Grid size={{ xs: 7 }} key="issue_date">
          <FormControl
            name="issue_date"
            label={"Issue Date"}
            renderField={props => <DateInput {...props} />}
          />
        </Grid>
        <Grid size={{ xs: 7 }} key="expiry_date">
          <FormControl
            name="expiry_date"
            label={"Expiry Date"}
            renderField={props => <DateInput {...props} />}
          />
        </Grid>
      </Grid>
      <FormActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <ButtonSave type="submit" disabled={isPending} />
      </FormActions>
    </Form>
  );
}
