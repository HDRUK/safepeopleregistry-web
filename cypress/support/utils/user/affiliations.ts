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
  const x = {
    relationship: "Employee",
    organisation: {
      organisation_name: "Health Data Research UK",
    },
    role: "Manager",
    member_id: "123456789",
    from: "2020-01-01",
    to: null,
    current_employer: true,
    email: "abc@asd.com",
  };
  cy.buttonClick("Add affiliation");

  cy.get(dataCy("form-modal")).should("be.visible");

  // cy.dateSelectValue("from", x.from);
  // cy.checkboxCheck("current_employer");
  // cy.selectValue("organisation_id", x.organisation.organisation_name);
  // cy.selectValue("relationship", x.relationship);
  cy.get("#role").type(x.role);
  cy.get("#member_id").type(x.member_id);
  cy.get("#email").type(x.email);

  cy.saveFormClick();
  cy.swalClick("Close", "Verification needed");
};

const hasCurrentAffiliationUsers = (affiliation: ResearcherAffiliation) => {
  const row = cy.getResultsRowByValue(affiliation.member_id);

  row.within(() => {
    cy.contains("td", capitaliseFirstLetter(affiliation.relationship));
    cy.contains("td", affiliation.member_id);
    cy.contains("td", getStatus(Status.AFFILIATION_EMAIL_VERIFY));
    cy.contains("td", `${formatShortDate(affiliation.from)} - Present`);
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
    cy.contains("td", affiliation.relationship);
    cy.contains("td", affiliation.member_id);
    cy.contains("td", getStatus(Status.AFFILIATION_EMAIL_VERIFY));
    cy.contains("td", `${formatShortDate(affiliation.from)} - Present`);
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
