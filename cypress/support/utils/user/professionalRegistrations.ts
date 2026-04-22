import { ResearcherProfessionalRegistration } from "@/types/application";

const addProfessionalRegistration = (
  registration: ResearcherProfessionalRegistration
) => {
  cy.buttonClick("Add professional membership");

  cy.get('[role="presentation"]').should("be.visible");

  cy.get("#name").type(registration.name);
  cy.get("#member_id").type(registration.member_id);

  cy.saveFormClick();
};

const hasProfessionalRegistration = (
  registration: ResearcherProfessionalRegistration
) => {
  cy.getLatestRowOfResults();
  const row = cy.getResultsRowByValue(registration.member_id);

  row.within(() => {
    cy.contains("td", registration.name);
    cy.contains("td", registration.member_id);
  });
};

const editProfessionalRegistration = (
  registration: ResearcherProfessionalRegistration,
  updated: Partial<ResearcherProfessionalRegistration>
) => {
  cy.getLatestRowOfResults();
  cy.getResultsActionMenu(registration.member_id).click();

  cy.actionMenuClick("Edit");

  if (updated.name) {
    cy.get("#name").clear().type(updated.name);
  }

  if (updated.member_id) {
    cy.get("#member_id").clear().type(updated.member_id);
  }

  cy.saveFormClick();
};

const removeProfessionalRegistration = (
  registration: ResearcherProfessionalRegistration
) => {
  cy.getLatestRowOfResults();
  cy.getResultsActionMenu(registration.member_id).click();

  cy.actionMenuClick("Delete");

  cy.clickAlertModal("Delete", "Warning");
  cy.clickAlertModal("Close");
};

const hasRemovedProfessionalRegistration = (
  registration: ResearcherProfessionalRegistration
) => {
  cy.getResultsRow()
    .contains("td", registration.member_id)
    .should("not.exist");
};

export {
  addProfessionalRegistration,
  editProfessionalRegistration,
  hasProfessionalRegistration,
  hasRemovedProfessionalRegistration,
  removeProfessionalRegistration,
};
