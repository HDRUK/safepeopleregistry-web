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

const dataRegistration = mockedProfessionalRegistration({
  name: faker.company.name(),
  member_id: faker.string.alphanumeric(8).toUpperCase(),
});

const dataEditedRegistration = {
  ...dataRegistration,
  member_id: faker.string.alphanumeric(8).toUpperCase(),
};

describe("Professional registrations journey", () => {
  beforeEach(() => {
    loginUser();

    cy.visitFirst(ROUTES.profileResearcherTraining.path);
  });

  after(() => {
    logout();
  });

  it("should have no detectable accessibility violations on load", () => {
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });

  it("Adds a professional membership", () => {
    addProfessionalRegistration(dataRegistration);

    cy.clickAlertModal("Close");

    hasProfessionalRegistration(dataRegistration);
  });

  it("Edits a professional membership", () => {
    editProfessionalRegistration(dataRegistration, dataEditedRegistration);

    cy.clickAlertModal("Close");

    hasProfessionalRegistration(dataEditedRegistration);
  });

  it("Removes a professional membership", () => {
    removeProfessionalRegistration(dataEditedRegistration);

    hasRemovedProfessionalRegistration(dataEditedRegistration);
  });
});
