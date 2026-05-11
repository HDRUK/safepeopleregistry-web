import { mockedTraining } from "@/mocks/data/user";
import { ROUTES } from "@/consts/router";
import { faker } from "@faker-js/faker";
import { logout } from "cypress/support/utils/common";
import { loginUser } from "cypress/support/utils/user/auth";
import {
  addTraining,
  editTraining,
  hasRemovedTraining,
  hasTraining,
  removeTraining,
} from "cypress/support/utils/user/training";

describe("Training journey", () => {
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

  it("Adds a training course", () => {
    const dataTraining = mockedTraining({
      provider: faker.company.name(),
      training_name: faker.lorem.words(3),
      awarded_at: "2024-01-15",
      expires_at: "2028-01-15",
    });

    addTraining(dataTraining);

    cy.clickAlertModal("Close");

    hasTraining(dataTraining);
  });

  it("Edits a training course", () => {
    const dataTraining = mockedTraining({
      provider: faker.company.name(),
      training_name: faker.lorem.words(3),
      awarded_at: "2024-01-15",
      expires_at: "2028-01-15",
    });

    const dataEditedTraining = {
      ...dataTraining,
      provider: faker.company.name(),
      training_name: faker.lorem.words(3),
    };

    addTraining(dataTraining);
    cy.clickAlertModal("Close");

    editTraining(dataTraining, dataEditedTraining);

    cy.clickAlertModal("Close");

    hasTraining(dataEditedTraining);
  });

  it("Removes a training course", () => {
    const dataTraining = mockedTraining({
      provider: faker.company.name(),
      training_name: faker.lorem.words(3),
      awarded_at: "2024-01-15",
      expires_at: "2028-01-15",
    });

    addTraining(dataTraining);
    cy.clickAlertModal("Close");

    removeTraining(dataTraining);

    hasRemovedTraining(dataTraining);
  });
});
