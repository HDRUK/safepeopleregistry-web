"use client";

import { getTranslationWithFallback } from "@/utils/translations";
import {
  Box,
  FormControl,
  FormControlLabelProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { ExtendedUseFormReturn } from "../Form";
import FormControlDescription from "../FormControlDescription";

export interface FormControlProps extends Omit<
  FormControlLabelProps,
  "control" | "label"
> {
  renderField: (fieldProps: FieldValues & { error?: boolean }) => ReactNode;
  name: string;
  subtitle?: ReactNode;
  description?: ReactNode;
  label?: string | ReactNode;
  control?: Control;
  placeholder?: string;
  displayLabel?: boolean;
  displayPlaceholder?: boolean;
  fullWidth?: boolean;
  t?: ReturnType<typeof useTranslations>;
  labelPosition?: "top" | "left" | "right";
  labelProps?: FormLabelProps;
}

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function FormControlWrapper({
  name,
  control,
  label,
  labelProps,
  placeholder,
  displayPlaceholder = false,
  displayLabel = true,
  renderField,
  fullWidth = true,
  description,
  subtitle,
  t,
  disabled,
  labelPosition = "top",
  sx = {},
}: FormControlProps) {
  let tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  if (t) {
    tForm = t;
  }

  const tKey = name?.replace(/_([a-zA-Z0-9])/g, g => g[1].toUpperCase());

  const context = useFormContext() as ExtendedUseFormReturn<FieldValues>;
  const effectiveControl = control || context.control;

  const { isFieldRequired } = context;
  const isRequired = isFieldRequired?.(name);

  const isHorizontal = labelPosition === "left" || labelPosition === "right";
  const flexDirection =
    labelPosition === "top"
      ? "column"
      : labelPosition === "left"
        ? "row"
        : "row-reverse";

  const controlSx = {
    m: 0,
    width: "100%",
    display: "flex",
    alignItems: isHorizontal ? "center" : "flex-start",
    flexDirection,
    ...sx,
  };

  const labelWidth = fullWidth ? "100%" : "auto";

  const descriptionText =
    description || getTranslationWithFallback(tForm, `${tKey}Description`);
  const subtitleText =
    subtitle || getTranslationWithFallback(tForm, `${tKey}Subtitle`);

  return (
    <Controller
      disabled={context.formState.disabled || disabled}
      name={name}
      control={effectiveControl}
      render={({
        field: { ref, ...field },
        fieldState: { invalid, error },
      }) => (
        <FormControl
          error={invalid}
          sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Box sx={controlSx}>
            <Box
              sx={{
                width: labelWidth,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}>
              {displayLabel && (
                <FormLabel
                  {...labelProps}
                  htmlFor={field.name}
                  sx={{ pb: 0.5, ...labelProps?.sx }}>
                  {label || tForm(tKey)}{" "}
                  {isRequired && <span style={{ color: "red" }}>*</span>}
                </FormLabel>
              )}
              {subtitleText && (
                <FormControlDescription sx={{ pt: 0, pb: 0.5 }}>
                  {subtitleText}
                </FormControlDescription>
              )}
            </Box>
            <Box sx={{ flex: 1, width: fullWidth ? "100%" : "auto" }}>
              {renderField({
                id: field.name,
                inputRef: ref,
                error: invalid,
                placeholder: displayPlaceholder
                  ? placeholder || tForm(`${tKey}Placeholder`)
                  : "",
                fullWidth,
                "data-testid": field.name,
                "aria-labelledby": `${field.name}-label`,
                inputProps: {
                  "aria-label": label || tForm(tKey),
                },
                ...field,
              })}
            </Box>
          </Box>
          {(descriptionText || error?.message) && (
            <Box sx={{ width: "100%", mt: 0.25 }}>
              {descriptionText && (
                <FormControlDescription>
                  {descriptionText}
                </FormControlDescription>
              )}
              {error?.message && (
                <FormHelperText>{error.message}</FormHelperText>
              )}
            </Box>
          )}
        </FormControl>
      )}
    />
  );
}
