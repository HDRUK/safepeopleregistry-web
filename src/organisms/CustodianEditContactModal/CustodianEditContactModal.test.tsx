import { useStore } from "@/data/store";
import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import {
  putCustodianUser,
  postCustodianUser,
  postCustodianUserInvite,
} from "@/services/custodian_users";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { mock200Json } from "jest.utils";
import CustodianEditContactModal, {
  CustodianEditContactModalProps,
} from "./CustodianEditContactModal";

jest.mock("@/services/custodian_users");
jest.mock("@/data/store");

(useStore as unknown as jest.Mock).mockReturnValue(mockedApiPermissions);
(postCustodianUser as unknown as jest.Mock).mockResolvedValue(
  mock200Json(1).json()
);

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

const renderCustodianEditContactModalDetails = (
  props?: Partial<CustodianEditContactModalProps>
) => {
  return render(
    <CustodianEditContactModal
      user={defaultUser}
      onClose={mockOnClose}
      open
      {...props}
    />
  );
};

const renderCustodianEditContactModalDetailsUpdate = (id?: number) => {
  renderCustodianEditContactModalDetails({
    user: {
      ...defaultUser,
      id,
    },
  });

  fireEvent.submit(screen.getByRole("button", { name: /Save/i }));
};

describe("<CustodianEditContactModal />", () => {
  afterEach(() => {
    mockOnClose.mockReset();
  });

  it("update user is called with an id", async () => {
    renderCustodianEditContactModalDetailsUpdate(1);

    await waitFor(() => {
      expect(putCustodianUser).toHaveBeenCalled();
    });

    expect(postCustodianUserInvite).not.toHaveBeenCalled();
  });

  it("create user is called with no id", async () => {
    renderCustodianEditContactModalDetailsUpdate();

    await waitFor(() => {
      expect(postCustodianUser).toHaveBeenCalled();
    });

    expect(postCustodianUserInvite).toHaveBeenCalled();
  });

  it("show a success alert", async () => {
    renderCustodianEditContactModalDetailsUpdate();

    await waitFor(() => screen.findByRole("button", { name: /OK/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderCustodianEditContactModalDetails());
  });
});
