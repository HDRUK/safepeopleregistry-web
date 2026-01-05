import {
  BaseSelectProps,
  Checkbox,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
  ListItemText,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import { ReactNode, useState } from "react";

export interface Action {
  label: string;
  onClick: () => void;
}

interface SearchActionMenuProps extends BaseSelectProps<string | string[]> {
  actions: Action[];
  renderedSelectedLabel: string;
  renderedDefaultLabel: string;
  startIcon?: ReactNode;
  onClear?: () => void;
}

const SearchActionMenu = ({
  actions,
  multiple,
  startIcon,
  renderedSelectedLabel,
  renderedDefaultLabel,
  onClear,
  ...restProps
}: SearchActionMenuProps) => {
  const [values, setValues] = useState<string | string[]>(multiple ? [] : "");

  const handleChange = (e: SelectChangeEvent<string | string[]>) => {
    setValues(e.target.value);
  };

  return (
    <Select
      inputProps={{ "aria-label": restProps["aria-label"] }}
      startAdornment={
        startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        )
      }
      endAdornment={
        !multiple && values && onClear ? (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={e => {
                e.stopPropagation();
                onClear();
                setValues("");
              }}
              aria-label="clear selection"
              tabIndex={-1}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null
      }
      multiple={multiple}
      displayEmpty
      value={values}
      onChange={handleChange}
      renderValue={selected => {
        if (Array.isArray(selected)) {
          return selected.length
            ? `${renderedSelectedLabel} (${selected.length})`
            : renderedDefaultLabel;
        }

        return selected
          ? `${renderedSelectedLabel} (${selected})`
          : renderedDefaultLabel;
      }}
      {...restProps}
      sx={{
        minWidth: "200px",
      }}>
      {actions?.map(({ label, onClick }) => (
        <MenuItem
          key={label}
          value={label}
          onClick={onClick}
          aria-label={label}>
          {Array.isArray(values) && (
            <Checkbox
              inputProps={{ "aria-label": `checkbox-${label}` }}
              checked={!!values?.find(item => item === label)}
              sx={{ p: 0, mr: 1 }}
            />
          )}

          <ListItemText primary={label} />
        </MenuItem>
      ))}
    </Select>
  );
};
export default SearchActionMenu;
