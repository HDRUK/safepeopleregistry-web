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
  cy.checkboxCheck("current_employer");
  cy.selectValue("organisation_id", affiliation.organisation.organisation_name);
  cy.selectValue("relationship", affiliation.relationship);
  cy.get("#role").type("affiliation.role");
  cy.get("#member_id").type(affiliation.member_id);
  cy.get("#email").type(affiliation.email);

  cy.saveFormClick();
  cy.swalClick("Close", "Verification needed");
};

const hasCurrentAffiliationUsers = (affiliation: ResearcherAffiliation) => {
  const row = cy.getResultsRowByValue(affiliation.member_id);

  row.within(() => {
    return cy.contains("td", capitaliseFirstLetter(affiliation.relationship));
  });

  row.within(() => {
    return cy.contains("td", affiliation.member_id);
  });

  row.within(() => {
    return cy.contains("td", getStatus(Status.AFFILIATION_EMAIL_VERIFY), {
      timeout: 2000,
    });
  });

  row.within(() => {
    return cy.contains("td", `${formatShortDate(affiliation.from)} - Present`);
  });
};

const editAffiliationUsers = (affiliation: ResearcherAffiliation) => {
  cy.getResultsActionMenu(affiliation.member_id).click();

  cy.actionMenuClick("View or edit");

  cy.dateSelectValue("from", affiliation.from);

  if (!affiliation.current_employer) {
    cy.dateSelectValue("to", affiliation.to);
  }

  cy.selectValue("relationship", affiliation.relationship);
  cy.get("#role").clear().type(affiliation.role);
  cy.get("#member_id").clear().type(affiliation.member_id);

  cy.saveFormClick();
  cy.swalClick();
};

const hasEditAffiliationUsers = (affiliation: ResearcherAffiliation) => {
  const row = cy.getResultsRowByValue(affiliation.member_id);

  row.within(() => {
    return cy.contains("td", affiliation.relationship, {
      timeout: 2000,
    });
  });

  row.within(() => {
    return cy.contains("td", affiliation.member_id, {
      timeout: 2000,
    });
  });

  row.within(() => {
    return cy.contains("td", getStatus(Status.AFFILIATION_EMAIL_VERIFY));
  });

  row.within(() => {
    return cy.contains("td", `${formatShortDate(affiliation.from)} - Present`, {
      timeout: 2000,
    });
  });
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
  hasCurrentAffiliationUsers,
  hasEditAffiliationUsers,
  hasRemoveAffiliationUsers,
  removeAffiliationUsers,
};
