import { Organisation } from "@/types/application";

const validateSROOrganisations = (
  data: Organisation,
  action: "Approve" | "Unapprove"
) => {
  cy.contains("Organisations - Senior Responsible Officer").click();

  cy.getResultsActionMenu(data.organisation_name).click();

  cy.actionMenuClick(action);
};

export { validateSROOrganisations };
