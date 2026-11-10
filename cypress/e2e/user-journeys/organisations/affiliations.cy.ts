import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedAffiliation, mockedUser } from "@/mocks/data/user";
import { getName } from "@/utils/application";
import { logout } from "cypress/support/utils/common";
import {
  DEFAULT_AFFILIATION_USERS,
  DEFAULT_INVITE_USERS,
} from "cypress/support/utils/data";
import {
  addAffiliationOrganisations,
  approveAffiliationOrganisations,
  declineAffiliationOrganisations,
  hasAffiliationOrganisations,
  hasLeaverOrganisations,
  hasStatus,
  recordLeaverOrganisations,
} from "cypress/support/utils/organisation/affiliations";
import { loginOrganisation } from "cypress/support/utils/organisation/auth";

const dataUser = mockedUser(DEFAULT_INVITE_USERS);

const dataAffiliation = mockedAffiliation({
  ...DEFAULT_AFFILIATION_USERS,
  email: dataUser.email,
  model_state: {
    state: {
      slug: Status.PENDING,
    },
  },
});

describe("Affiliations journey", () => {
  beforeEach(() => {
    loginOrganisation();

    cy.visitFirst(ROUTES.profileOrganisationUserAdministration.path);
  });

  after(() => {
    logout();
  });
  it("should have no detectable accessibility violations on load", () => {
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });
  it("Adds an affiliation", () => {
    addAffiliationOrganisations(dataUser);

    hasAffiliationOrganisations({
      ...dataAffiliation,
      model_state: {
        state: {
          slug: Status.INVITED,
        },
      },
    });
  });

  it("Approves an affiliation", () => {
    cy.contains("a", getName(dataUser)).click();

    approveAffiliationOrganisations();

    hasStatus(Status.AFFILIATED);
  });

  it("Declines an affiliation", () => {
    cy.contains("a", getName(dataUser)).click();

    declineAffiliationOrganisations();

    hasStatus(Status.AFFILIATION_REJECTED);
  });

  it("Records a leaver and keeps them in the Organisation's records", () => {
    // A declined affiliation cannot be given a leave date, so re-confirm it first.
    cy.contains("a", getName(dataUser)).click();
    approveAffiliationOrganisations();
    cy.go("back");

    recordLeaverOrganisations(dataAffiliation);

    hasLeaverOrganisations(dataAffiliation);
  });
});
