import {
  InviteOrganisationFormValues,
  InviteUserFormValues,
} from "@/types/form";
import { dataCy } from "../common";

const inviteNewUserForm = (invite: InviteUserFormValues) => {
  cy.get("#first_name").clear().type(invite.first_name);
  cy.get("#last_name").clear().type(invite.last_name);
  cy.get("#email").clear().type(invite.email);
  cy.selectValue("organisation_id", invite.organisation_id);
};

const inviteOrganisationForm = (invite: InviteOrganisationFormValues) => {
  cy.get("#organisation_name").clear().type(invite.organisation_name);
  cy.get("#lead_applicant_email").clear().type(invite.lead_applicant_email);
};

const inviteOrganisation = (invite: InviteOrganisationFormValues) => {
  inviteOrganisationForm(invite);

  cy.saveFormClick("Invite");
  cy.swalClick("Close");
};

const inviteNewOrganisationForm = (invite: InviteUserFormValues) => {
  cy.get("#first_name").clear().type(invite.first_name);
  cy.get("#last_name").clear().type(invite.last_name);
  cy.get("#email").clear().type(invite.email);
  cy.get("#organisation_name").clear().type(invite.organisation_name);
  cy.get("#organisation_email").clear().type(invite.organisation_email);
};

const inviteNewOrganisation = (invite: InviteUserFormValues) => {
  cy.contains("User invitation").click();
  cy.contains("button", "Ask them to register").click();

  inviteNewOrganisationForm(invite);

  cy.get(dataCy("data-user-invite")).within(() => {
    cy.contains("button", "Invite").click();
  });

  cy.swalClick("Close");
};

const inviteNewUser = (invite: InviteUserFormValues) => {
  cy.contains("User invitation").click();

  inviteNewUserForm(invite);

  cy.get(dataCy("data-user-invite")).within(() => {
    cy.contains("button", "Invite").click();
  });

  cy.swalClick("Close");
};

export {
  inviteNewUser,
  inviteNewUserForm,
  inviteNewOrganisationForm,
  inviteNewOrganisation,
  inviteOrganisation,
  inviteOrganisationForm,
};
