import { ROUTES } from "@/consts/router";
import { mockedRegistration } from "@/mocks/data/auth";
import { mockedUser } from "@/mocks/data/user";
import {
  dataCy,
  logout,
  shouldBeUserProfile,
  signout,
} from "cypress/support/utils/common";
import {
  DEFAULT_INVITE_USERS,
  EMAIL_SIGN_ME_UP,
} from "cypress/support/utils/data";
import { actionMessage } from "cypress/support/utils/mail";
import { addAffiliationOrganisations } from "cypress/support/utils/organisation/affiliations";
import { loginOrganisation } from "cypress/support/utils/organisation/auth";
import { registerAndLogin } from "cypress/support/utils/registration/register";

const dataUser = mockedUser(DEFAULT_INVITE_USERS);

describe("Affiliations invite journey", () => {
  beforeEach(() => {
    loginOrganisation();

    cy.visitFirst(ROUTES.profileOrganisationUserAdministration.path);
  });

  after(() => {
    logout();
  });

  it("Invites a user", () => {
    addAffiliationOrganisations(dataUser);

    cy.get(dataCy("form-modal")).should("not.exist");

    signout();

    actionMessage(new RegExp(EMAIL_SIGN_ME_UP, "m"), {
      to: dataUser.email,
    });

    const registration = mockedRegistration(dataUser);

    registerAndLogin(registration);

    shouldBeUserProfile();
  });
});
