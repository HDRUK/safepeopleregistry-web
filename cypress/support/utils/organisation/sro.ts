import { Organisation } from "@/types/application";
import { KeyContactFormValues } from "@/types/form";
import { DEFAULT_PDF_FILE } from "../data";
import { dataCy } from "../common";

const addSROOrganisations = (
  data: Partial<KeyContactFormValues> & {
    sro_profile_uri: string;
  }
) => {
  cy.selectValue("department", data.department);
  cy.get("#role").clear().type(data.job_title);
  cy.get("#sro_profile_uri").clear().type(data.sro_profile_uri);

  cy.contains("button", /Upload SRO Declaration Form/i).click();
  cy.get("input[type=file]").selectFile(DEFAULT_PDF_FILE, {
    force: true,
  });

  cy.saveContinueClick();
  cy.swalClick("Close");
  cy.swalClick("OK");
};

const hasSROOrganisation = (
  organisation: Organisation,
  status: "Approved" | "Not approved"
) => {
  cy.getResultsRowByValue(organisation.organisation_name).within(() => {
    cy.contains("td", status);
  });
};

const hasSRODisabledTabsOrganisations = () => {
  cy.get(dataCy("tabs-navigation")).within(() => {
    cy.contains("a.Mui-disabled", "Team").should("exist");
    cy.contains("a.Mui-disabled", "Users").should("exist");
    cy.contains("a.Mui-disabled", "Projects").should("exist");
  });
};

const hasSROEnabledTabsOrganisations = () => {
  cy.get(dataCy("tabs-navigation")).within(() => {
    cy.contains("a.Mui-disabled", "Team").should("not.exist");
    cy.contains("a.Mui-disabled", "Users").should("not.exist");
    cy.contains("a.Mui-disabled", "Projects").should("not.exist");
  });
};

export {
  addSROOrganisations,
  hasSRODisabledTabsOrganisations,
  hasSROOrganisation,
  hasSROEnabledTabsOrganisations,
};
