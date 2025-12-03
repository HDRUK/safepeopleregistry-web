import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedPendingInvite } from "@/mocks/data/user";
import { getName } from "@/utils/application";
import { faker } from "@faker-js/faker";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { hasUser, inviteUser } from "cypress/support/utils/admin/users";
import { DEFAULT_PROJECT_INVITE_USERS } from "cypress/support/utils/data";

describe("Resend invite", { tags: ['@isolated', '@smoke']}, () => {
  beforeEach(() => {
    loginAdmin();

    cy.visitFirst(ROUTES.profileAdmin.path);
  });

  it("Shows a list of users who are pending invites", () => {
    cy.contains("User invitation").click();

    const dataInviteUser = {
      ...DEFAULT_PROJECT_INVITE_USERS,
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
    };

    cy.task("log", JSON.stringify(dataInviteUser));

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
