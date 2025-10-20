import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedAffiliation, mockedUser } from "@/mocks/data/user";
import {
  DEFAULT_AFFILIATION_USERS,
  DEFAULT_INVITE_USERS,
} from "cypress/support/utils/data";
import {
  addAffiliationOrganisations,
  hasAffiliationOrganisations,
  hasRemoveAffiliationOrganisations,
  removeAffiliationOrganisations,
} from "cypress/support/utils/organisation/affiliations.cy";
import { loginOrganisation } from "cypress/support/utils/organisation/auth";

const dataUser = mockedUser(DEFAULT_INVITE_USERS);

const dataAffiliation = mockedAffiliation({
  ...DEFAULT_AFFILIATION_USERS,
  email: dataUser.email,
  model_state: {
    state: {
      slug: Status.AFFILIATION_EMAIL_VERIFY,
    },
  },
});

describe("Affiliations journey", () => {
  beforeEach(() => {
    loginOrganisation();

    cy.visitFirst(ROUTES.profileOrganisationUserAdministration.path);
  });

  after(() => {
    // logout();
  });

  it("Adds an affiliation", () => {
    addAffiliationOrganisations(dataUser);

    hasAffiliationOrganisations(dataAffiliation);
  });

  it("Approves an affiliation", () => {
    cy.contains("a", `${dataUser.first_name} ${dataUser.last_name}`).click();

    // approveAffiliationOrganisations(dataUser);

    hasAffiliationOrganisations(dataAffiliation);
  });

  it("Declines an affiliation", () => {
    addAffiliationOrganisations(dataUser);

    hasAffiliationOrganisations(dataAffiliation);
  });

  it("Removes an affiliation and reloads the page", () => {
    removeAffiliationOrganisations(dataAffiliation);

    hasRemoveAffiliationOrganisations(dataAffiliation);
  });
});
