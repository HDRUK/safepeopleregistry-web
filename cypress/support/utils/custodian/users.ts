import { Status } from "@/consts/application";
import { User } from "@/types/application";
import { getName, getStatus } from "@/utils/application";
import { formatDisplayShortDate } from "@/utils/date";
import { dataCy } from "../common";
import { DEFAULT_ORGANISATION_NAME, DEFAULT_PROJECT_NAME } from "../data";

const hasAffiliationsTabCustodianUser = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Affiliations").click();
  });
  cy.contains("h2", "Affiliations").should("exist");

  const row = cy.getResultsRowByValue(DEFAULT_ORGANISATION_NAME);

  row.within(() => {
    cy.contains("td", DEFAULT_ORGANISATION_NAME).should("exist");
    cy.contains("td", getStatus(Status.INVITED)).should("exist");
    cy.contains("td", formatDisplayShortDate(new Date().toISOString())).should(
      "exist"
    );
  });
};

const hasProjectsTabCustodianUser = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Projects").click();
  });
  cy.contains("h2", "Projects").should("exist");

  const row = cy.getResultsRowByValue(DEFAULT_PROJECT_NAME);

  row.within(() => {
    cy.contains("td", DEFAULT_PROJECT_NAME).should("exist");
    cy.contains("td", DEFAULT_ORGANISATION_NAME).should("exist");
    cy.contains("td", getStatus(Status.PENDING)).should("exist");
    cy.contains("td", getStatus(Status.INVITED)).should("exist");
  });
};

const hasIdentityTabCustodianUser = (user: User) => {
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
};

const hasTrainingandAccreditationsTabCustodianUser = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Training and Accreditations").click();
  });
  cy.contains("h2", "Training and Accreditations").should("exist");
  cy.contains("h3", "Training history").should("exist");
  cy.contains("h3", "Professional membership history").should("exist");
};

const hasAutomatedFlagsTabCustodianUser = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Automated Flags").click();
  });
  cy.contains("h2", "Automated Flags").should("exist");
};

const hasHistoryTabCustodianUser = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "History").click();
  });
  cy.contains("h2", "History").should("exist");
};

export {
  hasAffiliationsTabCustodianUser,
  hasAutomatedFlagsTabCustodianUser,
  hasHistoryTabCustodianUser,
  hasIdentityTabCustodianUser,
  hasProjectsTabCustodianUser,
  hasTrainingandAccreditationsTabCustodianUser,
};
