import { ROUTES } from "@/consts/router";
import { DEFAULT_PROJECT_NAME } from "../data";

const goToSafePeople = () => {
  cy.visitFirst(ROUTES.profileCustodianProjects.path);

  cy.visitFirst(ROUTES.profileCustodianProjects.path);
  cy.contains("a", DEFAULT_PROJECT_NAME).click();
  cy.contains("a", "Safe People").click();
  cy.contains("button", "Switch to list view").click();
};

export { goToSafePeople };
