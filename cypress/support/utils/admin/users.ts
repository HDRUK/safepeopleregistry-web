import { Status } from "@/consts/application";
import { PendingInvite } from "@/types/application";
import { InviteUserFormValues } from "@/types/form";
import { getStatus } from "@/utils/application";
import { dataCy } from "../common";

const hasUser = (pendingInvite: PendingInvite, status: Status) => {
  const {
    user: { name, email },
  } = pendingInvite;

  cy.getLatestRowOfResults();
  const row = cy.getResultsRowByValue(email);

  row.within(() => {
    cy.contains("td", name);
    cy.contains("td", email);
    cy.contains("td", getStatus(status));
  });
};

const hasOrganisationInvite = (leadApplicantEmail: string) => {
  cy.contains("Invites").click();

  cy.selectValue("#filterByUser", "Organisations");
  cy.get("#searchByText").clear().type(leadApplicantEmail);

  cy.getResultsRowByValue(leadApplicantEmail).within(() => {
    cy.contains("td", leadApplicantEmail);
    cy.contains("td", getStatus(Status.INVITED));
  });
};

const hasNoPendingInvites = () => {
  cy.contains("There are no pending invites for these search filters").should(
    "exist"
  );
};

// Asserts the explicit empty state rather than the absence of a row, so this
// can't pass just because the table failed to render.
const hasNoOrganisationInvite = (leadApplicantEmail: string) => {
  cy.contains("Invites").click();

  cy.selectValue("#filterByUser", "Organisations");
  cy.get("#searchByText").clear().type(leadApplicantEmail);

  hasNoPendingInvites();
};

const inviteUser = (invite: InviteUserFormValues) => {
  cy.get("#first_name").clear().type(invite.first_name);
  cy.get("#last_name").clear().type(invite.last_name);
  cy.get("#email").clear().type(invite.email);
  cy.selectValue("#organisation_id", invite.organisation_id);

  cy.get(dataCy("invite-user"))
    .contains("button", /invite/i)
    .click({
      force: true,
    });

  // cy.clickAlertModal("Close");
};

export {
  hasUser,
  hasNoOrganisationInvite,
  hasNoPendingInvites,
  hasOrganisationInvite,
  inviteUser,
};
