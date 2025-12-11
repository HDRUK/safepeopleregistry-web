import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedRegistration } from "@/mocks/data/auth";
import { mockedAffiliation, mockedUser } from "@/mocks/data/user";
import { getName } from "@/utils/application";
import { faker } from "@faker-js/faker";
import {
  logout,
  shouldBeUserProfile,
  signout,
} from "cypress/support/utils/common";
import {
  DEFAULT_AFFILIATION_USERS,
  DEFAULT_INVITE_USERS,
  EMAIL_SIGN_ME_UP,
} from "cypress/support/utils/data";
import { actionMessage } from "cypress/support/utils/mail";
import {
  addAffiliationOrganisations,
  approveAffiliationOrganisations,
  declineAffiliationOrganisations,
  hasAffiliationOrganisations,
  hasRemoveAffiliationOrganisations,
  hasStatus,
  removeAffiliationOrganisations,
} from "cypress/support/utils/organisation/affiliations";
import { loginOrganisation } from "cypress/support/utils/organisation/auth";
import { registerAndLogin } from "cypress/support/utils/registration/register";

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

  it("Removes an affiliation and reloads the page", () => {
    removeAffiliationOrganisations(dataAffiliation);

    hasRemoveAffiliationOrganisations(dataAffiliation);
  });
});
