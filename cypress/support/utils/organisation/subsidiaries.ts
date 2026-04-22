export interface SubsidiaryFields {
  name: string;
  address_1: string;
  town: string;
  postcode: string;
  website?: string;
}

const addSubsidiary = (subsidiary: SubsidiaryFields) => {
  cy.buttonClick("Add a subsidiary");

  cy.get('[role="presentation"]').should("be.visible");

  cy.get("#name").type(subsidiary.name);
  cy.get("#address\\.address_1").type(subsidiary.address_1);
  cy.get("#address\\.town").type(subsidiary.town);
  cy.get("#address\\.postcode").type(subsidiary.postcode);

  if (subsidiary.website) {
    cy.get("#website").type(subsidiary.website);
  }

  cy.saveFormClick();
};

const hasSubsidiary = (subsidiary: SubsidiaryFields) => {
  cy.contains("td", subsidiary.name).should("exist");
};

const editSubsidiary = (
  subsidiary: SubsidiaryFields,
  updated: Partial<SubsidiaryFields>
) => {
  cy.contains("td", subsidiary.name)
    .parent("tr")
    .find("td")
    .last()
    .find("svg")
    .first()
    .click();

  if (updated.name) {
    cy.get("#name").clear().type(updated.name);
  }

  if (updated.address_1) {
    cy.get("#address\\.address_1").clear().type(updated.address_1);
  }

  cy.saveFormClick();
};

const removeSubsidiary = (subsidiary: SubsidiaryFields) => {
  cy.contains("td", subsidiary.name)
    .parent("tr")
    .find("td")
    .last()
    .find("svg")
    .last()
    .click();

  cy.clickAlertModal("Go ahead", "Delete");
  cy.clickAlertModal("Close");
};

const hasRemovedSubsidiary = (subsidiary: SubsidiaryFields) => {
  cy.contains("td", subsidiary.name).should("not.exist");
};

export {
  addSubsidiary,
  editSubsidiary,
  hasRemovedSubsidiary,
  hasSubsidiary,
  removeSubsidiary,
};
