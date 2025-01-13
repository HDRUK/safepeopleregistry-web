import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import { isCustodianAdministrator, isCustodianApprover } from "./custodian";

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
