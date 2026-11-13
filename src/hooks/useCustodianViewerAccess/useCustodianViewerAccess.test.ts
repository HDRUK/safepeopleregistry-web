import { useFeatures } from "@/components/FeatureProvider";
import { useStore } from "@/data/store";
import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import { mockedUser } from "@/mocks/data/user";
import * as custodianUsersService from "@/services/custodian_users";
import { renderHook, waitFor } from "@/utils/testUtils";
import useCustodianViewerAccess from "./useCustodianViewerAccess";

jest.mock("@/data/store");
jest.mock("@/services/custodian_users");
jest.mock("@/components/FeatureProvider", () => ({
  useFeatures: jest.fn(),
}));

// Fake Viewer permission, because the API doesn't have one yet.
const MOCK_VIEWER_PERMISSION = {
  id: 999,
  created_at: "2025-01-08T11:40:07.000000Z",
  updated_at: "2025-01-08T11:40:07.000000Z",
  name: "CUSTODIAN_VIEWER",
  enabled: true,
  description: "viewer",
};

const VIEWER_CUSTODIAN_USER = mockedCustodianUser({
  id: 1,
  user_permissions: [
    {
      custodian_user_id: 1,
      permission_id: MOCK_VIEWER_PERMISSION.id,
      permission: MOCK_VIEWER_PERMISSION,
    },
  ],
});

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

const setup = ({
  flagOn,
  custodianUser,
}: {
  flagOn: boolean;
  custodianUser: ReturnType<typeof mockedCustodianUser>;
}) => {
  (useFeatures as jest.Mock).mockReturnValue({
    isCustodianViewerRoleEnabled: flagOn,
  });

  (useStore as unknown as jest.Mock).mockReturnValue({
    user: mockedUser({ custodian_user_id: 1 }),
    permissions: [...mockedApiPermissions, MOCK_VIEWER_PERMISSION],
  });

  jest.spyOn(custodianUsersService, "getCustodianUserQuery").mockReturnValue({
    queryKey: ["getCustodianUser", 1],
    queryFn: () => Promise.resolve({ data: custodianUser, ok: true }),
  });
};

describe("useCustodianViewerAccess", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("is read-only for a viewer when the flag is on", async () => {
    setup({ flagOn: true, custodianUser: VIEWER_CUSTODIAN_USER });

    const { result } = renderHook(() => useCustodianViewerAccess());

    await waitFor(() => {
      expect(result.current).toEqual({
        isLoading: false,
        isViewer: true,
        isViewOnly: true,
        isViewerDisabled: false,
      });
    });
  });

  it("blocks a viewer when the flag is off", async () => {
    setup({ flagOn: false, custodianUser: VIEWER_CUSTODIAN_USER });

    const { result } = renderHook(() => useCustodianViewerAccess());

    await waitFor(() => {
      expect(result.current).toEqual({
        isLoading: false,
        isViewer: true,
        isViewOnly: false,
        isViewerDisabled: true,
      });
    });
  });

  it.each([true, false])(
    "leaves non-viewers alone when the flag is %s",
    async flagOn => {
      setup({ flagOn, custodianUser: ADMIN_CUSTODIAN_USER });

      const { result } = renderHook(() => useCustodianViewerAccess());

      await waitFor(() => {
        expect(result.current).toEqual({
          isLoading: false,
          isViewer: false,
          isViewOnly: false,
          isViewerDisabled: false,
        });
      });
    }
  );
});
