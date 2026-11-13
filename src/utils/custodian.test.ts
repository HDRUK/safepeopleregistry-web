import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import {
  isCustodianAdministrator,
  isCustodianApprover,
  isCustodianViewer,
} from "./custodian";

// Fake Viewer permission, because the API doesn't have one yet.
const MOCK_VIEWER_PERMISSION = {
  id: 999,
  created_at: "2025-01-08T11:40:07.000000Z",
  updated_at: "2025-01-08T11:40:07.000000Z",
  name: "CUSTODIAN_VIEWER",
  enabled: true,
  description: "viewer",
};

describe("isCustodianAdministrator", () => {
  it("returns true when an adminstrator", () => {
    const result = isCustodianAdministrator(
      mockedCustodianUser({
        user_permissions: [
          {
            permission_id: 10,
            custodian_user_id: 1,
            permission: mockedApiPermissions[9],
          },
        ],
      }),
      mockedApiPermissions
    );

    expect(result).toEqual(true);
  });

  it("returns false when not adminstrator", () => {
    const result = isCustodianAdministrator(
      mockedCustodianUser({
        user_permissions: [
          {
            permission_id: 1,
            custodian_user_id: 1,
            permission: mockedApiPermissions[0],
          },
        ],
      }),
      mockedApiPermissions
    );

    expect(result).toEqual(false);
  });
});

describe("isCustodianApprover", () => {
  it("returns true when an approver", () => {
    const result = isCustodianApprover(
      mockedCustodianUser({
        user_permissions: [
          {
            permission_id: 11,
            custodian_user_id: 1,
            permission: mockedApiPermissions[10],
          },
        ],
      }),
      mockedApiPermissions
    );

    expect(result).toEqual(true);
  });

  it("returns false when not approver", () => {
    const result = isCustodianApprover(
      mockedCustodianUser({
        user_permissions: [
          {
            permission_id: 1,
            custodian_user_id: 1,
            permission: mockedApiPermissions[0],
          },
        ],
      }),
      mockedApiPermissions
    );

    expect(result).toEqual(false);
  });
});

describe("isCustodianViewer", () => {
  const viewerUser = mockedCustodianUser({
    user_permissions: [
      {
        permission_id: MOCK_VIEWER_PERMISSION.id,
        custodian_user_id: 1,
        permission: MOCK_VIEWER_PERMISSION,
      },
    ],
  });

  it("returns true when a viewer", () => {
    const result = isCustodianViewer(viewerUser, [
      ...mockedApiPermissions,
      MOCK_VIEWER_PERMISSION,
    ]);

    expect(result).toEqual(true);
  });

  it("returns false when not a viewer", () => {
    const result = isCustodianViewer(
      mockedCustodianUser({
        user_permissions: [
          {
            permission_id: 10,
            custodian_user_id: 1,
            permission: mockedApiPermissions[9],
          },
        ],
      }),
      [...mockedApiPermissions, MOCK_VIEWER_PERMISSION]
    );

    expect(result).toEqual(false);
  });

  it("returns false when the CUSTODIAN_VIEWER permission does not exist", () => {
    const result = isCustodianViewer(viewerUser, mockedApiPermissions);

    expect(result).toEqual(false);
  });
});
