import { UserGroup } from "@/consts/user";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedUser } from "@/mocks/data/user";
import { EntityType } from "@/types/api";
import { filterOrganisationsList } from "./organisation";

const ENTITY_ID = 1;

const unapprovedOrganisation = (invited_by?: ReturnType<typeof mockedUser>) =>
  mockedOrganisation({
    id: 10,
    system_approved: false,
    sro_officer: mockedUser({ invited_by }),
  });

const researcher = mockedUser({ id: 5, user_group: UserGroup.USERS });
const admin = mockedUser({ id: 6, user_group: UserGroup.ADMINS });

describe("filterOrganisationsList", () => {
  describe("for a Custodian", () => {
    it("includes an unapproved organisation with no inviting user", () => {
      expect(
        filterOrganisationsList(
          unapprovedOrganisation(),
          EntityType.CUSTODIAN,
          ENTITY_ID
        )
      ).toBe(true);
    });

    it("includes an unapproved organisation invited by a researcher", () => {
      expect(
        filterOrganisationsList(
          unapprovedOrganisation(researcher),
          EntityType.CUSTODIAN,
          ENTITY_ID
        )
      ).toBe(true);
    });

    it("includes an unapproved organisation invited by an admin", () => {
      expect(
        filterOrganisationsList(
          unapprovedOrganisation(admin),
          EntityType.CUSTODIAN,
          ENTITY_ID
        )
      ).toBe(true);
    });
  });

  describe("for a User", () => {
    it("falls back to system_approved when there is no inviting user", () => {
      expect(
        filterOrganisationsList(
          unapprovedOrganisation(),
          EntityType.USER,
          ENTITY_ID
        )
      ).toBe(false);
    });

    it("includes an organisation the user invited", () => {
      expect(
        filterOrganisationsList(
          unapprovedOrganisation(researcher),
          EntityType.USER,
          researcher.id
        )
      ).toBe(true);
    });

    it("excludes an organisation invited by another researcher", () => {
      expect(
        filterOrganisationsList(
          unapprovedOrganisation(researcher),
          EntityType.USER,
          ENTITY_ID
        )
      ).toBe(false);
    });
  });

  it("includes every organisation for an Admin", () => {
    expect(
      filterOrganisationsList(
        unapprovedOrganisation(),
        EntityType.ADMIN,
        ENTITY_ID
      )
    ).toBe(true);
  });

  it("only includes the matching organisation for an Organisation", () => {
    const organisation = unapprovedOrganisation();

    expect(
      filterOrganisationsList(
        organisation,
        EntityType.ORGANISATION,
        organisation.id
      )
    ).toBe(true);
    expect(
      filterOrganisationsList(organisation, EntityType.ORGANISATION, ENTITY_ID)
    ).toBe(false);
  });
});
