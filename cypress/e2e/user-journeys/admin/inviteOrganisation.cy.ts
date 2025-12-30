import { ROUTES } from "@/consts/router";
import { mockedRegistration } from "@/mocks/data/auth";
import { mockedInvitedUser } from "@/mocks/data/user";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { inviteNewOrganisation } from "cypress/support/utils/admin/invite";
import { shouldBeOrganisationProfile } from "cypress/support/utils/common";
import { EMAIL_SIGN_ME_UP } from "cypress/support/utils/data";
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
      ...dataInviteUser,
      email: dataInviteUser.organisation_email,
    });

    registerAndLogin(registration);

    shouldBeOrganisationProfile();
  });
});
