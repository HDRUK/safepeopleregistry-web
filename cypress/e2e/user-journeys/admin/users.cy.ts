import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedUser } from "@/mocks/data/user";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { hasUser } from "cypress/support/utils/admin/users";

const dataUser = mockedUser({
  email: "custodian1@sail.databank.notreal",
  first_name: "Custodian",
  last_name: "Admin",
});

describe("Resend invite", () => {
  beforeEach(() => {
    loginAdmin();

    cy.visitFirst(ROUTES.profileAdmin.path);
  });

  it("Shows a list of users", () => {
    hasUser(dataUser, Status.INVITED);
  });
});
