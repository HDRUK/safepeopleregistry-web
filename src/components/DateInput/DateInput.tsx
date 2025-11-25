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

export interface DateInputProps
  extends Omit<DatePickerProps<Date>, "onChange"> {
  id?: string;
  label?: string;
  format?: string;
  onChange?: (
    value: Date | string | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => void;
}

const DateInput = ({
  label,
  value,
  onChange = () => {},
  id,
  format: dateFormat = "dd/MM/yyyy",
  ...restProps
}: DateInputProps) => {
  const localeString = useLocale();
  const locale = localeString === "en" ? enGB : enGB; // Add more locales as needed

  const parseDate = (data: Date | string | null) => {
    if (!data) return data;

    if (dayjs(data, dateFormat).isValid() && data !== "Invalid Date") {
      return new Date(data);
    }

    return null;
  };

  const handleChange = (
    date: Date,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    onChange(parseDate(date), context);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <DatePicker
        label={label}
        value={parseDate(value)}
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
            error: restProps.error,
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
