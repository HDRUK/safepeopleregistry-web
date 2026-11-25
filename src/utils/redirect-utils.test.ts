import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { mockedUser } from "@/mocks/data/user";
import {
  getAddAffiliationPath,
  getProfileRedirectPath,
} from "@/utils/redirect-utils";

const VERIFICATION_CODE = "6f1c1c9e-4b6e-4c1a-9a43-2d7c1e0b5f10";

describe("getAddAffiliationPath", () => {
  it("keeps a verification code", () => {
    expect(getAddAffiliationPath(`?verify=${VERIFICATION_CODE}`)).toBe(
      `${ROUTES.addAffiliation.path}?verify=${VERIFICATION_CODE}`
    );
  });

  it("drops anything other than the verification code", () => {
    expect(
      getAddAffiliationPath(
        `?next=https://example.com&verify=${VERIFICATION_CODE}`
      )
    ).toBe(`${ROUTES.addAffiliation.path}?verify=${VERIFICATION_CODE}`);
  });

  it.each([
    ["no search", null],
    ["an empty search", ""],
    ["a malformed code", "?verify=not-a-code"],
    ["a code with extra characters", `?verify=${VERIFICATION_CODE}/../x`],
    ["other parameters only", "?next=https://example.com"],
  ])("goes to the step alone given %s", (_, search) => {
    expect(getAddAffiliationPath(search)).toBe(ROUTES.addAffiliation.path);
  });
});

describe("getProfileRedirectPath", () => {
  it("sends a researcher who still needs an affiliation to the affiliation step", () => {
    const researcher = mockedUser({
      user_group: UserGroup.USERS,
      registration_complete: false,
    });

    expect(getProfileRedirectPath(researcher)).toBe(ROUTES.addAffiliation.path);
  });

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
      "a researcher in an organisation",
      { user_group: UserGroup.USERS, organisation_id: 1 },
      ROUTES.profileResearcher.path,
    ],
    [
      "an admin",
      { user_group: UserGroup.ADMINS, organisation_id: null },
      ROUTES.profileAdmin.path,
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
