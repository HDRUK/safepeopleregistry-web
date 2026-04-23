import { mockedProfessionalRegistration } from "@/mocks/data/user";
import { ROUTES } from "@/consts/router";
import { faker } from "@faker-js/faker";
import { logout } from "cypress/support/utils/common";
import { loginUser } from "cypress/support/utils/user/auth";
import {
  addProfessionalRegistration,
  editProfessionalRegistration,
  hasProfessionalRegistration,
  hasRemovedProfessionalRegistration,
  removeProfessionalRegistration,
} from "cypress/support/utils/user/professionalRegistrations";

describe("Professional registrations journey", () => {
  beforeEach(() => {
    loginUser();

    cy.visitFirst(ROUTES.profileResearcherTraining.path);

    cy.waitForLoadingToFinish();
  });

  after(() => {
    logout();
  });

  it("should have no detectable accessibility violations on load", () => {
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });

  it("Adds a professional membership", () => {
    const dataRegistration = mockedProfessionalRegistration({
      name: faker.company.name(),
      member_id: faker.string.alphanumeric(8).toUpperCase(),
    });

    addProfessionalRegistration(dataRegistration);

    cy.clickAlertModal("Close");

    hasProfessionalRegistration(dataRegistration);
  });

  it("Edits a professional membership", () => {
    const dataRegistration = mockedProfessionalRegistration({
      name: faker.company.name(),
      member_id: faker.string.alphanumeric(8).toUpperCase(),
    });

    const dataEditedRegistration = {
      ...dataRegistration,
      member_id: faker.string.alphanumeric(8).toUpperCase(),
    };

    addProfessionalRegistration(dataRegistration);
    cy.clickAlertModal("Close");

    editProfessionalRegistration(dataRegistration, dataEditedRegistration);

    cy.clickAlertModal("Close");

    hasProfessionalRegistration(dataEditedRegistration);
  });

  it("Removes a professional membership", () => {
    const dataRegistration = mockedProfessionalRegistration({
      name: faker.company.name(),
      member_id: faker.string.alphanumeric(8).toUpperCase(),
    });

    addProfessionalRegistration(dataRegistration);
    cy.clickAlertModal("Close");

    removeProfessionalRegistration(dataRegistration);

    hasRemovedProfessionalRegistration(dataRegistration);
  });
});
