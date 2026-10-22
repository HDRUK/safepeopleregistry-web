import { ROUTES } from "@/consts/router";
import { faker } from "@faker-js/faker";
import { mockedRegistration } from "@/mocks/data/auth";
import { mockedOrganisationInvite } from "@/mocks/data/organisation";
import { mockedInvitedUser } from "@/mocks/data/user";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import {
  inviteNewOrganisation,
  inviteNewOrganisationAsAdmin,
  openInviteOrganisationModal,
} from "cypress/support/utils/admin/invite";
import { hasOrganisationInvite } from "cypress/support/utils/admin/users";
import {
  dataCy,
  shouldBeOrganisationProfile,
} from "cypress/support/utils/common";
import { EMAIL_SIGN_ME_UP } from "cypress/support/utils/data";
import { actionMessage } from "cypress/support/utils/mail";
import { registerAndLogin } from "cypress/support/utils/registration/register";

describe("Invite organisation as a superadmin", () => {
  beforeEach(() => {
    loginAdmin();

    cy.visit(ROUTES.profileAdmin.path);
  });

  it("Opens the invite organisation form", () => {
    openInviteOrganisationModal();

    cy.get(dataCy("form-modal")).within(() => {
      cy.contains("h3", "Invite Organisation").should("be.visible");

      cy.get("#organisation_name").should("be.visible");
      cy.get("#lead_applicant_email").should("be.visible");

      cy.contains("button", "Invite").should("be.visible");
      cy.contains("button", "Cancel").should("be.visible");
    });
  });

  it("Closes the form without inviting when cancelled", () => {
    openInviteOrganisationModal();

    cy.get(dataCy("form-modal")).within(() => {
      cy.contains("button", "Cancel").click();
    });

    cy.get(dataCy("form-modal")).should("not.exist");
    cy.get(dataCy("alert-modal")).should("not.exist");
  });

  it("Requires an organisation name and a valid contact email", () => {
    openInviteOrganisationModal();

    cy.get(dataCy("form-modal")).within(() => {
      cy.contains("button", "Invite").click();

      cy.contains("Organisation name is required").should("be.visible");
      cy.contains("Email is a required field").should("be.visible");

      cy.get("#organisation_name").type(faker.company.name());
      cy.get("#lead_applicant_email").type("not-an-email");

      cy.contains("button", "Invite").click();

      cy.contains("Email must be a valid address").should("be.visible");
    });

    cy.get(dataCy("alert-modal")).should("not.exist");
  });

  it("Invites a new organisation", () => {
    const dataInviteOrganisation = mockedOrganisationInvite();

    inviteNewOrganisationAsAdmin(dataInviteOrganisation);

    hasOrganisationInvite(dataInviteOrganisation.lead_applicant_email);
  });
});

describe("Invite organisation", () => {
  beforeEach(() => {
    loginAdmin();

    cy.visit(ROUTES.profileAdmin.path);
  });

  it("Invites a new organisation", () => {
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
