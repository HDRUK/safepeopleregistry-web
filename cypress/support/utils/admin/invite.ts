import {
  InviteCustodianFormValues,
  InviteOrganisationFormValues,
  InviteUserFormValues,
} from "@/types/form";
import { dataCy } from "../common";

const inviteNewCustodianForm = (invite: InviteCustodianFormValues) => {
  cy.get("#name").clear().type(invite.name);
  cy.get("#contact_email").clear().type(invite.contact_email);
};

const inviteNewCustodian = (invite: InviteCustodianFormValues) => {
  cy.contains("Invite Custodian").click();

  inviteNewCustodianForm(invite);

  cy.get(dataCy("form-modal")).within(() => {
    cy.contains("button", "Invite").click();
  });

  cy.clickAlertModal("Ok");
};

const inviteNewUserForm = (invite: InviteUserFormValues) => {
  cy.get("#first_name").clear().type(invite.first_name);
  cy.get("#last_name").clear().type(invite.last_name);
  cy.get("#email").clear().type(invite.email);
  cy.selectValue("#organisation_id", invite.organisation_id);
};

const inviteOrganisationForm = (invite: InviteOrganisationFormValues) => {
  cy.get("#organisation_name").clear().type(invite.organisation_name);
  cy.get("#lead_applicant_email").clear().type(invite.lead_applicant_email);
};

const inviteOrganisation = (invite: InviteOrganisationFormValues) => {
  inviteOrganisationForm(invite);

  cy.saveFormClick("Invite");
  cy.clickAlertModal("Close");
};

const openInviteOrganisationModal = () => {
  cy.contains("button", "Invite Organisation").click();
};

const closeInviteOrganisationModal = () => {
  cy.get(dataCy("form-modal")).find('[aria-label="Close"]').click();
};

// The superadmin "Invite Organisation" flow, which creates a brand new
// unclaimed Organisation rather than selecting an existing one. The form modal
// is not closed by a successful invite, so close it explicitly.
const inviteNewOrganisationAsAdmin = (invite: InviteOrganisationFormValues) => {
  openInviteOrganisationModal();

  inviteOrganisationForm(invite);

  cy.get(dataCy("form-modal")).within(() => {
    cy.contains("button", "Invite").click();
  });

  cy.clickAlertModal("Ok");

  closeInviteOrganisationModal();
};

const inviteNewOrganisationForm = (invite: InviteUserFormValues) => {
  cy.get("#first_name").clear().type(invite.first_name);
  cy.get("#last_name").clear().type(invite.last_name);
  cy.get("#email").clear().type(invite.email);
  cy.get("#organisation_name").clear().type(invite.organisation_name);
  cy.get("#organisation_email").clear().type(invite.organisation_email);
};

const inviteNewOrganisation = (invite: InviteUserFormValues) => {
  cy.contains("Invite User").click();
  cy.contains("button", "Ask them to register").click();

  inviteNewOrganisationForm(invite);

  cy.get(dataCy("form-modal")).within(() => {
    cy.contains("button", "Invite").click();
  });

  cy.clickAlertModal("Close");
};

const inviteNewUser = (invite: InviteUserFormValues) => {
  cy.contains("Invite User").click();

  inviteNewUserForm(invite);

  cy.get(dataCy("form-modal")).within(() => {
    cy.contains("button", "Invite").click();
  });

  cy.clickAlertModal("Close");
};

export {
  closeInviteOrganisationModal,
  inviteNewCustodian,
  inviteNewCustodianForm,
  inviteNewOrganisation,
  inviteNewOrganisationAsAdmin,
  inviteNewOrganisationForm,
  inviteNewUser,
  inviteNewUserForm,
  inviteOrganisation,
  inviteOrganisationForm,
  openInviteOrganisationModal,
};
