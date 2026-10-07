import { Status } from "@/consts/application";
import { ResearcherAffiliation } from "@/types/application";
import { getStatus } from "@/utils/application";
import { formatShortDate } from "@/utils/date";
import { capitaliseFirstLetter } from "@/utils/string";
import { dataCy } from "../common";
import { DEFAULT_AFFILIATION_USERS } from "../data";

const addAffiliationUsers = (
  affiliation: ResearcherAffiliation = DEFAULT_AFFILIATION_USERS
) => {
  cy.buttonClick("Add affiliation");

  cy.get(dataCy("form-modal")).should("be.visible");

  cy.dateSelectValue("from", affiliation.from);

  if (!affiliation.current_employer) {
    cy.dateSelectValue("to", affiliation.to);
  } else {
    cy.checkboxCheck("current_employer");
  }

  cy.selectValue(
    "#organisation_id",
    affiliation.organisation.organisation_name
  );
  cy.selectValue("#relationship", affiliation.relationship);
  cy.get("#role").type(affiliation.role);
  cy.get("#member_id").type(affiliation.member_id);

  if (affiliation.email) {
    cy.get("#email").type(affiliation.email);
  }

  cy.saveFormClick();
};

// Adds an affiliation against an Organisation that isn't on the Registry yet,
// via the "Organisation not listed? Ask them to register" link. Leaving
// `organisation_email` out exercises the SroRequirementEnabled=false path,
// where the SRO email address is optional.
const addAffiliationForNewOrganisationUsers = (
  affiliation: ResearcherAffiliation,
  organisation: { organisation_name: string; organisation_email?: string }
) => {
  openNewOrganisationAffiliationForm();

  cy.get("#organisation_name").clear().type(organisation.organisation_name);

  if (organisation.organisation_email) {
    cy.get("#organisation_email").clear().type(organisation.organisation_email);
  }

  cy.dateSelectValue("from", affiliation.from);
  cy.dateSelectValue("to", affiliation.to);

  cy.selectValue("#relationship", affiliation.relationship);
  cy.get("#role").clear().type(affiliation.role);
  cy.get("#member_id").clear().type(affiliation.member_id);

  cy.saveFormClick();
};

// Opens "Add affiliation" and switches the form over to naming an Organisation
// that isn't on the Registry yet.
const openNewOrganisationAffiliationForm = () => {
  cy.buttonClick("Add affiliation");

  cy.get(dataCy("form-modal")).should("be.visible");

  cy.buttonClick("Ask them to register");

  cy.get("#organisation_name").should("be.visible");
};

const hasAffiliationUsers = (
  affiliation: ResearcherAffiliation,
  status?: Status
) => {
  cy.getLatestRowOfResults();

  const row = cy.getResultsRowByValue(affiliation.member_id);

  row.within(() => {
    cy.contains("td", capitaliseFirstLetter(affiliation.relationship));
    cy.contains("td", affiliation.member_id);

    cy.contains(
      "td",
      getStatus(
        status ||
          (affiliation.current_employer
            ? Status.AFFILIATION_EMAIL_VERIFY
            : Status.AFFILIATION_PENDING)
      )
    );

    cy.contains(
      "td",
      `${formatShortDate(affiliation.from)} - ${affiliation.current_employer ? "Present" : formatShortDate(affiliation.to)}`
    );
  });
};

const editAffiliationUsers = (
  affiliation: ResearcherAffiliation,
  editedAffiliation: ResearcherAffiliation
) => {
  cy.getLatestRowOfResults();
  cy.getResultsActionMenu(affiliation.member_id).click();

  cy.actionMenuClick("View or edit");

  cy.dateSelectValue("from", editedAffiliation.from);

  if (!affiliation.current_employer) {
    cy.dateSelectValue("to", editedAffiliation.to);
  }

  cy.selectValue("#relationship", editedAffiliation.relationship);
  cy.get("#role").clear().type(editedAffiliation.role);
  cy.get("#member_id").clear().type(editedAffiliation.member_id);

  cy.saveFormClick();
  cy.clickAlertModal();
};

const removeAffiliationUsers = (affiliation: ResearcherAffiliation) => {
  cy.getLatestRowOfResults();
  cy.getResultsActionMenu(affiliation.member_id).click();

  cy.actionMenuClick("Delete");

  cy.clickAlertModal("Delete", "Warning");
  cy.clickAlertModal("Close");
};

const hasRemoveAffiliationUsers = (affiliation: ResearcherAffiliation) => {
  cy.getResultsRow().contains("td", affiliation.member_id).should("not.exist");
};

const resendAffiliationVerification = (affiliation: ResearcherAffiliation) => {
  cy.getLatestRowOfResults();
  cy.getResultsActionMenu(affiliation.member_id).click();

  cy.actionMenuClick("Resend verification email");

  cy.clickAlertModal("Close");
};

export {
  addAffiliationForNewOrganisationUsers,
  addAffiliationUsers,
  editAffiliationUsers,
  hasAffiliationUsers,
  hasRemoveAffiliationUsers,
  openNewOrganisationAffiliationForm,
  removeAffiliationUsers,
  resendAffiliationVerification,
};
