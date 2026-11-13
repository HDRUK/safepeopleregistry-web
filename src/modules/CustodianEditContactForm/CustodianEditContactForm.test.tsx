import { useFeatures } from "@/components/FeatureProvider";
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
jest.mock("@/components/FeatureProvider", () => ({
  useFeatures: jest.fn(),
}));

// Fake Viewer permission, because the API doesn't have one yet.
const MOCK_VIEWER_PERMISSION = {
  id: 999,
  created_at: "2025-07-21T09:12:14.000000Z",
  updated_at: "2025-07-21T09:12:14.000000Z",
  name: "CUSTODIAN_VIEWER",
  enabled: true,
};

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
    (useStore as unknown as jest.Mock).mockReturnValue([
      ...mockedApiPermissions,
      MOCK_VIEWER_PERMISSION,
    ]);
    (useFeatures as jest.Mock).mockReturnValue({
      isCustodianViewerRoleEnabled: false,
    });
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

  it("hides the Viewer option when the flag is off", () => {
    setupTest();

    expect(
      screen.queryByRole("radio", { name: /^Viewer/ })
    ).not.toBeInTheDocument();
  });

  it("shows the Viewer option when the flag is on", () => {
    (useFeatures as jest.Mock).mockReturnValue({
      isCustodianViewerRoleEnabled: true,
    });

    setupTest();

    expect(screen.getByRole("radio", { name: /^Viewer/ })).toBeInTheDocument();
  });

  it("shows and selects the Viewer option for an existing viewer when the flag is off", () => {
    setupTest({
      user: mockedCustodianUser({
        user_permissions: [
          {
            custodian_user_id: 1,
            permission_id: MOCK_VIEWER_PERMISSION.id,
            permission: MOCK_VIEWER_PERMISSION,
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
