import { useStore } from "@/data/store";
import useIsCustodianAdmin from "@/hooks/useIsCustodianAdmin/useIsCustodianAdmin";
import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import { mockedUser } from "@/mocks/data/user";
import * as custodianUsersService from "@/services/custodian_users";
import { renderHook, waitFor } from "@/utils/testUtils";

jest.mock("@/data/store");
jest.mock("@/services/custodian_users");

const ADMIN_CUSTODIAN_USER = mockedCustodianUser({
  id: 1,
  user_permissions: [
    {
      custodian_user_id: 1,
      permission_id: 10,
      permission: mockedApiPermissions[9],
    },
  ],
});

const NON_ADMIN_CUSTODIAN_USER = mockedCustodianUser({
  id: 1,
  user_permissions: [
    {
      custodian_user_id: 1,
      permission_id: 11,
      permission: mockedApiPermissions[10],
    },
  ],
});

const mockUseStore = (custodianUserId?: number) => {
  (useStore as unknown as jest.Mock).mockReturnValue({
    user: mockedUser({ custodian_user_id: custodianUserId }),
    permissions: mockedApiPermissions,
  });
};

describe("useIsCustodianAdmin", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns true when the custodian user has CUSTODIAN_ADMIN permission", async () => {
    mockUseStore(1);

    jest.spyOn(custodianUsersService, "getCustodianUserQuery").mockReturnValue({
      queryKey: ["getCustodianUser", 1],
      queryFn: () => Promise.resolve({ data: ADMIN_CUSTODIAN_USER, ok: true }),
    });

    const { result } = renderHook(() => useIsCustodianAdmin());

    await waitFor(() => {
      expect(result.current as boolean).toBe(true);
    });
  });

  it("returns false when the custodian user does not have CUSTODIAN_ADMIN permission", async () => {
    mockUseStore(1);

    jest.spyOn(custodianUsersService, "getCustodianUserQuery").mockReturnValue({
      queryKey: ["getCustodianUser", 1],
      queryFn: () =>
        Promise.resolve({ data: NON_ADMIN_CUSTODIAN_USER, ok: true }),
    });

    const { result } = renderHook(() => useIsCustodianAdmin());

    await waitFor(() => {
      expect(result.current as boolean).toBe(false);
    });
  });

  it("returns false when the user has no custodian_user_id", async () => {
    mockUseStore(undefined);

    const { result } = renderHook(() => useIsCustodianAdmin());

    await waitFor(() => {
      expect(result.current as boolean).toBe(false);
    });
  });
});
