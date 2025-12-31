"use client";

import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Grid,
  GridProps,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import React, { ReactNode } from "react";
import {
  Control,
  FieldError,
  FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";
import { ExtendedUseFormReturn } from "../Form/Form";
import FormControlDescription from "../FormControlDescription";

function inferComponentType(
  renderField: (fieldProps: FieldValues) => ReactNode
): string | null {
  const renderedElement = renderField({});
  if (React.isValidElement(renderedElement)) {
    if (renderedElement.type === TextField) return "textField";
    // Add more component types that have consistent placeholders if we need them
    // Placeholder for select not supported with MUI
  }
  return null;
}

export interface FormControlHorizontalProps extends Omit<
  FormControlProps,
  "error"
> {
  renderField: (fieldProps: FieldValues) => ReactNode;
  name: string;
  tNamespace?: string;
  control?: Control;
  placeholder?: string;
  label?: ReactNode;
  error?: FieldError;
  labelProps?: FormLabelProps;
  labelMd?: number;
  contentMd?: number;
  containerProps?: GridProps;
  displayLabel?: boolean;
  displayPlaceholder?: boolean;
  description?: ReactNode;
  required?: boolean;
}

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function FormControlHorizontal({
  name,
  control,
  label,
  placeholder,
  disabled,
  labelProps,
  containerProps,
  labelMd = 3,
  contentMd = 9,
  displayPlaceholder = true,
  displayLabel = true,
  renderField,
  fullWidth = true,
  tNamespace = "",
  description,
  required = false,
  ...restProps
}: FormControlHorizontalProps) {
  const t = useTranslations(tNamespace || NAMESPACE_TRANSLATION_FORM);

  const tKey = name?.replace(/_([a-zA-Z0-9])/g, function (g) {
    return g[1].toUpperCase();
  });

  const context = useFormContext() as ExtendedUseFormReturn<FieldValues>;
  const effectiveControl = control || context.control;

  const { isFieldRequired } = context;

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control: effectiveControl,
  });

  const isRequired = isFieldRequired(name) || required;

  const componentType = inferComponentType(renderField);

  return (
    <FormControl
      disabled={context.formState.disabled || disabled}
      size="small"
      {...restProps}
      fullWidth={fullWidth}
      error={!!error}>
      <Grid container columnSpacing={2} {...containerProps}>
        {displayLabel && (
          <Grid item md={labelMd} sx={{ display: "flex", pt: 1 }}>
            <FormLabel
              id={`${field.name}-label`}
              htmlFor={name}
              {...labelProps}
              sx={{
                ...labelProps?.sx,
                mb: { xs: 0.5, md: 0 },
              }}>
              {label || t(tKey)}
              {isRequired && <span style={{ color: "red" }}>*</span>}
            </FormLabel>
          </Grid>
        )}
        <Grid item xs={12} md={contentMd}>
          {renderField({
            id: field.name,
            placeholder: displayPlaceholder
              ? placeholder
              : componentType
                ? t(`${componentType}Placeholder`)
                : "",
            disabled,
            fullWidth,
            "data-testid": field.name,
            "aria-labelledby": `${field.name}-label`,
            ...field,
          })}
          {!!description && (
            <FormControlDescription>{description}</FormControlDescription>
          )}
          {!!error && <FormHelperText>{error.message}</FormHelperText>}
        </Grid>
      </Grid>
    </FormControl>
  );
}
