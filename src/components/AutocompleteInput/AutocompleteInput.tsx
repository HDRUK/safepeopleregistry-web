import React from "react";
import { Autocomplete, AutocompleteProps } from "@mui/material";

// Define the shape of the option used in Autocomplete
interface Option {
  label: string;
  value: string;
}

export interface AutocompleteInputProps extends AutocompleteProps<
  Option,
  false,
  false,
  false
> {
  placeholder?: string;
}
const AutocompleteInput = ({
  options,
  value,
  onChange,
  ...rest
}: AutocompleteInputProps) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={option => option.label}
      value={options.find(opt => opt === value) || null}
      onChange={onChange}
      clearOnBlur={false}
      fullWidth
      {...rest}
    />
  );
};

export default AutocompleteInput;
