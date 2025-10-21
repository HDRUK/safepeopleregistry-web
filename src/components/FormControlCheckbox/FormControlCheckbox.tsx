import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Control, useFormContext, useController } from "react-hook-form";
import { ReactNode } from "react";
import FormControlDescription from "../FormControlDescription";

interface FormControlCheckboxProps extends CheckboxProps {
  name: string;
  control?: Control;
  label: ReactNode;
  labelCaption?: ReactNode;
}

export default function FormControlCheckbox({
  name,
  control,
  label,
  labelCaption,
  ...restProps
}: FormControlCheckboxProps) {
  const context = useFormContext();
  const effectiveControl = control || context.control;
  const { field } = useController({
    name,
    control: effectiveControl,
  });

  const checked = !!field.value;

  return (
    <FormControlLabel
      sx={{ alignItems: "flex-start", display: "flex" }}
      control={
        <Checkbox
          id={name}
          sx={{ mt: "-10px" }}
          {...field}
          checked={checked}
          {...restProps}
        />
      }
      label={
        <>
          <Typography variant="small">{label}</Typography>
          {labelCaption && (
            <FormControlDescription>{labelCaption}</FormControlDescription>
          )}
        </>
      }
    />
  );
}
