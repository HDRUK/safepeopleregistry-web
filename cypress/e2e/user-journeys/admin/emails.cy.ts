import { JOB_DELAY } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedInvitedUser } from "@/mocks/data/user";
import { formatDisplayLongDate } from "@/utils/date";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { inviteNewUser } from "cypress/support/utils/admin/invite";
import { dataCy, getModalByHeader, logout } from "cypress/support/utils/common";

const dataInviteUser = mockedInvitedUser();

describe("Resend invite", () => {
  before(() => {
    loginAdmin();

    cy.visit(ROUTES.profileAdmin.path);

    inviteNewUser(dataInviteUser);
  });

  beforeEach(() => {
    loginAdmin();

    cy.visit(ROUTES.profileAdmin.path);

    cy.contains("Email logs").click();
  });

  after(() => {
    logout();
  });

  it("Shows a list of emails", () => {
    cy.wait(JOB_DELAY);
    cy.contains("button", "Update").click();

    cy.get(dataCy("emails-list"))
      .find("tr")
      .last()
      .within(() => {
        cy.contains("td", "Safe People Registry | User invite").should("exist");
        cy.contains("td", dataInviteUser.email).should("exist");
        cy.contains("td", formatDisplayLongDate(new Date())).should("exist");
        cy.contains("td", "Successful").should("exist");
        cy.contains("td", "None").should("exist");
      });
  });

  it("Resends the email", () => {
    cy.get(dataCy("emails-list"))
      .find("tr")
      .last()
      .find(dataCy("action-menu"))
      .last()
      .click();

    cy.actionMenuClick("Resend email");

    cy.clickAlertModal("Close");
  });

  it("Views the log information", () => {
    cy.get(dataCy("emails-list"))
      .find("tr")
      .last()
      .find(dataCy("action-menu"))
      .last()
      .click();

    cy.actionMenuClick("View log info");

    getModalByHeader("Email log information").within(() => {
      cy.contains("h6", "Job error");
      cy.contains("h6", "SendGrid response");
      cy.contains("OK");
    });
  });
});
