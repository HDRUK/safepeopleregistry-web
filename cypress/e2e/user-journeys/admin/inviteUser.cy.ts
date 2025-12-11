import { ROUTES } from "@/consts/router";
import { mockedRegistration } from "@/mocks/data/auth";
import { mockedInvitedUser } from "@/mocks/data/user";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { inviteNewUser } from "cypress/support/utils/admin/invite";
import { shouldBeUserProfile, signout } from "cypress/support/utils/common";
import { EMAIL_SIGN_ME_UP } from "cypress/support/utils/data";
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

    signout();

    actionMessage(new RegExp(EMAIL_SIGN_ME_UP), {
      to: dataInviteUser.email,
    });

    const registration = mockedRegistration(dataInviteUser);

    registerAndLogin(registration);

    shouldBeUserProfile();
  });
});
