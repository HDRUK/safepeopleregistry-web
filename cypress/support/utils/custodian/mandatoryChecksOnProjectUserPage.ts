import { dataCy } from "../common";

const checkMandatoryCustodianTrainingTestingChecksAddMoreIformationCancelButton = () => {
  cy.contains('h5', 'Mandatory training has been completed').closest('.MuiPaper-root').within(($el) => {
    cy.contains('h5', 'Mandatory training has been completed').should('exist');
    cy.contains("button", "…").should('exist').click();
    cy.document().find('.MuiPopover-root:visible').within(() => {
      cy.contains('Add more information').click();
      })
    cy.contains("button", "Cancel").should('exist').click();
  });
};

const checkMandatoryCustodianTrainingTestingChecksAddMoreInformation = () => {
  cy.contains('h5', 'Mandatory training has been completed').closest('.MuiPaper-root').within(() => {
    cy.contains('h5', 'Mandatory training has been completed').should('exist');
    cy.contains("button", "…").should('exist').click();
    cy.document().find('.MuiPopover-root:visible').within(() => {
      cy.contains('Add more information').click();
      })
    cy.contains("label", "Add any further comment").should('exist');
    const text = 'Add more information Testing';
   cy.get("#comment").should('exist').type(text);
   cy.contains("button", "Add information").should('exist').click();
   cy.contains(text).should("exist");
  });
};

const checkMandatoryCustodianTrainingTestingChecksPassCancelButton = () => {
  cy.contains('h5', 'Mandatory training has been completed').closest('.MuiPaper-root').within(() => {
    cy.contains('h5', 'Mandatory training has been completed').should('exist');
    cy.contains('button', 'Pass').click();
    cy.contains("button", "Cancel").should('exist').click();
  });
};

const checkMandatoryCustodianTrainingTestingChecksPass = () => {
  cy.contains('h5', 'Mandatory training has been completed').closest('.MuiPaper-root').within(() => {
    cy.contains('h5', 'Mandatory training has been completed').should('exist');
    cy.contains("button", "Pass").should('exist').click();
  cy.contains("label", "Add any further comment").should('exist');
  const text = 'Mandatory Custodian Training Testing';
  cy.get("#comment").should('exist').type(text);
  cy.contains("button", "Confirm pass").should('exist').click();
  cy.contains("span", "Passed").should('exist');
  cy.contains(text).should("exist");
  });
};

const checkMandatoryCustodianTrainingTestingChecksPassChangeDecision = () => {
  cy.contains('h5', 'Mandatory training has been completed').closest('.MuiPaper-root').within(($el) => {
    cy.contains('h5', 'Mandatory training has been completed').should('exist');
    if($el.find('button:contains("Pass")').length){
      cy.contains("button", "Pass").should('exist').click();
  const text = 'Mandatory Custodian Training Testing';
  cy.get("#comment").should('exist').type(text);
  cy.contains("button", "Confirm pass").should('exist').click();
  cy.contains(text).should("exist");
  cy.contains("button", "Change Decision").should('exist').click();
  cy.get('div.MuiBox-root').should('exist');
    } else {
  cy.contains("button", "Change Decision").should('exist').click();
  cy.contains("button", "Pass").should('exist').click();
  const text = 'Mandatory Custodian Training Testing';
  cy.get("#comment").should('exist').type(text);
  cy.contains("button", "Confirm pass").should('exist').click();
  cy.contains(text).should("exist");
    }
  cy.get('div.MuiBox-root').should('exist');
  });
};

const checkMandatoryCustodianTrainingTestingChecksPassViewLessViewAll = () => {
  cy.contains('h5', 'Mandatory training has been completed').closest('.MuiPaper-root').within(($el) => {
    cy.contains('h5', 'Mandatory training has been completed').should('exist');
    const comment = 'Mandatory Custodian Training Testing';
  const passCount = 3;
  for (let i = 0; i < passCount; i++) {
    if ($el.find('button:contains("Change Decision")').length) {
      cy.wrap($el).contains('button', 'Change Decision').click();
      cy.wrap($el).contains('button', 'Pass').click();
      cy.get('#comment').clear().type(comment);
    cy.contains('button', 'Confirm pass').should('exist').click();
    cy.contains(comment).should('exist');
    } else {
      cy.wrap($el).contains('button', 'Pass').click();
      cy.get('#comment').should('exist').clear().type(comment);
    cy.contains('button', 'Confirm pass').should('exist').click();
    cy.contains(comment).should('exist');
    }
  }
  cy.contains('button', 'View All')
  .should('exist')
  .click();
  cy.contains('button', 'View Less')
  .should('exist')
  .click();
  })
  };

