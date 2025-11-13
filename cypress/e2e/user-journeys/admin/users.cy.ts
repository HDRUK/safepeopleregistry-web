import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedPendingInvite } from "@/mocks/data/user";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { hasUser, inviteUser } from "cypress/support/utils/admin/users";
import { DEFAULT_PROJECT_INVITE_USERS } from "cypress/support/utils/data";

describe("Resend invite", () => {
  beforeEach(() => {
    loginAdmin();

    cy.visitFirst(ROUTES.profileAdmin.path);
  });

  it("Shows a list of users who are pending invites", () => {
    cy.contains("User invitation").click();

    const dataInviteUser = DEFAULT_PROJECT_INVITE_USERS;

    inviteUser(dataInviteUser);

    hasUser(
      mockedPendingInvite({
        user: {
          name: getName(dataInviteUser),
          email: dataInviteUser.email,
          unclaimed: 1,
        },
      }),
      Status.INVITED
    );
  });
});
