"use client";

import AddressForm from "@/components/AddressForm";
import ButtonCancel from "@/components/ButtonCancel";
import ButtonSave from "@/components/ButtonSave";
import Form, { FormProps } from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControl from "@/components/FormControlWrapper";
import yup from "@/config/yup";
import {
  AddressFields,
  Subsidiary,
  WithTranslations,
} from "@/types/application";
import { WithMutationState } from "@/types/form";
import { Grid, TextField } from "@mui/material";
import { useMemo } from "react";

export type OrganisationsSubsidiaryEditFormValues = {
  name: string;
  address: AddressFields;
  website: string;
};

export type OrganisationsSubsidiaryEditFormProps = WithTranslations<
  WithMutationState<Omit<FormProps<Subsidiary>, "children">>
> & {
  onCancel: () => void;
};

export default function OrganisationsSubsidiaryEditForm({
  mutateState,
  defaultValues,
  t,
  onCancel,
  onSubmit,
  ...restProps
}: OrganisationsSubsidiaryEditFormProps) {
  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(t("subsidiaryNameRequired")),
        address: yup.object().shape({
          postcode: yup.string().required(t("postcodeRequiredInvalid")),
          address_1: yup.string().required(t("address1RequiredInvalid")),
          address_2: yup.string().nullable(),
          town: yup.string().required(t("townRequiredInvalid")),
          county: yup.string().nullable(),
          country: yup.string().nullable(),
        }),
        website: yup.string(),
      }),
    [t]
  );

  const formOptions = {
    defaultValues: {
      name: defaultValues?.name ?? "",
      address: {
        postcode: defaultValues?.postcode ?? "",
        address_1: defaultValues?.address_1 ?? "",
        address_2: defaultValues?.address_2 ?? "",
        town: defaultValues?.town ?? "",
        county: defaultValues?.county ?? "",
        country: defaultValues?.country ?? "United Kingdom",
      } as AddressFields,
      website: defaultValues?.website ?? "",
    },
  };

  const handleSubmit = (values: OrganisationsSubsidiaryEditFormValues) => {
    const { address, name, website } = values;

    onSubmit({
      name,
      website,
      ...address,
    });
  };

  return (
    <Form
      aria-label="Edit subsidiary"
      schema={schema}
      onSubmit={handleSubmit}
      {...formOptions}
      {...restProps}>
      <Grid
        container
        rowSpacing={3}
        sx={{ width: "100%", justifyContent: "flex-start" }}>
        <Grid size={{ xs: 12 }}>
          <FormControl
            name="name"
            renderField={fieldProps => <TextField {...fieldProps} />}
          />
        </Grid>

        <AddressForm name="address" />

        <Grid size={{ xs: 12 }}>
          <FormControl
            name="website"
            renderField={fieldProps => <TextField {...fieldProps} />}
          />
        </Grid>
      </Grid>
      <FormActions>
        <ButtonCancel onClick={onCancel} />
        <ButtonSave loading={mutateState.isPending} type="submit" />
      </FormActions>
    </Form>
  );
}
