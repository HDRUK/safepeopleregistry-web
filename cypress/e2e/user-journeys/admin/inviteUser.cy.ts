import { ROUTES } from "@/consts/router";
import { mockedRegistration } from "@/mocks/data/auth";
import { mockedInvitedUser } from "@/mocks/data/user";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { inviteNewUser } from "cypress/support/utils/admin/invite";
<<<<<<< Updated upstream
import { shouldBeUserProfile } from "cypress/support/utils/common";
import { EMAIL_SIGN_ME_UP } from "cypress/support/utils/data";
=======
import { shouldBeUserProfile, signout } from "cypress/support/utils/common";
import {
  EMAIL_REGISTER_VERIFICATION_LABEL,
  EMAIL_SIGN_ME_UP,
} from "cypress/support/utils/data";
>>>>>>> Stashed changes
import { actionMessage } from "cypress/support/utils/mail";
import { registerAndLogin } from "cypress/support/utils/registration/register";

describe("Invite user", () => {
  beforeEach(() => {
    loginAdmin();

    cy.visit(ROUTES.profileAdmin.path);
  });

  it("Invites a new user", () => {
    const dataInviteUser = mockedInvitedUser();

    inviteNewUser(dataInviteUser);

    actionMessage(new RegExp(EMAIL_SIGN_ME_UP), {
      to: dataInviteUser.email,
    });

    const registration = mockedRegistration(dataInviteUser);

<<<<<<< Updated upstream
    registerAndLogin(registration);
=======
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

    shouldBeUserProfile();
  });
});
