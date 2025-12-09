const hasFeatureFlag = (feature: string, enabled: string) => {
    cy.contains("Feature Flags").click();

    cy.getResultsRowByValue(feature).within(() => {
        cy.contains("td", enabled);
    });
};

const canToggleFeature = (feature: string, enabled: string) => {

    const startingToggle = (enabled === 'true') ? 'Disable' : 'Enable'
    const reverseEnabled = (enabled === 'true') ? 'false' : 'true'
    const reverseToggle = (enabled !== 'true') ? 'Disable' : 'Enable'
    cy.contains("Feature Flags").click();
    cy.getResultsRowByValue(feature).within(() => {
        cy.contains("td", enabled);
    });

    cy.getResultsActionMenu(feature).click();

    cy.actionMenuClick(startingToggle);
    cy.wait(700);

    cy.getResultsRowByValue(feature).within(() => {
        cy.contains("td", reverseEnabled);
    });
    cy.getResultsActionMenu(feature).click();

    cy.actionMenuClick(reverseToggle);
};

export {
    hasFeatureFlag,
    canToggleFeature
}