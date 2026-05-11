import { ResearcherTraining } from "@/types/application";
import { formatShortDate } from "@/utils/date";
import { dataCy } from "../common";

const addTraining = (training: ResearcherTraining) => {
  cy.buttonClick("Add training course");

  cy.get(dataCy("form-modal")).should("be.visible");

  cy.get("#provider").type(training.provider);
  cy.get("#training_name").type(training.training_name);
  cy.dateSelectValue("awarded_at", training.awarded_at);
  cy.dateSelectValue("expires_at", training.expires_at);

  cy.saveFormClick();
};

const hasTraining = (training: ResearcherTraining) => {
  cy.getLatestRowOfResults();
  const row = cy.getResultsRowByValue(training.training_name);

  row.within(() => {
    cy.contains("td", training.provider);
    cy.contains("td", training.training_name);
    cy.contains("td", formatShortDate(training.awarded_at));
  });
};

const editTraining = (
  training: ResearcherTraining,
  updated: Partial<ResearcherTraining>
) => {
  cy.getResultsActionMenu(training.training_name).click();

  cy.actionMenuClick("View or edit");

  if (updated.provider) {
    cy.get("#provider").clear().type(updated.provider);
  }

  if (updated.training_name) {
    cy.get("#training_name").clear().type(updated.training_name);
  }

  cy.saveFormClick();
};

const removeTraining = (training: ResearcherTraining) => {
  cy.getLatestRowOfResults();
  cy.getResultsActionMenu(training.training_name).click();

  cy.actionMenuClick("Delete");

  cy.clickAlertModal("Delete", "Warning");
  cy.clickAlertModal("Close");
};

const hasRemovedTraining = (training: ResearcherTraining) => {
  cy.getResultsRow().contains("td", training.training_name).should("not.exist");
};

export {
  addTraining,
  editTraining,
  hasRemovedTraining,
  hasTraining,
  removeTraining,
};
