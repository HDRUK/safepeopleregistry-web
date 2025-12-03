import { mockedProjectDetails } from "@/mocks/data/project";
import { createProjectDetailDefaultValues } from "@/utils/form";
import {
  clearInputsByLabelText,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import ProjectsSafeDataForm, {
  ProjectsSafeDataFormProps,
} from "./ProjectsSafeDataForm";

const defaultProps = {
  defaultValues: createProjectDetailDefaultValues(mockedProjectDetails()),
  onSubmit: jest.fn().mockResolvedValue(null),
};

function setupTest(props?: ProjectsSafeDataFormProps) {
  return render(<ProjectsSafeDataForm {...defaultProps} {...props} />);
}

function getAllInputs() {
  return [
    /Data sensitivity level/,
    /Lawful condition for provision of data under Article 6/,
    /I confirm there is a lawful basis to hold and use this data in accordance with the common law duty of confidentiality/,
    /National data opt-out preferences have been applied to this data/,
    /One-off request/,
    /For linked datasets, specify how the linkage will take place/,
    /Approach to data minimisation/,
    /Data description/,
    /Release \/ access date/,
  ];
}

describe("<ProjectsSafeDataForm />", () => {
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
      name: "Safe data",
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
      name: "Safe data",
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });
  });
});
