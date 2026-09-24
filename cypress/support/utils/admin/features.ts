import { ROUTES } from "@/consts/router";
import { dataCy } from "../common";
import { loginAdmin } from "./auth";

const FEATURE_FLAG_VALUE_COLUMN = 3; // name, description, scope, value

// Starts from the document body rather than whatever Cypress currently has
// scoped. A test that fails inside .within() - cy.clickAlertModal does - leaks
// that scope into the after hook, which would otherwise search for the tab
// inside a dead modal and leave the flag unrestored for every later spec.
const pageBody = () => cy.document().its("body");

const openFeatureFlags = () => {
  pageBody().contains("Feature Flags").click();
};

const featureFlagValueCell = (feature: string) =>
  pageBody()
    .find("tbody tr")
    .contains("td", feature)
    .parent()
    .find("td")
    .eq(FEATURE_FLAG_VALUE_COLUMN);

const featureFlagActionMenu = (feature: string) =>
  pageBody()
    .find("tbody tr")
    .contains("td", feature)
    .parent()
    .find(dataCy("action-menu"));

const hasFeatureFlag = (feature: string, enabled: string) => {
  openFeatureFlags();

  cy.getResultsRowByValue(feature).within(() => {
    cy.contains("td", enabled);
  });
};

// Reads the current value of a flag so a spec can put it back the way it found
// it. Yields a boolean, so use it as `getFeatureFlag(x).then(value => ...)`.
const getFeatureFlag = (feature: string) => {
  openFeatureFlags();

  return featureFlagValueCell(feature)
    .invoke("text")
    .then(text => text.trim() === "true");
};

// Idempotent: toggles only when the flag isn't already at the wanted value, so
// a spec doesn't have to know the environment's starting state.
const setFeatureFlag = (feature: string, enabled: boolean) => {
  openFeatureFlags();

  featureFlagValueCell(feature)
    .invoke("text")
    .then(text => {
      if (text.trim() === String(enabled)) return;

      featureFlagActionMenu(feature).click();
      cy.actionMenuClick(enabled ? "Enable" : "Disable");
      cy.wait(700);

      featureFlagValueCell(feature).should("have.text", String(enabled));
    });
};

// Registers before/after hooks that put a flag into the wanted state for the
// whole spec and then put it back the way it found it. The flag is global
// server state shared by every spec in the run, so nothing here is safe to
// leave behind.
const runWithFeatureFlag = (feature: string, enabled: boolean) => {
  let original: boolean;

  before(() => {
    loginAdmin();

    cy.visitFirst(ROUTES.profileAdmin.path);

    getFeatureFlag(feature).then(value => {
      original = value;
    });

    setFeatureFlag(feature, enabled);
  });

  after(() => {
    loginAdmin();

    cy.visitFirst(ROUTES.profileAdmin.path);

    setFeatureFlag(feature, original);
  });
};

const canToggleFeature = (feature: string, enabled: string, leave = false) => {
  const startingToggle = enabled === "true" ? "Disable" : "Enable";
  const reverseEnabled = enabled === "true" ? "false" : "true";
  const reverseToggle = enabled !== "true" ? "Disable" : "Enable";
  cy.contains("Feature Flags").click();
  cy.getResultsRowByValue(feature).within(() => {
    cy.contains("td", enabled);
  });

  cy.getResultsActionMenu(feature).click();

  cy.actionMenuClick(startingToggle);
  cy.wait(700);

  cy.getResultsRowByValue(feature).within(() => {
    cy.contains("td", reverseEnabled);
  });

  if (!leave) {
    cy.getResultsActionMenu(feature).click();
    cy.actionMenuClick(reverseToggle);
  }
};

export {
  canToggleFeature,
  getFeatureFlag,
  hasFeatureFlag,
  openFeatureFlags,
  runWithFeatureFlag,
  setFeatureFlag,
};
