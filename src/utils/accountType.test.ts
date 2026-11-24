import { UserGroup } from "@/consts/user";
import { mockedUser } from "@/mocks/data/user";
import { AccountType } from "@/types/accounts";
import { getAccountType } from "./accountType";

describe("getAccountType", () => {
  it("falls back to User when there is no user", () => {
    expect(getAccountType({ user: undefined })).toEqual(AccountType.USER);
  });

  it("falls back to Organisation when the organisation user has no organisation", () => {
    expect(
      getAccountType({
        user: mockedUser({
          user_group: UserGroup.ORGANISATIONS,
          organisation_id: null as unknown as number,
        }),
      })
    ).toEqual(AccountType.ORGANISATION);
  });

  it("falls back to Custodian when the custodian role is unknown", () => {
    expect(
      getAccountType({
        user: mockedUser({ user_group: UserGroup.CUSTODIANS }),
        custodianRole: null,
      })
    ).toEqual(AccountType.CUSTODIAN);
  });
});
