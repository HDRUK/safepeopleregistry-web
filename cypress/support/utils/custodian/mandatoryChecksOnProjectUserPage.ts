const checkMandatoryCustodianTrainingTestingChecksAddMoreIformationCancelButton =
  () => {
    cy.verifyMandatoryTrainingCardTitleExists();

    cy.contains("button", "…").should("be.visible").click();

    cy.get(".MuiPopover-root")
      .should("be.visible")
      .within(() => {
        cy.contains("Add more information").should("be.visible").click();
      });

    cy.contains("button", "Cancel").should("be.visible").click();
  };

const checkMandatoryCustodianTrainingTestingChecksAddMoreInformation = () => {
  cy.verifyMandatoryTrainingCardTitleExists();
  cy.contains("button", "…").should("exist").click();
  cy.document()
    .find(".MuiPopover-root:visible")
    .within(() => {
      cy.contains("Add more information").click();
    });
  cy.contains("label", "Add any further comment").should("exist");
  const text = "Add more information Testing";
  cy.get("#comment").should("be.visible").click().type(text);
  cy.contains("button", "Add information").should("exist").click();
  cy.contains(text).should("exist");
};

const checkMandatoryCustodianTrainingTestingChecksPassCancelButton = () => {
  cy.verifyMandatoryTrainingCardTitleExists();
  cy.contains("button", "Pass").click();
  cy.contains("button", "Cancel").should("exist").click();
};

const checkMandatoryCustodianTrainingTestingChecksPass = () => {
  cy.verifyMandatoryTrainingCardTitleExists();
  cy.contains("button", "Pass").should("exist").click();
  cy.contains("label", "Add any further comment").should("exist");
  const text = "Mandatory Custodian Training Testing";
  cy.get("#comment").should("be.visible").click().type(text);
  cy.contains("button", "Confirm pass").should("exist").click();
  cy.contains("span", "Passed").should("exist");
  cy.contains(text).should("exist");
};

const checkMandatoryCustodianTrainingTestingChecksPassChangeDecision = () => {
  cy.get(".MuiPaper-root").then($el => {
    cy.verifyMandatoryTrainingCardTitleExists();
    if ($el.find('button:contains("Pass")').length) {
      cy.contains("button", "Pass").should("exist").click();
      const text = "Mandatory Custodian Training Testing";
      cy.get("#comment").should("be.visible").click().type(text);
      cy.contains("button", "Confirm pass").should("exist").click();
      cy.contains(text).should("exist");
      cy.contains("button", "Change Decision").should("exist").click();
      cy.get("div.MuiBox-root").should("exist");
    } else {
      cy.contains("button", "Change Decision").should("exist").click();
      cy.contains("button", "Pass").should("exist").click();
      const text = "Mandatory Custodian Training Testing";
      cy.get("#comment").should("be.visible").click().type(text);
      cy.contains("button", "Confirm pass").should("exist").click();
      cy.contains(text).should("exist");
    }
    cy.get("div.MuiBox-root").should("exist");
  });
};

const checkMandatoryCustodianTrainingTestingChecksPassViewLessViewAll = () => {
  cy.contains("h5", "Mandatory Custodian Training")
    .closest(".MuiPaper-root")
    .within($el => {
      cy.verifyMandatoryTrainingCardTitleExists();
      const comment = "Mandatory Custodian Training Testing";
      const passCount = 3;
      for (let i = 0; i < passCount; i++) {
        if ($el.find('button:contains("Change Decision")').length) {
          cy.wrap($el).contains("button", "Change Decision").click();
          cy.wrap($el).contains("button", "Pass").click();
          cy.get("#comment").should("be.visible").click().clear().type(comment);
          cy.contains("button", "Confirm pass").should("exist").click();
          cy.contains(comment).should("exist");
        } else {
          cy.wrap($el).contains("button", "Pass").click();
          cy.get("#comment").should("be.visible").click().clear().type(comment);
          cy.contains("button", "Confirm pass").should("exist").click();
          cy.contains(comment).should("exist");
        }
      }
      cy.contains("button", "View All").should("exist").click();
      cy.contains("button", "View Less").should("exist").click();
    });
};

