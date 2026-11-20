import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import {
  isCustodianAdministrator,
  isCustodianApprover,
  isCustodianUserViewOnly,
  isCustodianViewer,
} from "./custodian";

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
        permission_id: 14,
        custodian_user_id: 1,
        permission: mockedApiPermissions[13],
      },
    ],
  });

  it("returns true when a viewer", () => {
    const result = isCustodianViewer(viewerUser, mockedApiPermissions);

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
      mockedApiPermissions
    );

    expect(result).toEqual(false);
  });

  it("returns false for a user with no role before permissions load", () => {
    const result = isCustodianViewer(
      mockedCustodianUser({ user_permissions: [] }),
      []
    );

    expect(result).toEqual(false);
  });
});

describe("isCustodianUserViewOnly", () => {
  it("returns true for a viewer", () => {
    const result = isCustodianUserViewOnly(
      mockedCustodianUser({
        user_permissions: [
          {
            permission_id: 14,
            custodian_user_id: 1,
            permission: mockedApiPermissions[13],
          },
        ],
      })
    );

    expect(result).toEqual(true);
  });

  it("returns false for an administrator", () => {
    const result = isCustodianUserViewOnly(
      mockedCustodianUser({
        user_permissions: [
          {
            permission_id: 10,
            custodian_user_id: 1,
            permission: mockedApiPermissions[9],
          },
        ],
      })
    );

    expect(result).toEqual(false);
  });

  it("returns false for a user with no role", () => {
    const result = isCustodianUserViewOnly(
      mockedCustodianUser({ user_permissions: [] })
    );

    expect(result).toEqual(false);
  });
});
