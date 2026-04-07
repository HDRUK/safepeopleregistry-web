import { useStore } from "@/data/store";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
  commonAccessibilityTests,
} from "@/utils/testUtils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProjectModal from "./AddProjectModal";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: mockPush }) }));

(useStore as unknown as jest.Mock) = jest.fn().mockReturnValue({
  getApplication: () => ({
    routes: { profileCustodianProjectsSafeProject: { path: "/projects/:id" } },
  }),
  getCustodian: () => ({ id: 123 }),
});

const mockMutationFn = jest.fn().mockResolvedValue({ data: 999 });
jest.mock("@/services/custodians", () => ({
  postCustodianProjectQuery: () => ({ mutationFn: mockMutationFn }),
}));

const mockOnClose = jest.fn();

const renderModal = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <AddProjectModal open onClose={mockOnClose} />
    </QueryClientProvider>
  );
};

const fillForm = () => {
  // Use the visible labels, not name attributes
  fireEvent.change(screen.getByLabelText(/title/i), {
    target: { value: "Test Project" },
  });
  fireEvent.change(screen.getByLabelText(/unique id/i), {
    target: { value: "ABC123" },
  });

  // DateInputs: query by placeholder text
  fireEvent.change(screen.getByPlaceholderText(/start date/i), {
    target: { value: "2025-01-01" },
  });
  fireEvent.change(screen.getByPlaceholderText(/end date/i), {
    target: { value: "2025-12-31" },
  });
};

describe("<AddProjectModal />", () => {
  afterEach(() => jest.clearAllMocks());

  it("submits form and calls create project mutation", async () => {
    renderModal();
    fillForm();

    act(() =>
      fireEvent.submit(screen.getByRole("button", { name: /create project/i }))
    );

    await waitFor(() => expect(mockMutationFn).toHaveBeenCalledTimes(1));
  });

  it("redirects to project page after success", async () => {
    renderModal();
    fillForm();

    act(() =>
      fireEvent.submit(screen.getByRole("button", { name: /create project/i }))
    );

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/projects/999"));
  });

  it("does not submit when required fields are missing", async () => {
    renderModal();
    // leave title empty
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "" },
    });

    act(() =>
      fireEvent.submit(screen.getByRole("button", { name: /create project/i }))
    );

    await waitFor(() => expect(mockMutationFn).not.toHaveBeenCalled());
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderModal());
  });
});
