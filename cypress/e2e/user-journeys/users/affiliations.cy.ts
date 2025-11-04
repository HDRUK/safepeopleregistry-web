import { mockedAffiliation } from "@/mocks/data/user";
import { DEFAULT_AFFILIATION_USERS } from "cypress/support/utils/data";
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

const dataAffiliation = mockedAffiliation(DEFAULT_AFFILIATION_USERS);

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
