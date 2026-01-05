import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedPendingInvite } from "@/mocks/data/user";
import { getName } from "@/utils/application";
import { faker } from "@faker-js/faker";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { hasUser, inviteUser } from "cypress/support/utils/admin/users";
import { logout } from "cypress/support/utils/common";
import { DEFAULT_PROJECT_INVITE_USERS } from "cypress/support/utils/data";

const dataInviteUser = {
  ...DEFAULT_PROJECT_INVITE_USERS,
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
};

describe("Resend invite", () => {
  beforeEach(() => {
    loginAdmin();

    cy.visitFirst(ROUTES.profileAdmin.path);
    cy.contains("User invitation").click();
  });

  after(() => {
    logout();
  });

  it("Shows a list of users who are pending invites", () => {
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

  it("Shows no users for custodians", () => {
    cy.contains("Invites").click();

    cy.selectValue("filterByUser", "Custodians");
  });

  it("Shows no users for organisations", () => {
    cy.contains("Invites").click();

    cy.selectValue("filterByUser", "Organisations");
  });

  it("Shows invited users", () => {
    cy.contains("Invites").click();

    cy.selectValue("filterByUser", "Users");
  });
});
