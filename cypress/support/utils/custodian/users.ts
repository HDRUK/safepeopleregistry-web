import { dataCy } from "../common";

const hasAffiliationsTabCustodianUser = () => {
    cy.get(dataCy("tabs-navigation")).within(() => {
        cy.contains(".MuiTypography-root.MuiTypography-h2.mui-hiplwz-MuiTypography-root", "Affiliations").should("exist");
    });
};

const hasProjectsTabCustodianUser = () => {
    cy.get(dataCy("tabs-navigation")).within(() => {
        cy.contains(".MuiTypography-root.MuiTypography-h2.mui-hiplwz-MuiTypography-root", "Projects").should("exist");
    });
};

const hasIdentityTabCustodianUser = () => {
    cy.get(dataCy("tabs-navigation")).within(() => {
        cy.contains(".MuiTypography-root.MuiTypography-h2.mui-hiplwz-MuiTypography-root", "Identity").should("exist");
    });
};

const hasTrainingandAccreditationsTabCustodianUser = () => {
    cy.get(dataCy("tabs-navigation")).within(() => {
        cy.contains(".MuiTypography-root.MuiTypography-h2.mui-hiplwz-MuiTypography-root", "Training and Accreditations").should("exist");
    });
};

const hasAutomatedFlagsTabCustodianUser = () => {
    cy.get(dataCy("tabs-navigation")).within(() => {
        cy.contains(".MuiTypography-root.MuiTypography-h2.mui-hiplwz-MuiTypography-root", "Automated Flags").should("exist");
    });
};

const hasHistoryTabCustodianUser = () => {
    cy.get(dataCy("tabs-navigation")).within(() => {
        cy.contains(".MuiTypography-root.MuiTypography-h2.mui-hiplwz-MuiTypography-root", "History").should("exist");
    });
};
export {
    hasAffiliationsTabCustodianUser,
    hasProjectsTabCustodianUser,
    hasIdentityTabCustodianUser,
    hasTrainingandAccreditationsTabCustodianUser,
    hasAutomatedFlagsTabCustodianUser,
    hasHistoryTabCustodianUser,
};
