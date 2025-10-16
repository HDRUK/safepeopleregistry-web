import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { useLocale } from "next-intl";
import { enGB } from "date-fns/locale/en-GB";
import dayjs from "dayjs";
import { FORMAT_DATE_DB } from "../../consts/date";

export interface DateInputProps
  extends Omit<DatePickerProps<Date>, "onChange"> {
  id?: string;
  label?: string;
  format?: string;
  onChange?: (
    value: string | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => void;
}

const DateInput = ({
  label,
  value,
  onChange,
  id,
  format: dateFormat = "dd/MM/yyyy",
  ...restProps
}: DateInputProps) => {
  const localeString = useLocale();
  const locale = localeString === "en" ? enGB : enGB; // Add more locales as needed

  const parseDate = (dateValue: string | Date | null) => {
    if (!dateValue) return null;

    return dayjs(dateValue).format(FORMAT_DATE_DB);
  };

  const handleChange = (
    value: Date | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    onChange?.(parseDate(value), context);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <DatePicker
        aria-label="asdasdads"
        label={label}
        value={
          value && typeof value === "string"
            ? new Date(value)
            : value instanceof Date
              ? value
              : null
        }
        onChange={handleChange}
        format={dateFormat}
        slotProps={{
          popper: {
            "data-cy": `${id}-popover`,
          },
          inputAdornment: {
            "data-cy": `${id}-button`,
          },
          textField: {
            id,
            fullWidth: true,
            variant: "outlined",
            size: "small",
            inputProps: {
              "data-testid": (restProps as Record<string, string>)?.[
                "data-testid"
              ],
              "aria-labelledby": (restProps as Record<string, string>)?.[
                "aria-labelledby"
              ],
              ...restProps.inputProps,
            },
          },
        }}
        {...restProps}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
