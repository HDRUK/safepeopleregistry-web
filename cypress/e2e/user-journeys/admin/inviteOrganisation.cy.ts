import { ROUTES } from "@/consts/router";
import { mockedRegistration } from "@/mocks/data/auth";
import { mockedInvitedUser } from "@/mocks/data/user";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { inviteNewOrganisation } from "cypress/support/utils/admin/invite";
<<<<<<< Updated upstream
import { shouldBeOrganisationProfile } from "cypress/support/utils/common";
import { EMAIL_SIGN_ME_UP } from "cypress/support/utils/data";
=======
import {
  shouldBeOrganisationProfile,
  signout,
} from "cypress/support/utils/common";
import {
  EMAIL_REGISTER_VERIFICATION_LABEL,
  EMAIL_SIGN_ME_UP,
} from "cypress/support/utils/data";
>>>>>>> Stashed changes
import { actionMessage } from "cypress/support/utils/mail";
import { registerAndLogin } from "cypress/support/utils/registration/register";

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

    const registration = mockedRegistration({
<<<<<<< Updated upstream
      ...dataInviteUser,
      email: dataInviteUser.organisation_email,
    });

    registerAndLogin(registration);
=======
      email: dataInviteUser.organisation_email,
    });

    registerKeycloak(registration);

    signout();

    actionMessage(EMAIL_REGISTER_VERIFICATION_LABEL, {
      to: registration.email,
    });

    cy.contains("a", /Click here to proceed/i).click();
    cy.contains("a", "Back to Login").click();

    cy.login(registration.email, registration.password);
    cy.visitFirst(ROUTES.register.path);
    cy.contains("button", "Continue").click();

    acceptTermsAndConditions();
>>>>>>> Stashed changes

    shouldBeOrganisationProfile();
  });
});
