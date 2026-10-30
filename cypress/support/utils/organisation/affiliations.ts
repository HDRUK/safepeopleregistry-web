import { Status } from "@/consts/application";
import { ResearcherAffiliation, User } from "@/types/application";
import { getStatus } from "@/utils/application";
import { dataCy } from "../common";

const approveAffiliationOrganisations = () => {
  cy.buttonClick("Confirm affiliation");

  cy.clickAlertModal("Close");
};

const hasAffiliationApprovedOrganisations = (
  affiliation: ResearcherAffiliation
) => {
  hasAffiliationOrganisations({
    ...affiliation,
    model_state: {
      state: {
        slug: Status.AFFILIATION_APPROVED,
      },
    },
  });
};

const declineAffiliationOrganisations = () => {
  cy.buttonClick("Decline affiliation");

  cy.clickAlertModal("Close");
};

const hasAffiliationDeclinedOrganisations = (
  affiliation: ResearcherAffiliation
) => {
  hasAffiliationOrganisations({
    ...affiliation,
    model_state: {
      state: {
        slug: Status.AFFILIATION_REJECTED,
      },
    },
  });
};

const hasStatus = (status: Status) => {
  cy.get(dataCy("status-list")).contains(getStatus(status));
};

const addAffiliationOrganisations = (invite: User) => {
  cy.buttonClick("Add another user");

  cy.get(dataCy("form-modal")).should("be.visible");

  cy.get("#first_name").clear().type(invite.first_name);
  cy.get("#last_name").clear().type(invite.last_name);
  cy.get("#email").clear().type(invite.email);

  cy.saveFormClick("Invite");
};

// Records today as the leave date, so the affiliation ends straight away.
const recordLeaverOrganisations = (affiliation: ResearcherAffiliation) => {
  cy.getResultsActionMenu(affiliation.email).click();

  cy.actionMenuClick("Record leaver");

  cy.dateSelectValue("to", new Date().toISOString().slice(0, 10));

  cy.saveFormClick();
  cy.clickAlertModal();
};

// A leaver stays in the Organisation's records, as having left.
const hasLeaverOrganisations = (affiliation: ResearcherAffiliation) => {
  const row = cy.getResultsRowByValue(affiliation.email);

  row.within(() => {
    cy.contains("td", "Left");
  });
};

const hasAffiliationOrganisations = (affiliation: ResearcherAffiliation) => {
  cy.getLatestRowOfResults();
  const row = cy.getResultsRowByValue(affiliation.email);

  row.within(() => {
    return cy.contains("td", affiliation.email);
  });

  row.within(() => {
    return cy.contains("td", getStatus(affiliation.model_state.state.slug));
  });

  cy.getResultsActionMenu(affiliation.email).should("exist");
};

export {
  addAffiliationOrganisations,
  approveAffiliationOrganisations,
  declineAffiliationOrganisations,
  hasAffiliationApprovedOrganisations,
  hasAffiliationDeclinedOrganisations,
  hasAffiliationOrganisations,
  hasLeaverOrganisations,
  recordLeaverOrganisations,
  hasStatus,
};
