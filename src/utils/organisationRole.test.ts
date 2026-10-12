import { OrganisationRole, UserGroup } from "@/consts/user";
import { mockedUser } from "@/mocks/data/user";
import {
  canPerformSroRestrictedAction,
  getOrganisationRole,
} from "./organisationRole";

const ORGANISATION_ID = 1;

const flagCombinations = [
  { label: "sro only", is_sro: 1, is_delegate: 0 },
  { label: "sro and delegate", is_sro: 1, is_delegate: 1 },
  { label: "delegate only", is_sro: 0, is_delegate: 1 },
  { label: "neither flag", is_sro: 0, is_delegate: 0 },
];

const organisationUser = (is_sro: number, is_delegate: number) =>
  mockedUser({
    user_group: UserGroup.ORGANISATIONS,
    organisation_id: ORGANISATION_ID,
    is_sro,
    is_delegate,
  });

describe("getOrganisationRole", () => {
  it.each([
    [flagCombinations[0], OrganisationRole.SRO],
    [flagCombinations[1], OrganisationRole.SRO],
    [flagCombinations[2], OrganisationRole.DELEGATE],
    [flagCombinations[3], OrganisationRole.DELEGATE],
  ])("derives the role for $label", ({ is_sro, is_delegate }, expected) => {
    expect(getOrganisationRole(organisationUser(is_sro, is_delegate))).toBe(
      expected
    );
  });

  it.each(flagCombinations)(
    "has no role without an organisation ($label)",
    ({ is_sro, is_delegate }) => {
      const user = mockedUser({
        user_group: UserGroup.ORGANISATIONS,
        organisation_id: null,
        is_sro,
        is_delegate,
      });

      expect(getOrganisationRole(user)).toBeNull();
    }
  );

  it.each(
    [UserGroup.USERS, UserGroup.ADMINS, UserGroup.CUSTODIANS].flatMap(
      user_group =>
        flagCombinations.map(flags => ({
          ...flags,
          user_group,
        }))
    )
  )(
    "has no role in the $user_group group ($label)",
    ({ user_group, is_sro, is_delegate }) => {
      const user = mockedUser({
        user_group,
        organisation_id: ORGANISATION_ID,
        is_sro,
        is_delegate,
      });

      expect(getOrganisationRole(user)).toBeNull();
    }
  );
});

describe("canPerformSroRestrictedAction", () => {
  const organisation = (has_sro?: boolean) => ({
    id: ORGANISATION_ID,
    has_sro,
  });

  // Expected outcome for an organisation with: no SRO, a claimed SRO, has_sro not loaded.
  it.each([
    ["admin", mockedUser({ user_group: UserGroup.ADMINS }), [true, true, true]],
    ["sro", organisationUser(1, 0), [true, true, true]],
    ["delegate", organisationUser(0, 1), [true, false, false]],
    ["neither flag", organisationUser(0, 0), [true, false, false]],
    [
      "delegate in another organisation",
      mockedUser({
        user_group: UserGroup.ORGANISATIONS,
        organisation_id: ORGANISATION_ID + 1,
        is_sro: 0,
        is_delegate: 1,
      }),
      [false, false, false],
    ],
    [
      "detached delegate",
      mockedUser({
        user_group: UserGroup.ORGANISATIONS,
        organisation_id: null,
        is_sro: 0,
        is_delegate: 1,
      }),
      [false, false, false],
    ],
    [
      "researcher",
      mockedUser({
        user_group: UserGroup.USERS,
        organisation_id: ORGANISATION_ID,
      }),
      [false, false, false],
    ],
    [
      "custodian",
      mockedUser({ user_group: UserGroup.CUSTODIANS }),
      [false, false, false],
    ],
  ])("%s", (_, user, [noSro, claimedSro, notLoaded]) => {
    expect(canPerformSroRestrictedAction(user, organisation(false))).toBe(
      noSro
    );
    expect(canPerformSroRestrictedAction(user, organisation(true))).toBe(
      claimedSro
    );
    expect(canPerformSroRestrictedAction(user, organisation(undefined))).toBe(
      notLoaded
    );
  });
});
