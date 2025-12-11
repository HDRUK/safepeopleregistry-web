import { ROUTES } from "@/consts/router";
import { mockedRegistration } from "@/mocks/data/auth";
import { mockedInvitedCustodian } from "@/mocks/data/custodian";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { inviteNewCustodian } from "cypress/support/utils/admin/invite";
import { shouldBeCustodianProfile } from "cypress/support/utils/common";
import { EMAIL_SIGN_ME_UP } from "cypress/support/utils/data";
import { actionMessage } from "cypress/support/utils/mail";
import { registerAndLogin } from "cypress/support/utils/registration/register";

describe("Invite organisation", () => {
  beforeEach(() => {
    loginAdmin();

    cy.visit(ROUTES.profileAdmin.path);
  });

  it("Invites a new user", () => {
    const dataInviteCustodian = mockedInvitedCustodian();

    inviteNewCustodian(dataInviteCustodian);

    actionMessage(new RegExp(EMAIL_SIGN_ME_UP, "m"), {
      to: dataInviteCustodian.contact_email,
    });

    const registration = mockedRegistration({
      email: dataInviteCustodian.contact_email,
    });

    registerAndLogin(registration);

    shouldBeCustodianProfile();
  });
});
