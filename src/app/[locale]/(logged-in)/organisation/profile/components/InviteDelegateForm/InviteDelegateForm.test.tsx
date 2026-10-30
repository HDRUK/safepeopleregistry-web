import { UserGroup } from "@/consts/user";
import { useStore } from "@/data/store";
import { PostOrganisationInviteUserResponse } from "@/services/organisations";
import { ResponseJson } from "@/types/requests";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { postOrganisationInviteUser } from "@/app/actions/organisations";
import InviteDelegateForm from "./InviteDelegateForm";

jest.mock("@/data/store");
jest.mock("@/app/actions/organisations");

const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;
const mockPostOrganisationsInviteUser =
  postOrganisationInviteUser as jest.MockedFunction<
    typeof postOrganisationInviteUser
  >;

describe("DelegatesForm", () => {
  const queryClient = new QueryClient();
  const onSuccess = jest.fn();

  beforeEach(() => {
    const state = {
      config: {
        organisation: {
          id: 1,
          departments: [
            { id: 1, name: "Department 1" },
            { id: 2, name: "Department 2" },
          ],
        },
      },
    };
    mockUseStore.mockImplementation(selector => selector(state));

    mockPostOrganisationsInviteUser.mockResolvedValue(
      {} as ResponseJson<PostOrganisationInviteUserResponse>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <InviteDelegateForm onSuccess={onSuccess} />
      </QueryClientProvider>
    );
  };

  it("renders the form fields", () => {
    renderComponent();

    expect(
      screen.getByRole("combobox", { name: /Department/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /First name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Last name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Job title/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Email/i })).toBeInTheDocument();
  });

  const fillRequiredFields = () => {
    fireEvent.change(
      screen.getByTestId("delegate_first_name").querySelector("input")!,
      { target: { value: "John" } }
    );
    fireEvent.change(
      screen.getByTestId("delegate_last_name").querySelector("input")!,
      { target: { value: "Doe" } }
    );
    fireEvent.change(
      screen.getByTestId("delegate_job_title").querySelector("input")!,
      { target: { value: "Manager" } }
    );
    fireEvent.change(
      screen.getByTestId("delegate_email").querySelector("input")!,
      { target: { value: "john@example.com" } }
    );
  };

  const expectedPayload = {
    email: "john@example.com",
    first_name: "John",
    last_name: "Doe",
    role: "Manager",
    user_group: UserGroup.ORGANISATIONS,
    is_delegate: 1,
    identifier: "delegate_invite",
  };

  it("submits the selected department's id", async () => {
    renderComponent();

    fireEvent.mouseDown(screen.getByLabelText(/Department/i));
    fireEvent.click(screen.getByRole("option", { name: "Department 2" }));
    fillRequiredFields();

    fireEvent.click(screen.getByText(/invite/i));

    await waitFor(() => {
      expect(mockPostOrganisationsInviteUser).toHaveBeenCalledWith(
        1,
        { ...expectedPayload, department_id: 2 },
        expect.any(Object)
      );
    });
  });

  it("submits no department when none is selected", async () => {
    renderComponent();

    fillRequiredFields();

    fireEvent.click(screen.getByText(/invite/i));

    await waitFor(() => {
      expect(mockPostOrganisationsInviteUser).toHaveBeenCalledWith(
        1,
        { ...expectedPayload, department_id: undefined },
        expect.any(Object)
      );
    });
  });
});
