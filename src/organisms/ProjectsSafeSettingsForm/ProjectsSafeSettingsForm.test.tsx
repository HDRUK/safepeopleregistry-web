import { mockedProjectDetails } from "@/mocks/data/project";
import { createProjectDetailDefaultValues } from "@/utils/form";
import {
  clearInputsByLabelText,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import ProjectsSafeSettingsForm, {
  ProjectsSafeSettingsFormProps,
} from "./ProjectsSafeSettingsForm";

const defaultProps = {
  defaultValues: createProjectDetailDefaultValues(mockedProjectDetails()),
  onSubmit: jest.fn().mockResolvedValue(null),
};

function setupTest(props?: ProjectsSafeSettingsFormProps) {
  return render(<ProjectsSafeSettingsForm {...defaultProps} {...props} />);
}

function getAllInputs() {
  return [
    /Within a Trusted Research Enviornment or Secure Data Enviornment \(SDE\)/,
    /Via a data release model/,
    /How has data been processed to enhance privacy?/,
  ];
}

describe("<ProjectsSafeSettingsForm />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all main form fields", () => {
    setupTest();

    const inputs = getAllInputs();

    inputs.forEach(selector => {
      expect(screen.getAllByLabelText(selector)[0]).toBeInTheDocument();
    });
  });

  it("submits the form when values are filled", async () => {
    setupTest();

    const form = await screen.findByRole("form", {
      name: "Safe settings",
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledWith(
        defaultProps.defaultValues
      );
    });
  });

  it("does not submit the form when values are cleared", async () => {
    setupTest();

    clearInputsByLabelText(getAllInputs());

    const form = await screen.findByRole("form", {
      name: "Safe settings",
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });
  });
});
