import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { mockedUser } from "@/mocks/data/user";
import { getProfileRedirectPath } from "./redirect-utils";

describe("getProfileRedirectPath", () => {
  it("sends an organisation user without an organisation to the no-organisation page", () => {
    const removedDelegate = mockedUser({
      user_group: UserGroup.ORGANISATIONS,
      organisation_id: null,
    });

    expect(getProfileRedirectPath(removedDelegate)).toBe(
      ROUTES.noOrganisation.path
    );
  });

  it.each([
    [
      "an organisation member",
      { user_group: UserGroup.ORGANISATIONS, organisation_id: 1 },
      ROUTES.profileOrganisation.path,
    ],
    [
      "a researcher without an organisation",
      { user_group: UserGroup.USERS, organisation_id: null },
      ROUTES.profileResearcher.path,
    ],
    [
      "a custodian",
      { user_group: UserGroup.CUSTODIANS, organisation_id: null },
      ROUTES.profileCustodian.path,
    ],
  ])("sends %s to their profile", (_, user, expectedPath) => {
    expect(getProfileRedirectPath(mockedUser(user))).toBe(expectedPath);
  });
});
