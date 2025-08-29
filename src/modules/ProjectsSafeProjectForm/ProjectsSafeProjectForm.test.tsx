import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { mockedProject } from "@/mocks/data/project";
import ProjectsSafeProjectForm, {
  ProjectsSafeProjectFormProps,
} from "./ProjectsSafeProjectForm";

const defaultProps: ProjectsSafeProjectFormProps = {
  mutateState: { isPending: false, isError: false, isSuccess: false },
  onSubmit: jest.fn(),
  defaultValues: mockedProject({
    unique_id: "123",
  }),
};

function setupTest(props?: Partial<ProjectsSafeProjectFormProps>) {
  return render(<ProjectsSafeProjectForm {...defaultProps} {...props} />);
}

function getAllInputs() {
  return [
    /ID/,
    /Name/,
    /Category/,
    "start_date",
    "end_date",
    /Lay summary/,
    /Public benefit statement/,
    /Technical summary/,
    /Approved/,
    /Pending approval/,
    /Completed/,
  ];
}

describe("<ProjectsSafeProjectForm />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders all main form fields", () => {
    setupTest();

    const inputs = getAllInputs();

    inputs.forEach(selector => {
      if (typeof selector === "string") {
        expect(screen.getByTestId(selector)).toBeInTheDocument();
      } else {
        expect(screen.getByLabelText(selector)).toBeInTheDocument();
      }
    });
  });

  it("submits the form when values are filled", async () => {
    setupTest();

    const form = await screen.findByRole("form", { name: "Safe project" });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledWith(
        defaultProps.defaultValues
      );
    });
  });

  it("does not submit the form when values are cleared", async () => {
    setupTest();

    const inputs = getAllInputs();

    clearInputsByLabelText(inputs.filter(input => typeof input !== "string"));

    const form = await screen.findByRole("form", { name: "Safe project" });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
