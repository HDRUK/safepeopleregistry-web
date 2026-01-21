import { getModalByHeader } from "../common";

function changeEmail(newEmail: string) {
  cy.contains("button", "Change email").click();

  getModalByHeader("Change login email").within(() => {
    cy.get("#email").clear().type(newEmail);
  });

  cy.saveFormClick("Update");
}

export { changeEmail };
