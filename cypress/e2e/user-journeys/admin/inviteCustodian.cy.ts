import { ROUTES } from "@/consts/router";
import { mockedRegistration } from "@/mocks/data/auth";
import { mockedInvitedCustodian } from "@/mocks/data/custodian";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { inviteNewCustodian } from "cypress/support/utils/admin/invite";
<<<<<<< Updated upstream
import { shouldBeCustodianProfile } from "cypress/support/utils/common";
import { EMAIL_SIGN_ME_UP } from "cypress/support/utils/data";
import { actionMessage } from "cypress/support/utils/mail";
import { registerAndLogin } from "cypress/support/utils/registration/register";

describe("Invite custodian", () => {
=======
import {
  shouldBeCustodianProfile,
  signout,
} from "cypress/support/utils/common";
import {
  EMAIL_REGISTER_VERIFICATION_LABEL,
  EMAIL_SIGN_ME_UP,
} from "cypress/support/utils/data";
import { actionMessage } from "cypress/support/utils/mail";
import {
  acceptTermsAndConditions,
  registerKeycloak,
} from "cypress/support/utils/registration/register";

describe("Invite organisation", () => {
>>>>>>> Stashed changes
  beforeEach(() => {
    loginAdmin();

    cy.visit(ROUTES.profileAdmin.path);
  });

<<<<<<< Updated upstream
  it("Invites a new custodian", () => {
=======
  it("Invites a new user", () => {
>>>>>>> Stashed changes
    const dataInviteCustodian = mockedInvitedCustodian();

    inviteNewCustodian(dataInviteCustodian);

    actionMessage(new RegExp(EMAIL_SIGN_ME_UP, "m"), {
      to: dataInviteCustodian.contact_email,
    });

    const registration = mockedRegistration({
      email: dataInviteCustodian.contact_email,
    });

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

    shouldBeCustodianProfile();
  });
});
