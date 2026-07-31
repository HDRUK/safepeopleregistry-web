import { Accreditation } from "@/types/application";
import { formatShortDate } from "@/utils/date";
import { dataCy } from "../common";

const addAccreditation = (accreditation: Accreditation) => {
  cy.buttonClick("Add accreditated research registration");

  cy.get(dataCy("form-modal")).should("be.visible");

  cy.get("#associated_organisation_name").type(
    accreditation.associated_organisation_name
  );
  cy.get("#id_string").type(accreditation.id_string);
  cy.dateSelectValue("issue_date", accreditation.issue_date);
  cy.dateSelectValue("expiry_date", accreditation.expiry_date);

  cy.saveFormClick();
};

const hasAccreditation = (accreditation: Accreditation) => {
  cy.getLatestRowOfResults();
  const row = cy.getResultsRowByValue(
    accreditation.associated_organisation_name
  );

  row.within(() => {
    cy.contains("td", accreditation.associated_organisation_name);
    cy.contains("td", accreditation.id_string);
    cy.contains("td", formatShortDate(accreditation.issue_date));
    cy.contains("td", formatShortDate(accreditation.expiry_date));
  });
};

const editAccreditation = (
  accreditation: Accreditation,
  updated: Partial<Accreditation>
) => {
  cy.getResultsActionMenu(accreditation.associated_organisation_name).click();

  cy.actionMenuClick("View or edit");

  if (updated.associated_organisation_name) {
    cy.get("#associated_organisation_name")
      .clear()
      .type(updated.associated_organisation_name);
  }

  if (updated.id_string) {
    cy.get("#id_string").clear().type(updated.id_string);
  }

  cy.saveFormClick();
};

const removeAccreditation = (accreditation: Accreditation) => {
  cy.getLatestRowOfResults();
  cy.getResultsActionMenu(accreditation.associated_organisation_name).click();

  cy.actionMenuClick("Delete");

  cy.clickAlertModal("Delete", "Warning");
  cy.clickAlertModal("Close");
};

const hasRemovedAccreditation = (accreditation: Accreditation) => {
  cy.getResultsRow()
    .contains("td", accreditation.associated_organisation_name)
    .should("not.exist");
};

export {
  addAccreditation,
  editAccreditation,
  hasRemovedAccreditation,
  hasAccreditation,
  removeAccreditation,
};
