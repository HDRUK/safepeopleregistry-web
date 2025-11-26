import { DelegatesFormValues } from "@/types/form";
import { getName } from "@/utils/application";
import { formatDisplayShortDate } from "@/utils/date";
import { DEFAULT_DEPARTMENT } from "../data";
import { dataCy } from "../common";

const getDelegateName = (data: DelegatesFormValues) => {
  const { delegate_first_name, delegate_last_name } = data;

  return getName({
    first_name: delegate_first_name,
    last_name: delegate_last_name,
  });
};

const inviteNewDelegateOrganisations = (data: DelegatesFormValues) => {
  cy.contains("button", "Add Delegate").click();

  cy.get("#delegate_first_name").type(data.delegate_first_name);
  cy.get("#delegate_last_name").type(data.delegate_last_name);
  cy.get("#delegate_email").type(data.delegate_email);
  cy.selectValue("department_name", DEFAULT_DEPARTMENT);
  cy.get("#delegate_job_title").type(data.delegate_job_title);

  cy.saveFormClick("Invite");
  cy.swalClick("Close");
};

const hasDelegateOrganisations = (data: DelegatesFormValues) => {
  const { delegate_first_name, delegate_last_name, department_name } = data;
  const partialUser = {
    first_name: delegate_first_name,
    last_name: delegate_last_name,
  };
cy.getLatestRowOfResults();
  const row = cy.getResultsRowByValue(getName(partialUser));

  row.within(() => {
    cy.contains("td", getName(partialUser));
    cy.contains("td", department_name);
    cy.contains("td", formatDisplayShortDate(new Date().toISOString()));
  });
};

const editDelegateOrganisations = (
  data: Partial<DelegatesFormValues>,
  originalData: DelegatesFormValues
) => {
  cy.getResultsActionMenu(getDelegateName(originalData)).click();

  cy.actionMenuClick("Edit");

  cy.get("#first_name").clear().type(data.delegate_first_name);
  cy.get("#last_name").clear().type(data.delegate_last_name);
  cy.selectValue("department_id", data.department_name);

  cy.saveFormClick();
  cy.swalClick("Close");
};

const removeDelegateOrganisations = (data: DelegatesFormValues) => {
  cy.getResultsActionMenu(getDelegateName(data)).click();

  cy.actionMenuClick("Remove");

  cy.swalClick("Remove", "Remove Delegate?");
  cy.swalClick("OK");
};

const hasNoDelegateOrganisations = () => {
  cy.getResultsRow().should("not.exist");
};

export {
  editDelegateOrganisations,
  hasDelegateOrganisations,
  removeDelegateOrganisations,
  inviteNewDelegateOrganisations,
  hasNoDelegateOrganisations,
};
