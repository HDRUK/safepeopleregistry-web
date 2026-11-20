import { useStore } from "@/data/store";
import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { useTranslations } from "next-intl";
import CustodianEditContactForm, {
  CustodianEditContactFormProps,
} from "./CustodianEditContactForm";

jest.mock("@/services/custodians");
jest.mock("@/data/store");

const mockOnSubmit = jest.fn();
const mockOnClose = jest.fn();

const MOCK_ADMIN_PERMISSION = {
  custodian_user_id: 1,
  permission_id: 10,
  permission: {
    id: 10,
    created_at: "2025-07-21T09:12:14.000000Z",
    updated_at: "2025-07-21T09:12:14.000000Z",
    name: "CUSTODIAN_ADMIN",
    enabled: true,
  },
};

const defaultUser = mockedCustodianUser({
  user_permissions: [MOCK_ADMIN_PERMISSION],
});

const TestComponent = (props?: Partial<CustodianEditContactFormProps>) => {
  const t = useTranslations("CustodianProfile.EditContact");

  return (
    <CustodianEditContactForm
      user={defaultUser}
      queryState={{ isLoading: false, isError: false, error: "" }}
      onSubmit={mockOnSubmit}
      onClose={mockOnClose}
      t={t}
      {...props}
    />
  );
};

const setupTest = (props?: Partial<CustodianEditContactFormProps>) => {
  return render(<TestComponent {...props} />);
};

describe("<CustodianEditContactForm />", () => {
  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockReturnValue(mockedApiPermissions);
  });

  afterEach(() => {
    mockOnSubmit.mockReset();
    mockOnClose.mockReset();
  });

  it("submit is called", async () => {
    setupTest();

    const { email, first_name, last_name, user_permissions } = defaultUser;

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(mockOnSubmit.mock.lastCall[0]).toEqual({
        email,
        first_name,
        last_name,
        permissions: user_permissions[0].permission.name,
      });
    });
  });

  it.each(["first_name", "last_name", "email"])(
    "does not submit when %s is not defined",
    async testId => {
      setupTest();

      const parentDiv = screen.getByTestId(testId);
      const input = within(parentDiv).getByRole("textbox");
      const inputValue = faker.string.sample();

      fireEvent.change(input, {
        target: { value: inputValue },
      });

      fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

      expect(mockOnSubmit).not.toHaveBeenCalled();
    }
  );

  it("submits the read-only permission when Viewer is chosen", async () => {
    setupTest();

    fireEvent.click(screen.getByRole("radio", { name: /^Viewer/ }));
    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(mockOnSubmit.mock.lastCall[0].permissions).toBe(
        "CUSTODIAN_READ_ONLY"
      );
    });
  });

  it("selects the Viewer option for an existing viewer", () => {
    setupTest({
      user: mockedCustodianUser({
        user_permissions: [
          {
            custodian_user_id: 1,
            permission_id: 14,
            permission: mockedApiPermissions[13],
          },
        ],
      }),
    });

    expect(screen.getByRole("radio", { name: /^Viewer/ })).toBeChecked();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