const checkMandatoryCustodianTrainingTestingChecksFailCancelButton = () => {
  cy.get(".MuiPaper-root").then($el => {
    cy.verifyMandatoryTrainingCardTitleExists();
    if ($el.find('button:contains("Change Decision")').length) {
      cy.wrap($el).contains("button", "Change Decision").click();
    } else {
      cy.contains("button", "Fail").click();
      cy.contains("button", "Cancel").should("exist").click();
    }
  });
};

const checkMandatoryCustodianTrainingTestingChecksFail = () => {
  cy.get(".MuiPaper-root").then($el => {
    cy.verifyMandatoryTrainingCardTitleExists();
    if ($el.find('button:contains("Change Decision")').length) {
      cy.wrap($el).contains("button", "Change Decision").click();
      cy.contains("button", "Fail").should("exist").click();
      cy.contains("label", "Add any further comment").should("exist");
      const text = "Mandatory Custodian Training Testing";
      cy.get("#comment").should("be.visible").click().type(text);
      cy.contains("button", "Confirm fail").should("exist").click();
      cy.contains("span", "Failed").should("exist");
      cy.contains(text).should("exist");
    } else {
      cy.contains("button", "Fail").click();
      cy.contains("button", "Cancel").should("exist").click();
      cy.contains("button", "Fail").should("exist").click();
      cy.contains("label", "Add any further comment").should("exist");
      const text = "Mandatory Custodian Training Testing";
      cy.get("#comment").should("be.visible").click().type(text);
      cy.contains("button", "Confirm fail").should("exist").click();
      cy.contains("span", "Failed").should("exist");
      cy.contains(text).should("exist");
    }
  });
};

const checkMandatoryCustodianTrainingTestingChecksFailChangeDecision = () => {
  cy.get(".MuiPaper-root").then($el => {
    cy.verifyMandatoryTrainingCardTitleExists();
    if ($el.find('button:contains("Fail")').length) {
      cy.contains("button", "Fail").should("exist").click();
      const text = "Mandatory Custodian Training Testing";
      cy.get("#comment").should("be.visible").click().type(text);
      cy.contains("button", "Confirm fail").should("exist").click();
      cy.contains(text).should("exist");
      cy.contains("button", "Change Decision").should("exist").click();
      cy.get("div.MuiBox-root").should("exist");
    } else {
      cy.contains("button", "Change Decision").should("exist").click();
      cy.contains("button", "Fail").should("exist").click();
      const text = "Mandatory Custodian Training Testing";
      cy.get("#comment").should("be.visible").click().type(text);
      cy.contains("button", "Confirm fail").should("exist").click();
      cy.contains(text).should("exist");
    }
    cy.get("div.MuiBox-root").should("exist");
  });
};

const checkMandatoryCustodianTrainingTestingChecksFailViewLessViewAll = () => {
  const comment = "Mandatory Custodian Training Testing";

  const card = () =>
    cy
      .contains("h5", "Mandatory Custodian Training Testing")
      .closest(".MuiPaper-root");

  Cypress._.times(2, () => {
    card().then($card => {
      if ($card.find('button:contains("Change Decision")').length) {
        card().contains("button", "Change Decision").click();

        cy.contains("button", "Fail").click();
      } else {
        card().contains("button", "Fail").click();
      }
    });

    cy.get("#comment").should("be.visible").click().clear().type(comment);
    cy.contains("button", "Confirm fail").should("be.visible").click();
    cy.waitForLoadingToFinish();
    card().contains(comment).should("be.visible");
  });

  card().contains("button", "View All").should("be.visible").click();
  card().contains("button", "View Less").should("be.visible").click();
};

export {
  checkMandatoryCustodianTrainingTestingChecksPassCancelButton,
  checkMandatoryCustodianTrainingTestingChecksPass,
  checkMandatoryCustodianTrainingTestingChecksPassChangeDecision,
  checkMandatoryCustodianTrainingTestingChecksPassViewLessViewAll,
  checkMandatoryCustodianTrainingTestingChecksFailCancelButton,
  checkMandatoryCustodianTrainingTestingChecksFail,
  checkMandatoryCustodianTrainingTestingChecksFailChangeDecision,
  checkMandatoryCustodianTrainingTestingChecksFailViewLessViewAll,
  checkMandatoryCustodianTrainingTestingChecksAddMoreIformationCancelButton,
  checkMandatoryCustodianTrainingTestingChecksAddMoreInformation,
};
