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

const hasNoPendingInvites = () => {
  cy.contains("There are no pending invites for these search filters").should(
    "exist"
  );
};

const inviteUser = (invite: InviteUserFormValues) => {
  cy.get("#first_name").clear().type(invite.first_name);
  cy.get("#last_name").clear().type(invite.last_name);
  cy.get("#email").clear().type(invite.email);
  cy.selectValue("organisation_id", invite.organisation_id);

  cy.get(dataCy("invite-user"))
    .contains("button", /invite/i)
    .click({
      force: true,
    });

  // cy.clickAlertModal("Close");
};

export { hasUser, hasNoPendingInvites, inviteUser };
