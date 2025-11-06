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

  cy.selectValue("organisation_id", affiliation.organisation.organisation_name);
  cy.selectValue("relationship", affiliation.relationship);
  cy.get("#role").type(affiliation.role);
  cy.get("#member_id").type(affiliation.member_id);

  if (affiliation.email) {
    cy.get("#email").type(affiliation.email);
  }

  cy.saveFormClick();
};

const hasAffiliationUsers = (
  affiliation: ResearcherAffiliation,
  status?: Status
) => {
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
            : Status.AFFILIATION_INVITED)
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
  edittedAffiliation: ResearcherAffiliation
) => {
  cy.getResultsActionMenu(affiliation.member_id).click();

  cy.actionMenuClick("View or edit");

  cy.dateSelectValue("from", edittedAffiliation.from);

  if (!affiliation.current_employer) {
    cy.dateSelectValue("to", edittedAffiliation.to);
  }

  cy.selectValue("relationship", edittedAffiliation.relationship);
  cy.get("#role").clear().type(edittedAffiliation.role);
  cy.get("#member_id").clear().type(edittedAffiliation.member_id);

  cy.saveFormClick();
  cy.swalClick();
};

const removeAffiliationUsers = (affiliation: ResearcherAffiliation) => {
  cy.getResultsActionMenu(affiliation.member_id).click();

  cy.actionMenuClick("Delete");

  cy.swalClick("Delete", "Warning");
  cy.swalClick("Close");
};

const hasRemoveAffiliationUsers = (affiliation: ResearcherAffiliation) => {
  cy.getResultsRow().contains("td", affiliation.member_id).should("not.exist");
};

export {
  addAffiliationUsers,
  editAffiliationUsers,
  hasAffiliationUsers,
  hasRemoveAffiliationUsers,
  removeAffiliationUsers,
};
