import { mockedAffiliation } from "@/mocks/data/user";
import {
  DEFAULT_AFFILIATION_USERS,
  DEFAULT_TO_DATE,
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

const dataCurrentAffiliation = mockedAffiliation(DEFAULT_AFFILIATION_USERS);
const dataAffiliation = {
  ...dataCurrentAffiliation,
  current_employer: false,
  to: DEFAULT_TO_DATE,
  member_id: Cypress._.random(0, 1e6).toString(),
};

describe("Affiliations journey", () => {
  beforeEach(() => {
    loginUser();

    cy.visitFirst(ROUTES.profileResearcherAffiliations.path);
  });

  after(() => {
    // logout();
  });

  it("Adds a current affiliation", () => {
    addAffiliationUsers(dataCurrentAffiliation);

    cy.swalClick("Close", "Verification needed");
  });

  it("Adds an affiliation with an end date", () => {
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
