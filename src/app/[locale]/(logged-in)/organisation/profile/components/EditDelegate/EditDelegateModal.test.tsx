import { mockedUser } from "@/mocks/data/user";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import EditDelegateModal, { EditDelegateModalProps } from "./EditDelegateModal";

const mockMutateAsync = jest.fn().mockResolvedValue(null);

jest.mock("@/hooks/useQueryAlerts");

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn().mockImplementation(() => ({
    mutateAsync: payload => mockMutateAsync(payload),
    isLoading: false,
    isError: false,
    isSuccess: true,
  })),
}));

const defaultProps: EditDelegateModalProps = {
  user: mockedUser(),
  open: true,
  onClose: jest.fn(),
  onSuccess: jest.fn(),
};

function setupTest(props?: Partial<EditDelegateModalProps>) {
  return render(<EditDelegateModal {...defaultProps} {...props} />);
}

async function setupSubmitFormTest(props?: Partial<EditDelegateModalProps>) {
  const rendered = setupTest(props);

  const form = await screen.findByRole("form", {
    name: "Edit delegate",
  });
  fireEvent.submit(form);

  return rendered;
}

function getAllInputs() {
  return [/First name/, /Last name/, /Select department/];
}

describe("<EditDelegateModal />", () => {
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
    setupSubmitFormTest();

    const { first_name, last_name, departments } = defaultProps.user!;

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        first_name,
        last_name,
        department_id: departments?.[0].id,
      });
    });
  });

  it("uses useQueryAlert", async () => {
    setupSubmitFormTest();

    await waitFor(() => {
      expect(useQueryAlerts).toHaveBeenLastCalledWith(
        { isError: false, isLoading: false, isSuccess: true },
        {
          errorAlertProps: {
            text: expect.any(Object),
          },
          onSuccess: expect.any(Function),
          successAlertProps: {
            text: expect.any(String),
          },
        }
      );
    });
  });

  it("does not submit the form when a value is cleared", async () => {
    setupTest();

    const departmentId = screen
      .getByTestId("department_id")
      .querySelector("input");

    fireEvent.change(departmentId as HTMLInputElement, {
      target: { value: "" },
    });

    const form = await screen.findByRole("form", {
      name: "Edit delegate",
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockMutateAsync).not.toHaveBeenCalled();
    });
  });

  it("does not render form fields when closed", () => {
    setupTest({ open: false });

    expect(screen.queryByText("First name")).not.toBeInTheDocument();
  });
});
