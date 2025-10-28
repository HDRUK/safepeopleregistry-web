import { mockedAffiliation } from "@/mocks/data/user";
import {
  DEFAULT_AFFILIATION_USERS,
  DEFAULT_FROM_DATE,
} from "cypress/support/utils/data";
import {
  addAffiliationUsers,
  editAffiliationUsers,
  hasCurrentAffiliationUsers,
  hasEditAffiliationUsers,
  hasRemoveAffiliationUsers,
  removeAffiliationUsers,
} from "cypress/support/utils/user/affiliations";
import { loginUser } from "cypress/support/utils/user/auth";
import { ROUTES } from "@/consts/router";

const dataAffiliation = {
  relationship: "Employee",
  organisation: {
    organisation_name: "Health Data Research UK",
  },
  role: "Manager",
  member_id: "123456789",
  from: "2020-01-01",
  to: null,
  current_employer: true,
};

describe("Affiliations journey", () => {
  beforeEach(() => {
    loginUser();

    cy.visitFirst(ROUTES.profileResearcherAffiliations.path);
  });

  after(() => {
    // logout();
  });

  it("Adds an affiliation", () => {
    addAffiliationUsers(dataAffiliation);

    hasCurrentAffiliationUsers(dataAffiliation);
  });

  it("Edits an affiliation and reloads the page", () => {
    editAffiliationUsers(dataAffiliation);

    hasEditAffiliationUsers(dataAffiliation);
  });

  it("Removes an affiliation and reloads the page", () => {
    removeAffiliationUsers(dataAffiliation);

    hasRemoveAffiliationUsers(dataAffiliation);
  });
});
