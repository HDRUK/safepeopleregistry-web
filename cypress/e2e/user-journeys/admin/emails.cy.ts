import { JOB_DELAY } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedInvitedUser } from "@/mocks/data/user";
import { formatDisplayLongDate } from "@/utils/date";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { inviteNewUser } from "cypress/support/utils/admin/invite";
import { logout } from "cypress/support/utils/common";

const dataInviteUser = mockedInvitedUser();

describe("Resend invite", () => {
  before(() => {
    loginAdmin();

    cy.visit(ROUTES.profileAdmin.path);

    inviteNewUser(dataInviteUser);
  });

  beforeEach(() => {
    cy.visit(ROUTES.profileAdmin.path);

    cy.contains("Email logs").click();
  });

  after(() => {
    logout();
  });

  it("Shows a list of users who are pending invites", () => {
    cy.wait(JOB_DELAY);
    cy.contains("button", "Update").click();

    cy.getLatestRowOfResults();

    cy.contains("td", "Safe People Registry | User invite").should("exist");
    cy.contains("td", dataInviteUser.email).should("exist");
    cy.contains("td", formatDisplayLongDate(new Date())).should("exist");
    cy.contains("td", "Successful").should("exist");
    cy.contains("td", "None").should("exist");
  });

  it("Resends the email", () => {
    cy.getResultsActionMenu(dataInviteUser.email).click();

    cy.actionMenuClick("Resend email");

    cy.clickAlertModal("Close");
  });
});
