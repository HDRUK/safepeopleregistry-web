import { dataCy } from "../common";

function hasOrganisationSponsorshipStatus(status: string) {
  cy.get(dataCy("status-list")).within(() => {
    cy.contains(/Sponsorship/i)
      .next()
      .contains(status);
  });
}

function confirmOrganisationSponsorship(label: string) {
  cy.contains("label", label).click();
  cy.contains("button", "Save decision").click();

  cy.clickAlertModal("Close");
}

export { hasOrganisationSponsorshipStatus, confirmOrganisationSponsorship };