const checkMandatoryCustodianTrainingTestingChecksFailCancelButton = () => {
  cy.contains('h5', 'Mandatory training has been completed').closest('.MuiPaper-root').within(($el) => {
    cy.contains('h5', 'Mandatory training has been completed').should('exist');
    const comment = 'Mandatory Custodian Training Testing';
    if ($el.find('button:contains("Change Decision")').length) {
      cy.wrap($el).contains('button', 'Change Decision').click();
    } else {
      cy.contains('button', 'Fail').click();
      cy.contains("button", "Cancel").should('exist').click();
    }
  });
  };

  const checkMandatoryCustodianTrainingTestingChecksFail = () => {
    cy.contains('h5', 'Mandatory training has been completed').closest('.MuiPaper-root').within(($el) => {
      cy.contains('h5', 'Mandatory training has been completed').should('exist');
      const comment = 'Mandatory Custodian Training Testing';
      if ($el.find('button:contains("Change Decision")').length) {
        cy.wrap($el).contains('button', 'Change Decision').click();
        cy.contains("button", "Fail").should('exist').click();
    cy.contains("label", "Add any further comment").should('exist');
    const text = 'Mandatory Custodian Training Testing';
    cy.get("#comment").should('exist').type(text);
    cy.contains("button", "Confirm fail").should('exist').click();
    cy.contains("span", "Failed").should('exist');
    cy.contains(text).should("exist");
      } else {
        cy.contains('button', 'Fail').click();
        cy.contains("button", "Cancel").should('exist').click();
        cy.contains("button", "Fail").should('exist').click();
    cy.contains("label", "Add any further comment").should('exist');
    const text = 'Mandatory Custodian Training Testing';
    cy.get("#comment").should('exist').type(text);
    cy.contains("button", "Confirm fail").should('exist').click();
    cy.contains("span", "Failed").should('exist');
    cy.contains(text).should("exist");
      }
    });


    cy.contains('h5', 'Mandatory training has been completed').closest('.MuiPaper-root').within(() => {
      cy.contains('h5', 'Mandatory training has been completed').should('exist');
      
    });
  };

const checkMandatoryCustodianTrainingTestingChecksFailChangeDecision = () => {
  cy.contains('h5', 'Mandatory training has been completed').closest('.MuiPaper-root').within(($el) => {
    cy.contains('h5', 'Mandatory training has been completed').should('exist');
    if($el.find('button:contains("Fail")').length){
      cy.contains("button", "Fail").should('exist').click();
  const text = 'Mandatory Custodian Training Testing';
  cy.get("#comment").should('exist').type(text);
  cy.contains("button", "Confirm fail").should('exist').click();
  cy.contains(text).should("exist");
  cy.contains("button", "Change Decision").should('exist').click();
  cy.get('div.MuiBox-root').should('exist');
    } else {
  cy.contains("button", "Change Decision").should('exist').click();
  cy.contains("button", "Fail").should('exist').click();
  const text = 'Mandatory Custodian Training Testing';
  cy.get("#comment").should('exist').type(text);
  cy.contains("button", "Confirm fail").should('exist').click();
  cy.contains(text).should("exist");
    }
  cy.get('div.MuiBox-root').should('exist');
  });
};

const checkMandatoryCustodianTrainingTestingChecksFailViewLessViewAll = () => {
  cy.contains('h5', 'Mandatory training has been completed').closest('.MuiPaper-root').within(($el) => {
    cy.contains('h5', 'Mandatory training has been completed').should('exist');
    const comment = 'Mandatory Custodian Training Testing';
  const passCount = 3;
  for (let i = 0; i < passCount; i++) {
    if ($el.find('button:contains("Change Decision")').length) {
      cy.wrap($el).contains('button', 'Change Decision').click();
      cy.wrap($el).contains('button', 'Fail').click();
      cy.get('#comment').clear().type(comment);
    cy.contains('button', 'Confirm fail').should('exist').click();
    cy.contains(comment).should('exist');
    } else {
      cy.wrap($el).contains('button', 'Fail').click();
      cy.get('#comment').should('exist').clear().type(comment);
    cy.contains('button', 'Confirm fail').should('exist').click();
    cy.contains(comment).should('exist');
    }
  }
  cy.contains('button', 'View All')
  .should('exist')
  .click();
  cy.contains('button', 'View Less')
  .should('exist')
  .click();
  })
  };

const checkMandatoryCustodianTrainingTestingChecksAddMoreIformationCancelButton1 = () => {
    cy.contains('h5', 'Mandatory training has been completed').closest('.MuiPaper-root').within(($el) => {
      cy.contains('h5', 'Mandatory training has been completed').should('exist');
      if ($el.find('button:contains("Change Decision")').length) {
        cy.wrap($el).contains('button', 'Change Decision').click();
        cy.contains("button", "…").should('exist').click();
        cy.contains('Add more information').click();

      cy.contains("button", "Cancel").should('exist').click();
      } else {
        cy.wrap($el).contains('button', 'Fail').click();
        cy.contains("button", "…").should('exist').click();
        cy.get('[data-testid="validation-log-add-more-info"]').should('exist').click({ force: true });
        cy.contains("button", "Cancel").should('exist').click();
      }
    });
  };

const checkMandatoryCustodianTrainingTestingChecksAddMoreInformation1 = () => {
  cy.contains('h5', 'Mandatory training has been completed').closest('.MuiPaper-root').within(() => {
    cy.contains('h5', 'Mandatory training has been completed').should('exist');
    cy.contains("button", "…").should('exist').click();
    cy.get('[data-testid="InfoOutlinedIcon"]').should('exist')
    cy.contains("p", "Add more information").should('exist').click();
    cy.contains("label", "Add any further comment").should('exist');
    const text = 'Add more information Testing';
   cy.get("#comment").should('exist').type(text);
   cy.contains("button", "Add information").should('exist').click();
   cy.contains("span", "Added").should('exist');
   cy.contains(text).should("exist");
  });
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