import {
  fireEvent,
  render,
  screen,
  waitFor,
  commonAccessibilityTests,
} from "@/utils/testUtils";
import AddProjectModal, { AddProjectModalProps } from "./AddProjectModal";

type MockDateInputProps = {
  value?: string | null;
  name?: string;
  onChange?: (value: string | null) => void;
};

jest.mock("@/components/DateInput", () => ({
  __esModule: true,
  default: ({ value, onChange, name }: MockDateInputProps) => (
    <input
      data-testid={name}
      name={name}
      value={value ?? ""}
      onChange={e => onChange?.(e.target.value)}
    />
  ),
}));

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const postCustodianProject = jest.fn().mockResolvedValue({ data: 1 });

jest.mock("@/services/custodians", () => ({
  postCustodianProjectQuery: jest.fn(() => ({
    mutationKey: ["postCustodianProject"],
    mutationFn: postCustodianProject,
  })),
}));

const mockOnClose = jest.fn();

const renderModal = (props?: Partial<AddProjectModalProps>) => {
  return render(<AddProjectModal open onClose={mockOnClose} {...props} />);
};

const submitForm = async () => {
  fireEvent.change(screen.getByRole("textbox", { name: /Name/i }), {
    target: { value: "Test Project" },
  });

  fireEvent.change(screen.getByRole("textbox", { name: /ID/i }), {
    target: { value: "Test ID" },
  });

  fireEvent.change(screen.getByTestId("start_date"), {
    target: { value: "01-01-2025" },
  });

  fireEvent.change(screen.getByTestId("end_date"), {
    target: { value: "10-10-2025" },
  });

  fireEvent.submit(screen.getByRole("button", { name: /Create project/i }));
};

describe("<AddProjectModal />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("submits form and calls create project mutation", async () => {
    renderModal();

    await submitForm();

    await waitFor(() => {
      expect(postCustodianProject).toHaveBeenCalledTimes(1);
    });
  });

  it("does not submit when required fields are missing", async () => {
    renderModal();

    fireEvent.change(screen.getByRole("textbox", { name: /ID/i }), {
      target: { value: "Test ID" },
    });

    fireEvent.change(screen.getByTestId("start_date"), {
      target: { value: "01-01-2025" },
    });

    fireEvent.change(screen.getByTestId("end_date"), {
      target: { value: "10-10-2025" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Create project/i }));

    await waitFor(() => {
      expect(postCustodianProject).not.toHaveBeenCalled();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderModal());
  });
});
