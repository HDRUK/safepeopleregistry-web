import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "@testing-library/jest-dom";
import { enGB } from "date-fns/locale/en-GB";
import { render, screen } from "../../utils/testUtils";
import DateInput, { DateInputProps } from "./DateInput";

const renderInput = (props: DateInputProps) => {
  return render(
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <DateInput {...props} />
    </LocalizationProvider>
  );
};

describe("DateInput Component", () => {
  const defaultProps: DateInputProps = {
    label: "Select a date",
    value: null,
    onChange: jest.fn(),
  };

  it("renders the component with a label", () => {
    renderInput(defaultProps);
    // Check if the label is rendered
    expect(screen.getByLabelText("Select a date")).toBeInTheDocument();
  });

  it("renders the DatePicker inside the LocalizationProvider", () => {
    renderInput(defaultProps);
    // Check if the date input field is rendered
    expect(
      screen.getByRole("textbox", { name: "Choose date" })
    ).toBeInTheDocument();
  });

  it("displays the correct value when a date is provided", () => {
    const date = new Date("2024-11-20");
    renderInput({ ...defaultProps, value: date } as DateInputProps);

    // Ensure the input displays the correct date
    const input = screen.getByRole("textbox", {
      name: "Choose date, selected date is 20 Nov 2024",
    }) as HTMLInputElement;
    expect(input.value).toBe("20/11/2024");
  });

  it("displays an empty value when no date is provided", () => {
    renderInput({ ...defaultProps, value: null } as DateInputProps);

    // Ensure the input is empty if no value is provided
    const input = screen.getByRole("textbox", {
      name: "Choose date",
    }) as HTMLInputElement;
    expect(input.value).toBe("");
  });
});
