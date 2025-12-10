import { ROUTES } from "@/consts/router";
import { mockedInvitedUser } from "@/mocks/data/user";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { inviteNewOrganisation } from "cypress/support/utils/admin/invite";
import {
  shouldBeOrganisationProfile,
  signout,
} from "cypress/support/utils/common";
import {
  DEFAULT_PASSWORD,
  EMAIL_REGISTER_VERIFICATION_LABEL,
  EMAIL_SIGN_ME_UP,
} from "cypress/support/utils/data";
import { actionMessage } from "cypress/support/utils/mail";
import {
  acceptTermsAndConditions,
  registerKeycloak,
} from "cypress/support/utils/registration/register";

describe("Invite organisation", () => {
  beforeEach(() => {
    loginAdmin();

    cy.visit(ROUTES.profileAdmin.path);
  });

  it("Invites a new user", () => {
    const dataInviteUser = mockedInvitedUser();

    inviteNewOrganisation(dataInviteUser);

    actionMessage(new RegExp(EMAIL_SIGN_ME_UP, "m"), {
      to: dataInviteUser.organisation_email,
    });

    const { first_name, last_name, organisation_email: email } = dataInviteUser;

    registerKeycloak({
      first_name,
      last_name,
      email,
      password: DEFAULT_PASSWORD,
      password_confirm: DEFAULT_PASSWORD,
    });

    signout();

    actionMessage(EMAIL_REGISTER_VERIFICATION_LABEL, {
      to: email,
    });

    cy.contains("a", /Click here to proceed/i).click();
    cy.contains("a", "Back to Login").click();

    cy.login(email, DEFAULT_PASSWORD);
    cy.visitFirst(ROUTES.register.path);
    cy.contains("button", "Continue").click();

    acceptTermsAndConditions();

    shouldBeOrganisationProfile();
  });
});
