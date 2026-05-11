import { ROUTES } from "@/consts/router";
import { faker } from "@faker-js/faker";
import { logout } from "cypress/support/utils/common";
import { loginOrganisation } from "cypress/support/utils/organisation/auth";
import {
  addSubsidiary,
  editSubsidiary,
  hasRemovedSubsidiary,
  hasSubsidiary,
  removeSubsidiary,
} from "cypress/support/utils/organisation/subsidiaries";

const dataSubsidiary = {
  name: `${faker.company.name()} UK`,
  address_1: faker.location.streetAddress(),
  town: faker.location.city(),
  postcode: "SW1A 1AA",
};

const dataEditedSubsidiary = {
  ...dataSubsidiary,
  name: `${faker.company.name()} UK`,
  address_1: faker.location.streetAddress(),
};

describe("Subsidiaries journey", () => {
  beforeEach(() => {
    loginOrganisation();

    cy.visitFirst(ROUTES.profileOrganisationDetailsNameAndAddress.path);
  });

  after(() => {
    logout();
  });

  it("should have no detectable accessibility violations on load", () => {
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });

  it("Adds a subsidiary", () => {
    addSubsidiary(dataSubsidiary);

    cy.clickAlertModal("Close");

    hasSubsidiary(dataSubsidiary);
  });

  it("Edits a subsidiary", () => {
    editSubsidiary(dataSubsidiary, dataEditedSubsidiary);

    cy.clickAlertModal("Close");

    hasSubsidiary(dataEditedSubsidiary);
  });

  it("Removes a subsidiary", () => {
    removeSubsidiary(dataEditedSubsidiary);

    hasRemovedSubsidiary(dataEditedSubsidiary);
  });
});
