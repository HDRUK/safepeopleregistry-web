import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedPendingInvite } from "@/mocks/data/user";
import { getName } from "@/utils/application";
import { faker } from "@faker-js/faker";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import {
  hasNoPendingInvites,
  hasUser,
  inviteUser,
} from "cypress/support/utils/admin/users";
import { logout } from "cypress/support/utils/common";
import { DEFAULT_PROJECT_INVITE_USERS } from "cypress/support/utils/data";

const dataInviteUser = {
  ...DEFAULT_PROJECT_INVITE_USERS,
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
};

const dataPendingInvite = mockedPendingInvite({
  user: {
    name: getName(dataInviteUser),
    email: dataInviteUser.email,
    unclaimed: 1,
  },
});

describe("Resend invite", () => {
  beforeEach(() => {
    loginAdmin();

    cy.visitFirst(ROUTES.profileAdmin.path);
    cy.contains("Invites").click();
  });

  after(() => {
    logout();
  });

  it("Shows a list of users who are pending invites", () => {
    cy.contains("User invitation").click();

    inviteUser(dataInviteUser);

    hasUser(dataPendingInvite, Status.INVITED);
  });

  it("Shows no users for custodians", () => {
    cy.selectValue("filterByUser", "Custodians");

    cy.contains("There are no pending invites for these search filters").should(
      "exist"
    );
  });

  it("Shows no users for organisations", () => {
    cy.selectValue("filterByUser", "Organisations");

    hasNoPendingInvites();
  });

  it("Shows invited users", () => {
    cy.selectValue("filterByUser", "Users");

    hasUser(dataPendingInvite, Status.INVITED);
  });

  it("Finds the invited user", () => {
    cy.get("#searchByText").type(dataInviteUser.email);

    hasUser(dataPendingInvite, Status.INVITED);
  });

  it("Handles no search results", () => {
    cy.get("#searchByText").type(faker.internet.email());

    hasNoPendingInvites();
  });
});
