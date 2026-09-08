import { Status } from "@/consts/application";
import { User } from "@/types/application";
import { getName, getStatus } from "@/utils/application";
import { formatDisplayShortDate } from "@/utils/date";
import { dataCy } from "../common";
import { DEFAULT_ORGANISATION_NAME, DEFAULT_PROJECT_NAME } from "../data";

const has6TabsCustodianUser = (user: User) => {
  cy.clickSubTab("Affiliations");
  cy.contains("h2", "Affiliations").should("be.visible");

  const row1 = cy.getResultsRowByValue(DEFAULT_ORGANISATION_NAME);

  row1.within(() => {
    cy.contains("td", DEFAULT_ORGANISATION_NAME).should("exist");
    cy.contains("td", getStatus(Status.INVITED)).should("exist");
    cy.contains("td", formatDisplayShortDate(new Date().toISOString())).should(
      "exist"
    );
  });

  cy.clickSubTab("Projects");
  cy.contains("h2", "Projects").should("exist");

  const row2 = cy.getResultsRowByValue(DEFAULT_PROJECT_NAME);

  row2.within(() => {
    cy.contains("td", DEFAULT_PROJECT_NAME).should("exist");
    cy.contains("td", DEFAULT_ORGANISATION_NAME).should("exist");
    cy.contains("td", getStatus(Status.PENDING)).should("exist");
    cy.contains("td", getStatus(Status.INVITED)).should("exist");
  });

  cy.clickSubTab("Identity");
  const name = getName(user);
  cy.get(dataCy("page-body")).within(() => {
    cy.contains(name).should("exist");
    cy.contains("p", "Location").should("contain.text", "Location");
    cy.contains("p", "Location not provided").should(
      "contain.text",
      "Location not provided"
    );
    cy.contains("p", "IDVT checks incomplete").should("exist");
  });

  cy.clickSubTab("Training and Accreditations");
  cy.contains("h2", "Training and Accreditations").should("exist");
  cy.contains("h3", "Training history").should("exist");
  cy.contains("h3", "Professional membership history").should("exist");

  cy.clickSubTab("Automated Flags");
  cy.contains("h2", "Automated Flags").should("exist");

  cy.clickSubTab("History");
  cy.contains("h2", "History").should("be.visible");
};

export { has6TabsCustodianUser };
