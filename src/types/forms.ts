import { FormControlProps } from "@/components/FormControlWrapper";
import yup from "@/config/yup";
import { SxProps } from "@mui/system";
import { ComponentProps, ComponentType } from "react";

export type FormDefaultValue = string | number | boolean | Date;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormFieldConfig<T extends ComponentType<any>> = {
  name: string;
  label?: string;
  component: T;
  componentProps?: ComponentProps<T>;
  formControlProps?: FormControlProps;
  fieldSx?: SxProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation?: yup.Schema<any>;
  defaultValue?: FormDefaultValue;
  defaultValues?: FormDefaultValue[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormFieldsConfig = FormFieldConfig<ComponentType<any>>[];

export type FormSection = {
  sectionId: number;
  sectionTitle: string;
  sectionBoxSx?: SxProps;
  fields: FormFieldsConfig;
};

export type FormConfig = FormSection[];
