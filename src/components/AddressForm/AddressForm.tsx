"use client";

import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import FormControlWrapper from "../FormControlWrapper";
import { AddressFields } from "../../types/application";
import GoogleAutocomplete from "../GoogleAutocomplete";
import SelectCountry from "../SelectCountry";

export interface AddressFormProps {
  name: string;
}

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function AddressForm({ name }: AddressFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const { setValue } = useFormContext();

  const handleFindAddress = (address: AddressFields) => {
    Object.entries(address).forEach(([key, value]) => {
      setValue(`${name}.${key}`, value ?? "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    });
  };

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <FormControlWrapper
          name={name}
          renderField={fieldProps => (
            <GoogleAutocomplete
              name={name}
              onAddressSelected={value => {
                handleFindAddress(value as AddressFields);
                return value;
              }}
              textFieldProps={{
                size: "small",
              }}
              fullWidth
              placeholder={t("addressPlaceholder")}
              {...fieldProps}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlWrapper
          name={`${name}.address_1`}
          label={t("address1")}
          renderField={fieldProps => (
            <TextField {...fieldProps} placeholder="" />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlWrapper
          name={`${name}.address_2`}
          label={t("address2")}
          renderField={fieldProps => (
            <TextField {...fieldProps} placeholder="" />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlWrapper
          name={`${name}.town`}
          label={t("town")}
          renderField={fieldProps => <TextField {...fieldProps} />}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlWrapper
          name={`${name}.county`}
          label={t("county")}
          renderField={fieldProps => <TextField {...fieldProps} />}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlWrapper
          name={`${name}.country`}
          label={t("country")}
          renderField={fieldProps => (
            <SelectCountry
              useCountryCode={false}
              {...fieldProps}
              value={fieldProps.value}
              onChange={fieldProps.onChange}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlWrapper
          displayPlaceholder={false}
          name={`${name}.postcode`}
          label={t("postcode")}
          renderField={fieldProps => <TextField {...fieldProps} />}
        />
      </Grid>
    </>
  );
}
