import { CustodianUserRoles } from "@/consts/custodian";
import { CustodianEditContactFormFields } from "@/types/form";
import { getName } from "@/utils/application";
import { formatDisplayLongDate } from "@/utils/date";
import { dataCy } from "../common";

const addNewTeamMemberCustodians = (data: CustodianEditContactFormFields) => {
  cy.contains("button", "Add new team member").click();

  cy.get("#first_name").type(data.first_name);
  cy.get("#last_name").type(data.last_name);
  cy.get("#email").type(data.email);
  cy.get('[name="permissions"]').check(data.permissions);

  cy.saveFormClick();
  cy.swalClick("OK", "User created");
};

const editTeamMemberCustodians = (
  data: CustodianEditContactFormFields,
  oldEmail: string
) => {
  cy.getLatestRowOfResults();
  cy.getResultsRowByValue(oldEmail).find(dataCy("edit-user")).click();
  cy.get("#first_name").clear().type(data.first_name);
  cy.get("#last_name").clear().type(data.last_name);
  cy.get("#email").clear().type(data.email);
  cy.get('[name="permissions"]').check(data.permissions);

  cy.saveFormClick();
  cy.swalClick("OK", "User updated");
};

const removeTeamMemberCustodians = (email: string) => {
  cy.getLatestRowOfResults();
  cy.getResultsRowByValue(email).find(dataCy("delete-user")).click();

  cy.swalClick(
    "Delete user",
    "Are you sure you want to delete this team member?"
  );
  cy.swalClick("Close");
};

const hasTeamMemberCustodians = (data: CustodianEditContactFormFields) => {
  const row = cy.getResultsRowByValue(data.email);
  cy.getLatestRowOfResults();
  row.within(() => {
    cy.contains("td", getName(data));
    cy.contains(
      "td",
      data.permissions === CustodianUserRoles.ADMINISTRATOR
        ? "Admin"
        : "Approver"
    );
    cy.contains("td", formatDisplayLongDate(new Date().toISOString()));
  });
};

export {
  addNewTeamMemberCustodians,
  hasTeamMemberCustodians,
  editTeamMemberCustodians,
  removeTeamMemberCustodians,
};
