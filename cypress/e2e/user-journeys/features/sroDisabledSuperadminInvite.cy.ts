import { ROUTES } from "@/consts/router";
import { mockedOrganisationInvite } from "@/mocks/data/organisation";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { runWithFeatureFlag } from "cypress/support/utils/admin/features";
import {
  inviteNewOrganisationAsAdmin,
  openInviteOrganisationModal,
} from "cypress/support/utils/admin/invite";
import { hasOrganisationInvite } from "cypress/support/utils/admin/users";
import { dataCy } from "cypress/support/utils/common";
import { SRO_REQUIREMENT_FEATURE } from "cypress/support/utils/data";

describe("A superadmin invites an Organisation, SRO requirement disabled", () => {
  runWithFeatureFlag(SRO_REQUIREMENT_FEATURE, false);

  beforeEach(() => {
    loginAdmin();

    cy.visitFirst(ROUTES.profileAdmin.path);
  });

  it("Still requires the lead applicant email address", () => {
    openInviteOrganisationModal();

    cy.get(dataCy("form-modal")).within(() => {
      cy.get('label[for="lead_applicant_email"]').should("contain.text", "*");

      cy.contains("button", "Invite").click();

      cy.contains("Email is a required field").should("be.visible");
    });
  });

  // Superadmins bypass the flag: the Organisation is invited to register rather
  // than the superadmin being notified to go and contact it.
  it("Invites the Organisation to register", () => {
    const organisation = mockedOrganisationInvite();

    inviteNewOrganisationAsAdmin(organisation);

    hasOrganisationInvite(organisation.lead_applicant_email);
  });
});
