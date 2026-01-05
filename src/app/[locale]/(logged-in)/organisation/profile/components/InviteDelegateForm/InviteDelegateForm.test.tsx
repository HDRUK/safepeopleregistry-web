import { UserGroup } from "@/consts/user";
import { useStore } from "@/data/store";
import {
  PostOrganisationInviteUserResponse,
  postOrganisationInviteUser,
} from "@/services/organisations";
import { ResponseJson } from "@/types/requests";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InviteDelegateForm from "./InviteDelegateForm";

jest.mock("@/data/store");
jest.mock("@/services/organisations");

const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;
const mockPostOrganisationsInviteUser =
  postOrganisationInviteUser as jest.MockedFunction<
    typeof postOrganisationInviteUser
  >;

describe("DelegatesForm", () => {
  const queryClient = new QueryClient();
  const onSuccess = jest.fn();

  beforeEach(() => {
    mockUseStore.mockReturnValue({
      config: {
        organisation: {
          id: 1,
          departments: [
            { id: 1, name: "Department 1" },
            { id: 2, name: "Department 2" },
          ],
        },
      },
    });

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

  it("submits the form with valid data", async () => {
    renderComponent();

    const selectElement = screen.getByLabelText(/Department/i);
    fireEvent.mouseDown(selectElement);

    const option = screen.getByRole("listbox");
    fireEvent.click(option);
    fireEvent.mouseDown(document.body);
    fireEvent.keyDown(selectElement, { key: "Tab", code: "Tab" });

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

    const inviteButton = screen.getByText(/invite/i);
    expect(inviteButton).toBeInTheDocument();
    expect(inviteButton).toBeEnabled();
    fireEvent.click(inviteButton);

    await waitFor(() => {
      expect(mockPostOrganisationsInviteUser).toHaveBeenCalledWith(
        undefined,
        {
          email: "john@example.com",
          department_id: 0,
          first_name: "John",
          last_name: "Doe",
          role: "Manager",
          user_group: UserGroup.ORGANISATIONS,
          is_delegate: 1,
          identifier: "delegate_invite",
        },
        expect.any(Object)
      );
    });
  });
});
